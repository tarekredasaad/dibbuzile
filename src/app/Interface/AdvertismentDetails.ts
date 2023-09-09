export interface IAdvertismentDetails{
 id: number,
 title: string,
  location: string,
  applicationUserName: string,
  applicationEmail:string,
  adType: string,
  isSaved:boolean,
  adStatus: string,
  date: Date,
  expirationDate: Date,
  expireDateOfPremium: Date,
  advertismentImagesList: IadvertismentImagesList[],
  advertisment_FiltrationValuesList: Iadvertisment_FiltrationValuesList[],
  advertisment_RentOptionList: Iadvertisment_RentOptionList[],
  reviewsList: IreviewsList[]
}

export interface IadvertismentImagesList{
    imageName:string
}
export interface Iadvertisment_FiltrationValuesList{
    key: string,
    value: string
}
export interface Iadvertisment_RentOptionList{
    cost:number
}
export interface IreviewsList{
    text :string,
    UserName:string
    userEmail:string
}