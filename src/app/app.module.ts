import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KanbanMaterialComponent } from './kanban-material/kanban-material.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalDialogComponent} from "./modals/modal-dialog/modal-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {HeaderKanbanComponent} from "./headers/header-kanban/header-kanban.component";
import {HeaderDefaultComponent} from "./headers/header-default/header-default.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ControlPanelComponent } from './kanban-material/control-panel/control-panel.component';
import { ItemComponent } from './kanban-material/item/item.component';
import { CustomDirectiveComponent } from './custom-directive/custom-directive.component';
import { DraggingDirective } from './custom-directive/directives/dragging.directive';
import { DraggingHandleDirective } from './custom-directive/directives/dragging-handle.directive';

@NgModule({
  declarations: [
    AppComponent,
    KanbanMaterialComponent,
    HomeComponent,
    ModalDialogComponent,
    HeaderKanbanComponent,
    HeaderDefaultComponent,
    ControlPanelComponent,
    ItemComponent,
    CustomDirectiveComponent,
    DraggingDirective,
    DraggingHandleDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'kanban-material', component: KanbanMaterialComponent, pathMatch: "full"},
      {path: 'custom-directive', component: CustomDirectiveComponent, pathMatch: "full"},
      {path: 'home', component: HomeComponent, pathMatch: "full"},
      {path: '', redirectTo: 'home', pathMatch: "full"}
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
