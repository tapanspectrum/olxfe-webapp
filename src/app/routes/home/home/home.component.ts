import { Component } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/shared/components';


@Component({
  selector: 'tap-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private modelService: NgbModal) { }


  // openLoginModal() {
  //   const modalRef = this.modelService.open(LoginComponent, {
  //     backdrop: true,
  //     backdropClass: 'light-blue-backdrop',
  //     centered: true,
  //     size: 'md'
  //   });

  //   modalRef.result.then(
  //     (result) => {
  //       console.log('Closed with:', result);
  //     },
  //     (reason) => {
  //       console.log('Dismissed:', this.getDismissReason(reason));
  //     }
  //   );
  // }


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
