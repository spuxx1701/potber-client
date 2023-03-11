export interface MemeCategory {
  name: string;
  memes: Meme[];
}

export interface Meme {
  id: string;
  url: string;
  width?: 1 | 2 | 3 | 4 | 5;
}

export const memeCategories: MemeCategory[] = [
  {
    name: 'Brunch',
    memes: [
      {
        id: 'FerdAerger',
        url: 'https://i.imgur.com/EvHTsCR.png',
      },
      {
        id: 'FerdAugen',
        url: 'https://i.imgur.com/kYAtR2L.png',
      },
      {
        id: 'FerdBah',
        url: 'https://i.imgur.com/bkFr0WV.png',
      },
      {
        id: 'FerdBlorg',
        url: 'https://i.imgur.com/57LKD3H.png',
      },
      {
        id: 'FerdDenken',
        url: 'https://i.imgur.com/D6x3o52.png',
      },
      {
        id: 'FerdHuea',
        url: 'https://i.imgur.com/lY6droK.gif',
      },
      {
        id: 'FerdKaffee',
        url: 'https://i.imgur.com/xeTpXWo.png',
      },
      {
        id: 'FerdSchoen',
        url: 'https://i.imgur.com/XmfGXSf.png',
      },
      {
        id: 'FerdSchweiss',
        url: 'https://i.imgur.com/lACa4fI.png',
      },
      {
        id: 'FerdWas',
        url: 'https://i.imgur.com/275ayFn.png',
      },
      {
        id: 'FerdWeimen',
        url: 'https://i.imgur.com/RRuKQjU.png',
      },
      {
        id: 'FerdWzzz',
        url: 'https://i.imgur.com/p7latIn.png',
      },
    ],
  },
  {
    name: 'Smiley-Galerie',
    memes: [
      {
        id: 'hallocain',
        url: 'http://potsmilies.hetscher.de/hallocain.gif',
      },
      {
        id: 'nutella',
        url: 'http://potsmilies.hetscher.de/nutella.gif',
      },
      {
        id: 'nutella2',
        url: 'http://potsmilies.hetscher.de/nutella2.gif',
      },
      {
        id: 'cunth0lz',
        url: 'http://potsmilies.hetscher.de/cunth0lz.gif',
      },
      {
        id: 'needpics',
        url: 'http://potsmilies.hetscher.de/needpics.gif',
        width: 3,
      },
      {
        id: 'thisthreadisworthlesswithoutarzt',
        url: 'http://potsmilies.hetscher.de/thisthreadisworthlesswithoutarzt.gif',
        width: 3,
      },
      {
        id: 'oktolon',
        url: 'http://potsmilies.hetscher.de/oktolon.gif',
      },
      {
        id: 'pwnedbypot',
        url: 'http://potsmilies.hetscher.de/pwnedbypot.gif',
      },
      {
        id: 'hacki',
        url: 'http://potsmilies.hetscher.de/hacki.gif',
      },
      {
        id: 'fresse',
        url: 'http://potsmilies.hetscher.de/fresse.gif',
      },
      {
        id: 'alleverwarnt',
        url: 'http://potsmilies.hetscher.de/alleverwarnt.gif',
        width: 2,
      },
      {
        id: 'wastun',
        url: 'http://potsmilies.hetscher.de/wastun.gif',
      },
      {
        id: 'aehm',
        url: 'http://potsmilies.hetscher.de/aehm.gif',
      },
      {
        id: 'benderwelle',
        url: 'http://potsmilies.hetscher.de/benderwelle.gif',
        width: 2,
      },
      {
        id: 'orly',
        url: 'http://potsmilies.hetscher.de/orly.gif',
      },
      {
        id: 'shisha',
        url: 'http://potsmilies.hetscher.de/shisha.gif',
      },
      {
        id: 'peng',
        url: 'http://potsmilies.hetscher.de/peng.gif',
      },
      {
        id: 'tock',
        url: 'http://potsmilies.hetscher.de/tock.gif',
      },
      {
        id: 'balla',
        url: 'http://potsmilies.hetscher.de/balla.gif',
      },
      {
        id: 'kitt',
        url: 'http://potsmilies.hetscher.de/kitt.gif',
      },
      {
        id: 'rollugly',
        url: 'http://potsmilies.hetscher.de/rollugly.gif',
      },
      {
        id: 'winner',
        url: 'http://potsmilies.hetscher.de/winner.gif',
      },
      {
        id: 'naughty',
        url: 'http://potsmilies.hetscher.de/naughty.gif',
      },
    ],
  },
  {
    name: 'pOT-Galerie',
    memes: [
      {
        id: 'breakglass',
        url: 'https://i.imgur.com/9dzR3Kc.png',
        width: 3,
      },
      {
        id: 'creepydude',
        url: 'https://i.imgur.com/pYyQu0Q.jpeg',
        width: 3,
      },
      {
        id: 'confused',
        url: 'https://i.imgur.com/Cpa8ZWr.jpeg',
        width: 3,
      },
      {
        id: 'ptsd',
        url: 'https://i.imgur.com/71zzXCc.png',
        width: 3,
      },
      {
        id: 'rausausdemthreaddupenner',
        url: 'https://i.imgur.com/60DMB32.png',
        width: 3,
      },
      {
        id: 'triggeredolaf',
        url: 'https://i.imgur.com/VPXKe3I.gif',
        width: 2,
      },
      {
        id: 'bravodude',
        url: 'https://i.imgur.com/QLW2Ogl.png',
        width: 2,
      },
      {
        id: 'erazorpolice',
        url: 'https://i.imgur.com/ibPydYc.gif',
        width: 2,
      },
      {
        id: 'sharkupolice',
        url: 'https://i.imgur.com/EwIb9wm.gif',
        width: 2,
      },
      {
        id: 'olafballaugenzucken',
        url: 'https://i.imgur.com/QUneJ4r.gif',
        width: 2,
      },
    ],
  },
  {
    name: 'Bayern',
    memes: [
      {
        id: 'wostnetsogst',
        url: 'https://i.imgur.com/KoazE.jpeg',
        width: 2,
      },
      {
        id: 'schaublossdasstlandgwinnst',
        url: 'https://i.imgur.com/Tf0aK.png',
        width: 2,
      },
      {
        id: 'tableflip',
        url: 'https://i.imgur.com/lFMhF.jpeg',
        width: 2,
      },
      {
        id: 'desdaugtma',
        url: 'https://i.imgur.com/wXKIy.jpeg',
        width: 2,
      },
      {
        id: 'jetzbusslts',
        url: 'https://i.imgur.com/a9ubE.jpeg',
        width: 2,
      },
      {
        id: 'jofrly',
        url: 'https://i.imgur.com/EZ3hP.jpeg',
        width: 2,
      },
    ],
  },
];
