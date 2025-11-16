import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tap-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() item: any;
  @Output() viewImage = new EventEmitter<string>();

  onView(): void {
    this.viewImage.emit(this.item?.images[0]);
  }

}
