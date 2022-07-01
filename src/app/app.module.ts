import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KanbanMaterialComponent } from './kanban-material/kanban-material.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderDefaultModule} from "./header-default/header-default.module";

@NgModule({
  declarations: [
    AppComponent,
    KanbanMaterialComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'kanban-material', component: KanbanMaterialComponent, pathMatch: "full"},
      {path: 'home', component: HomeComponent, pathMatch: "full"},
      {path: '', redirectTo: 'home', pathMatch: "full"}
    ]),
    BrowserAnimationsModule,
    HeaderDefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
