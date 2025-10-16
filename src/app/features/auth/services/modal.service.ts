import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ModalState {
  isOpen: boolean;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private loginModalSubject = new Subject<ModalState>();

  loginModal$ = this.loginModalSubject.asObservable();

  constructor() { }

  /** Abre el modal */
  open(): void {
    this.loginModalSubject.next({ isOpen: true });
  }

  close(data?: any): void {
    this.loginModalSubject.next({ isOpen: false, data });
  }
}
