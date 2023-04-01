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
        url: 'https://i.imgur.com/HcqkZMe.png',
      },
      {
        id: 'nutella',
        url: 'https://i.imgur.com/dYHwCy4.png',
      },
      {
        id: 'nutella2',
        url: 'https://i.imgur.com/nVWiTye.png',
      },
      {
        id: 'cunth0lz',
        url: 'https://i.imgur.com/4qQIfTq.gif',
      },
      {
        id: 'needpics',
        url: 'https://i.imgur.com/t9NNm2C.gif',
        width: 3,
      },
      {
        id: 'thisthreadisworthlesswithoutarzt',
        url: 'https://i.imgur.com/En0PkOJ.gif',
        width: 3,
      },
      {
        id: 'oktolon',
        url: 'https://i.imgur.com/xodIrtZ.gif',
      },
      {
        id: 'pwnedbypot',
        url: 'https://i.imgur.com/BWv3Wmw.gif',
      },
      {
        id: 'hacki',
        url: 'https://i.imgur.com/G2p4Mix.gif',
      },
      {
        id: 'fresse',
        url: 'https://i.imgur.com/3w8e25U.gif',
      },
      {
        id: 'alleverwarnt',
        url: 'https://i.imgur.com/W8GkHxa.gif',
        width: 2,
      },
      {
        id: 'wastun',
        url: 'https://i.imgur.com/H3lE1mI.gif',
      },
      {
        id: 'aehm',
        url: 'https://i.imgur.com/SCSozbd.gif',
      },
      {
        id: 'benderwelle',
        url: 'https://i.imgur.com/4vEMArc.gif',
        width: 2,
      },
      {
        id: 'orly',
        url: 'https://i.imgur.com/U4BjiDD.gif',
      },
      {
        id: 'shisha',
        url: 'https://i.imgur.com/faMQNx0.gif',
      },
      {
        id: 'peng',
        url: 'https://i.imgur.com/KdZkhch.gif',
      },
      {
        id: 'tock',
        url: 'https://i.imgur.com/YSRDe1y.gif',
      },
      {
        id: 'balla',
        url: 'https://i.imgur.com/vNYL8rW.gif',
      },
      {
        id: 'kitt',
        url: 'https://i.imgur.com/OIK7RGF.gif',
      },
      {
        id: 'rollugly',
        url: 'https://i.imgur.com/ONbZFgn.gif',
      },
      {
        id: 'winner',
        url: 'https://i.imgur.com/4vI82Zo.gif',
      },
      {
        id: 'naughty',
        url: 'https://i.imgur.com/6fnZzrJ.gif',
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
