import { Board } from './board';

export interface BoardCategory {
  id: string;
  name: string;
  description: string;
  boards: Board[];
}
