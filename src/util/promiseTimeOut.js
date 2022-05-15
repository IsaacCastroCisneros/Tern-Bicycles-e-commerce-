export default function promiseTimeOut(time)
{
    return new Promise((res)=>
    {
        setTimeout(()=>
        {
           res();
        },time)
    })
 
}