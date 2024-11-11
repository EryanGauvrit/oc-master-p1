import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ILoadDataByCountry } from '../models/LoadDataByCountry';
import { IMedalsPerCountry } from '../models/MedalsPerCountry';
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
     * @returns Subscription
     * @description load the initial data and manage the error
     */
    loadInitialData() {
        return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
            tap((value) => this.olympics$.next({data: value})),
            catchError((error) => {
                console.error(error);
                this.olympics$.next({data:[], error});
                return [];
            })
        ).subscribe();
    }

    /**
     * @param country 
     * @returns Observable<ILoadDataByCountry>
     * @description get the olympic data by country
     */
    loadDataByCountry(id: number): Observable<ILoadDataByCountry> {
        return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
            map((value) => {
                const olympic = value.find((olympic) => olympic.id === id);
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
     * @returns Observable<{data:{medalsPerCountry: IMedalsPerCountry[], nbrOfJOs: number}, error?: unknown}>
     * @description get the olympics data
     */
    getOlympics(): Observable<{ data:{ medalsPerCountry: IMedalsPerCountry[], nbrOfJOs: number }, error?: unknown}> {
        return this.olympics$.asObservable().pipe( 
            map(({data, error}) => {
                if(error) throw error;
                return {
                    data: {
                        medalsPerCountry: data.sort((a, b) => getNbrMedals(b.participations) - getNbrMedals(a.participations)).map((olympic) => {
                            return {
                                id: olympic.id,
                                country: olympic.country,
                                medals: getNbrMedals(olympic.participations)
                            };
                        }),
                        nbrOfJOs: this.getNbrOfJOs(data)
                    }
                }
            })
        );
    }

    /**
     * @param olympics
     * @returns number
     * @description get the number of JOs
     */
    private getNbrOfJOs(olympics: IOlympic[]): number {
        const listJo = new Set<number>();
        olympics.forEach((olympic: IOlympic) => {
            olympic.participations.forEach((participation) => {
                listJo.add(participation.year);
            });
        })

        return listJo.size;
    }
}
