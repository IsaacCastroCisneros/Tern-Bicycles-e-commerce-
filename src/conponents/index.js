import 'regenerator-runtime/runtime';
import { OpenMenu } from "./menu";
import { bicis } from "./bicis";
import { bici } from "./bici";
import { shopCart } from "./shopCart";
import { shoppingCart } from "./shoppingCart";


const shopCartDocument = document.querySelector('.body-shopCart');

OpenMenu();
bicis();
bici();

if(shopCartDocument===null)
{
    shopCart();
}
else if(shopCartDocument)
{
    shoppingCart();
}




