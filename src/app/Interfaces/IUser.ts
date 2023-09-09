import { IChat } from "./IChat"
import { IChatData } from "./IChatData"

export interface IUser{
    id:string
    emial:string
    aboutMe:string
    birthDate:string
    emailConfirmed:boolean
    gender:string
    userName:string
    rating:number
    securityStamp:string
    phoneNumberConfirmed:boolean
    twoFactorEnabled:boolean
    phoneNumber:string
    chat?:IChatData
}