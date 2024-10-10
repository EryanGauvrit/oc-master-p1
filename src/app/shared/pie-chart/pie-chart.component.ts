import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveElement, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { formatSlug } from 'src/app/core/util';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit {
    @Input() countries!: string[];
    @Input() nbrMedals!: number[];
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    constructor(private router: Router) {}

    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        onHover: (event, activeElements) => {
            // add class cursor-pointer to the canvas element
            const element = event.native?.target as HTMLElement;
            if (activeElements.length) {
                element.classList.add('cursor-pointer');
            } else {
                element.classList.remove('cursor-pointer');
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'left',
                align: 'center',
                labels: {
                    font: {size: 13, weight: 'lighter'},
                },       
                    onClick: (e, legendItem, legend) => {
                }
            },
            tooltip: {
                backgroundColor: "#07818C",
                titleAlign: 'center',
                titleFont: {size: 16, weight: 'lighter'},
                bodyFont: {size: 14, weight: 'lighter'},
                bodyAlign: 'center', 
                displayColors: false,
            },
        },
    };
    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: this.countries,
        datasets: [
            {
                label: '🏅',
                data: this.nbrMedals,
            },
        ],
    };
    public pieChartType: ChartType = 'pie';



    ngOnInit(): void {
        this.pieChartData = {
        labels: this.countries,
        datasets: [
            {
                label: '🏅',
                data: this.nbrMedals,
            },
        ],
        };
        this.chart?.update();
    }

    // events
    public async chartClicked({ 
        event, 
        active
    }: {
        event?: ChartEvent;
        active?: object[];
    }): Promise<void> {

        if (active && active.length > 0) {
            const activeElement = active[0] as ActiveElement;
            const country = this.countries[activeElement.index];
            const slug = formatSlug(country);
            await this.router.navigate(['', slug]);
        }
    }

}
