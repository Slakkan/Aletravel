import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debug } from 'console';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Entity, Hotel, ImagesResponse, SuggestionGroup, SuggestionsResposne as SuggestionsResponse } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  httpOptions = {
    headers: {
      "x-rapidapi-key": environment.rapidApikey,
      "x-rapidapi-host": environment.rapidApiHost
    }
  };


  constructor(private http: HttpClient) { }

  getHotels(query: string): Observable<Hotel[]> {
    const transformedQuery = query.replace(' ', '%20');
    const url = `https:hotels-com-free.p.rapidapi.com/suggest/v1.7/json?query=${transformedQuery}&locale=en_US`;

    const observable = this.http.get<SuggestionsResponse>(url, this.httpOptions).pipe(
      map(res => res.suggestions.filter(suggestion => suggestion.group === 'HOTEL_GROUP')[0].entities),
      switchMap(entities => {
        const completeInfo = entities.map(entity => {
          const url = `https://hotels-com-free.p.rapidapi.com/nice/image-catalog/v2/hotels/${entity.destinationId}`;
          const images = this.http.get<ImagesResponse>(url, this.httpOptions).pipe(
            map(images => ({ entity, images }))
          );
          return images;
        });
        return forkJoin(completeInfo);
      }),
      map(completeInfo => {
        const mappedInfo: Hotel[] = completeInfo.map(info => {
          const img = info.images.hotelImages[0].baseUrl.replace('{size}', 'b');
          return {
            name: info.entity.name,
            lat: info.entity.latitude,
            lng: info.entity.longitude,
            img
          };
        });
        return mappedInfo;
      })
    );

    return observable;
  }
}
