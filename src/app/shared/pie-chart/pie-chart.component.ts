import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveElement, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { IMedalsPerCountry } from 'src/app/core/models/MedalsPerCountry';
import { getAspectRatio } from 'src/app/core/util';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit {
    @Input() medalsByCountries!: IMedalsPerCountry[];

    constructor(private router: Router) {}

    private colors = ['#783D51', '#945F65', '#B8CCE7','#BFE0F1', '#9880A2', '#88A1DA']
    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: getAspectRatio(),
        layout: {
            padding: 20,
        },
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
    public pieChartData?: ChartData<'pie', number[], string | string[]>;
    public pieChartType: ChartType = 'pie';

    /**
     * @description custom plugin to add labels to the pie chart
     */
    public pieChartPlugins: ChartConfiguration['plugins'] = [{
        id: 'customLabels',
        
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const { top, left, right, bottom } = chart.chartArea;
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;
            const radius = (chart.getDatasetMeta(0).data[0] as any).outerRadius;
            const offset = 10;
            const maxArrowLength = 40;
            
            chart.data.labels?.forEach((label, index) => {
                const dataset = chart.data.datasets[0];
                const meta = chart.getDatasetMeta(0);
                const arc = meta.data[index] as any;
                const startAngle = arc.startAngle;
                const endAngle = arc.endAngle;
                const midAngle = (startAngle + endAngle) / 2;

                const x = centerX + Math.cos(midAngle) * radius;
                const y = centerY + Math.sin(midAngle) * radius;

                const isLeftSide = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2;
                let labelX = isLeftSide ? left - offset : right + offset;
                const labelY = y;

                const arrowLength = Math.min(maxArrowLength, Math.abs(labelX - x));

                if (isLeftSide) {
                    labelX = x - arrowLength;
                } else {
                    labelX = x + arrowLength;
                }
                
                ctx.strokeStyle = this.colors[index];
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(labelX - (isLeftSide ? 10 : -10), labelY);
                ctx.lineTo(labelX, labelY);
                ctx.stroke();

                ctx.fillStyle = this.colors[index];
                ctx.font = '12px Arial';
                ctx.textAlign = isLeftSide ? 'right' : 'left';
                ctx.textBaseline = 'middle';
                const textPadding = isLeftSide ? -15 : 15;

                ctx.fillText(`${label}`, labelX + textPadding, labelY);
                
            });
        }
    }]

    ngOnInit(): void {
        this.initChart();
    }
    
    /**
     * @description initialize the pie chart with the medals by countries
     */
    private initChart(): void {
        this.pieChartData = {
            labels: this.medalsByCountries.map(({country}) => country),
            datasets: [
                {
                    label: '🏅',
                    data: this.medalsByCountries.map(({medals}) => medals),
                    backgroundColor: this.colors,
                    borderWidth: 0,
                },
            ],
        };
    }

    /**
     * 
     * @param event 
     * @param active 
     * @returns void
     * @description navigate to the country page when a pie chart slice is clicked
     */
    public async chartClicked({ 
        event, 
        active
    }: {
        event?: ChartEvent;
        active?: object[];
    }): Promise<void> {

        if (active && active.length > 0) {
            const activeElement = active[0] as ActiveElement;
            const countryId = this.medalsByCountries[activeElement.index].id;
            await this.router.navigate(['/country', countryId]);
        }
    }

}
