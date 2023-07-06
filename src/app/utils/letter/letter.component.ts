import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {

  constructor() { }
  @Input() percentage!:number;
  @Input() letter!:string;
  rgb!:string;


  ngOnInit(): void {
    this.rgb=this.getGreenToRed(this.percentage);
  }

  getGreenToRed(percentage:number){
    let r = percentage<50 ? 255 : Math.floor(255-(percentage*2-100)*255/100);
    let g = percentage>50 ? 255 : Math.floor((percentage*2)*255/100);
    return 'rgb('+r+','+g+',0)';
  }

}

