export interface ICategory
{
    id:number,
    name:string,
    subCategoriesList:ISubCategory[]
}

export interface ISubCategory
{
    id:number,
    name:string
}