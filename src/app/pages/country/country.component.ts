import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ILoadDataByCountry } from 'src/app/core/models/LoadDataByCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
    public olympicByCountry?: ILoadDataByCountry;

    constructor(private router: Router, private olympicService: OlympicService, private activated: ActivatedRoute) {}

    ngOnInit(): void {
        this.activated.params.subscribe(async (params) => {
            if(!params['country']) {
                this.router.navigate(['/not-found']);
                return;
            }
            try {
                this.olympicByCountry = await firstValueFrom(this.olympicService.loadDataByCountry(params['country']));
                if(!this.olympicByCountry) {
                    this.router.navigate(['/not-found']);
                    return;
                }
                
            } catch (error) {
                this.router.navigate(['/not-found']);
            }
        });
    }

}
