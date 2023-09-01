import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {
  textareaValue: string = '';

  constructor(private dialogRef:MatDialog, private clipboard:Clipboard) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }

  copyProgress(){
    const progress = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    this.clipboard.copy(JSON.stringify(progress));
  }

  syncProgress(){
    console.log(this.textareaValue);
    localStorage.setItem(environment.localStorageKey, JSON.stringify(JSON.parse(this.textareaValue)));
    this.closeDialog();
    window.location.reload();
  }
}
