import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitcherService {

  public isSimplemode: boolean = true;

  constructor() { }

  public changeMode(type: boolean) {
    this.isSimplemode = type;
  }

}
