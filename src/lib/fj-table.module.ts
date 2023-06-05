import { NgModule } from '@angular/core';
import { FjTableComponent } from './fj-table.component';
import {JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";



@NgModule({
  declarations: [
    FjTableComponent
  ],
  imports: [
    JsonPipe,
    NgIf,
    NgForOf,
    NgStyle
  ],
  exports: [
    FjTableComponent
  ]
})
export class FjTableModule { }
