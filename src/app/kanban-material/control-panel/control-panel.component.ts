import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {colors} from "../../models/colors";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  get colorsData(): string[] {
    return this._colorsData;
  }

  @Output() emitColor: EventEmitter<string> = new EventEmitter<string>();

  private _colorsData = Object.values(colors);

  constructor() { }

  ngOnInit(): void {
  }

  public onColorEmit(color: string): void {
    this.emitColor.emit(color);
  }

}
