import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ListingService } from 'src/app/routes/listing/services/listing.service';
import { LoginComponent } from 'src/app/shared/components';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'tap-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class TopbarComponent {
  isLogin: boolean = false;
  isAuth: boolean = false;
  dropdownData: any;
  treandingKeywords: any;
  selectedLocation: string = '';
  selectedCategory: string = '';
  selectedKeyword: string = '';

  constructor(private modelService: NgbModal, private services: ModalService, private service: ListingService) {
    this.service.getFilterDropDownData().subscribe((res) => {
      this.dropdownData = res;
    });

    this.service.getTrendingKeywords().subscribe((res) => {
      this.treandingKeywords = res;
    });
  }


  openLoginModal() {
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

  searchFilterData(location: string, category: string, keyword: string) {
    const params: any = {};
    if (location) {
      params.location = location;
    }
    if (category) {
      params.category = category;
    }
    if (keyword) {
      params.keyword = keyword;
    }
    const parmdata = { title: `${keyword}-${Date.now()}`, location, category, keyword };
    console.log('Search Parameters:', parmdata);
    this.service.createTrendingKeywords(parmdata).subscribe((res) => {
      console.log('Trending Keyword Created:', res);
    });
    console.log('Search Params:', params);
    this.service.filterAds(params).subscribe((res) => {
      console.log('Filtered Ads List:', res);
      // Handle the response as needed
    });
  }

}
