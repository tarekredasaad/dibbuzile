import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { ChatService } from 'src/app/Services/chat.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IChat } from 'src/app/Interfaces/IChat';
import { IChatData } from 'src/app/Interfaces/IChatData';
import * as signalR from '@aspnet/signalr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IAdvertismentDetails } from 'src/app/Interface/AdvertismentDetails';
import { AdvertismentService } from 'src/admin/Services/advertisment.service';
import { AdvertismentServiceService } from 'src/app/Services/advertisment-service.service';
import { getDataDetail } from '@microsoft/signalr/dist/esm/Utils';
import { IRoom } from 'src/app/Interfaces/IRoom';
import { IUserChat } from 'src/app/Interface/IUserChat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent  implements OnInit  {

  currentPage = 1; 
  itemsPerPage = 5;
  
  usersChat:IUserChat[]=[]
  users:any[]=[]
  myForm= this.fb.group({
    content: ['', [Validators.required,
      Validators.minLength(3)
      ]],
      file:[],
    
  }) ;
  AdvertismentDetails!:IAdvertismentDetails
  tempData:any[]=[]
  file!: File
  chat:IChat={
    // id:0,
    AdvertismentId:5,
    senderID:"",
    receiverID: "",
    content:"",
    sold:false,
    file:this.file
  }
  room!:IRoom
  CurrentUserId:any = "2946b9f6-35f7-4e2f-8c2a-7a0ab10885db"
  chatData!:IChatData[]
  LastchatData!:IChatData
  AllLastchatData:any[]=[]
  errorMessage:any
  hubConnectionBuilder: any;
  hubconnection!: signalR.HubConnection;
  newChat!: any;
  dateNewchat:any
  UserTemp:any
  DataTemp!:any
  SignalChat!:any
  img!:any
  Id!:any
  DateDay!:Date
  top:number = 5;
  AdvertismentId:any
  userId:any
  lastChat:any
  loginId:any = localStorage.getItem('ApplicationUserId')
  // fb: any;
  constructor(private chatService:ChatService
    ,private activatRoute:ActivatedRoute
    ,private AdvertismentService:AdvertismentServiceService
    ,private fb: FormBuilder){
    this.loginId = localStorage.getItem('ApplicationUserId')
    this.chat.senderID=this.loginId
    this.chat.receiverID= ""
    }
  ngOnInit(): void {
    this.activatRoute.paramMap.subscribe((params:ParamMap)=>{
    this.AdvertismentId= params.get('adId');
    this.userId=params.get('UserID')
    });
    
    
    let date = new Date()
    console.log(date.toLocaleDateString())
    this.DateDay = date 
    console.log(this.DateDay.toLocaleDateString())
    this.Users()
    this.createForm()
    this.top=5
    this.CurrentUserId = this.userId
    this.chat.senderID=this.loginId
    this.chat.AdvertismentId=this.AdvertismentId
    this.StartHubConnection()
    this.openHubToListenAnychat()
    this.openHubToListenRemovechat()
    console.log(this.loginId)
    console.log(this.chat.AdvertismentId)
    var loginId = localStorage.getItem('ApplicationUserId')
    this.getAdvertisment()
  }

  onSelectFile(fileInput: any) {
    this.file = fileInput.target.files[0]
    this.chat.file = fileInput.target.files[0];
    console.log(this.file)
    console.log(this.chat.file)
    
  }

  createForm() {
    this.myForm = this.fb.group({
      content: ['', [Validators.required,
        Validators.minLength(3)
        ,Validators.maxLength(15)]],
        file:[],
      
    });
  }
  GetUser(id:any){
    this.chatData = []
    this.chatService.skip=0;
    this.chat.receiverID=id
    console.log(this.chat)
    this.GetMessage()

  }
  getAdvertisment(){
    this.AdvertismentService.getDetails(this.AdvertismentId,this.userId).subscribe({
      next:data=>this.AdvertismentDetails=data,//this.users=data ,//.push(data[0],data[1])
      error:error=>this.errorMessage=error
    })
   
  }
 async Users(){
    console.log(this.userId)
    await this.chatService.GetUsers(this.userId,this.loginId,this.AdvertismentId).subscribe({
      next:data=>{this.UserTemp= data
  
    let values = Object.values(this.UserTemp)
    console.log('users here')
    console.log(values[0])
    this.chat.receiverID= this.UserTemp[0].id
    console.log(values)
    for (let index = 0; index < values.length; index++) {
      
      const element = values[index];
      console.log(this.UserTemp[index].id)
      this.GetLastMessage(this.UserTemp[index].id,this.loginId)
      // this.UserTemp.push(  this.GetLastMessage(this.loginId,this.UserTemp[index].id))
      console.log(this.UserTemp)
    
        // if(type( element) == Array)
        console.log( values[index])
        console.log(element)
        // this.AllLastchatData.push(this.LastchatData)
        // this.users[index]. = element
        this.users.push(element)
        console.log(this.LastchatData)
      }
      console.log(this.users)
      console.log(this.AllLastchatData)
     },
      error:error=>this.errorMessage=error
    })
  }

  StartHubConnection(){
    this.hubconnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:7189/ChatHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }).configureLogging(signalR.LogLevel.Debug).build();

      setTimeout( () => {

        
        this.hubconnection.start().then(() => {
          console.log("connection started");
        }).catch(err => console.log(err));
      },2000);
  }
  get totalPages() {
    return Math.ceil(this.chatData.length / 7);
     // Change 10 to the number of items per page
  }

  get pages() {
    const pageCount = Math.ceil(this.chatData.length / 7); 
    // Change 10 to the number of items per page
    return Array(pageCount).fill(0).map((_, i) => i + 1);
  }

  

  getChatDataForPage() {
    const startIndex = 0;//(this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.chatData.slice(startIndex, endIndex);
  }
 

  openHubToListenAnychat(){
    console.log("try to liesten")
    this.hubconnection.on('NewMessageNotify', (message,image,date) => {
      console.log(message);
      console.log(image);
      this.img = image
      this.newChat = message
      this.dateNewchat = date.slice(11,16)
    })
    console.log(this.newChat)
    console.log("this.newChat")
  }
  openHubToListenRemovechat(){
    console.log("try to liesten for removing ")
    this.hubconnection.on('ChatDeleteNotify', (hide,id) => {
      console.log(hide);
      console.log(id);
      console.log(this.Id);
      this.Id=id
      console.log(this.Id);
      setTimeout(()=>{

        var item = document.getElementById(id)
        console.log(item)
        item?.classList.add(`${hide}`)
      },2000)
    })
  }
  delete(id:any){
    console.log("delete")
    console.log(id)
    this.Id = id

    this.chatService.delete(id).subscribe({
      next:data=>console.log(data) ,//.push(data[0],data[1])
     error:error=>this.errorMessage=error
    })
    var ID = id.toString()
    setTimeout(  ()=>{
      
      // let Price = String(this.inputPrice);
      // let Quantity = String(this.objDto.quantity);
     

      this.hubconnection
    .invoke('ChatDelete',ID)
      console.log(ID)
      console.log("after invoke con here")
      const self = this;

    },1000)

  }

  onSubmit(){
    console.log(this.chat.content)
    var formData = new FormData()
    formData.append("AdvertismentId", this.chat.AdvertismentId.toString())
    formData.append("senderID", this.chat.senderID)
    formData.append("receiverID", this.chat.receiverID)
    formData.append("content", this.chat.content)
    formData.append("sold", "false")
    
    if (this.chat.file != null) {
      formData.append("image", this.chat.file, this.chat.file.name)
      console.log(this.chat.file)
    }

    console.log(formData)
    console.log(formData.get("AdvertismentId"))
    console.log(formData.get("receiverID"))
    console.log(formData.get("image"))
    console.log(this.chat)
    this.chatService.AddMessage(formData).subscribe({
       next:data=>{this.DataTemp=data
        this.SignalChat = this.DataTemp.result
      console.log(this.SignalChat)
      console.log(this.SignalChat.reciverID)
    } ,//.push(data[0],data[1])
      error:error=>this.errorMessage=error
    })
    // setTimeout(  ()=>{
      
      
      this.hubconnection
    .invoke('NewChatHub',this.chat.content,this.file?.name)
      console.log(this.chat)
      console.log("after invoke con here")
      const self = this;

    // },1000)
  }
  async GetMessage(){
       this.chatService.getChat(this.chat.senderID, this.chat.receiverID,this.AdvertismentId).subscribe({
      next: data =>{ this.tempData = data
        this.chatService.skip+=5;
        // this.chatService.top+=5
        console.log(this.tempData)
        console.log("All Keys");
        console.log(Object.keys(this.tempData))
        console.log("All Values");
        let values =Object.values(this.tempData)
        console.log("result arrays")
        console.log(values[0])
        for (let index = 0; index < values[0].length; index++) {
          const element =  values[0][index];
          console.log(element)
          console.log( element.date.slice(11,16))
          console.log(element.room.sold)
          this.room = element.room
          element.date = element.date.slice(11,16)
          this.chatData.push(element)
        }
        
      },
        error: error => this.errorMessage = error
      })
        console.log(this.errorMessage)
  }
   GetLastMessage(login :any,userId:any){
    
    console.log(login)
    console.log(userId)
        this.chatService.getLastChat(userId , login).subscribe({
        next:data=>{this.DataTemp=data
         
            // this.chatService.skip+=5;
            this.DataTemp.result.date.slice(11,16)
            console.log(this.DataTemp.result.date.slice(11,16))
            this.LastchatData =  this.DataTemp.result
            this.LastchatData.date =  this.DataTemp.result.date.slice(11,16)
            console.log(this.LastchatData)
            
              const element =  this.LastchatData;
              
              console.log(element)
             
              this.AllLastchatData.push(element)
              console.log(this.AllLastchatData)
           
              
            },
        error:error=>this.errorMessage=error
    })
   
    console.log(this.errorMessage)
  }
  DeleteRoom(id:any){
    this.chatService.deleteRoom(id).subscribe({
      next:data=>console.log(data) ,//.push(data[0],data[1])
     error:error=>this.errorMessage=error
    })

    setTimeout(()=>{
      this.GetMessage()
      this.users = []
      this.Users()

    },3000)
  }
}


function value(v: any, string: any) {
  throw new Error('Function not implemented.');
}

