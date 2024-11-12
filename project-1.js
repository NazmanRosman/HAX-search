/**
 * Copyright 2024 nazman-hub
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./site-details.js";
import "./site-card.js";


import '@haxtheweb/hax-iconset/hax-iconset.js';
import '@haxtheweb/simple-icon/simple-icon.js';


/**
 * `project-1`
 * 
 * @demo index.html
 * @element project-1
 */
export class project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.title = "HAX Search";
    this.loading = false;
    this.isValid = false;
    this.searchResults = [];
    // this.data = undefined;

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      searchResults: { type: Array, attribute: "search-results", reflect: true },
      searchQuery: { type: String, attribute: "search-query" },
      data: { type: Object, reflect: true },
      isValid: { type: Boolean, reflect: true },
    };
  }
  
  firstUpdated(){
    this.updateResults(this.searchQuery);
    //focus search bar when press'/' (copied from google)
    document.addEventListener("keyup", e => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey) return;
      if (/^(?:input|textarea|select|button)$/i.test(e.target.tagName)) return;
      e.preventDefault();
      this.shadowRoot.querySelector('.search-input').focus();
    });
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {

        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-primary);
        font-size: 16px;
        padding: 0;
        margin: 0;
      }
      * {
          margin: 0;          
          padding: 0;      
      }

      div{
        font: inherit;
      }
      :host([loading]) .content {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .container{
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-5, 20px);
        max-width: 2000px;
        padding: 50px;
        align-items: center;
        margin: auto;
      }



      .search{
        font: inherit;
      }
      .container .search{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        width: 500px;
        max-width: 90vw;
        /* margin: 0 auto; */
        justify-content: center;
        

      }
      .search-button{
        height: 50px;
        box-sizing: content-box;
        padding: 0 20px;
        text-align: center;
        margin: auto;   
        font-size: inherit;
      }
      .search-input{
        height: 50px;
        flex: 1 1 0;
        padding: 0 10px;
        font-size: inherit;
      }
      .results{
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4, 16px);
        justify-content: space-evenly;
        
      }
      site-card {
        flex: 1 1 400px;
      }
      site-details{
        flex: 1 1 0;
        /* margin: 0 auto; */
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="container">

  <h2>${this.title}</h2>

  <div class="search">
    <input class="search-input" placeholder="Enter 'haxtheweb.org'"  @input="${this.updateSearchQuery}"
    @keydown="${(e)=>{if(e.key==='Enter'){this.updateResults();}}}"/>  <!--pressing enter calls this.inputChanged-->
    <button class="search-button" @click="${this.updateResults}"  label="analyze button">Analyze</button> <!--pressing search button calls this.inputChanged-->
  </div>
  
  <!-- loading -->
  ${(this.loading)? html`Loading results for '${this.url}'`: html`
    <!-- check if this.data is defined -->
    ${(this.data === undefined)? 
      html`<div>The site '${this.url}' is not compatible</div>` 
      : 
      html`
        <!-- site preview section -->
        <div class="content">
          <site-details 
          title=${this.data.title}
          description=${this.data.description}
          logo='${this.url}${this.data.metadata.site.logo}'      
          dateCreated=${this.dateToString(this.data.metadata.site.created)}
          dateUpdated=${this.dateToString(this.data.metadata.site.updated)}
          hexCode=${this.data.metadata.theme.variables.hexCode}
          theme=${this.data.metadata.theme.name}
          icon=${this.data.metadata.theme.variables.icon}  
          url=${this.url}   
          ></site-details>  
        </div>

        <!-- cards container -->
        <div class="results content">
          ${this.searchResults.length===0
            ? console.log('searchResults empty')
            : this.searchResults.map((item) =>
              html`
                <site-card
                  title = ${item.title}
                  description =  ${item.description}
                  imageSrc =  ${this.getImgSrc(item)}
                  dateUpdated =  ${this.dateToString(item.metadata.updated)}
                  pageLink =  '${this.url}${item.slug}'
                  pageHtml =  '${this.url}${item.location}'
                ></site-card>
              `  
            )
          }
        </div>
      `
    }
  `}
</div>
`;}


updated(){
  
}

updateSearchQuery(){
  this.searchQuery = this.shadowRoot.querySelector('.search-input').value;
}

updateResults() {
  this.loading=true;

  this.formattedUrl = this.searchQuery.replace(/^(?!https?:\/\/)(.+?)(\/?)$/, "https://$1/");
  let jsonUrl ='';
  
  if(this.formattedUrl.endsWith("site.json")){
    console.log(1)
    jsonUrl = this.formattedUrl;
    this.url =  this.formattedUrl.replace(/site\.json\/?$/, "");
  } else{
    jsonUrl = `${this.url}site.json`;
    this.url = this.formattedUrl;
    
  }
  // console.log(this.url)
  
  fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {                                   
        // throw new Error("HTTP error " + response.status); 
    }                                                     
    return response.json();
    })
  .then(data => {
    if (data.items) {
      this.searchResults = [];
      this.searchResults = data.items;
      this.data=undefined;
      this.data = data;
      this.loading = false;
      this.requestUpdate();
    }})
  .catch(error =>{
    this.loading = false;
    this.searchResults = [];
    this.data = undefined;
    console.log('fetch failesd');
  });

}

getImgSrc(item){
  let images =item.metadata.images;
  if(images){
    if(images.length >0){
      return(this.url+images[0]);
    }
  }

}

dateToString(timestamp){
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  return date.toUTCString();
}


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(project1.tag, project1);