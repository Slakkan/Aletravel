import { Component, OnInit } from '@angular/core';
import { Hotel } from '../shared/models/hotel.model';
import { HotelService } from '../shared/services/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  constructor(private hotelsService: HotelService) { }

  ngOnInit(): void {
    const storedData = localStorage.getItem('New York');
    if (storedData) {
      this.hotels = JSON.parse(storedData);
    } else {
      this.hotelsService.getHotels('New York').subscribe(res => {
        this.hotels = res;
        localStorage.setItem('New York', JSON.stringify(res));
      });
    }
  }

}
