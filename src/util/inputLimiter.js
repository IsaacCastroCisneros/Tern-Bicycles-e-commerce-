export default function inputLimiter(input)
{       
    if(input.value.length>2)
    {
      input.value=input.value.slice(0,2);
    }
}