

import addGlobalEventListener from './../util/globalEventListener';


export function OpenMenu()
{
    const bodyLayer = document.querySelector('.body-layer');

    addGlobalEventListener('click','[data-header-menu-icon]',(e)=>
    {
        const mobMenu = e.target.closest('[data-header-menu-button]').nextElementSibling;
        mobMenu.classList.add('active');
        bodyLayer.classList.add('active');
    })

    addGlobalEventListener('click','[data-header-mob-icon]',(e)=>
    {
        const mobMenu = e.target.closest('[data-header-mob-menu]');
        mobMenu.classList.remove('active');
        bodyLayer.classList.remove('active');
    })    

    window.addEventListener('click',e=>
    {
        const mobMenu = document.querySelector('[data-header-mob-menu]');
        
        const menu = e.target.closest('.header__mob-menu');
        const button = e.target.matches('[data-header-menu-icon]');
        
        if(menu!==null || button)return 
        
        mobMenu.classList.remove('active');
        bodyLayer.classList.remove('active');
    })
}








/* -------------------------------------------------- */

/* let client = contentful.createClient(
{
  space: "bevaw7cnpfpm",
  accessToken: "NZY3bOsXMAdP8kafTHktHbLjN6ssUKtqCNQqjEuq8g8",
})

client
  .getEntries()
  .then(entry => 
  {
      entry.items.forEach(item=>
      {
          const bici = item.sys.id;
          console.log(bici)
      })
  })
  .catch(err => console.log(err)); */
/* 
const contentful = require('contentful-management');

async function connect()
{
    let client = await contentful.createClient(
    {
        accessToken:"CFPAT-BW9jW2hpauTN488If1MzJ23LCmfOf5m3k0GQifwr4SE",
    });
    let space = await client.getSpace('bevaw7cnpfpm');
    return await space.getEnvironment('master');
}

async function updateBici(env,biciID)
{
    let bici = await env.getEntry(biciID);
    console.log(bici.fields.price)
}

(async ()=>
{
    let env = await connect();
    await updateBici(env,'4l2aN2eqHTdGC3tocPkvL6');
})(); */

