import addGlobalEventListener from "../util/globalEventListener";
import contentRequest from "../util/content";


export function bicis()
{
    addGlobalEventListener('click','.bicicletas__button',e=>
    {
        const biciItesm = document.querySelector('.bicicletas__items');
        const serie = e.target.dataset.serie;
        biciItesm.innerHTML='';
        if(serie==='All')
        {
            showBici();
            return
        }
        showBySerie(serie)
    })
    addGlobalEventListener('click','.lifestyles__link',e=>
    {
        window.scrollBy(0,2200);
    })
    addGlobalEventListener('click','.bici__link', e=>
    {
        const biciId = e.target.closest('.bici').dataset.id;
        sessionStorage.setItem('actualBici',JSON.stringify(biciId));
    })
    showBici();
}

function showBySerie(serie)
{
    contentRequest(items=>
    {
        const itemsBySerie = items.filter(item=>item.fields.serie===serie)
        itemsBySerie.forEach(item=>
        {
            const id = item.sys.id;
            const name = item.fields.name;
            const serie = item.fields.serie;
            const imgUrl = item.fields.image.fields.file.url;
            createBici(id, imgUrl, name,serie);
        })
    })
}

function showBici()
{
    contentRequest(items=>
    {
        items.forEach(item=>
            {
               const id = item.sys.id;
               const name = item.fields.name;
               const serie = item.fields.serie;
               const imgUrl = item.fields.image.fields.file.url;
               createBici(id, imgUrl, name,serie);
            })
    })
}

const bicicletasItems = document.querySelector('[data-bicicletas-items]');

export function createBici(id,imgUrl,nameBici,serie)
{
    const temp = document.querySelector('.bici-template');
    const biciClone = temp.content.cloneNode(true);
    const bici = biciClone.querySelector('.bici');
    const img = biciClone.querySelector('.bici__img');
    const name = biciClone.querySelector('.bici__name');

    bici.setAttribute('data-id',id);
    bici.setAttribute('data-serie',serie);
    img.src=imgUrl;
    name.textContent=nameBici;
    
    bicicletasItems.appendChild(biciClone)
}