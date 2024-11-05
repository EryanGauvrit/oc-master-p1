import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ILoadDataByCountry } from '../models/LoadDataByCountry';
import { IOlympic } from '../models/Olympic';
import { getNbrAthletes, getNbrMedals } from '../util';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<{data:IOlympic[], error?: unknown}>({data:[]});

  constructor(private http: HttpClient) {}

  /**
   * 
   * @returns Subscription
   * @description load the initial data and manage the error
   */
  loadInitialData() {
    return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next({data: value})),
      catchError((error) => {
      console.error(error);
      this.olympics$.next({data:[], error});
      // Return an observable that completes without emitting any items
      return [];
      })
    ).subscribe();
  }

  /**
   * 
   * @param country 
   * @returns Observable<ILoadDataByCountry>
   * @description get the olympic data by country
   */
  loadDataByCountry(country: string): Observable<ILoadDataByCountry> {
    return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      map((value) => {
        const olympic = value.find((olympic) => olympic.country.toLowerCase() === country.toLowerCase().replace(/-/g, ' '));
        if(!olympic) throw new Error('Country not found');
        
        return {
          country: olympic.country,
          participationCount: olympic.participations.length,
          medalsCount: getNbrMedals(olympic.participations),
          athletesCount: getNbrAthletes(olympic.participations),
          lineChartData: olympic.participations.map((participation) => {
            return {
              year: participation.year.toString(),
              nbrMedals: participation.medalsCount,
            };
          }).sort((a, b) => a.year.localeCompare(b.year))
        }
      }),
    );
  }

  /**
   * 
   * @returns Observable<{data:IOlympic[], error?: unknown}>
   * @description get the olympics data
   */
  getOlympics() {
    return this.olympics$.asObservable();
  }

}
