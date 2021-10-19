import { Component } from '@angular/core';
import { sampleData, dragData } from './jsontreegriddata';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  data = dragData;
}