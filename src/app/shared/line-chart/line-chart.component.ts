import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit {
    @Input() years!: string[];
    @Input() nbrMedals!: number[];
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    constructor(private router: Router) {}

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
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
    public lineChartData: ChartData<'line', number[], string | string[]> = {
        labels: this.years,
        datasets: [
            {
                data: this.nbrMedals,
            },
        ],
    };
    public lineChartType: ChartType = 'line';



    ngOnInit(): void {
        this.lineChartData = {
        labels: this.years,
        datasets: [
            {
                label: '🏅',
                data: this.nbrMedals,
            },
        ],
        };
        this.chart?.update();
    }

}
