interface UrlTagMocks {
  normal: ContentParserMock[];
  withReplacingForumUrls: ContentParserMock[];
}

export const urlTagMocks: UrlTagMocks = {
  normal: [
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

    <a href="https&#58;//twitter.com/DefenceU/status/1654511267791470599" target="_blank">https://twitter.com/DefenceU/status/1654511267791470599</a>

    /
    [img]https://i.imgur.com/SinhCx6.png[/img]

    Mit dem Ding kann man auch was anderes führen als ein Land.

    [img]https://i.imgur.com/RABDrguh.png[/img]`,
    },
    {
      input: `[b][i]Du willst doch mein Passwort![/i][/b]
    Passwörter werden natürlich nicht gespeichert. Weil der Quellcode offen ist, lässt sich das [url=https&#58;//github.com/spuxx1701/potber-client/blob/develop/app/controllers/login.ts#L30]hier[/url] (Client) und [url=https://github.com/spuxx1701/potber-api/blob/develop/src/auth/auth.service.ts#L19]hier[/url] (API) auch nachprüfen.`,
      expected: `[b][i]Du willst doch mein Passwort![/i][/b]
    Passwörter werden natürlich nicht gespeichert. Weil der Quellcode offen ist, lässt sich das <a href="https&#58;//github.com/spuxx1701/potber-client/blob/develop/app/controllers/login.ts#L30" target="_blank">hier</a> (Client) und <a href="https&#58;//github.com/spuxx1701/potber-api/blob/develop/src/auth/auth.service.ts#L19" target="_blank">hier</a> (API) auch nachprüfen.`,
    },
    {
      input: `[url=https://www.t-online.de/nachrichten/deutschland/innenpolitik/id_100219588/afd-parteitag-26-jaehrige-kaiser-will-21-jahre-berufserfahrung-haben.html]Erstaunen auf dem Parteitag
    26-jährige AfD-Frau: Habe 21 Jahre Berufserfahrung[/url]`,
      expected: `<a href="https&#58;//www.t-online.de/nachrichten/deutschland/innenpolitik/id_100219588/afd-parteitag-26-jaehrige-kaiser-will-21-jahre-berufserfahrung-haben.html" target="_blank">Erstaunen auf dem Parteitag
    26-jährige AfD-Frau: Habe 21 Jahre Berufserfahrung</a>`,
    },
    {
      input: `[url]https://forum.mods.de/bb//thread.php?TID=219289&PID=1249813752[/url]`,
      expected: `<a href="https&#58;//forum.mods.de/bb//thread.php?TID=219289&PID=1249813752" target="_blank">https://forum.mods.de/bb//thread.php?TID=219289&PID=1249813752</a>`,
    },
    {
      input: `[url=https://forum.mods.de/bb//thread.php?TID=219289&PID=1249813752]Foo[/url]`,
      expected: `<a href="https&#58;//forum.mods.de/bb//thread.php?TID=219289&PID=1249813752" target="_blank">Foo</a>`,
    },
  ],
  withReplacingForumUrls: [
    {
      input: `[url]https://forum.mods.de/bb//thread.php?TID=219289&PID=1249813752[/url]`,
      expected: `<a href="https&#58;//test.potber.de/thread?TID=219289&PID=1249813752">https://forum.mods.de/bb//thread.php?TID=219289&PID=1249813752</a>`,
    },
    {
      input: `[url]https://forum.mods.de/bb/thread.php?TID=219289&PID=1249813752[/url]`,
      expected: `<a href="https&#58;//test.potber.de/thread?TID=219289&PID=1249813752">https://forum.mods.de/bb/thread.php?TID=219289&PID=1249813752</a>`,
    },
    {
      input: `[URL]https://forum.mods.de/bb//thread.php?TID=219311&PID=1250001764[/URL]`,
      expected: `<a href="https&#58;//test.potber.de/thread?TID=219311&PID=1250001764">https://forum.mods.de/bb//thread.php?TID=219311&PID=1250001764</a>`,
    },
    {
      input: `[url=https://forum.mods.de/bb//thread.php?TID=219289&PID=1249813752]Foo[/url]`,
      expected: `<a href="https&#58;//test.potber.de/thread?TID=219289&PID=1249813752">Foo</a>`,
    },
    {
      input: `[url=https://forum.mods.de/thread.php?TID=219289&PID=1249813752]Foo[/url]`,
      expected: `<a href="https&#58;//test.potber.de/thread?TID=219289&PID=1249813752">Foo</a>`,
    },
  ],
};
