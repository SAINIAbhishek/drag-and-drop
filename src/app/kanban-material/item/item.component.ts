import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../models/card";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  get open(): boolean {
    return this._open;
  }

  get commentInput(): string {
    return this._commentInput;
  }

  set commentInput(value: string) {
    this._commentInput = value;
  }

  @Input() card: Card = <Card>{};

  @Output() comment: EventEmitter<string> = new EventEmitter<string>();

  @Output() cardEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() deleteCard: EventEmitter<void> = new EventEmitter<void>();

  @Output() commentToDelete: EventEmitter<number> = new EventEmitter<number>();

  private _commentInput = ''

  private _open = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onOpenComment():void {
    this._open = !this._open;
  }

  public onCommentEmit() {
    this.comment.emit(this._commentInput);
    this._commentInput = '';
  }

  public onCardItemEmit(increase: boolean): void {
    this.cardEvent.emit(increase);
  }

  public onCardDelete(): void {
    this.deleteCard.emit();
  }

  public onDeleteComment(id: number): void {
    this.commentToDelete.emit(id);
  }

}
