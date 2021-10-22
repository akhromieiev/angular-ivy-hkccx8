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
  EditSettingsModel,
  SelectionSettingsModel,
  RowDDService,
  ReorderService,
  ColumnMenuService
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-custom-tree-grid',
  styleUrls: ['./custom-tree-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ReorderService,
    EditService,
    SortService,
    ResizeService,
    PageService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    ColumnMenuService,
    FreezeService,
    ColumnChooserService,
    RowDDService],
  template: `
  <ejs-treegrid 
          id="treegrid"
          #treeGrid
          childMapping='subtasks' 
          [dataSource]='data' 
          [allowFiltering]="allowFiltering" 
          [toolbar]="toolbar"
          [treeColumnIndex]='1'
          [allowSelection]="true"
          [allowPaging]="allowPaging"
          [allowRowDragAndDrop]="allowRowDragAndDrop" 
          [allowReordering]="true"
          [allowExcelExport]='allowExcelExport'
          [allowPdfExport]='allowPdfExport' 
          [allowSorting]='allowSorting'
          [editSettings]="editSettings"
          [frozenColumns]="frozenColumnIndex"
          [allowResizing]="true"
          [columns]="columns"
          (rowSelected)="onRowSelected($event)"
          [selectionSettings]='selectionOptions'
          [showColumnMenu]="true"
          [columnMenuItems]="columnMenuItems"
          (columnMenuClick)="onColumnMenuClick($event)"
          (columnMenuOpen)="onColumnMenuOpen($event)"
          [contextMenuItems]="contextMenuItems" 
          (contextMenuOpen)='contextMenuOpen($event)'
          (contextMenuClick)='contextMenuClick($event)'>
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
  frozenColumnIndex = null;
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  };
  columns: any[] = [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right', isPrimaryKey: true },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Center', type: 'date', format: 'yMd' },
    { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Center' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }]
  selectionOptions: SelectionSettingsModel = { type: 'Multiple', mode: 'Row' };
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
    }
  ];
  columnMenuItems = [
    { text: 'Rename Column', id: 'columnRename', target: '.e-headercontent' },
    { text: 'Delete Column', id: 'columnDelete', target: '.e-headercontent' },
    { text: 'Insert Column', id: 'columnInsert', target: '.e-headercontent' },
    { text: 'Enable Filtering', id: 'enableFiltering', target: '.e-headercontent' },
    { text: 'Disable Filtering', id: 'disableFiltering', target: '.e-headercontent' },
    { text: 'Enable Multisorting', id: 'enableMultisorting', target: '.e-headercontent' },
    { text: 'Disable Multisorting', id: 'disableMultisorting', target: '.e-headercontent' },
    { text: 'Enable Froze', id: 'enableFroze', target: '.e-headercontent' },
    { text: 'Disable Froze', id: 'disableFroze', target: '.e-headercontent' }
  ];


  @ViewChild('treeGrid')
  treeGridObj: TreeGridComponent | undefined;
  toolbar: string[] = [];
  buffer: any = {};
  selectedRows: any = undefined;
  rowIndex: any = null;
  cellIndex: any = null;

  constructor() {
  }

  ngOnInit(): void {
    if (this.showColumnChooser) {
      this.toolbar.push(`ColumnChooser`)
    }
  }

  onColumnMenuClick(e: any) {
    if (!this.treeGridObj?.columns) return;
    const { index } = e.column;

    if (e.item.id === `columnRename`) {

    }
    if (e.item.id === `columnDelete`) {
      if (index > -1) {
        this.columns.splice(index, 1);
      }
    }

    if (e.item.id === `enableFiltering`) {
      this.allowFiltering = true;
    }

    if (e.item.id === `disableFiltering`) {
      this.allowFiltering = false;
    }

    if (e.item.id === `enableMultisorting`) {
      this.allowSorting = true;
    }

    if (e.item.id === `disableMultisorting`) {
      this.allowSorting = false;
    }

    if (e.item.id === `enableFroze`) {
      this.frozenColumnIndex = index + 1;
    }

    if (e.item.id === `disableFroze`) {
      this.frozenColumnIndex = null;
    }

    if (e.item.id === `columnInsert`) {
      // insert colujmn after this
      this.columns.splice(index + 1, 0, { field: 'newColumn', headerText: 'New Column' });
    }
    this.treeGridObj?.refreshColumns();
  }

  onColumnMenuOpen(e: any) {
    if (this.allowFiltering) {
      document.querySelectorAll('li#enableFiltering')[0].setAttribute('style', 'display: none');
      document.querySelectorAll('li#disableFiltering')[0].setAttribute('style', 'display: block');
    } else {
      document.querySelectorAll('li#enableFiltering')[0].setAttribute('style', 'display: block');
      document.querySelectorAll('li#disableFiltering')[0].setAttribute('style', 'display: none');
    }

    if (e?.column?.freezeTable === "frozen-left") {
      document.querySelectorAll('li#enableFroze')[0].setAttribute('style', 'display: none');
      document.querySelectorAll('li#disableFroze')[0].setAttribute('style', 'display: block');
    } else {
      document.querySelectorAll('li#enableFroze')[0].setAttribute('style', 'display: block');
      document.querySelectorAll('li#disableFroze')[0].setAttribute('style', 'display: none');
    }
  }

  onRowSelected(args: any) {
    // if (!(args.data as ITreeData).hasChildRecords) {
    //   if (args.row) {
    //     (args.row as HTMLElement).style.backgroundColor = 'green';
    //   }

    // }
    this.selectedRows = args;
    // this.treeGridObj?.getSelectedRows().forEach((element: any) => {
    //   (element as HTMLElement).style.backgroundColor = 'green';
    // })
  }

  recursiveCopy = (items: any) => items.map((item: any) => Array.isArray(item) ? this.recursiveCopy(item) : {
    ...item,
    taskID: Math.random()
      .toString(36)
      .substring(7)
  });

  contextMenuOpen(arg?: any): void {
    if (!arg || !this.treeGridObj) return;
    this.rowIndex = arg.rowInfo.rowIndex;
    this.cellIndex = arg.rowInfo.cellIndex;

    let elem: Element = arg.event.target as Element;
    const uid = elem.closest(`.e-row`)?.getAttribute('data-uid');

    const rows = <HTMLTableRowElement[]>(this.treeGridObj.getSelectedRows());

    // hide buttons for multiple case edit and add
    if (rows.length > 1) {
      document.querySelectorAll('li#rowEdit')[0].setAttribute('style', 'display: none');
      document.querySelectorAll('li#add')[0].setAttribute('style', 'display: none');
    } else {
      document.querySelectorAll('li#rowEdit')[0].setAttribute('style', 'display: block');
      document.querySelectorAll('li#add')[0].setAttribute('style', 'display: block');
    }

    // hide paste if no in buffer
    if (this.buffer?.selectedRecords) {
      document.querySelectorAll('li#rowPaste')[0].setAttribute('style', 'display: block');
    }
    else {
      document.querySelectorAll('li#rowPaste')[0].setAttribute('style', 'display: none');
    }

    // disable enable multi select flag
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
      this.buffer = { selectedRecords }
    }

    if (args.item.id === `rowCut`) {
    }

    if (args.item.id === `rowPasteNext`) {
      if (this.buffer && this.buffer.selectedRecords) {
        for (let index = 0; index < this.buffer.selectedRecords.length; index++) {
          const newRows = this.recursiveCopy(this.buffer.selectedRecords)
          this.treeGridObj.addRecord(newRows[index], this.selectedRows?.rowIndex, 'Below');
        }
      }
      this.buffer = {}
    }

    if (args.item.id === `rowPasteChild`) {
      if (this.buffer && this.buffer.selectedRecords) {
        for (let index = 0; index < this.buffer.selectedRecords.length; index++) {
          const newRows = this.recursiveCopy(this.buffer.selectedRecords)
          this.treeGridObj.addRecord(newRows[index], this.selectedRows?.rowIndex, 'Child');
        }
      }
      this.buffer = {}
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
