import { IMedalsPerYear } from "./MedalsPerYear";

export interface ILoadDataByCountry {
    country: string;
    medalsCount: number;
    athletesCount: number;
    participationCount: number;
    lineChartData: IMedalsPerYear[]
}