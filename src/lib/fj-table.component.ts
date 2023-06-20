import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {KeyValue} from "@angular/common";
import {DetailedSettings} from "../models/GridSettings";

@Component({
  selector: 'lib-fj-table',
  templateUrl: 'fj-table.component.html',
  styleUrls: ['./fj-styles.scss']
})
export class FjTableComponent {
  @ViewChild('fjt') fjtElement: ElementRef | undefined;
  @Input() data: any;
  @Input() nestedHeaders: boolean | Array<Array<string | DetailedSettings>> | undefined;
  @Input() colHeaders: any | undefined;
  @Input() nestedRows: boolean | undefined;
  @Input() colSuffix: any | undefined;

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 1;
  }

  public isNumber(value: any) {
    return typeof value === 'number' && isFinite(value);
  }

  /* Context menu */
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  //activates the menu with the coordinates
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
  }

  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }

  /* HACK */
  hackNumber(n: any, suffix: any) {
    if (suffix && n) {
      return n.toFixed(6).replace(".", ",") + suffix;
    }
    if (n) {
      return n.toFixed(2).replace(".", ",");
    }
  }

  copyTable() {
    let table = this.fjtElement?.nativeElement;

    if (!table) {
      return;
    }

    const blob = new Blob([table.outerHTML], {type: "text/html"});
    const tableHtml = new ClipboardItem({"text/html": blob});

    navigator.clipboard.write([tableHtml]).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });

  }
}
