import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTestComponent } from './page-test.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: PageTestComponent }];

@NgModule({
  declarations: [PageTestComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PageTestModule {}
