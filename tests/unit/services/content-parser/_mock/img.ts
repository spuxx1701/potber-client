export const imgTagMocks: ContentParserMock[] = [
  {
    input: `[video]https://www.youtube.com/watch?v=kRzgCylePjk[/video]

    [img]https://i.imgur.com/7j15tXU.jpeg[/img]`,
    expected: `[video]https://www.youtube.com/watch?v=kRzgCylePjk[/video]

    <img src="https://i.imgur.com/7j15tXU.jpeg"/>`,
  },
  {
    input: `Random Youtubefunde. Heute: eines der ältesten je gefundenen Raubtiere der Welt, [url=https://en.wikipedia.org/wiki/Anomalocaris]Anomalocaris[/url], irgendwas um die 500 Millionen Jahre alt.



    [img]https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/20191203_Anomalocaris_canadensis.png/220px-20191203_Anomalocaris_canadensis.png[/img]
    
    
    
    [video]https://www.youtube.com/watch?v=x7M348dVaio[/video]
    
    
    
    Fucking Aliens.`,
    expected: `Random Youtubefunde. Heute: eines der ältesten je gefundenen Raubtiere der Welt, [url=https://en.wikipedia.org/wiki/Anomalocaris]Anomalocaris[/url], irgendwas um die 500 Millionen Jahre alt.



    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/20191203_Anomalocaris_canadensis.png/220px-20191203_Anomalocaris_canadensis.png"/>
    
    
    
    [video]https://www.youtube.com/watch?v=x7M348dVaio[/video]
    
    
    
    Fucking Aliens.`,
  },
  {
    input: `du meinst der gierige goblin, der sich eine yacht leisten will, hat nichts mit dem kotick zu tun?\r\n\r\n[img]https://i.imgur.com/AmFYJIk.png[/img]`,
    expected: `du meinst der gierige goblin, der sich eine yacht leisten will, hat nichts mit dem kotick zu tun?\r\n\r\n<img src="https://i.imgur.com/AmFYJIk.png"/>`,
  },
];
