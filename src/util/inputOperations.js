export default function inputOperations(element,e)
{
    const operation = e.target.dataset.operation;
    if(operation==='suma' && element.value<99)
    {
        element.value++;
    }
    if(operation==='resta' && element.value<99 && element.value>1)
    {
        element.value--;
    }
}