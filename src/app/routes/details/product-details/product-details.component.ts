import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

interface Product {
  id: string;
  title: string;
  price: number;
  negotiable: boolean;
  brand: string;
  condition: string;
  authenticity: string;
  features: string[];
  description: string;
  images: string[];
  date: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'tap-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId!: string;
  product!: any;

  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    // Option 1: snapshot (for static routes)
    this.productId = this.route.snapshot.paramMap.get('id')!;
    console.log('Product ID (snapshot):', this.productId);
    this.loadProductDetails(this.productId);
  }

  loadProductDetails(id: string): void {
    this.service.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log('Product Details:', this.product);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });

  }
}
