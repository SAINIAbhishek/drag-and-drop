import { Component, OnInit } from '@angular/core';
import {KanbanService} from "../../services/kanban.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalDialogComponent} from "../../modals/modal-dialog/modal-dialog.component";
import {first} from "rxjs";

@Component({
  selector: 'app-header-kanban',
  templateUrl: './header-kanban.component.html',
  styleUrls: ['./header-kanban.component.scss']
})
export class HeaderKanbanComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              private readonly kanbanService: KanbanService) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '400px',
      data: {title: 'Add New Board'}
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if (!!result) {
        this.kanbanService.addBoard(result);
      }
    });
  }

}
