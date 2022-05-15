import addGlobalEventListener from "../util/globalEventListener";
import formatCurrency from "../util/formatCurrency";
import {getCartBici,setCartBici} from "../util/localStorageContent";
import inputOperations from "../util/inputOperations";
import promiseTimeOut from "../util/promiseTimeOut";
import inputLimiter from "../util/inputLimiter";

let cartItemsArr = getCartBici('cartContent');

const shoppingCartContainer = document.querySelector('.shop-cart-row-container');
const shoppingCartSubtotal = document.querySelector('.shop-cart-subtotal');

function isSubtotalVisible()
{
    cartItemsArr.length>0 ? shoppingCartSubtotal.style.display='flex' : shoppingCartSubtotal.style.display='none'; 
}

function renderShoppoingCartItems()
{
    if(cartItemsArr.length===0)return
    shoppingCartContainer.innerHTML='';
    /* shoppingCartSubtotal.classList.toggle(active); */
    cartItemsArr.forEach(createShoppingCartItems);
    isSubtotalVisible();
}

function setTotals()
{
    const subtotal = document.querySelector('.shop-cart-subtotal__subtotal');
    
    const priceTotals = cartItemsArr.reduce((sum,num)=>
    {
        const subtotal = num.price * num.quantity;
        return sum + subtotal
    },0)
    
    subtotal.textContent=formatCurrency(priceTotals);
}

function createTotals(item)
{
   const rows = document.querySelectorAll('.shop-cart__row');
   const actualRow = Array.from(rows).find(row=>row.dataset.id===item.id);

   const total = actualRow.querySelector('.shop-cart__box--total');
   total.textContent=formatCurrency(item.price*item.quantity);
}

function createShoppingCartItems(item)
{
   const tempItem = document.querySelector('.shop-cart-template');
   const cloneItem = tempItem.content.cloneNode(true);
   
   const shopCart = cloneItem.querySelector('.shop-cart__row');
   const imgClone = cloneItem.querySelector('[shop-cart-img]');
   const titleClone = cloneItem.querySelector('.shop-cart__title');
   const priceClone = cloneItem.querySelector('.shop-cart__box--price');
   const inputClone = cloneItem.querySelector('.shop-cart__input');
   const totalClone = cloneItem.querySelector('.shop-cart__box--total');

   shopCart.setAttribute('data-id',item.id);
   imgClone.src=item.imgUrl;
   titleClone.textContent=item.name;
   priceClone.textContent=formatCurrency(item.price );
   inputClone.value=item.quantity;
   totalClone.textContent=formatCurrency(item.price*item.quantity);
   inputClone.setAttribute('data-id',item.id);
   setTotals();

   shoppingCartContainer.appendChild(cloneItem)
}

function emptyMessage()
{
    if(cartItemsArr.length>0)return

    const emptyMessageTemp = document.querySelector('.no-product-template');
    const emptyMessageClone = emptyMessageTemp.content.cloneNode(true);
    shoppingCartContainer.appendChild(emptyMessageClone);
}

export function shoppingCart()
{
    renderShoppoingCartItems();
    emptyMessage();

    addGlobalEventListener('click','.shop-cart__remove',(e)=>
    {
       const shopCart = e.target.closest('.shop-cart__row');
       const newShopCart = cartItemsArr.filter(item=>item.id !== shopCart.dataset.id);

       shopCart.remove();
       cartItemsArr= newShopCart;
       
       setCartBici(cartItemsArr,'cartContent');
       
       emptyMessage();
       isSubtotalVisible();
       setTotals();
    })

    addGlobalEventListener('click','[shop-cart-input-button]',(e)=>
    {
        const input = e.target.closest('.shop-cart__input-container').nextElementSibling.children[0];

        inputOperations(input,e);

        const row =e.target.closest('.shop-cart__row');
    
        const item = cartItemsArr.find(item=>item.id===row.dataset.id);
        item.quantity=Number(input.value);

        createTotals(item);
        setCartBici(cartItemsArr,'cartContent'); 
        setTotals();     
    })

    addGlobalEventListener('input','.shop-cart__input', (e)=>
    {
        const input = e.target;
        
        inputLimiter(input) 

        window.addEventListener('click', (e)=>
        {
            if(input.value==='')
            {
                input.value=1;
            }

            const nextInput = e.target.closest('.shop-cart__input')
            let flag=false;
            if(nextInput !==null)
            {
                flag = input.dataset.id === nextInput.dataset.id; 
            }
            
            if(flag) return 

            const item = cartItemsArr.find(item=>item.id===input.dataset.id);
            item.quantity=Number(input.value);

            createTotals(item);
            setCartBici(cartItemsArr,'cartContent');
            setTotals();
        })
    })

    const formArr = document.querySelectorAll('.shop-cart__form');
    formArr.forEach(form=>
    {
        form.addEventListener('submit',async (e)=>
        {
            e.preventDefault();
            const input =e.target.children[0]; 
            const item = cartItemsArr.find(item=>item.id===input.dataset.id);
            
            item.quantity=Number(input.value);
            
            input.style.outline='none';
            await promiseTimeOut(100);
            input.style.removeProperty('outline');

            createTotals(item);
            setCartBici(cartItemsArr,'cartContent');
            setTotals();
        })
    })
    

}
