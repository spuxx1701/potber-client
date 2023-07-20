import PrivateMessage, {
  PrivateMessageFolder,
} from 'potber-client/models/private-message';

/**
 * Dynamically creats a subtitle for the given private message.
 * @param privateMessage The private message.
 */
export function createPrivateMessageSubtitle(privateMessage: PrivateMessage) {
  let subtitle = '';
  if (
    (!privateMessage.sender && !privateMessage.recipient) ||
    privateMessage.sender?.id === '0'
  ) {
    subtitle += 'Systemnachricht';
  } else if (privateMessage.recipient?.name) {
    subtitle += `an ${privateMessage.recipient?.name}`;
  } else {
    subtitle += `von ${privateMessage.sender?.name}`;
  }
  subtitle += ` (${privateMessage.date})`;
  return subtitle;
}

/**
 * Returns the label for the given folder.
 * @param folder The message folder.
 */
export function getPrivateMessageFolderLabel(folder: PrivateMessageFolder) {
  switch (folder) {
    case PrivateMessageFolder.inbound:
      return 'Eingang';
    case PrivateMessageFolder.outbound:
      return 'Ausgang';
    default:
      return 'System';
  }
}
