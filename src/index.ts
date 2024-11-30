import { WebLarekApi } from './components/Model/WebLarekApi';
import { WebLarekModel } from './components/Model/WebLarekModel';
import { Card } from './components/View/Card';
import { Page } from './components/View/Page';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants'
import { cloneTemplate, ensureElement } from './utils/utils';

// const model = new WebLarekModel;
// const api = new WebLarekApi(API_URL);
// const page = new Page(document.body);
// const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

// api.getCatalog()
//   .then(res => {
//     model.products = res.items;

//     console.log(model.products);

//     page.catalog = model.products.map(item => {
//       return new Card(cloneTemplate(cardTemplate), CDN_URL).render(item)
//     });
//   });


// const model = new WebLarekModel;
// model.products = [
//   {  category: "софт-скил",
//   description: "Если планируете решать задачи в тренажёре, берите два.",
//   id: "854cef69-976d-4c2a-a18c-2aa45046c390",
//   image: "/5_Dots.svg",
//   price: 750,
//   title: "+1 час в сутках",},
//   {  category: "софт-скил",
//   description: "Если планируете решать задачи в тренажёре, берите два.",
//   id: "854cef69-976d-4c2a-a18c-2aa45046c391",
//   image: "/5_Dots.svg",
//   price: 750,
//   title: "+1 час в сутках",},
//   {  category: "софт-скил",
//   description: "Если планируете решать задачи в тренажёре, берите два.",
//   id: "854cef69-976d-4c2a-a18c-2aa45046c392",
//   image: "/5_Dots.svg",
//   price: 750,
//   title: "+1 час в сутках",},
// ]

// console.log(model.getItem("854cef69-976d-4c2a-a18c-2aa45046c390"))
// model.addToBasket("854cef69-976d-4c2a-a18c-2aa45046c390");
// console.log(model.basket)

// console.log(model.getTotalPrice());
// model.addToItemOrder();
// console.log(model.setTotalPrice());

// console.log(model.products);

