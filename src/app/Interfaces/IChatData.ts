import { IRoom } from "./IRoom";
import { IUser } from "./IUser";

export interface IChatData{
    id?:number
    sender:IUser
    receiver:IUser
    content:string
    senderID:string
    receiverID:string
    room?:IRoom
    roomId:number
    file?:string
    date?:Date

}