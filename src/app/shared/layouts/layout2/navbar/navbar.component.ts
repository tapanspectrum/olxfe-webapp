import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'tap-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin: boolean = false;
  isAuth: boolean = false;
  constructor(private modelService: NgbModal, private services: ModalService) { }


  openLoginModal() {
    // this.modelService.open(LoginComponent, {
    //   container: 'body',
    //   backdropClass: 'light-blue-backdrop',
    //   centered: true
    // });
    this.services.openLogin();
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
