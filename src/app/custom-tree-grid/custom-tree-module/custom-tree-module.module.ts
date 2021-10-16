import { NgModule } from '@angular/core';
import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { CustomTreeGridComponent } from '../custom-tree-grid.component';


@NgModule({
  imports: [
    TreeGridAllModule,
    NumericTextBoxAllModule,
    ToolbarModule,
    DropDownListAllModule,
    ButtonAllModule,
    DialogModule,
    MultiSelectAllModule,
    CheckBoxAllModule,
    DatePickerModule,
    SparklineAllModule],
  declarations: [CustomTreeGridComponent],
  exports: [CustomTreeGridComponent],
})
export class CustomTreeModuleModule { }
