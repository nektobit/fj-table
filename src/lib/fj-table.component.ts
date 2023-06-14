import {Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import {KeyValue} from "@angular/common";

@Component({
  selector: 'lib-fj-table',
  template: `
    <table *ngIf="data" class="fjt" [ngClass]="{ nestedRows: nestedRows }" (contextmenu)="onrightClick($event)" #fjt>
      <thead>
          <ng-container *ngIf="colHeaders">
            <tr>
              <th *ngFor="let th of colHeaders">{{ th }}</th>
            </tr>
          </ng-container>
          <ng-container *ngIf="nestedHeaders">
            <tr *ngFor="let tr of nestedHeaders">
              <th *ngFor="let th of tr" [colSpan]="th?.colspan">
                {{ th.label || th }}
              </th>
            </tr>
          </ng-container>
      </thead>
      <colgroup>
        <ng-container *ngIf="colHeaders">
          <col style="width: 3.13rem" *ngFor="let col of colHeaders">
        </ng-container>
      </colgroup>
      <tbody>
        <!-- NESTED ROW -->
        <ng-container *ngIf="nestedRows; else simpleRow">
          <ng-container *ngFor="let row of data">
            <tr class="fjt-parent-row" [ngClass]="{'closed': !row.__showChild}">
              <!-- PARENT -->
              <ng-container *ngFor="let td of row | keyvalue: onCompare">
                <td  *ngIf="td.key !== '__children' && td.key !== '__showChild'">
                  <ng-container *ngIf="isNumber(td.value); else stringTD">
                    <!-- Remove this hack -->
                    {{ hackNumber(td.value, colSuffix[td.key]) }}
                  </ng-container>
                  <ng-template #stringTD>
                    {{ td.value }}
                  </ng-template>
                </td>
              </ng-container>
              <button class="fjt-row-toggle" #rowToggle (click)="row.__showChild = !row.__showChild">
                <ng-container *ngIf="row.__showChild; else altToggleValue">-</ng-container>
                <ng-template #altToggleValue>+</ng-template>
              </button>
            </tr>
            <!-- CHILDREN -->
            <ng-container *ngFor="let childRow of row.__children">
              <tr class="fjt-child-row" [hidden]="!row.__showChild">
                <td *ngFor="let td of childRow | keyvalue: onCompare; let i = index">
                  <ng-container *ngIf="isNumber(td.value); else stringTD">
                    <!-- Remove this hack -->
                    {{ hackNumber(td.value, colSuffix[td.key])  }}
                  </ng-container>

                  <ng-template #stringTD>
                    {{ td.value }}
                  </ng-template>
                </td>
              </tr>
            </ng-container>
          </ng-container>
        </ng-container>

        <!-- SIMPLE ROW -->
        <ng-template #simpleRow>
          <tr *ngFor="let row of data">
            <td *ngFor="let cell of row">
              {{ cell }}
            </td>
          </tr>
        </ng-template>
        <!-- -->
      </tbody>
    </table>

    <div *ngIf="contextmenu" class="context-menu-wrapper" (click)="disableContextMenu()">
      <div class="context-menu" [ngStyle]="{'left.px': contextmenuX, 'top.px': contextmenuY}">
        <button (click)="copyTable(); disableContextMenu()">Скопировать всю таблицу</button>
      </div>
    </div>
  `,
  styleUrls: ['./fj-styles.scss']
})
export class FjTableComponent {
  @ViewChild('fjt') fjtElement: ElementRef | undefined;
  @Input() data: any;// any[][] | undefined;
  @Input() nestedHeaders: any | undefined;
  @Input() colHeaders: any | undefined;
  @Input() nestedRows: boolean | undefined;
  @Input() colSuffix: any | undefined;

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 1;
  }
  public isNumber(value: any)
  {
    return typeof value === 'number' && isFinite(value);
  }

  /* Context menu */
    contextmenu = false;
    contextmenuX = 0;
    contextmenuY = 0;

    //activates the menu with the coordinates
    onrightClick(event: MouseEvent ){
      event.preventDefault();
      event.stopPropagation();
      this.contextmenuX=event.clientX
      this.contextmenuY=event.clientY
      this.contextmenu=true;
    }
    //disables the menu
    disableContextMenu(){
      this.contextmenu= false;
    }
  /* */

  /* HACK */
  hackNumber(n:any, suffix:any) {
    if(suffix && n) {
      return n.toFixed(6).replace(".", ",") + suffix;
    }
    if(n) {
      return n.toFixed(2).replace(".", ",");
    }
  }

  copyTable() {
    let table = this.fjtElement?.nativeElement;

    if (table) {
      const blob = new Blob([table.outerHTML], { type: "text/html" });
      const tableHtml = new ClipboardItem({ "text/html": blob });

      navigator.clipboard.write([tableHtml]).then(function () {
        console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    };
  }
}
