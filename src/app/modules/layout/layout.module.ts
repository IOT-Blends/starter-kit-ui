import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { AdminComponent } from './admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, AdminComponent],
  imports: [
    CommonModule, FormsModule, LayoutRoutingModule, MatTableModule, MatPaginatorModule
  ],
  exports: [LayoutRoutingModule, LayoutComponent, MatTableModule, MatPaginatorModule]
})
export class LayoutModule { }
