export interface Emoji {
  key: string;
  pattern: RegExp | string;
  filename: string;
}

export const emojis = [
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
    key: ':D',
    pattern: /:D/g,
    filename: 'biggrin.gif',
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
] as Emoji[];
