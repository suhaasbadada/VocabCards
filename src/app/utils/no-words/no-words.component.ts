import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-no-words',
  templateUrl: './no-words.component.html',
  styleUrls: ['./no-words.component.css']
})
export class NoWordsComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }

}
