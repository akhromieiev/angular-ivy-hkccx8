
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomTreeModuleModule } from './custom-tree-grid';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    CustomTreeModuleModule],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
