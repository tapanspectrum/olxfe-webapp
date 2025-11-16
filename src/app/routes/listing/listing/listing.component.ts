import { Component } from '@angular/core';
import { ListingService } from '../services/listing.service';

interface Product {
  id: number;
  title: string;
  category: string;
  location: string;
  price: number;
  date: string;
  image: string;
}

@Component({
  selector: 'tap-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  // Dropdown filter options
  sortOptions = ['Story by Acceding', 'Some option', 'Another option', 'Potato'];
  locationOptions = ['Location', 'Some option', 'Another option', 'Potato'];
  itemCountOptions = ['12 Items', 'Some option', 'Another option', 'Potato'];

  // Currently selected filters
  selectedSort = this.sortOptions[0];
  selectedLocation = this.locationOptions[0];
  selectedItemCount = this.itemCountOptions[0];

  pagedProducts: any[] = []; // Products visible for current page
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  isFavorited: boolean = false;


  // Tab view: grid or list
  viewMode: 'grid' | 'list' = 'grid';

  // Products array (this can be fetched from an API later)
  products: Product[] = [
    { id: 1, title: '8 GB DDR4 Ram, 4th Gen', category: 'Ram & Laptop', location: 'New York, USA', price: 299, date: '25 Jan, 2023', image: 'assets/images/ads-1.png' },
    { id: 2, title: 'HP Pavilion Laptop', category: 'Laptop', location: 'Los Angeles, USA', price: 450, date: '10 Feb, 2023', image: 'assets/images/ads-2.png' },
    { id: 3, title: 'Dell Inspiron 14"', category: 'Laptop', location: 'Chicago, USA', price: 520, date: '5 Mar, 2023', image: 'assets/images/ads-3.png' },
    { id: 4, title: '8 GB DDR4 Ram', category: 'Ram', location: 'New York, USA', price: 120, date: '1 Apr, 2023', image: 'assets/images/ads-4.png' },
    // ...add more
  ];
  // Categories for sidebar
  categoryList = [
    {
      id: '1',
      name: "Women's Clothing",
      count: 10,
      icon: 'assets/images/sidebar_icon/categories-1.svg',
      subcategories: [
        { name: 'Dresses' },
        { name: 'Tops' },
        { name: 'Jackets' },
      ]
    },
    {
      id: '2',
      name: "Men's Clothing",
      count: 87,
      icon: 'assets/images/sidebar_icon/categories-2.svg',
      subcategories: [
        { name: 'Shirts' },
        { name: 'Jeans' },
        { name: 'Suits' },
      ]
    },
    {
      id: '3',
      name: "Telecommunications",
      count: 25,
      icon: 'assets/images/sidebar_icon/categories-3.svg',
      subcategories: [
        { name: 'iPhones' },
        { name: 'Feature Phones' },
        { name: 'Accessories' },
      ]
    }
  ];

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    // this.updatePagination();
    this.listAds();
  }

  listAds(): void {
    const params = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      // Add other filter parameters as needed
    };

    this.listingService.getAdsList(params).subscribe(
      (response) => {
        console.log('Ads List:', response?.data?.items);
        this.totalPages = response?.data?.pages || 0;
        this.pagedProducts = response?.data?.items || [];

        // this.updatePagination();
        // Handle the response to update products and pagination
      },
      (error) => {
        console.error('Error fetching ads list:', error);
      }
    );
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedProducts = this.products.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    // this.setPage(page);
    this.listAds();
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
  }
}
