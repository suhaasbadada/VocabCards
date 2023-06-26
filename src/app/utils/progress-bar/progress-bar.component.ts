import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input() completed!:number;
  @Input() total!:number;
  
  percentage!:number;
  constructor() { }

  ngOnInit(): void {
    this.percentage=(this.completed/this.total)*100;
  }

}
