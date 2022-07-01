import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderDefaultComponent} from "./header-default.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderDefaultComponent
  ],
  exports: [
    HeaderDefaultComponent
  ]
})
export class HeaderDefaultModule {

}
