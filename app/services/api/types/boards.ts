import { Posts, Threads } from '.';

export interface Read {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  threadsCount: number;
  repliesCount: number;
  lastPost: Posts.Preview;
  page: Page;
}

export interface Page {
  number: number;
  stickiesCount: number;
  globalsCount: number;
  threadsCount: number;
  threads: Threads.Read[];
}
