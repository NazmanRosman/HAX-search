import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class SiteDetails extends DDDSuper(I18NMixin(LitElement)){
  firstUpdated(){

  }

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.logo = '';
    this.dateCreated = '';
    this.dateUpdated= '';
    this.hexCode= '';
    this.theme= '';
    this.icon= '';
    

  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      dateCreated: { type: String },
      dateUpdated: { type: String },
      hexCode: { type: String },
      theme: { type: String },
      icon: { type: String },
    };
  }

  static get styles() {
    return [super.styles,css`
    

    :host {
      display:block;
      /* max-width: 240px;
      padding: var(--ddd-spacing-5, 20px);
      border: var(--ddd-border-sm, black solid 3px); */
    }

    .container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: var(--ddd-spacing-3, 20px);


      width: fit-content;
      padding: var(--ddd-spacing-5, 20px);
      border: var(--ddd-border-sm, black solid 3px);
      font-family: var(--ddd-font-primary, roboto);
      font-size:16px;
      color: var(--ddd-theme-primary);
      background-color: var(--site-hex-code, --ddd-theme-accent);
      /* padding: 20px; */
    }


    /* .container:focus-within,
    .container:hover{
      background-color: var(--ddd-theme-default-creekLight,lightcyan);  
      color: black;
    } */
    .text-container{
      font-weight: 400;
    }

    .title{
      font-size:24px;
      font-weight: var(--ddd-font-weight-bold, bold);
    }

    .container img {
      display: block;
      height: 150px;
      
    }
    a div{
      text-decoration: none;
      color:  var(--ddd-theme-primary); 
    }
    .course-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.info-row {
    display: flex;
    /* justify-content: flex-start; */
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
        <!-- <img src="${this.source}" alt="${this.description}"/> -->


      <div class="image-container" >
        <div class="logo" ?hidden="${this.logo === ''}">
          <img src ="${this.logo}">
        </div>
        
      </div>
      <div class="text-container" >
        <div class="info-row">
          <span class="label"><strong>Description</strong></span>
          <span>: Create Your Own course</span>
      </div>
      <div class="info-row">
          <span class="label"><strong>Date created</strong></span>
          <span>: Wed, 03 May 2023 18:12:36 GMT</span>
      </div>
      <div class="info-row">
          <span class="label"><strong>Date updated</strong></span>
          <span>: Wed, 30 Oct 2024 19:21:20 GMT</span>
      </div>
      <div class="info-row">
          <span class="label"><strong>Theme</strong></span>
          <span>: Polaris - Invent</span>
      </div>

        <div class="title" ?hidden="${this.title === ''}">
          <span class="icon" ?hidden="${this.icon === ''}">
            <simple-icon icon="${this.icon}"></simple-icon>
          </span>
          ${this.title}
        </div>
        <div class="description" ?hidden="${this.description === ''}">Description: ${this.description}</div>
        <div class="dateCreated" ?hidden="${this.dateCreated === ''}">Date created: ${this.dateCreated} </div>
        <div class="dateUpdated" ?hidden="${this.dateUpdated === ''}">Date updated: ${this.dateUpdated}        </div>
        <div class="theme" ?hidden="${this.theme === ''}">Theme: ${this.theme}</div> 

     </div>
    </div>

    `;
  }
  static get tag() {
    return "site-details";
  }
}
customElements.define(SiteDetails.tag, SiteDetails);