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

  constructor() {}

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
  public chartClicked(
    event: ChartEvent,
    elements: ActiveElement[],
    chart: Chart
  ): void {

    const index = elements[0].index // index of the clicked element
    const labels = chart.data.labels;
    if(!labels || !labels[index]) return;
    const chartDetail = labels[index] // get the label of the clicked element
    console.log(chartDetail);
  }

}
