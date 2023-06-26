import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hue-chart',
  templateUrl: './hue-chart.component.html',
  styleUrls: ['./hue-chart.component.css']
})
export class HueChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  getGreenToRed(percentage:number){
    let r = percentage<50 ? 255 : Math.floor(255-(percentage*2-100)*255/100);
    let g = percentage>50 ? 255 : Math.floor((percentage*2)*255/100);
    return 'rgb('+r+','+g+',0)';
  }
}
