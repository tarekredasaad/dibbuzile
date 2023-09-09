import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubconnection!: signalR.HubConnection;
  constructor() { }

  StartHubConnection(){
    this.hubconnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl+'ChatHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }).configureLogging(signalR.LogLevel.Debug).build();

      setTimeout(async () => {


        this.hubconnection.start().then(() => {
          console.log("connection started");
        }).catch(err => console.log(err));
      }, 1000);
  }
}
