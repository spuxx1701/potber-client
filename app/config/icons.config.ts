export interface PostIcon {
  key: string;
  filename: string | null;
  christmasFilename?: string;
}

export interface Emoji extends PostIcon {
  pattern: RegExp | string;
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
    christmasFilename: '32_christmas.gif',
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
    christmasFilename: '35_christmas.gif',
  },
  {
    key: '36',
    filename: '36.gif',
  },
  {
    key: '37',
    filename: '37.gif',
    christmasFilename: '37_christmas.gif',
  },
  {
    key: '38',
    filename: '38.gif',
    christmasFilename: '38_christmas.gif',
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
    christmasFilename: '41_christmas.gif',
  },
  {
    key: '42',
    filename: '42.gif',
    christmasFilename: '42_christmas.gif',
  },
  {
    key: '54',
    filename: '54.gif',
  },
];

export type PostIconKey = (typeof postIcons)[number]['key'];

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
    christmasFilename: 'banghead_christmas.gif',
  },
  {
    key: ':confused:',
    pattern: /:confused:/g,
    filename: 'confused.gif',
    christmasFilename: 'confused_christmas.gif',
  },
  {
    key: ':eek:',
    pattern: /:eek:/g,
    filename: 'icon15.gif',
    christmasFilename: 'icon15_christmas.gif',
  },
  {
    key: ':hm:',
    pattern: /:hm:/g,
    filename: 'hm.gif',
    christmasFilename: 'hm_christmas.gif',
  },
  {
    key: ':huch:',
    pattern: /:huch:/g,
    filename: 'freaked.gif',
    christmasFilename: 'freaked_christmas.gif',
  },
  {
    key: ':mad:',
    pattern: /:mad:/g,
    filename: 'icon13.gif',
    christmasFilename: 'icon13_christmas.gif',
  },
  {
    key: ':mata:',
    pattern: /:mata:/g,
    filename: 'mata.gif',
    christmasFilename: 'mata_christmas.gif',
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
    christmasFilename: 'icon18_christmas.gif',
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
    christmasFilename: 'sceptic_christmas.gif',
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
    christmasFilename: 'icon1_christmas.gif',
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
    christmasFilename: 'icon12_christmas.gif',
  },
  {
    key: ':)',
    pattern: /:\)/g,
    filename: 'icon7.gif',
    christmasFilename: 'icon7_christmas.gif',
  },
  {
    key: ':D',
    pattern: /:D/g,
    filename: 'biggrin.gif',
    christmasFilename: 'biggrin_christmas.gif',
  },
  {
    key: ':o',
    pattern: /:o/g,
    filename: 'icon16.gif',
    christmasFilename: 'icon16_christmas.gif',
  },
  {
    key: ':p',
    pattern: /:p/g,
    filename: 'icon2.gif',
    christmasFilename: 'icon2_christmas.gif',
  },
  {
    key: ':|',
    pattern: /:\|/g,
    filename: 'icon8.gif',
    christmasFilename: 'icon8_christmas.gif',
  },
  {
    key: ';)',
    pattern: /;\)/g,
    filename: 'wink.gif',
    christmasFilename: 'wink_christmas.gif',
  },
  {
    key: '^^',
    pattern: /\^\^/g,
    filename: 'icon5.gif',
    christmasFilename: 'icon5_christmas.gif',
  },
];

export type EmojiKey = (typeof emojis)[number]['key'];

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
