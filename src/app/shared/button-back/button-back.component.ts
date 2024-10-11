import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-back',
  templateUrl: './button-back.component.html',
  styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent {
  constructor(private location: Location) {}

  public goBack() {
    this.location.back();
  }
}
