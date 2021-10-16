import { Component} from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { EditSettingsModel } from '@syncfusion/ej2-treegrid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  data = sampleData;
  public pageSettings: Object = { pageSize: 10 };
  public contextMenuItems = [
    {
      text: 'Add', id: 'add', target: '.e-content',
      items: [{
        text: 'Child', id: 'rowAddChild'
      }, {
        text: 'Next', id: 'rowAddNext'
      }]
    },
    { text: 'Delete', target: '.e-content', id: 'rowDelete' },
    { text: 'Edit', target: '.e-content', id: 'rowEdit' },
    { text: 'Rename Column', id: 'columnRename', target: '.e-headercontent' },
    { text: 'Delete Column', id: 'columnDelete', target: '.e-headercontent' },
    { text: 'Insert Column', id: 'columnInsert', target: '.e-headercontent' }
  ];
  public editing: EditSettingsModel = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
    mode: 'Row'
  };
  public toolbar: string[] = [];
  public editparams: Object = { params: { format: 'n' } };


  // contextMenuClick(args: MenuEventArgs): void {
  //   console.log(args);
  //   if (!this.treeGridObj) return;

  //   if (args.item.id === 'columnRename') {
  //     const item = 'new Column' as string & ColumnModel & Column;
  //     this.treeGridObj.columns.push(item); // Insert Columns
  //     this.treeGridObj.refreshColumns(); // Refresh Columns
  //   } else if (args.item.id === 'columnDelete') {
  //     let columnName = 2;
  //     this.treeGridObj.columns.splice(columnName, 1); //Splice columns
  //     this.treeGridObj.refreshColumns(); //Refresh Columns
  //   } else if (args.item.id === 'columnInsert') {
  //     this.treeGridObj.getColumnByField('taskName'); //Get the required column
  //     this.treeGridObj.getColumnByField('taskName').headerText = 'Task details'; //Rename column name
  //     this.treeGridObj.refreshColumns(); //Refresh Columns
  //   }
  // }

  // contextMenuOpen(arg: BeforeCloseEventArgs): void {
  //   let elem: Element = arg.event.target as Element;
  //   if (elem) {
  //     console.log(elem);
  //   }
  // let elem: Element = arg.event.target as Element;
  // let uid: string = elem.closest('.e-row').getAttribute('data-uid');
  // if (isNullOrUndefined(getValue('hasChildRecords', this.treeGridObj.grid.getRowObjectFromUID(uid).data))) {
  //   arg.cancel = true;
  // } else {
  //   let flag: boolean = getValue('expanded', this.treeGridObj.grid.getRowObjectFromUID(uid).data);
  //   let val: string = flag ? 'none' : 'block';
  //   document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
  //   val = !flag ? 'none' : 'block';
  //   document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
  // }
  // }
}