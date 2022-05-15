export default function parseRequestUrl()
{
    const biciId = sessionStorage.getItem('actualBici');
    document.location.hash=JSON.parse(biciId);

    const urlHash = document.location.hash;
    const urlArr= urlHash.split('');
    urlArr.shift();
    const url = urlArr.join('')
    return url
}