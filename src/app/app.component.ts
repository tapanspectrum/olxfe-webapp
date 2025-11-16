import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$!: Observable<boolean>;
  title = 'Lazy loading feature modules';
  constructor(private loaderservice: LoaderService) {
    this.loading$ = this.loaderservice.status.asObservable();
  }
  ngOnInit() {
    this.shworhideloader();
  }

  shworhideloader() {
    this.loaderservice.show();
    setTimeout(() => {
      this.loaderservice.hide();
    }, 3000);
  }
}
