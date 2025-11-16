import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Category {
  icon: string;
  title: string;
  slug: string; // for routing
}

@Component({
  selector: 'tap-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private router: Router) { }


  ngOnInit(): void {
   this.categories = [
      { icon: 'fal fa-camera', title: 'DSLR Camera', slug: 'dslr-camera' },
      { icon: 'fal fa-mobile', title: 'Cell Phone', slug: 'cell-phone' },
      { icon: 'fal fa-laptop', title: 'Laptop', slug: 'laptop' },
      { icon: 'fal fa-headphones-alt', title: 'Headphones', slug: 'headphones' },
      { icon: 'fal fa-ring', title: 'Jewelry', slug: 'jewelry' },
      { icon: 'fal fa-backpack', title: 'Backpacks', slug: 'backpacks' },
      { icon: 'fal fa-bicycle', title: 'Vehicles', slug: 'vehicles' },
      { icon: 'fal fa-door-open', title: 'Furniture', slug: 'furniture' },
      { icon: 'fal fa-gamepad', title: 'Gadgets', slug: 'gadgets' },
      { icon: 'fal fa-watch', title: 'Watches', slug: 'watches' },
    ];
  }

  goToCategory(cat: Category) {
    console.log('Navigating to category:', cat);
    this.router.navigate(['/product/listing']);
  }
}
