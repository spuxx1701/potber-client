import { createVideoContainer } from '../content-parser/_mock/video';

export const postContentMocks: ContentParserMock[] = [
  {
    input: `[video]https://i.imgur.com/3L4B6FD.mp4[/video]
    Funny? Impressive?
    Both!

    [video]https://i.imgur.com/hryNUcS.mp4[/video]
    [video]https://i.imgur.com/MvdqRZa.mp4[/video]
    The difference a year makes.`,
    expected: `${createVideoContainer(
      'https&#58;//i.imgur.com/3L4B6FD.mp4',
      '<video src="https&#58;//i.imgur.com/3L4B6FD.mp4" controls></video>',
    )}<br/>    Funny? Impressive?<br/>    Both!<br/><br/>    ${createVideoContainer(
      'https&#58;//i.imgur.com/hryNUcS.mp4',
      '<video src="https&#58;//i.imgur.com/hryNUcS.mp4" controls></video>',
    )}<br/>    ${createVideoContainer(
      'https&#58;//i.imgur.com/MvdqRZa.mp4',
      '<video src="https&#58;//i.imgur.com/MvdqRZa.mp4" controls></video>',
    )}<br/>    The difference a year makes.`,
  },
  {
    input: `<oh nein! Irgendweg.gif>`,
    expected: `&ltoh nein! Irgendweg.gif&gt`,
  },
  {
    input: `[url][img]https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:4xuf4gkbm7cgxqcgpnykzo6e/bafkreihu2a3rwp4hwqhtr6cgf6jejxffhmx5fiw4kpynemm3pulsw5xajy@jpeg[/img][/url]`,
    expected: `<a href="https&#58;//cdn.bsky.app/img/feed_fullsize/plain/did&#58;plc&#58;4xuf4gkbm7cgxqcgpnykzo6e/bafkreihu2a3rwp4hwqhtr6cgf6jejxffhmx5fiw4kpynemm3pulsw5xajy@jpeg" target="_blank"><img src="https&#58;//cdn.bsky.app/img/feed_fullsize/plain/did&#58;plc&#58;4xuf4gkbm7cgxqcgpnykzo6e/bafkreihu2a3rwp4hwqhtr6cgf6jejxffhmx5fiw4kpynemm3pulsw5xajy@jpeg"/></a>`,
  },
];
