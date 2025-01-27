import { WordItem } from './word-item.interface';

export interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PlacedWord {
  word: WordItem;
  box: BoundingBox;
}