import { User } from './user';

export interface Post {
  id: string;
  author: User;
  date: Date;
  title: string;
  icon?: string;
  content: string;
  editedCount: number;
  lastEdit?: {
    user: User;
    date: Date;
  };
  avatarUrl?: string;
  threadId: string;
  boardId: string;
}

export interface FirstPost {
  icon?: string;
  author: User;
  date: Date;
  threadId: string;
  boardId: string;
}

export interface LastPost {
  author: User;
  date: Date;
  threadId: string;
  boardId: string;
}
