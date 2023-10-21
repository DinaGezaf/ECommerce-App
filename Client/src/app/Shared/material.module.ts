import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatIconModule,
    MatOptionModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
