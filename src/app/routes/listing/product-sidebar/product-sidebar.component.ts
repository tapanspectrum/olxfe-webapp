import { Options } from '@angular-slider/ngx-slider';
import { Component, Input } from '@angular/core';
interface SubCategory {
  name: string;
  link?: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
  subcategories: SubCategory[];
}

@Component({
  selector: 'tap-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.css']
})
export class ProductSidebarComponent {
  @Input() categories: Category[] = [];
  activeIndex: number | null = 0;
  rating: number = 3; // Default value

  // Slider values
   minValue: number = 550;
  maxValue: number = 550000;

  options: Options = {
    floor: 550,
    ceil: 550000,
    step: 50,
    translate: (value: number): string => {
      return '₹' + value.toLocaleString();
    }
  };

  // Price range
  priceRange = { from: 0, to: 10000 };

  // Top Deals
  topDeals = [
    { label: 'Flat 10% Off', value: 10 },
    { label: 'Flat 20% Off', value: 20 },
    { label: 'Flat 50% Off', value: 50 }
  ];
  selectedDeal = 10;

  // Ratings
  ratings = [
    { stars: 5, count: 25 },
    { stars: 4, count: 17 },
    { stars: 3, count: 12 },
    { stars: 2, count: 2 },
    { stars: 1, count: 5 },
  ];

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

}
