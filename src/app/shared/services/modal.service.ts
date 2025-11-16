import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../components';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: NgbModal) {}

  openLogin(options?: NgbModalOptions) {
    return this.modal.open(LoginComponent, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      ...options
    });
  }

  openComponent(component: any, data?: any, options?: NgbModalOptions) {
    const modalRef = this.modal.open(component, {
      centered: true,
      backdrop: true,
      ...options
    });

    if (data) {
      Object.assign(modalRef.componentInstance, data);
    }

    return modalRef;
  }
}
