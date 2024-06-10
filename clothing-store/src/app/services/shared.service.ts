import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() public pageComponentDestroyed: EventEmitter<any> = new EventEmitter();
  @Output() public searchChanged: EventEmitter<any> = new EventEmitter();
  @Output() public alertMsg: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
