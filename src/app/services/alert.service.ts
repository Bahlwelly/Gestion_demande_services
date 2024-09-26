import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{title : string,message : string, type : string, visible : boolean}>({
    title : '',
    message : '',
    type : '',
    visible : false
  });

  alert$ = this.alertSubject.asObservable();

  showAlert (title : string, message : string, type : 'success' | 'error' | 'info') {
    this.alertSubject.next({
      title,
      message, 
      type,
      visible : true
    });
  }

  hideAlert() {
    this.alertSubject.next({
      title : '',
      message : '',
      type : 'info',
      visible : false
    });
  }
  constructor() { }
}
