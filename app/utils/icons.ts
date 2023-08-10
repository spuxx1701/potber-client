export interface PostIcon {
  key: string;
  filename: string | null;
}

export const postIcons: PostIcon[] = [
  {
    key: '0',
    filename: null,
  },
  {
    key: '1',
    filename: '1.gif',
  },
  {
    key: '2',
    filename: '2.gif',
  },
  {
    key: '28',
    filename: '28.gif',
  },
  {
    key: '32',
    filename: '32.gif',
  },
  {
    key: '33',
    filename: '33.gif',
  },
  {
    key: '34',
    filename: '34.gif',
  },
  {
    key: '35',
    filename: '35.gif',
  },
  {
    key: '36',
    filename: '36.gif',
  },
  {
    key: '37',
    filename: '37.gif',
  },
  {
    key: '38',
    filename: '38.gif',
  },
  {
    key: '39',
    filename: '39.gif',
  },
  {
    key: '40',
    filename: '40.gif',
  },
  {
    key: '41',
    filename: '41.gif',
  },
  {
    key: '42',
    filename: '42.gif',
  },
  {
    key: '54',
    filename: '54.gif',
  },
];

export interface Emoji extends PostIcon {
  pattern: RegExp | string;
}

export const emojis: Emoji[] = [
  {
    key: ':0:',
    pattern: /:0:/g,
    filename: 'icon4.gif',
  },
  {
    key: ':bang:',
    pattern: /:bang:/g,
    filename: 'banghead.gif',
  },
  {
    key: ':confused:',
    pattern: /:confused:/g,
    filename: 'confused.gif',
  },
  {
    key: ':eek:',
    pattern: /:eek:/g,
    filename: 'icon15.gif',
  },
  {
    key: ':hm:',
    pattern: /:hm:/g,
    filename: 'hm.gif',
  },
  {
    key: ':huch:',
    pattern: /:huch:/g,
    filename: 'freaked.gif',
  },
  {
    key: ':mad:',
    pattern: /:mad:/g,
    filename: 'icon13.gif',
  },
  {
    key: ':mata:',
    pattern: /:mata:/g,
    filename: 'mata.gif',
  },
  {
    key: ':moo:',
    pattern: /:moo:/g,
    filename: 'smiley-pillepalle.gif',
  },
  {
    key: ':roll:',
    pattern: /:roll:/g,
    filename: 'icon18.gif',
  },
  {
    key: ':ugly:',
    pattern: /:ugly:/g,
    filename: 'ugly.png',
  },
  {
    key: ':what:',
    pattern: /:what:/g,
    filename: 'sceptic.gif',
  },
  {
    key: ':wurgs:',
    pattern: /:wurgs:/g,
    filename: 'urgs.gif',
  },
  {
    key: ':xx:',
    pattern: /:xx:/g,
    filename: 'icon11.gif',
  },
  {
    key: ':zyklop:',
    pattern: /:zyklop:/g,
    filename: 'icon1.gif',
  },
  {
    key: ':zzz:',
    pattern: /:zzz:/g,
    filename: 'sleepy.gif',
  },
  {
    key: '8|',
    pattern: /\8\|/g,
    filename: 'icon3.gif',
  },
  {
    key: ':(',
    pattern: /:\(/g,
    filename: 'icon12.gif',
  },
  {
    key: ':)',
    pattern: /:\)/g,
    filename: 'icon7.gif',
  },
  {
    key: ':D',
    pattern: /:D/g,
    filename: 'biggrin.gif',
  },
  {
    key: ':o',
    pattern: /:o/g,
    filename: 'icon16.gif',
  },
  {
    key: ':p',
    pattern: /:p/g,
    filename: 'icon2.gif',
  },
  {
    key: ':|',
    pattern: /:\|/g,
    filename: 'icon8.gif',
  },
  {
    key: ';)',
    pattern: /;\)/g,
    filename: 'wink.gif',
  },
  {
    key: '^^',
    pattern: /\^\^/g,
    filename: 'icon5.gif',
  },
];

/**
 * Returns a random font awesome emoji icon path.
 * @returns A font awesome icon path.
 */
export function getRandomEmojiIcon() {
  return fontAwesomeEmojiPaths[
    Math.floor(Math.random() * fontAwesomeEmojiPaths.length)
  ];
}

export const fontAwesomeEmojiPaths = [
  'face-tired',
  'face-surprise',
  'face-smile-wink',
  'face-smile-beam',
  'face-sad-tear',
  'face-sad-cry',
  'face-rolling-eyes',
  'face-meh-blank',
  'face-meh',
  'face-laugh-wink',
  'face-laugh-squint',
  'face-laugh-beam',
  'face-laugh',
  'face-kiss-wink-heart',
  'face-kiss-beam',
  'face-kiss',
  'face-grin-wink',
  'face-grin-wide',
  'face-grin-tongue-wink',
  'face-grin-tongue-squint',
  'face-grin-tongue',
  'face-grin-tears',
  'face-grin-stars',
  'face-grin-squint-tears',
  'face-grin-squint',
  'face-grin-hearts',
  'face-grin-beam-sweat',
  'face-grin-beam',
  'face-grin',
  'face-grimace',
  'face-frown-open',
  'face-frown',
  'face-flushed',
  'face-dizzy',
  'face-angry',
];
