import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  loadDataByCountry(country: string) {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      map((value) => {
        const olympic = value.find((olympic) => olympic.country.toLowerCase() === country.toLowerCase().replace(/-/g, ' '));
        if(!olympic) throw new Error('Country not found');
        
        return olympic
      }),
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

}
