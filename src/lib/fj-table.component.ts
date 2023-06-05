import {Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-fj-table',
  template: `
    <table *ngIf="data" class="fjt" (contextmenu)="onrightClick($event)" #fjt>
      <ng-container *ngIf="nestedHeaders">
        <thead>
            <tr *ngFor="let tr of nestedHeaders">
              <ng-container *ngFor="let th of tr">
                <ng-container *ngIf='isObj(th); else simpleTH'>
                  <th [colSpan]="th?.colspan">{{ th.label }}</th>
                </ng-container>
                <ng-template #simpleTH>
                  <th>{{ th }}</th>
                </ng-template>
              </ng-container>
            </tr>
        </thead>
      </ng-container>
      <colgroup>
        <col style="width: 3.13rem" *ngFor="let col of data[0]">
      </colgroup>
      <tbody>
        <!-- ROW -->
        <tr *ngFor="let row of data">
          <td *ngFor="let cell of row">
            {{ cell }}
          </td>
        </tr>
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
  @Input() data: any[][] | undefined;
  @Input() nestedHeaders: any | undefined;
  isObj(val: any): boolean { return typeof val === 'object'; }
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
