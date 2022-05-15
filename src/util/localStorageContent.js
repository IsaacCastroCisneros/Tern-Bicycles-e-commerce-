
export function getCartBici(LOCAL_STORAGE_CART_CONTENT)
{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_CONTENT)) || [];
}
export function setCartBici(cartItemsArr,LOCAL_STORAGE_CART_CONTENT)
{
    return localStorage.setItem(LOCAL_STORAGE_CART_CONTENT,JSON.stringify(cartItemsArr));
} 