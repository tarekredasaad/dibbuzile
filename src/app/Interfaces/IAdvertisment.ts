export interface IIRFilterNode
{
  id:any,
  filtervalue:any
}
export class FilterValueKey implements IIRFilterNode
{
    id: any
    filtervalue: any
    constructor(id: number, filtervalue: String)
    {
            this.id = id;
            this.filtervalue = filtervalue;
    }
}
export interface IAdvertisment
{
    id?:number,
    title:string,
    categoryID:number,
    subCategoryID:number,
    adType:string,
    adStatus:string,
    location:string,
    date:string,
    expirationDate:string,
    expireDateOfPremium:string,
    isPremium:boolean,
    advertisment_FiltrationValuesList:IIRFilterNode[],
    advertismentImagesList:string[],
    advertisment_RentOptionsList:any[],
    isSaved: boolean,
    applicationUserId:string

}