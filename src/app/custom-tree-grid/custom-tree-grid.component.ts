import { Component, Input, ViewChild } from '@angular/core';
// import { sampleData } from './jsontreegriddata';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService, TreeGridComponent, FreezeService } from '@syncfusion/ej2-angular-treegrid';
import { ContextMenuItems, EditSettingsModel, Column, ColumnModel } from '@syncfusion/ej2-treegrid';
import { ContextMenu, ContextMenuModel, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-navigations';
import { BeforeCloseEventArgs } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-custom-tree-grid',
  template: `
  <ejs-treegrid [dataSource]='data' 
          [allowFiltering]="allowFiltering" 
          childMapping='subtasks' 
          [height]="height" 
          [treeColumnIndex]='1' 
          id="treegridcomp"
          [allowPaging]="allowPaging"
          [allowRowDragAndDrop]=true 
          [allowExcelExport]='allowExcelExport'
          [allowPdfExport]='allowPdfExport' 
          [allowSorting]='allowSorting' 
          [contextMenuItems]="contextMenuItems" 
          (contextMenuClick)='contextMenuClick($event)' 
          (contextMenuOpen)='contextMenuOpen($event)'>
    <e-columns>
      <e-column field='taskID' headerText='Task ID' isPrimaryKey='true' width='80' [edit]='editparams' textAlign='Right'
                editType='numericedit'></e-column>
      <e-column field='taskName' headerText='Task Name' width='190'></e-column>
      <e-column field='startDate' headerText='Start Date' width='90' format="yMd" textAlign='Right' editType='datepickeredit'></e-column>
      <e-column field='endDate' headerText='End Date' width='90' format="yMd" textAlign='Right' editType='datepickeredit'></e-column>
      <e-column field='duration' headerText='Duration' width='85' [edit]='editparams' textAlign='Right' editType='numericedit'></e-column>
      <e-column field='progress' headerText='Progress' width='90' textAlign='Right' [edit]='editparams' editType='numericedit'></e-column>
      <e-column field='priority' headerText='Priority' width='80' textAlign='Left' editType='stringedit'></e-column>
    </e-columns>
  </ejs-treegrid>`,
  styleUrls: ['./custom-tree-grid.component.scss'],
  providers: [
    SortService,
    ResizeService,
    PageService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    FreezeService]
})
export class CustomTreeGridComponent {
  @Input() data: any;
  @Input() allowFiltering: boolean = false;
  @Input() height: number = 350;
  @Input() allowPaging = true;
  @Input() allowRowDragAndDrop = true;
  @Input() allowExcelExport = false;
  @Input() allowPdfExport = false;
  @Input() allowSorting = true;
  @Input() pageSettings: object = {};
  @Input() contextMenuItems: any[] = []
  @Input() editparams: object = {};
  @Input()
  contextMenuClickCb!: (args: any) => any;
  @Input()
  contextMenuOpenCb!: (args: any) => any;
  // @Input() data: any;
  // @Input() data: any;
  // @Input() data: any;
  // @Input() data: any;
  // @Input() data: any;
  // @Input() data: any;
  @ViewChild('treegrid')
  treeGridObj: TreeGridComponent | undefined;
  constructor() {
  }

  contextMenuClick(e: any) {
    if (this.contextMenuClickCb) {
      this.contextMenuClickCb(e);
    }
  }

  contextMenuOpen(e: any) {
    if (this.contextMenuOpenCb(e)) {
      this.contextMenuOpenCb(e)
    }
  }
}
