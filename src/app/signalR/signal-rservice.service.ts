import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRserviceService {

  hubConnection!: HubConnection;

  constructor() { }

  startConnection= () => {
    this.hubConnection=new HubConnectionBuilder().withUrl('https://localhost:7042/hub', {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();

    this.hubConnection.start().then( ()=> {
      console.log("Hub started");
    }).catch(error=> console.log("---- Error: "+error.message));
}
}
