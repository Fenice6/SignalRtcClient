import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Instance } from 'simple-peer';
import { PeerData } from 'src/models/peerData.interface';
import { User } from 'src/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RtcService {

  private users: BehaviorSubject<Array<User>>;
  public users$: Observable<Array<User>>;

  private onSignalToSend = new Subject<PeerData>();
  public onSignalToSend$ = this.onSignalToSend.asObservable();

  private onStream = new Subject<PeerData>();
  public onStream$ = this.onStream.asObservable();

  private onConnect = new Subject<PeerData>();
  public onConnect$ = this.onConnect.asObservable();

  private onData = new Subject<PeerData>();
  public onData$ = this.onData.asObservable();

  public currentPeer: Instance;

  constructor() { 
    this.users = new BehaviorSubject([]);
    this.users$ = this.users.asObservable();
  }

  public newUser(user: User): void {
    this.users.next([...this.users.getValue(), user]);
  }
  

}
