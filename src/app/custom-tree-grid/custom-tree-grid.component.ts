import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  SortService,
  ResizeService,
  PageService,
  EditService,
  ExcelExportService,
  PdfExportService,
  ContextMenuService,
  TreeGridComponent,
  FreezeService,
  ColumnChooserService,
  EditSettingsModel
} from '@syncfusion/ej2-angular-treegrid';
@Component({selector: 'app-custom-tree-grid',
  styleUrls: ['./custom-tree-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    EditService,
    SortService,
    ResizeService,
    PageService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    FreezeService,
    ColumnChooserService],
  template: `
  <ejs-treegrid 
          id="treegrid"
          #treeGrid
          childMapping='subtasks' 
          [dataSource]='data' 
          [allowFiltering]="allowFiltering" 
          [height]="height" 
          [toolbar]="toolbar"
          [treeColumnIndex]='1'
          [allowSelection]="true"
          [allowPaging]="allowPaging"
          [allowRowDragAndDrop]="allowRowDragAndDrop" 
          [allowExcelExport]='allowExcelExport'
          [allowPdfExport]='allowPdfExport' 
          [allowSorting]='allowSorting'
          [editSettings]="editSettings"
          [contextMenuItems]="contextMenuItems" 
          [selectionSettings]='selectionOptions'
          (beforeCopy)="beforeCopy($event)"
          (contextMenuClick)='contextMenuClick($event)'
          (contextMenuOpen)='contextMenuOpen($event)'>
    <e-columns>
      <e-column field='taskID' headerText='Task ID' isPrimaryKey='true' width='80' [edit]='editSettings' textAlign='Right'
                editType='numericedit'></e-column>
      <e-column field='taskName' headerText='Task Name' width='190'></e-column>
      <e-column field='startDate' headerText='Start Date' width='90' format="yMd" textAlign='Right' editType='datepickeredit'></e-column>
      <e-column field='endDate' headerText='End Date' width='90' format="yMd" textAlign='Right' editType='datepickeredit'></e-column>
      <e-column field='duration' headerText='Duration' width='85' [edit]='editSettings' textAlign='Right' editType='numericedit'></e-column>
      <e-column field='progress' headerText='Progress' width='90' textAlign='Right' [edit]='editSettings' editType='numericedit'></e-column>
      <e-column field='priority' headerText='Priority' width='80' textAlign='Left' editType='stringedit'></e-column>
    </e-columns>
  </ejs-treegrid>`,
})
export class CustomTreeGridComponent implements OnInit {
  @Input() data: any;
  @Input() height: number = 350;
  @Input() allowPaging = true;
  @Input() allowFiltering: boolean = false;
  @Input() allowRowDragAndDrop = true;
  @Input() allowExcelExport = false;
  @Input() allowPdfExport = false;
  @Input() allowResizing = true;
  @Input() allowSorting = true;
  @Input() pageSettings: object = {};
  @Input() editparams: object = {};
  @Input() showColumnChooser = true;
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  };
  selectionOptions = { type: 'Multiple' };
  contextMenuItems: any[] = [
    {
      text: 'Add', id: 'add', target: '.e-content',
      items: [
        { text: 'Above', id: "Above" },
        { text: 'Below', id: "Below" },
        { text: 'Child', id: "Child" }
      ]
    },
    { text: 'Edit', target: '.e-content', id: 'rowEdit' },
    { text: 'Delete', target: '.e-content', id: 'rowDelete' },
    { text: 'Enable MultiSelect', target: '.e-content', id: 'rowEnableMultiSelect' },
    { text: 'Disable MultiSelect', target: '.e-content', id: 'rowDisableMultiSelect' },
    { text: 'Copy', target: '.e-content', id: 'rowCopy' },
    { text: 'Cut', target: '.e-content', id: 'rowCut' },
    {
      text: 'Paste',
      target: '.e-content',
      id: 'rowPaste',
      items: [
        { text: 'Next', id: "rowPasteNext" },
        { text: 'Child', id: "rowPasteChild" }
      ]
    },
    { text: 'Rename Column', id: 'columnRename', target: '.e-headercontent' },
    { text: 'Delete Column', id: 'columnDelete', target: '.e-headercontent' },
    { text: 'Insert Column', id: 'columnInsert', target: '.e-headercontent' }
  ];
  @ViewChild('treeGrid')
  treeGridObj: TreeGridComponent | undefined;
  toolbar: string[] = [];
  buffer: any = {};
  constructor() {
  }

  ngOnInit(): void {
    if (this.showColumnChooser) {
      this.toolbar.push(`ColumnChooser`)
    }
  }

  beforeCopy(e: any) {
    console.log(e);
  }
  contextMenuOpen(arg?: any): void {
    if (!arg || !this.treeGridObj) return;

    let elem: Element = arg.event.target as Element;
    const uid = elem.closest(`.e-row`)?.getAttribute('data-uid');
    console.log(uid);
    // if (uid) {

    //   console.log(this.treeGridObj.grid.getRowObjectFromUID(uid).data)
    // }

    const rowIndex = arg.rowInfo.rowIndex;
    const cellIndex = arg.rowInfo.cellIndex;

    const rows = <HTMLTableRowElement[]>(this.treeGridObj.getSelectedRows());
    const selectedRowsIndexes = <number[]>(this.treeGridObj.getSelectedRowIndexes());
    const selectedRecords = <object[]>(this.treeGridObj.getSelectedRecords());

    // console.log(arg, rows, selectedRowsIndexes, selectedRecords);
    // hide buttons for multiple case
    if (rows.length > 1) {
      document.querySelectorAll('li#rowEdit')[0].setAttribute('style', 'display: none');
    } else {
      document.querySelectorAll('li#rowEdit')[0].setAttribute('style', 'display: block');
    }

    if (this.buffer?.selectedRecords) {
      document.querySelectorAll('li#rowPaste')[0].setAttribute('style', 'display: block');
    }
    else {
      document.querySelectorAll('li#rowPaste')[0].setAttribute('style', 'display: none');
    }

    if (this.treeGridObj.selectionSettings.type === 'Multiple') {
      document.querySelectorAll('li#rowDisableMultiSelect')[0].setAttribute('style', 'display: block');
      document.querySelectorAll('li#rowEnableMultiSelect')[0].setAttribute('style', 'display: none');
    } else {
      document.querySelectorAll('li#rowEnableMultiSelect')[0].setAttribute('style', 'display: block');
      document.querySelectorAll('li#rowDisableMultiSelect')[0].setAttribute('style', 'display: none');
    }
  }

  contextMenuClick(args: any) {

    if (!this.treeGridObj) return;
    // get selected rows
    const rows = <HTMLTableRowElement[]>(this.treeGridObj.getSelectedRows());
    const selectedRowsIndexes = <number[]>(this.treeGridObj.getSelectedRowIndexes());
    const selectedRecords = <object[]>(this.treeGridObj.getSelectedRecords());
    const rowCellIndexes = this.treeGridObj.getSelectedRowCellIndexes();
    console.log(args);

    // console.log(`clipboard`, this.treeGridObj.clipboardModule);

    // show edit only for single
    if (args.item.id === 'rowEdit') {
      this.treeGridObj?.startEdit(rows[0]);
    }

    // delete single or multiple
    if (args.item.id === 'rowDelete') {
      for (let i = 0; i < rows.length; i++) {
        this.treeGridObj.deleteRow(rows[i]);
      }
    }

    if (args.item.id === `rowCopy`) {
      // this.treeGridObj.copy();
      const selectedr = this.treeGridObj.getSelectedRows();
      this.buffer = {
        selectedRecords: [...selectedRecords]
      }
      console.log('buffer', this.buffer);
    }

    if (args.item.id === `rowCut`) {
      const selectedr = this.treeGridObj.getSelectedRows();
      this.buffer = {
        selectedRecords: [...selectedRecords]
      }
      console.log('buffer', this.buffer);
    }

    if (args.item.id === `rowPaste`) {
      console.log('selectedRowsIndexes', selectedRowsIndexes);
      console.log(this.buffer.selectedRecords)
      if (this.buffer && this.buffer.selectedRecords) {
        for (let index = 0; index < this.buffer.selectedRecords.length; index++) {
          this.treeGridObj.addRecord(this.buffer.selectedRecords[index], selectedRowsIndexes[0]);
        }
      }
      this.buffer = {}
      // if
      // console.log(selectedRowsIndexes)
      // console.log(rows, selectedRowsIndexes, rowCellIndexes);
      // const clipboardModule: any = this.treeGridObj.clipboardModule;
      // console.log(clipboardModule.copyContent, selectedRowsIndexes)
      // this.treeGridObj.paste(clipboardModule.copyContent, selectedRowsIndexes[0], 0);
      // this.treeGridObj.updateRow(rowIndex, clipboardModule.copyContent);
      // console.log(clipboardModule.copyContent)
      // this.treeGridObj.paste(clipboardModule.copyContent, rowIndex, 0);

      // console.log(this.buffer)
      // console.log(selectedRowsIndexes);

      // for (let index = 0; index < this.buffer.rows.length; index++) {
      //   this.treeGridObj.addRecord(this.buffer.rows[index], selectedRowsIndexes[0], 'Below');
      // }
      // this.buffer = null;
      // return this.pasteRow(rowObj.rowIndex as number, rowObj.cellIndex as number)
    }

    if (args.item.id === `rowDisableMultiSelect`) {
      this.treeGridObj.selectionSettings.type = `Single`;
    }

    if (args.item.id === `rowEnableMultiSelect`) {
      this.treeGridObj.selectionSettings.type = `Multiple`;
    }

    return;
  }

}
