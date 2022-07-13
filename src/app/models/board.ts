import {Card} from "./card";

export interface Board {
  id: number;
  title: string;
  color: string;
  list: Card[];
}
