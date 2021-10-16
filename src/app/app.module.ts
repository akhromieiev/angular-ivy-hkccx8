import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomTreeModuleModule } from './custom-tree-grid';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule,
    HttpModule,
    FormsModule,
    BrowserModule,CustomTreeModuleModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
