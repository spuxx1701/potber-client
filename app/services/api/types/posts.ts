import { User } from '.';

export interface Create {
  message: string;
  threadId: string;
  title?: string;
  icon?: string;
  convertUrls?: boolean;
  disableBbCode?: boolean;
  disableEmojis?: boolean;
}

export interface Read {
  id: string;
  message: string;
  date: Date;
  threadId: string;
  boardId: string;
  author: User;
  title?: string;
  icon?: string;
  avatarUrl?: string;
  editedCount?: number;
  contentHidden?: boolean;
}
