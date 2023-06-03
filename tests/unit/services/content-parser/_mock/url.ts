export const urlTagMocks: ContentParserMock[] = [
  {
    input: `hello world`,
    expected: `hello world`,
  },
  {
    input: `[img]https://i.imgur.com/YOe9ufzl.png[/img]

    [img]https://abload.de/img/ryfdsmf94u0t.gif[/img]
    
    [URL]https://twitter.com/DefenceU/status/1654511267791470599[/URL]
    
    /
    [img]https://i.imgur.com/SinhCx6.png[/img]
    
    Mit dem Ding kann man auch was anderes führen als ein Land.
    
    [img]https://i.imgur.com/RABDrguh.png[/img]`,
    expected: `[img]https://i.imgur.com/YOe9ufzl.png[/img]

    [img]https://abload.de/img/ryfdsmf94u0t.gif[/img]
    
    <a href="https://twitter.com/DefenceU/status/1654511267791470599" target="_blank">https://twitter.com/DefenceU/status/1654511267791470599</a>
    
    /
    [img]https://i.imgur.com/SinhCx6.png[/img]
    
    Mit dem Ding kann man auch was anderes führen als ein Land.
    
    [img]https://i.imgur.com/RABDrguh.png[/img]`,
  },
  {
    input: `[b][i]Du willst doch mein Passwort![/i][/b]
    Passwörter werden natürlich nicht gespeichert. Weil der Quellcode offen ist, lässt sich das [url=https://github.com/spuxx1701/potber-client/blob/develop/app/controllers/login.ts#L30]hier[/url] (Client) und [url=https://github.com/spuxx1701/potber-api/blob/develop/src/auth/auth.service.ts#L19]hier[/url] (API) auch nachprüfen.`,
    expected: `[b][i]Du willst doch mein Passwort![/i][/b]
    Passwörter werden natürlich nicht gespeichert. Weil der Quellcode offen ist, lässt sich das <a href="https://github.com/spuxx1701/potber-client/blob/develop/app/controllers/login.ts#L30" target="_blank">hier</a> (Client) und <a href="https://github.com/spuxx1701/potber-api/blob/develop/src/auth/auth.service.ts#L19" target="_blank">hier</a> (API) auch nachprüfen.`,
  },
];
