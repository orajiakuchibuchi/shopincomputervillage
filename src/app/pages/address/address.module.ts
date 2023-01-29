import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    UpdateComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AddressModule { }
