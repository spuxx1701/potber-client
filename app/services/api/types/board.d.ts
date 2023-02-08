import { LastPost } from './post';
import { Thread } from './thread';
import { User } from './user';

export interface Board {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  repliesCount: number;
  categoryId: string;
  lastPost?: LastPost;
  moderators?: User[];
  page?: BoardPage;
}

export interface BoardPage {
  number: number;
  stickiesCount: number;
  globalsCount: number;
  threadsCount: number;
  threads: Thread[];
}
