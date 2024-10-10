import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public nbrMedals: number[] = [];
    public countries: string[] = [];

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
            const olympicsSorted = olympics.sort((a, b) => {
                return this.getNbrMedals(b.participations) - this.getNbrMedals(a.participations);
            });
            olympicsSorted.forEach((olympic: Olympic) => {
                this.countries.push(olympic.country);
                this.nbrMedals.push(this.getNbrMedals(olympic.participations));
            });
        });
    }
    private getNbrMedals(participations: Participation[]) {
        let totalMedals = 0;
        participations.forEach((participation: Participation) => {
            totalMedals += participation.medalsCount;
        });
        return totalMedals;
    }
}

