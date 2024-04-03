export const PrivateMessageFolder = {
  inbound: 'inbound',
  outbound: 'outbound',
  system: 'system',
} as const;

export type PrivateMessageFolder =
  (typeof PrivateMessageFolder)[keyof typeof PrivateMessageFolder];

export interface RecipientOrSender {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Read {
  id: string;
  title: string;
  date: string;
  folder: PrivateMessageFolder;
  unread: boolean;
  important: boolean;
  recipient?: RecipientOrSender;
  sender?: RecipientOrSender;
  content?: string;
}

export interface Create {
  title: string;
  content: string;
  recipientName: string;
  saveCopy: boolean;
}
