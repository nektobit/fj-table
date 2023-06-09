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
  @Input() nestedHeaders: any | undefined;
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
      return n.toLocaleString('ru', {maximumFractionDigits: 6}) + suffix;
    }
    if (n) {
      return n.toLocaleString('ru', {maximumFractionDigits: 2})
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

  exportTable() {
    let table = this.fjtElement?.nativeElement;

    if (!table) {
      return;
    }


  }

  exportToExcel(){
    let htmls = this.fjtElement?.nativeElement.outerHTML;

    if (!htmls) {
      return;
    }
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    const base64 = function (s: any) {
      return window.btoa(unescape(encodeURIComponent(s)))
    };

    const format = function (s: string, c: { [x: string]: any; worksheet?: string; table?: string; }) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      })
    };

    const ctx = {
      worksheet: 'Worksheet',
      table: htmls
    };


    const link = document.createElement("a");
    link.download = "export.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
}
