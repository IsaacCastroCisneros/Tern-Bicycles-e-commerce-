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
