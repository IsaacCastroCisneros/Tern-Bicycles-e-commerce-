import contentRequest from "../util/content";
import formatCurrency from "../util/formatCurrency";
import addGlobalEventListener from "../util/globalEventListener";
import { bicis } from "./bicis";
import parseRequestUrl from "../util/requestUrl";
import inputOperations from "../util/inputOperations";
import inputLimiter from "../util/inputLimiter";

const id = parseRequestUrl();


window.addEventListener('DOMContentLoaded', () => 
{
    contentRequest(items => 
    {
        const itemById = items.find(item =>item.sys.id === id);
        const name = itemById.fields.name;
        const imgUrl = itemById.fields.image.fields.file.url;
        const description = itemById.fields.description.content[0].content[0].value;
        const descriptionList = itemById.fields.description.content[1].content;
        const price = Number(itemById.fields.price);
    
        createProductBici(name,imgUrl,description,price,descriptionList);
        mobTitle();
    })
})

export function bici()
{
   const productInput = document.querySelector('.product__input');
   
   addGlobalEventListener('input','.product__input',e=>
   {
       const input = e.target;
       inputLimiter(input);
   });
   /* addGlobalEventListener('submit','.product__input-form',e=>
   {
       e.preventDefault();
       const input = e.target;
       console.log(4)
   }); */
   addGlobalEventListener('click','.product__input-button',e=>
   {
       inputOperations(productInput,e);
   });
}

function mobTitle()
{
    const title = document.querySelector('.product__title');
    const mobTitle = document.querySelector('.product__title--mob');
    mobTitle.innerHTML=title.textContent;
}

function createProductBici(name,imgUrl,description,price,descriptionList) 
{
    const titleBici = document.querySelector('.product__title');
    const imgBici = document.querySelector('.product__img');
    const descriptionBici = document.querySelector('.product__description');
    const listBici = document.querySelector('.product__description-list');
    const priceBici = document.querySelector('.product__price');

    descriptionList.forEach(description=>
    {
        const li = document.createElement('LI');
        const content= description.content[0].content[0].value;

        li.textContent=content;
        listBici.appendChild(li);
    })

    titleBici.textContent= name;
    imgBici.src = imgUrl;
    descriptionBici.innerHTML=description;
    priceBici.textContent= formatCurrency(price);
}
