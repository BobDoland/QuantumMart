import { Component, OnInit } from '@angular/core';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { ItemListingComponent } from '../item-listings/item-listing/item-listing';

@Component({
  selector: 'app-home',
  imports: [ItemListingComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  listings: ItemListing[] = [];

  constructor(private itemService: ItemListingService) {}

  ngOnInit(): void {
    this.itemService.getAllListings().subscribe({
      next: listings => this.listings = listings
    });
  }
}
