import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Subject } from 'rxjs';
import { User } from 'src/models/user.interface';
import { Signal } from 'src/models/signal.interface';

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
  
}
