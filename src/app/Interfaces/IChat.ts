import { IUser } from "./IUser"

export interface IChat{
    id?:number
    AdvertismentId:number
    senderID:string
    receiverID:string
    content:string
    file?:File
    sold:boolean
    sender?:IUser
    date?:Date
    receiver?:IUser
}