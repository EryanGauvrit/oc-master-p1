import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public nbrJOs = 0;
  public nbrCountries = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
        console.log(olympics);
    });
  }
}
