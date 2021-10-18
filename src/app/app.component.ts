import { Component } from '@angular/core';
import { sampleData } from './jsontreegriddata';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  data = sampleData;
}