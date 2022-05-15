import addGlobalEventListener from "../util/globalEventListener" 
import contentRequest from "../util/content";
import parseRequestUrl from "../util/requestUrl";
import formatCurrency from "../util/formatCurrency";
import promiseTimeOut from "../util/promiseTimeOut";
import { setCartBici, getCartBici} from "../util/localStorageContent";


const LOCAL_STORAGE_CART_OPTIONS = 'cartOptions';

let cartOptionsObject=getCartOptions();
let cartItemsArr=getCartBici('cartContent');


function getCartOptions()
{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_OPTIONS)) || {};
}
function setCartOptions()
{
    return localStorage.setItem(LOCAL_STORAGE_CART_OPTIONS, JSON.stringify(cartOptionsObject))
}

function findBiciByID(id)
{
   /* const mobCartItemContainer = document.querySelector('.mob-shop-cart__container'); */
   contentRequest(items =>
   {
      const bici = items.find(item=> item.sys.id === id);
      addBiciToCart(bici);
   })   
}

function addBiciToCart(bici)
{
    const inputValue = document.querySelector('.product__input');
    const biciObj =
    {
        id:bici.sys.id,
        name:bici.fields.name,
        imgUrl:bici.fields.image.fields.file.url,
        quantity:inputValue.value,
        price:Number(bici.fields.price)
    }

    const sameItem = cartItemsArr.find(item=>item.id === biciObj.id);
    if(sameItem)
    {
        sameItem.quantity=Number(sameItem.quantity) + Number(inputValue.value);
        setCartBici(cartItemsArr,'cartContent');
        renderCartItems();
        renderMobCartItems(biciObj.id); 
        return
    }

    cartItemsArr.push(biciObj);
    
    setCartBici(cartItemsArr,'cartContent');
    renderCartItems();
    renderMobCartItems(biciObj.id);  
    showNotification();

    /* console.log(cartItemsArr) */
}

function renderCartItems()
{
    const cartItemContainer = document.querySelector('.shop-cart__container');
    cartItemContainer.innerHTML='';
    cartItemsArr.forEach(item=>
    {
      cartItemContainer.appendChild(createCartItem(item)) 
    })
}

function createCartItem(item)
{

    const tempCartItem = document.querySelector('.shop-cart-template');
    const cartItemClone = tempCartItem.content.cloneNode('true');
    const cartItem = cartItemClone.querySelector('.shop-cart__item');
    const cartItemName = cartItemClone.querySelector('.shop-cart__title');
    const cartItemPrice = cartItemClone.querySelector('.shop-cart__actual-price');
    const cartItemimgUrl = cartItemClone.querySelector('.shop-cart__actual-img');
    const cartItemQuantity = cartItemClone.querySelector('.shop-cart__quantity');
    const cartItemSubtotal = cartItemClone.querySelector('.shop-cart__subtotal');
     
    const cartItemTotal = document.querySelector('.shop-cart__total');
    
    cartItem.setAttribute('data-id',item.id);
    cartItemimgUrl.src=item.imgUrl
    cartItemName.textContent=item.name;
    cartItemPrice.textContent= formatCurrency(item.price);
    cartItemQuantity.textContent=item.quantity;
    cartItemSubtotal.textContent= formatCurrency(item.price*item.quantity)

    const priceTotals = cartItemsArr.reduce((sum,num)=>
    {
        const subtotal = num.price * num.quantity;
        return sum + subtotal
    },0)
    
    cartItemTotal.textContent=formatCurrency(priceTotals);
    return cartItemClone
  
}

async function showCart()
{
    const shopCartContainer = document.querySelector('.shop-cart-container');
    const mobShopCartContainer = document.querySelector('.mob-shop-cart-container');

    if(cartOptionsObject.show ===true)
    {
        shopCartContainer.classList.add('active');
        mobShopCartContainer.classList.add('active');
    }
    else if(cartOptionsObject.show ===false|| cartOptionsObject.show === undefined)
    {
        shopCartContainer.classList.remove('active');
        
        mobShopCartContainer.classList.toggle('active');
    }
}

function isCartEmpty()
{
    const shopCart = document.querySelector('.shop-cart');

    if(cartItemsArr.length===0)
    {
        shopCart.classList.remove('active');

        cartOptionsObject =
        {
            show:false,
            notification:false
        }
    
        setCartOptions();
    }
}

function showNotification()
{
    const notifications = document.querySelectorAll('.shop-cart__notification');

    if(cartItemsArr.length>0)
    {
        notifications.forEach(notification=>
        {
            notification.style.display='flex';
            notification.innerHTML=cartItemsArr.length;
        });
    }
    else if(cartItemsArr.length===0)
    {
        notifications.forEach(notification=>
        {
            notification.style.display='none';
        });
    }
}

async function renderMobCartItems(id) 
{
    try 
    {
        const cartItem = document.querySelector('.mob-shop-cart__container');
        const buttonItem = document.querySelector('.product__button--mob');
        cartItem.innerHTML = '';

        const items = document.querySelectorAll('.shop-cart__item');
        const foundItem = Array.from(items).find(item => item.dataset.id === id);
        const newItem = foundItem.cloneNode(true);
        const newItemButton = newItem.querySelector('.shop-cart__remove'); 
        
        newItemButton.remove();

        cartItem.appendChild(newItem);
        cartItem.classList.toggle('display');
        await promiseTimeOut(100);
        cartItem.classList.add('active');
        buttonItem.classList.toggle('active');
        await promiseTimeOut(2800);
        cartItem.classList.remove('active');
        buttonItem.classList.toggle('active');
        await promiseTimeOut(500);
        cartItem.classList.toggle('display');
    }
    catch (error) 
    {
        console.log(error);
    }
}

export function shopCart()
{    
    
    addGlobalEventListener('click','.product__button',async e=>
    {
       e.preventDefault();
       const input = document.querySelector('.product__input');
   
       if(input.value==='')return
       const shopCart = document.querySelector('.shop-cart');
    
       cartOptionsObject =
       {
           show:true,
       }

       setCartOptions();
       showCart();
       await promiseTimeOut(100);
       shopCart.classList.add('active');
       findBiciByID(parseRequestUrl());
    })
    addGlobalEventListener('click','[shop-cart-button]',e=>
    {
        const buttonIcon = e.target.closest('.shop-cart-container__icon').nextElementSibling;
        /* const notification = document.querySelector('.shop-cart__notification'); */
        console.log(buttonIcon)
        cartOptionsObject =
        {
            show:true,
            notification:false
        }
        setCartOptions();

        buttonIcon.classList.toggle('active')
    })
    addGlobalEventListener('click','[shop-cart-remove]',async e=>
    {
        const itemRemovable  = e.target.closest('.shop-cart__item');
        cartItemsArr = cartItemsArr.filter(item=> item.id !== itemRemovable.dataset.id)
    
        itemRemovable.remove();
        renderCartItems();
        setCartBici(cartItemsArr,'cartContent');
        isCartEmpty();
        await promiseTimeOut(250);
        showCart();

        showNotification();
    })
    window.addEventListener('click',e=>
    {
        const shopCartTarget = e.target.closest('.shop-cart');
        const button = e.target.matches('[shop-cart-button]');
        const form = e.target.closest('.product__add-to-cart');
        const buttonRemove = e.target.matches('[shop-cart-remove]');
        const shopCart = document.querySelector('.shop-cart');
       
        
        if(shopCartTarget!==null || button ||form!==null || buttonRemove)return
   
        shopCart.classList.remove('active')
    })

    isCartEmpty();
    showCart();
    renderCartItems();
    showNotification();

  /*   addGlobalEventListener('click',,e=>
    {
          
    }) */
}