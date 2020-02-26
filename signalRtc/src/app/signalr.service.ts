import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Subject } from 'rxjs';
import { User } from 'src/models/user.interface';
import { Signal } from 'src/models/signal.interface';
import { apiEndpoint } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;

  private newPeer = new Subject<User>();
  public newPeer$ = this.newPeer.asObservable();

  private helloAnswer = new Subject<User>();
  public helloAnswer$ = this.helloAnswer.asObservable();

  private disconnectedPeer = new Subject<User>();
  public disconnectedPeer$ = this.disconnectedPeer.asObservable();

  private signal = new Subject<Signal>();
  public signal$ = this.signal.asObservable();

  constructor() { }
  
  public async startConnection(currentUser: string): Promise<void> {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiEndpoint}/signalrtc`)
      .build();

    await this.hubConnection.start();
    console.log('Connection started');

    this.hubConnection.on('NewUserArrived', (data) => {
      this.newPeer.next(JSON.parse(data));
    });

    this.hubConnection.on('UserSaidHello', (data) => {
      this.helloAnswer.next(JSON.parse(data));
    });

    this.hubConnection.on('UserDisconnect', (data) => {
      this.disconnectedPeer.next(JSON.parse(data));
    });

    this.hubConnection.on('SendSignal', (user, signal) => {
      this.signal.next({ user, signal });
    });

    this.hubConnection.invoke('NewUser', currentUser);
  }

  public sendSignalToUser(signal: string, user: string) {
    this.hubConnection.invoke('SendSignal', signal, user);
  }

}
