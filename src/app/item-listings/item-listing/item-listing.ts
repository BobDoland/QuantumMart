import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ItemListingService } from '../item-listing.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-item-listing',
  imports: [MatCardModule],
  templateUrl: './item-listing.html',
  styleUrl: './item-listing.scss',
})
export class ItemListingComponent implements OnInit {

  @Input({ required: true, alias:"id" }) listingId!: string;

  title!: string;
  description: string = "";
  price!: number;
  imageUrl?: string;
  createdAt!: string;
  updatedAt!: string;

  sellerImgUrl?: string;
  sellerUsername!: string;

  loaded = false;

  constructor(
    private itemListingService: ItemListingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Load listing information
    this.itemListingService.getListingById(this.listingId).subscribe({
      next: listing => {
        // Load seller information
        this.userService.getUserById(listing.sellerId).subscribe({
          next: user => {
            if (user != null) {
              this.title = listing.title;
              this.description = listing.description;
              this.createdAt = listing.createdAt;
              this.updatedAt = listing.updatedAt;
              this.price = listing.price;
              this.imageUrl = listing.imageUrl;

              this.sellerImgUrl = "" // TODO
              this.sellerUsername = user.username;

              this.loaded = true;
            }
          }
        });
      }
    });
  }
}
