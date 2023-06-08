import { NgModule } from '@angular/core';
import { FjTableComponent } from './fj-table.component';
import {DecimalPipe, JsonPipe, KeyValuePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";



@NgModule({
  declarations: [
    FjTableComponent
  ],
  imports: [
    JsonPipe,
    NgIf,
    NgForOf,
    NgStyle,
    KeyValuePipe,
    NgClass,
    DecimalPipe
  ],
  exports: [
    FjTableComponent
  ]
})
export class FjTableModule { }
