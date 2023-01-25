import { LastPost } from './post';
import { Thread } from './thread';
import { User } from './user';

export interface Board {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  repliesCount: number;
  category: {
    id: string;
    name?: string;
  };
  lastPost?: LastPost;
  moderators?: User[];
  page?: BoardPage;
}

export interface BoardPage {
  page: number;
  stickiesCount: number;
  globalsCount: number;
  threadsCount: number;
  threads: Thread[];
}
