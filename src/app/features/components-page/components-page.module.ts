import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsPageComponent } from './components-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '../../components/ui/button/button.module';
import { IconModule } from '../../components/ui/icon/icon.module';

const routes: Routes = [{ path: '', component: ComponentsPageComponent }];

@NgModule({
  declarations: [ComponentsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    IconModule
  ]
})
export class ComponentsPageModule {}
