import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IMedalsPerYear } from 'src/app/core/models/MedalsPerYear';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit {
    @Input() medalsPerYear!: IMedalsPerYear[];
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
    public lineChartData?: ChartData<'line', number[], string | string[]>;
    public lineChartType: ChartType = 'line';



    ngOnInit(): void {
        this.lineChartData = {
        labels: this.medalsPerYear.map(medal => medal.year.toString()),
        datasets: [
            {
                label: '🏅',
                data: this.medalsPerYear.map(medal => medal.nbrMedals),
            },
        ],
        };
        this.chart?.update();
    }

}
