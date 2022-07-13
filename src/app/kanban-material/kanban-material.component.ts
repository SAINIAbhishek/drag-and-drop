import { Component, OnInit } from '@angular/core';
import {KanbanService} from "../services/kanban.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ModalDialogComponent} from "../modals/modal-dialog/modal-dialog.component";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Board} from "../models/board";

@Component({
  selector: 'app-kanban-material',
  templateUrl: './kanban-material.component.html',
  styleUrls: ['./kanban-material.component.scss']
})
export class KanbanMaterialComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly kanbanService: KanbanService) { }

  ngOnInit(): void {
  }

  public onDelete(id: number): void {
    this.kanbanService.deleteBoard(id);
  }

  public onColorChange(event: string, id: number): void {
    this.kanbanService.changeColor(event, id);
  }

  public addCard(board: Board): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '400px',
      data: {title: `Add new card in ${board.title}`}
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (!!result) {
        this.kanbanService.addCard(result, board.id);
      }
    });
  }

  public onDeleteCard(event: number, boardId: number): void {
    this.kanbanService.deleteCard(event, boardId);
  }

  public onChangeLike(event: boolean, cardId: number, boardId: number): void {
    this.kanbanService.changeLike(event, cardId, boardId);
  }

  public onAddComment(event: string, cardId: number, boardId: number) {
    this.kanbanService.addComment(event, cardId, boardId);
  }

  public onDeleteComment(event: number, cardId: number, boardId: number) {
    this.kanbanService.deleteComment(event, cardId, boardId);
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
