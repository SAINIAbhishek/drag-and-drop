import { Injectable } from '@angular/core';
import {Board} from "../models/board";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  get initBoard(): Array<Board> {
    return this._initBoard;
  }

  get board$(): Observable<Board[]> {
    return this._board$.asObservable();
  }

  get board(): Board[] {
    return this._board;
  }

  private _initBoard: Array<Board> = [
    {
      id: 1,
      title: 'To Do',
      color: '#009886',
      list: [
        {
          id: 1,
          text: 'Example card item',
          like: 1,
          comments: [
            {
              id: 1,
              text: 'Some comment'
            }
          ]
        },
      ]
    },
  ];

  private _board: Board[] = this._initBoard;

  private _board$ = new BehaviorSubject<Board[]>(this._initBoard);

  constructor() { }

  addBoard(title: string) {
    const newBoard: Board = {
      id: Date.now(),
      title: title,
      color: '#009886',
      list: [],
    };

    this._board = [...this._board, newBoard];
    this._board$.next([...this._board]);
  }
}
