export interface IGetAllFavorite{
    advertismentHomePageDTOs:IadvertismentHomePageDTOs []
       
}

export interface IadvertismentHomePageDTOs{
    id: number,
    title: string,
    adType: string,
    adStatus: string,
    location: string,
    isSaved: boolean,
    date: Date,
    advertismentImagesList: IAdvertismentImages[],
    advertisment_RentOptionList: IAdvertismentRent[]
}
export interface IAdvertismentImages{
    imageName:string
}
export interface IAdvertismentRent{
    cost: number
}