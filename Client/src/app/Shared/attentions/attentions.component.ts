import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-attentions',
  templateUrl: './attentions.component.html',
  styleUrls: ['./attentions.component.css'],
})
export class AttentionsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
