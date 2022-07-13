import {Injectable} from '@angular/core';
import {Board} from "../models/board";
import {BehaviorSubject, Observable} from "rxjs";
import {Card} from "../models/card";
import {Comment} from "../models/comment";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

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
    {
      id: 2,
      title: 'In Progress',
      color: '#b36619',
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
    }
  ];

  private _board: Board[] = this._initBoard;

  private _board$ = new BehaviorSubject<Board[]>(this._initBoard);

  constructor() { }

  private setBoard(): void {
    this._board$.next([...this._board]);
  }

  public addBoard(title: string): void {
    const newBoard: Board = {
      id: Date.now(),
      title: title,
      color: '#009886',
      list: [],
    };

    this._board = [...this._board, newBoard];
    this.setBoard();
  }

  public deleteBoard(id: number): void {
    this._board = this._board.filter((board: Board) => board.id !== id);
    this.setBoard();
  }

  public addCard(title: string, boardId: number): void {

    const newCard: Card = {
      id: Date.now(),
      text: title,
      like: 0,
      comments: [],
    };

    this._board = this._board.map((board: Board) => {
      if (board.id === boardId) {
        board.list = [newCard, ...board.list];
      }
      return board;
    });

    this.setBoard();
  }

  public changeColor(color: string, boardId: number): void {
    this._board = this._board.map((column: Board) => {
      if (column.id === boardId) {
        column.color = color;
      }
      return column;
    });

    this.setBoard();
  }

  public deleteCard(cardId: number, boardId: number): void {
    this._board = this._board.map((board: Board) => {
      if (board.id === boardId) {
        board.list = board.list.filter((card: Card) => card.id !== cardId);
      }
      return board;
    });

    this.setBoard();
  }

  public changeLike(value: boolean, cardId: number, boardId: number): void {
    this._board = this._board.map((board: Board) => {
      if (board.id === boardId) {
        board.list = board.list.map((card: Card) => {
          if (card.id === cardId) {
            if (value) {
              card.like++;
            } else {
              if (card.like > 0) {
                card.like--;
              }
            }
          }
          return card;
        });
        return board;
      } else {
        return board;
      }
    });

    this.setBoard();
  }

  public addComment(value: string, cardId: number, boardId: number): void {
    this._board = this._board.map((board: Board) => {
      if (board.id === boardId) {
        board.list = board.list.map((card: Card) => {
          if (card.id === cardId) {
            const newComment: Comment = {
              id: Date.now(),
              text: value
            };
            card.comments = [newComment, ...card.comments];
          }
          return card;
        });
      }
      return board;
    });

    this.setBoard();
  }

  public deleteComment(commentId: number, cardId: number, boardId: number): void {
    this._board = this._board.map((board: Board) => {
      if(board.id === boardId) {
        board.list = board.list.map((card)=> {
          if (card.id === cardId) {
            card.comments = card.comments.filter((comment: Comment) => comment.id !== commentId);
          }
          return card;
        });
      }
      return board;
    });

    this.setBoard();
  }

}
