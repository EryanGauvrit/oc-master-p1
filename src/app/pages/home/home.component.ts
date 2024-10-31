import { Component, OnInit } from '@angular/core';
import { IOlympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { getNbrMedals } from 'src/app/core/util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public nbrMedals: number[] = [];
    public countries: string[] = [];
    public nbrOfJOs: number = 0;
    public errorMessage?: string

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympicService.getOlympics().subscribe(({data, error}: {data:IOlympic[], error?: unknown}) => {
            if(error) {
                this.errorMessage = 'An error occurred while fetching the data';
                return;
            }
            const olympicsSorted = data.sort((a, b) => {
                return getNbrMedals(b.participations) - getNbrMedals(a.participations);
            });
            olympicsSorted.forEach((olympic: IOlympic) => {
                this.countries.push(olympic.country);
                this.nbrMedals.push(getNbrMedals(olympic.participations));
                this.nbrOfJOs = this.getNbrOfJOs(data);
            });
        })
    }
    
    private getNbrOfJOs(olympics: IOlympic[]): number {
        const listJo: number[] = [];
        olympics.forEach((olympic: IOlympic) => {
            olympic.participations.forEach((participation) => {
                if (!listJo.includes(participation.year)) {
                    listJo.push(participation.year);
                }
            });
        })

        return listJo.length;
    }
}

