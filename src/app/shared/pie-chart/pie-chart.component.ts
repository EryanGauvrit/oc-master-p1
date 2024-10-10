import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input() countries!: string[];
  @Input() nbrMedals!: number[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    onClick: this.chartClicked,
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

  constructor() {}

  ngOnInit(): void {
    console.log(this.countries, this.nbrMedals);
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
  public chartClicked(
    event: ChartEvent,
    elements: ActiveElement[],
    chart: Chart
  ): void {
    console.log(event);
    console.log(elements);
    console.log(chart);
  }

}
