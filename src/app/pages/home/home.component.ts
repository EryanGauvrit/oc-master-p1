import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
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

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
            const olympicsSorted = olympics.sort((a, b) => {
                return getNbrMedals(b.participations) - getNbrMedals(a.participations);
            });
            olympicsSorted.forEach((olympic: Olympic) => {
                this.countries.push(olympic.country);
                this.nbrMedals.push(getNbrMedals(olympic.participations));
                this.nbrOfJOs = this.getNbrOfJOs(olympics);
            });
        });
    }
    
    private getNbrOfJOs(olympics: Olympic[]): number {
        const listJo: number[] = [];
        olympics.forEach((olympic: Olympic) => {
            olympic.participations.forEach((participation) => {
                if (!listJo.includes(participation.year)) {
                    listJo.push(participation.year);
                }
            });
        })

        return listJo.length;
    }
}

