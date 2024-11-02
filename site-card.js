import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class SiteCard extends DDDSuper(I18NMixin(LitElement)){
  firstUpdated(){

  }

  constructor() {
    super();
    this.title =  ''
    this.description =  ''
    this.imageSrc =  ''
    this.dateUpdated =  ''
    this.pageLink =  ''
    this.pageHtml =  ''
    

  }

  static get properties() {
    return {

      title: { type: String },
      description: { type: String },
      imageSrc: { type: String },
      dateUpdated: { type: String },
      pageLink: { type: String },
      pageHtml: { type: String },

    };
  }

  static get styles() {
    return [super.styles,css`
    

    :host {
      display:block;

    }

    .container{
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
      /* align-items: center; */
      gap: var(--ddd-spacing-3, 20px);
      flex-wrap: wrap;

      width: 400px;
      padding: var(--ddd-spacing-5, 20px);
      border: var(--ddd-border-sm, black solid 3px);
      font-family: var(--ddd-font-primary, roboto);
      font-size:16px;
      color: var(--ddd-theme-primary);
      background-color: var(--site-hex-code, --ddd-theme-accent);
    }



    .text-container{
      font-weight: 400;
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-3,20px);
    }

    .title{
      font-size:18px;
      font-weight: var(--ddd-font-weight-bold, bold);
      text-align: center;

      /* margin-bottom:  var(--ddd-spacing-4); */
    }

    .container img {
      display: block;
      height: 150px;
      
    }
    a div{
      text-decoration: none;
      color:  var(--ddd-theme-primary); 
    }
    .info-row {
        display: flex;
        flex-direction: column;
        /* justify-content: flex-start; */
        /* flex-wrap: wrap; */
        /* gap: 10px; */
        
    }

    .label {
        width: 120px; /* Adjust based on your desired label width */
        font-weight: bold;
    }


    `];
  }

 

  render() {
    return html`
    <div class="container" style="--site-hex-code: ${this.hexCode};">
      
      <div class="title" ?hidden="${this.title === ''}">
          <!-- <span class="icon" ?hidden="${this.icon === ''}">
            <simple-icon icon="${this.icon}"></simple-icon>
          </span> -->
          ${this.title}
      </div> 
      
      <div class="image-container">
        <div class="image" ?hidden="${this.imageSrc === ''}">
          <img src ="${this.imageSrc}">
        </div>

      </div>
      
      <div class="text-container" >


      

        <div ?hidden="${this.description === ''}">
          <div class="info-row">
            <span class="label"><strong>Description</strong></span>
            <span>${this.description}</span>
          </div>
        </div>       

        <div ?hidden="${this.dateUpdated === ''}">
          <div class="info-row">
              <span class="label"><strong>Date updated</strong></span>
              <span>${this.dateUpdated} </span>
          </div>
        </div>

        <div ?hidden="${this.pageLink === ''}">
          <div class="info-row">
              <span class="label">
                <a href="${this.pageLink}" target="_blank" rel="noopener noreferrer"><strong>Link to page</strong></a></span>
              
          </div>
        </div>
        <div ?hidden="${this.pageHtml=== ''}">
          <div class="info-row">
                <a href="${this.pageHtml}" target="_blank" rel="noopener noreferrer"><strong>View page source</strong></a>
              
          </div>
        </div>
        



      </div>
    </div>


    `;
  }
  static get tag() {
    return "site-card";
  }
}
customElements.define(SiteCard.tag, SiteCard);