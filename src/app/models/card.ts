import {Comment} from "./comment";

export interface Card {
  id: number;
  text: string;
  like: number;
  comments: Array<Comment>;
}
