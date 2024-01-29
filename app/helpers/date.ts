import { helper } from '@ember/component/helper';

export function formatDate([date]: [string]) {
  return new Date(date).toLocaleString();
}

export default helper(formatDate);
