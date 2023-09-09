export class IFavourite{
    applicationUserId: string
    advertismentID: number

  constructor(applicationUserId:string,advertismentID: number){
    this.applicationUserId=applicationUserId,
    this.advertismentID=advertismentID
  }
}