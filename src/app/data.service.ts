import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DataList} from './data-list';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private inputDataArray: DataList[] = [];
  private dataInputArray = new BehaviorSubject(this.inputDataArray);
  currentdataInputArray = this.dataInputArray.asObservable();

  changeInputArray(input: DataList[]) {
    this.dataInputArray.next(input);
  }
}
