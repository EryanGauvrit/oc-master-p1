import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IMedalsPerCountry } from 'src/app/core/models/MedalsPerCountry';
import { IOlympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { getNbrMedals } from 'src/app/core/util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
    public nbrOfJOs = signal<number>(0);
    public errorMessage =   signal<string | null>(null);
    public medalsByCountries=  signal<IMedalsPerCountry[]> ([]);
    private olympicService = inject(OlympicService)
    private destroy$ = new Subject<void>();

    constructor() {
        this.loadData();
    }

    loadData(): void {
        this.olympicService.getOlympics()
            .pipe((takeUntil(this.destroy$)))
            .subscribe(({data, error}: {data:IOlympic[], error?: unknown}) => {
                if(error) {
                    this.errorMessage.set('An error occurred while fetching the data');
                    return;
                }
                this.nbrOfJOs.set(this.getNbrOfJOs(data));
                data.sort((a, b) => {
                    return getNbrMedals(b.participations) - getNbrMedals(a.participations);
                }).forEach((olympic: IOlympic) => {
                    this.medalsByCountries.update((oldValue) => {
                        return [...oldValue, {
                            country: olympic.country,
                            medals: getNbrMedals(olympic.participations)
                        }];
                    });
                });
            })
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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

