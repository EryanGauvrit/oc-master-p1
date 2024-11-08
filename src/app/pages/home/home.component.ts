import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IMedalsPerCountry } from 'src/app/core/models/MedalsPerCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';

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
    private unsubscribe$ = new Subject<void>();

    constructor() {
        this.loadData();
    }

    /**
     * @description get the olympic data: number of JOs and medals by countries
     */
    loadData(): void {
        this.olympicService.getOlympics()
            .pipe((takeUntil(this.unsubscribe$)))
            .subscribe({
                next: (olympics) => {
                    this.nbrOfJOs.set(olympics.data.nbrOfJOs);
                    this.medalsByCountries.set(olympics.data.medalsPerCountry);
                },
                error: (error) => {
                    this.errorMessage.set('An error occurred while loading the data');
                }
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    
}

