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
    this.title = "Hax Search";
    this.loading = false;
    this.searchResults = [];

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
      searchResults: { type: Array, attribute: "search-results" },
      searchQuery: { type: String, attribute: "search-query" },
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
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .container{
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .results{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .search{
        /* height: 30px; */
        font: inherit;
      }
      .search{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        width: 500px;
        max-width: 90vw;
        margin: auto;
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
      site-details{
        margin: auto;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="container">
  <h2>${this.title}</h2>
  <div class="search">
    <input class="search-input" placeholder="Press '/' to begin searching, hit enter to search"  
    @keydown="${(e)=>{if(e.key==='Enter'){this.search();}}}"/>  <!--pressing enter calls this.inputChanged-->
    <button class="search-button" @click="${this.search}">Search</button> <!--pressing search button calls this.inputChanged-->
  </div>
  
<!-- render html if this.data exists -->
  ${this.data && html`
    <site-details 
      title=${this.data.title}
      description=${this.data.description}
      logo='${this.searchQuery}${this.data.metadata.site.logo}'      
      dateCreated=${this.dateToString(this.data.metadata.site.created)}
      dateUpdated=${this.dateToString(this.data.metadata.site.updated)}
      hexCode=${this.data.metadata.theme.variables.hexCode}
      theme=${this.data.metadata.theme.name}
      icon=${this.data.metadata.theme.variables.icon}  
      url=${this.searchQuery}   
    ></site-details>
    ` }

  <div class="results">

    ${this.searchResults.map((item) => 
      html`
      <site-card
        title = ${item.title}
        description =  ${item.description}
        imageSrc =  ''
        dateUpdated =  ${this.dateToString(item.metadata.updated)}
        pageLink =  '${this.searchQuery}${item.slug}'
        pageHtml =  '${this.searchQuery}${item.location}'
        
      ></site-card>
      `
      
    )}
  </div>
</div>
  `;}

search(e) {
  this.searchQuery = this.shadowRoot.querySelector('.search-input').value; // set this.value to string in search bar
  this.updateResults();
}

updateResults() {
  //if this.searchQuery exists, fetch and update this.searchResults
  //else, this.searchResults = []
  this.loading = true;
  if (this.searchQuery) {
        
        this.jsonUrl = `${this.searchQuery}/site.json`;
        fetch(this.jsonUrl)
    .then(d => d.ok ? d.json(): {})
    .then(data => {
      // console.log(data)
      if (data.items) {
        this.searchResults = [];
        this.searchResults = data.items;
        this.loading = false;
        this.data = data;
        console.log(this.searchResults)

      }  
    });
    
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