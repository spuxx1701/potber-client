export const postContentMocks: ContentParserMock[] = [
  {
    input: `[video]https://i.imgur.com/3L4B6FD.mp4[/video]
    Funny? Impressive?
    Both!
    
    [video]https://i.imgur.com/hryNUcS.mp4[/video]
    [video]https://i.imgur.com/MvdqRZa.mp4[/video]
    The difference a year makes.`,
    expected: `<video src="https://i.imgur.com/3L4B6FD.mp4" controls></video><br/>    Funny? Impressive?<br/>    Both!<br/>    <br/>    <video src="https://i.imgur.com/hryNUcS.mp4" controls></video><br/>    <video src="https://i.imgur.com/MvdqRZa.mp4" controls></video><br/>    The difference a year makes.`,
  },
];
