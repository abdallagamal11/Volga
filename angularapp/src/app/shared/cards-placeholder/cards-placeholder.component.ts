import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-placeholder',
  templateUrl: './cards-placeholder.component.html',
  styleUrls: ['./cards-placeholder.component.css']
})
export class CardsPlaceholderComponent
{
  @Input() small = false;
}
