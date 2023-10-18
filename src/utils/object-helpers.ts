export const updateObjectInArray = (items:any, itemId:any, objPropName:any, newObjProps:any) => {
   return  items.map( (u:any) => {
        if (u[objPropName] === itemId) {
            return {...u,...newObjProps}
        }
        return u;
    })
}
// type PropertyValueType = number // можно расширить. У нас пока userId:number
// type IndexableObjectType = {[item: string]:PropertyValueType}
// export function updateObjectInArray<O extends IndexableObjectType>(itemsArray:Array<O>, propValue:PropertyValueType, propName:string, newObjProps: any) {
//     return itemsArray.map((item) => {
//         return (item[propName] === propValue) ? { ...item, ...newObjProps } : item;
//     });
// }