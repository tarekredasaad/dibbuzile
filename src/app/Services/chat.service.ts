import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../Interfaces/IUser';
import { IChatData } from '../Interfaces/IChatData';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api:string = "http://tariqreda308-001-site1.etempurl.com/api/"

  public top = 5;
  public skip = 0;
  private apiUrlUsers = `${this.api}User?id=`
  private apiUrl = `${this.api}Chat/GetChatUsers?id=`
  private apiUrl3 = `${this.api}Chat/GetMessages?`
  private apiUrl4 = `${this.api}Chat/GetLastMessages?`
  private apiUrl2 = `${this.api}Chat/AddMessage`
  private apiUrldelete = `${this.api}Chat`
  private apiUrldeleteRoom = `${this.api}Chat/DeleteMessagesRoom`
  constructor(private http:HttpClient) { }

  GetUsers(id:any,loginId:any,AdvID:number):Observable<IUser[]>{
    console.log('reach')
    console.log(`${this.apiUrl}${id}&loginId=${loginId}`)

    return this.http.get<IUser[]>(`${this.apiUrl}${id}&loginId=${loginId}&Advertisment=${AdvID}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }

  AddMessage(data:any):Observable<IChatData>{
    return this.http.post<IChatData>(this.apiUrl2,data).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }
  getChat(sender:any,receiver:any,AdvID:number){
    console.log(this.top)
    console.log(this.skip)
    console.log(`${this.apiUrl3+'sender='}${sender}&reciver=${receiver}&Advertisment=${AdvID}&top=${this.top}&skip=${this.skip}`)
    return  this.http.get<any>(`${this.apiUrl3+'sender='}${sender}&reciver=${receiver}&Advertisment=${AdvID}&top=${this.top}&skip=${this.skip}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }
  getLastChat(sender:any,receiver:any){

    return  this.http.get<any>(`${this.apiUrl4+'sender='}${sender}&reciver=${receiver}`).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }
  delete(id:any){
    return this.http.put(`${this.apiUrldelete}?id=${id}`,id).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }
  deleteRoom(id:any){
    return this.http.put(`${this.apiUrldeleteRoom}?id=${id}`,id).pipe(catchError((err: any) => {
      return throwError(() => err.message || "server error");
      }));
  }

}
