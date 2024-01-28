import { helper } from '@ember/component/helper';
import { appConfig } from 'potber-client/config/app.config';

export function parseMemeUrl([url]: [string]) {
  if (!url) {
    throw new Error(
      'parse-meme-url helper requires exactly one argument of type string.',
    );
  }
  if (url.startsWith('http')) {
    // If the URL is an absolute URL, we will simply output that
    return url;
  } else {
    // If the URL is a relative one, we will output the URL that points to the live application server
    const fullUrl = `${appConfig.memeHostUrl}/images/memes/${url}`;
    return fullUrl;
  }
}

export default helper(parseMemeUrl);
