import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { getNbrAthletes, getNbrMedals } from 'src/app/core/util';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
    public olympic?: Olympic;
    public medalsCount: number = 0;
    public athletesCount: number = 0;
    public lineChartData?: {
        years: string[],
        nbrMedals: number[] 
    }

    constructor(private router: Router, private olympicService: OlympicService, private activated: ActivatedRoute) {}

    ngOnInit(): void {
            this.activated.params.subscribe(async (params) => {
                if(!params['country']) {
                    this.router.navigate(['/not-found']);
                    return;
                }
                try {
                    this.olympic = await firstValueFrom(this.olympicService.loadDataByCountry(params['country']));
                    if(!this.olympic) {
                        this.router.navigate(['/not-found']);
                        return;
                    }
    
                    this.medalsCount = getNbrMedals(this.olympic.participations);
                    this.athletesCount = getNbrAthletes(this.olympic.participations);
                    this.lineChartData = this.getLineChartData(this.olympic.participations);
                    
                } catch (error) {
                    this.router.navigate(['/not-found']);
                }
            });
    }

    getLineChartData(participations: Participation[]) {
        const orderByDate = participations.sort((a, b) => a.year - b.year);
        const years = orderByDate.map(participation => participation.year.toString());
        const nbrMedals = orderByDate.map(participation => participation.medalsCount);
        return {
            years,
            nbrMedals
        }
    }

}
