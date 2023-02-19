import Thread from 'potber-client/models/thread';

export const threadMocks = {
  potber: {
    id: '219289',
    title: 'potber',
    subtitle: 'pot meets ember: Ein mobile-first web client',
    repliesCount: 389,
    hitsCount: 14894,
    pagesCount: 13,
    isClosed: false,
    isSticky: false,
    isImportant: false,
    isAnnouncement: false,
    isGlobal: false,
    boardId: '14',
    firstPost: {
      author: {
        id: '1268185',
        name: 'Ameisenfutter',
      },
      date: '2023-01-14T21:44:01.000Z',
      icon: '37',
      threadId: '219289',
      boardId: '14',
    },
    page: {
      number: 1,
      offset: 0,
      postCount: 30,
      posts: [
        {
          id: '1249813752',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-14T21:44:01.000Z',
          title: 'pot meets ember: Ein mobile-first web client',
          icon: '37',
          message:
            'Hallo! o/\r\n\r\n[u][b]1. Was ist potber?[/b][/u]\r\npotber begann als reiner web client, damit auch unsere Apple-Freunde endlich unterwegs shitposten können. Mittlerweile ist potber aber viel mehr und besteht aus zwei Teilen:\r\n\r\n[b]1)[/b] [url=https://potber.de/]potber-client[/url] ist mit [url=https://emberjs.com/]Ember.js[/url] entwickelt, woraus sich auch der Name ergibt (pot + ember = potber). potber-client kann im Browser bedient, aber auch wie eine App bedient werden ([url=https://github.com/spuxx1701/potber-client/blob/develop/README.md#standalone-mode-pwa]HowTo[/url]). Potber ist grundsätzlich responsiv, aber für mobile Geräte optimiert und unterstützt [url=https://github.com/spuxx1701/potber-client/blob/develop/README.md#browser-support]diese[/url] Browser.\r\n\r\n[b]2)[/b] [url=https://api.potber.de/swagger]potber-api[/URL] ist ein Node.js server, der eine zeitgemäße JSON-Schnittstelle zum Forum bereitstellt. Sie nutzt sowohl die XML-API des Forums als auch HTML-Seiten des Forums, um mit dem Forum zu kommunizieren. Für Konsumenten hat das den enormen Vorteil, dass ihnen der doch zum Teil schwierige Umgang mit der alten Forensoftware erspart wird. Entwickelt wurde die Schnittstelle mit [url=https://nestjs.com/]NestJS[/url]. potber-api wird natürlich von potber-client genutzt, steht aber ausdrücklich anderen Anwendungen offen, die sie verwenden möchten. :)\r\n\r\n[b]➡ Ihr findet den client unter [url]https://potber.de[/url]. ⬅[/b]\r\n\r\n[u][b]2. potber-client[/b][/u]\r\n\r\n[b]2.1 Features[/b]\r\n[list][*] Kompatibel mit aktuellen Versionen von Chrome, Firefox & Safari (Mobile & Desktop)\r\n[*] [url=https://github.com/spuxx1701/potber-client/blob/develop/README.md#standalone-mode-pwa]Standalone-Modus[/url]\r\n[*] Browsing von Boards, Threads und Posts\r\n[*] Lesezeichen\r\n[*] Erstellen, Editieren und Zitieren von Posts\r\n[*] Avatare\r\n[*] Board-Favoriten\r\n[*] BBCode-Support\r\n[/list]\r\n\r\n[b]2.2 Interoperabilität[/b]\r\nIch habe mir Mühe gegeben, so weit wie möglich zu gewährleisten, dass man "fliegend" zwischen potber und dem Forum wechseln kann. Dazu gehört, dass sich überall in der Anwendung Absprungmöglichkeiten zum Forum finden, aber auch, dass URLs weitestgehend kompatibel sind. Ihr könnt jederzeit den Teil ab dem "?" in der URL kopieren und an die entsprechende potber-URL anhängen (und umgekehrt). Ein paar Beispiele:\r\n\r\n[URL]https://forum.mods.de/bb/board.php?BID=14[/URL]\r\n[URL]https://potber.de/board?BID=14[/URL]\r\n\r\n[URL]https://forum.mods.de/bb/thread.php?TID=219289&page=2[/URL]\r\n[URL]https://potber.de/thread?TID=219289&page=2[/URL]\r\n\r\n[URL]https://forum.mods.de/bb/thread.php?TID=219289&PID=1249815066#reply_1249815066[/URL]\r\n[URL]https://potber.de/thread?TID=219289&PID=1249815066#reply_1249815066[/URL]\r\n\r\n[b]2.3 Links[/b]\r\n[list][*] [url=https://potber.de]potber-client[/url]\r\n[*] [url=https://test.potber.de]potber-client (Testumgebung)[/url] - Neue Features können hier getestet werden (obacht, instabil!)\r\n[*] [url=https://github.com/spuxx1701/potber-client/blob/develop/README.md]Dokumentation[/url]\r\n[*] [url=https://github.com/spuxx1701/potber-client/blob/develop/CHANGELOG.md]Changelog[/url]\r\n[*] [url=https://github.com/spuxx1701/potber-client/milestones]Roadmap[/url]\r\n[*] [url=https://github.com/spuxx1701/potber-client/issues]GitHub Issues[/url] - Bugs & Feature requests\r\n[*][url=https://github.com/spuxx1701/potber-client]GitHub Repository[/url]\r\n[*] [url=https://hub.docker.com/repository/docker/spuxx/potber-client/general] DockerHub Repository[/url]\r\n[/list]\r\n\r\n[u][b]3. potber-api[/b][/u]\r\n\r\n[b]3.1 Features[/b]\r\n[list][*] Authentifizierung & Session via [url=https://jwt.io/]JWT[/url]\r\n[*] Vollständig dokumentiert mit Swagger\r\n[*] Größtenteils RESTful (soweit das Forum es zulässt)\r\n[*] Umfangreiche Input-Validierung\r\n[*] CORS-Support (für eine Freischaltung einfach melden!)\r\n[*] Bietet alle zentralen Funktionen rund um Boards, Threads & Posts\r\n[/list]\r\n\r\n[b]3.2 Links[/b]\r\n[list][*] [url=https://api.potber.de]potber-api[/url]\r\n[*] [url=https://test-api.potber.de]potber-api - Testumgebung[/url] - Neue Features können hier getestet werden (obacht, instabil!)\r\n[*] [url=https://github.com/spuxx1701/potber-api/blob/develop/README.md]Dokumentation[/url]\r\n[*] [url=https://github.com/spuxx1701/potber-api/blob/develop/CHANGELOG.md]Changelog[/url]\r\n[*] [url=https://github.com/spuxx1701/potber-api/issues]GitHub Issues[/url] - Bugs & Feature requests\r\n[*][url=https://github.com/spuxx1701/potber-api]GitHub Repository[/url]\r\n[*] [url=https://hub.docker.com/repository/docker/spuxx/potber-api/general] DockerHub Repository[/url]\r\n[/list]\r\n\r\n[u][b]4. FAQ[/b][/u]\r\n\r\n[b][i]Bei potber-api verstehe ich nur Bahnhof. Was ist es und was tut es?[/i][/b]\r\nEine API ist eine Schnittstelle, also eine Komponente, über die eine Software mit einer anderen Software kommunzieren kann. Man mag es kaum glauben, aber tatsächlich hat enos damals(tm) sogar für das Forum eine solche Schnittstelle implementiert. Leider ist diese Schnittstelle inzwischen deutlich in die Jahre gekommen und ist auch unvollständig, bietet also einige zentrale Funktionen nicht an. potber-api versucht ist dem Forum vorgeschaltet und versucht, beide Probleme zu lösen: Einerseits eine zeitgemäße Schnittstelle bereitzustellen und andererseits fehlende Funktionen bereitzustellen. Für den Durchschnittsuser ist potber-api nicht direkt von Bedeutung, aber die nächste Person, die für das pot eine kleine App entwickeln möchte, freut sich vielleicht über eine zugänglichere und umfangreichere Schnittstelle. ♥\r\n\r\n[b][i]Du willst doch mein Passwort![/i][/b]\r\nPasswörter werden natürlich nicht gespeichert. Weil der Quellcode offen ist, lässt sich das [url=https://github.com/spuxx1701/potber-client/blob/develop/app/controllers/login.ts#L30]hier[/url] (Client) und [url=https://github.com/spuxx1701/potber-api/blob/develop/src/auth/auth.service.ts#L19]hier[/url] (API) auch nachprüfen.\r\n\r\n[b][i]Ich mag lieber native Anwendungen. Kann man potber auch wie eine App installieren?[/i][/b]\r\nWenn Euer Browser das unterstützt: Ja! Üblicherweise findet sich unter den Einstellungen, wenn ihr die Webseite aufruft, ein Button zum Hinzufügen zum Startbildschirm oder "App installieren". Anschließend wird Eurem Startbildschirm ein Icon für potber hinzugefügt und ihr merkt anschließend kaum noch, dass ihr die Anwendung im Browser bedient. Die Technologie dahinter heißt übrigens [url=https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps]PWA[/url].',
          editedCount: 31,
          lastEdit: {
            user: {
              id: '1268185',
              name: 'Ameisenfutter',
            },
            date: '2023-02-16T12:25:07.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813756',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-14T21:46:27.000Z',
          message:
            'Ein Beispiel:\r\n\r\n[img]https://i.imgur.com/JCugWvem.png[/img]',
          editedCount: 1,
          lastEdit: {
            user: {
              id: '1268185',
              name: 'Ameisenfutter',
            },
            date: '2023-01-14T22:00:43.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813766',
          author: {
            id: '32066',
            groupId: '6',
            name: 'Kane*',
          },
          date: '2023-01-14T21:52:32.000Z',
          icon: '2',
          message:
            'Ich habe ja nicht mehr damit gerechnet, dass sich dem noch jemand annimmt und ich finde es großartig! <3\r\n\r\nLeider kann ich mangels jeglicher programmiertechnischer Fähigkeiten nicht wirklich etwas inhaltliches beisteuern. :(',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U32066--kane_wolverine.png',
          contentHidden: false,
        },
        {
          id: '1249813821',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-14T22:44:31.000Z',
          message:
            '8|:(:):0::bang::confused::D:eek::hm::huch::mad::mata::moo::o:p:roll::ugly::what::wurgs::xx::zyklop::zzz::|;)^^\r\n\r\nIch baue noch den emoji parser, bevor ich pennen gehe. :o\r\n\r\n/ BBCode zum testen\r\n\r\n[b]fett[/b]\r\n[u]unterstrichen[/u]\r\n[code]code[/code]\r\n[i]kursiv[/i]\r\n[s]durchgestrichen[/s]\r\n[list][*]Listenelement 1\r\n[*]Listenelement 2\r\n[/list]\r\n[quote]Normale Quote[/quote]\r\n[quote=219289,1249814812,"Ameisenfutter"][b]\r\nNormale Quote mit Autor\r\n[/b][/quote]\r\nNested Quote:\r\n[quote=219289,1249815340,"PutzFrau"][b]\r\n[quote=219289,1249815053,"Admiral Bohm"][b]\r\n[quote=219289,1249815045,"Ameisenfutter"][b]\r\n[quote=219289,1249814990,"PutzFrau"][b]\r\n[quote=219289,1249814812,"Ameisenfutter"][b]\r\n\r\n/ Issues kann ohnehin jeder erstellen, der einen GitHub-Account hat.\r\n[/b][/quote]\r\n\r\nTop. Evtl werde ich einen pOT GH account erstellen, um nicht meinen echten Namen zu doxxen. Und alles schön auf Englisch, wunderbar. Ich habe mich echt schwer getan meinen Bugreport auf deutsch zu schreiben.\r\n\r\n:|\r\n[/b][/quote]\r\nJa, ich kann auch nicht mehr switchen. :D Discord- und Codesprache ist bei mir Englisch, alles andere fühlt sich weird an.\r\n[/b][/quote]\r\n\r\nGeht mir ähnlich, aber bei Behördensoftware wird es ... weird. [URL]https://github.com/digitalservicebund/grundsteuer/blob/main/app/domain/states/states.server.ts[/URL]\r\n\r\npreviousFlurstueckHasMiteigentum :ugly:\r\n[/b][/quote]\r\n\r\nGenau mein Humor: [i]isGrundstueckBundeslandKnown[/i]\r\n\r\n:|\r\n[/b][/quote]\r\n[spoiler]Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.[/spoiler]',
          editedCount: 3,
          lastEdit: {
            user: {
              id: '1268185',
              name: 'Ameisenfutter',
            },
            date: '2023-01-17T00:11:17.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813825',
          author: {
            id: '3035',
            groupId: '3',
            name: '[FGS]E-RaZoR',
          },
          date: '2023-01-14T22:47:40.000Z',
          message: 'Gill Sans als Font, ich glaube es hackt. Verdana!',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U3035--e-razor.png',
          contentHidden: false,
        },
        {
          id: '1249813829',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-14T22:52:15.000Z',
          message:
            '[quote=219289,1249813825,"[FGS]E-RaZoR"][b]\r\nGill Sans als Font, ich glaube es hackt. Verdana!\r\n[/b][/quote]\r\n\r\nJawollja o7',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813839',
          author: {
            id: '20938',
            groupId: '3',
            name: '-=Q=- 8-BaLL',
          },
          date: '2023-01-14T23:10:26.000Z',
          message:
            '[quote=219289,1249813766,"Kane*"][b]\nIch habe ja nicht mehr damit gerechnet, dass sich dem noch jemand annimmt und ich finde es großartig! <3\n[/b][/quote]\n\n\nDem schließ ich mich an!\n\nAls Anregung fällt mir auf, das Verhältnis von Beitragenden zu Beitrag sieht vertauscht aus, also Nick und Bender sind sehr groß, aber der Text sehr klein.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/-=Q=- 8-BaLL.gif',
          contentHidden: false,
        },
        {
          id: '1249813951',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-15T07:45:05.000Z',
          message:
            '[quote=219289,1249813839,"-=Q=- 8-BaLL"][b]\n[quote=219289,1249813766,"Kane*"][b]\nIch habe ja nicht mehr damit gerechnet, dass sich dem noch jemand annimmt und ich finde es großartig! <3\n[/b][/quote]\n\n\nDem schließ ich mich an!\n\nAls Anregung fällt mir auf, das Verhältnis von Beitragenden zu Beitrag sieht vertauscht aus, also Nick und Bender sind sehr groß, aber der Text sehr klein.\n[/b][/quote]\nMeinst Du die Schriftgröße und meinst Du sehr kurze Posts wie z.B. der von E-Razor?',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813976',
          author: {
            id: '1314447',
            groupId: '3',
            name: 'MartiniMoe',
          },
          date: '2023-01-15T09:33:03.000Z',
          message:
            'Sieht ja schon mega gut aus! Hoffentlich klappt das mit dem CORS :)',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1314447--V3RxmC4.png',
          contentHidden: false,
        },
        {
          id: '1249813977',
          author: {
            id: '32632',
            groupId: '3',
            name: '[gc]Fidel',
          },
          date: '2023-01-15T09:41:22.000Z',
          message: 'Caveman?',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: 'avatare/oldb/koksendefidel.gif',
          contentHidden: false,
        },
        {
          id: '1249813981',
          author: {
            id: '62019',
            groupId: '3',
            name: 'fatal-x',
          },
          date: '2023-01-15T09:47:00.000Z',
          message: 'das Pot wird durch eine XML Pipe agile gedropt, oder so!',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U62019--fatal-xxxx.png',
          contentHidden: false,
        },
        {
          id: '1249813985',
          author: {
            id: '20938',
            groupId: '3',
            name: '-=Q=- 8-BaLL',
          },
          date: '2023-01-15T09:51:50.000Z',
          message:
            '[quote=219289,1249813951,"Ameisenfutter"][b]\n[quote=219289,1249813839,"-=Q=- 8-BaLL"][b]\n[quote=219289,1249813766,"Kane*"][b]\nIch habe ja nicht mehr damit gerechnet, dass sich dem noch jemand annimmt und ich finde es großartig! <3\n[/b][/quote]\n\n\nDem schließ ich mich an!\n\nAls Anregung fällt mir auf, das Verhältnis von Beitragenden zu Beitrag sieht vertauscht aus, also Nick und Bender sind sehr groß, aber der Text sehr klein.\n[/b][/quote]\nMeinst Du die Schriftgröße und meinst Du sehr kurze Posts wie z.B. der von E-Razor?\n[/b][/quote]\n\nBeides in Verbindung glaub ich, gerade bei kurzen Posts fällt es auf.\n\n[img]https://i.imgur.com/ovSTH5nl.png[/img]\n\nDer neue Inhalt, also Post, säuft optisch ab gegenüber dem Statischen, dem Quote, dem Drumherum.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/-=Q=- 8-BaLL.gif',
          contentHidden: false,
        },
        {
          id: '1249813990',
          author: {
            id: '1340119',
            groupId: '3',
            name: 'Ed_Von_Schleck69',
          },
          date: '2023-01-15T10:04:20.000Z',
          message: 'Dieses Projekt verdient ein Lesezeichen.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1340119--eddy.png',
          contentHidden: false,
        },
        {
          id: '1249813991',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-15T10:07:01.000Z',
          message: '<3',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813993',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-15T10:08:04.000Z',
          message:
            '[quote=219289,1249813985,"-=Q=- 8-BaLL"][b]\r\n[quote=219289,1249813951,"Ameisenfutter"][b]\r\n[quote=219289,1249813839,"-=Q=- 8-BaLL"][b]\r\n[quote=219289,1249813766,"Kane*"][b]\r\nIch habe ja nicht mehr damit gerechnet, dass sich dem noch jemand annimmt und ich finde es großartig! <3\r\n[/b][/quote]\r\n\r\n\r\nDem schließ ich mich an!\r\n\r\nAls Anregung fällt mir auf, das Verhältnis von Beitragenden zu Beitrag sieht vertauscht aus, also Nick und Bender sind sehr groß, aber der Text sehr klein.\r\n[/b][/quote]\r\nMeinst Du die Schriftgröße und meinst Du sehr kurze Posts wie z.B. der von E-Razor?\r\n[/b][/quote]\r\n\r\nBeides in Verbindung glaub ich, gerade bei kurzen Posts fällt es auf.\r\n\r\n[url]https://i.imgur.com/ovSTH5nl.png[/url]\r\n\r\nDer neue Inhalt, also Post, säuft optisch ab gegenüber dem Statischen, dem Quote, dem Drumherum.\r\n[/b][/quote]\r\nWas würdest Du verbessern? Dass kurze Posts nicht mit so viel leerem Raum aufgefüllt werden wie im echten Board ist ja ganz gut für mobile.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813994',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-15T10:08:50.000Z',
          message:
            '[quote=219289,1249813981,"fatal-x"][b]\r\ndas Pot wird durch eine XML Pipe agile gedropt, oder so!\r\n[/b][/quote]\r\n:D',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249813995',
          author: {
            id: '20938',
            groupId: '3',
            name: '-=Q=- 8-BaLL',
          },
          date: '2023-01-15T10:11:53.000Z',
          message:
            '[quote=219289,1249813993,"Ameisenfutter"][b]\nWas würdest Du verbessern? Dass kurze Posts nicht mit so viel leerem Raum aufgefüllt werden wie im echten Board ist ja ganz gut für mobile.\n[/b][/quote]\n\nDas ist eine sehr gute Frage, ich weiß es wirklich nicht. Hier im Forum gibts doch alles, vielleicht auch einen UI-Designer, der ein paar Tricks kennt?',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/-=Q=- 8-BaLL.gif',
          contentHidden: false,
        },
        {
          id: '1249814001',
          author: {
            id: '1341645',
            groupId: '3',
            name: 'Real_Futti',
          },
          date: '2023-01-15T10:23:00.000Z',
          message:
            'Testpost über die neue URL\r\n\r\n€: Funktioniert. Geiler Scheiss',
          editedCount: 1,
          lastEdit: {
            user: {
              id: '1341645',
              name: 'Real_Futti',
            },
            date: '2023-01-15T10:23:20.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/arctic.gif',
          contentHidden: false,
        },
        {
          id: '1249814101',
          author: {
            id: '1301217',
            groupId: '3',
            name: 'da t0bi',
          },
          date: '2023-01-15T13:06:44.000Z',
          message:
            'Ok das sieht ziemlich cool aus, thx an Ameisenfutter und alle anderen die sich die Arbeit machen. Auf mich macht das den Eindruck dass hauptsächlich die Iphone User was davon haben?',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/leet.gif',
          contentHidden: false,
        },
        {
          id: '1249814103',
          author: {
            id: '1193003',
            groupId: '3',
            name: 'Klages',
          },
          date: '2023-01-15T13:16:36.000Z',
          message: 'Ist halt sozusagen barrierefrei, da man keine App braucht.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl:
            './avatare/upload/U1193003--andjusticeforallsmall3dk8h.png',
          contentHidden: false,
        },
        {
          id: '1249814107',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-15T13:24:24.000Z',
          message:
            '[quote=219289,1249814101,"da t0bi"][b]\r\nOk das sieht ziemlich cool aus, thx an Ameisenfutter und alle anderen die sich die Arbeit machen. Auf mich macht das den Eindruck dass hauptsächlich die Iphone User was davon haben?\r\n[/b][/quote]\r\nGibt auch Leute, die lieber Webanwendungen/PWAs als native Anwendungen verwenden. Und wer am Desktop nen anderen Look will, der kann das natürlich auch verwenden - wobei ich mich auf\'s erste darauf konzentrieren werde, dass es auf mobile ordentlich aussieht, denn bei den iOS-Usern scheint die Not ja aktuell am größten. :D',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249814136',
          author: {
            id: '1144725',
            groupId: '3',
            name: 'chuck.sports',
          },
          date: '2023-01-15T14:04:52.000Z',
          message: 'Weiter so! Lesezeichen ist gesetzt :)',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/nasemarine.gif',
          contentHidden: false,
        },
        {
          id: '1249814152',
          author: {
            id: '74373',
            groupId: '3',
            name: 'Oli',
          },
          date: '2023-01-15T14:23:03.000Z',
          message: 'Nice. Dann kann ich potdroid abschalten. ;)',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/olioli.gif',
          contentHidden: false,
        },
        {
          id: '1249814156',
          author: {
            id: '66198',
            groupId: '3',
            name: 'just 4 fun',
          },
          date: '2023-01-15T14:31:41.000Z',
          message:
            '[quote=219289,1249814152,"Oli"][b]\nNice. Dann kann ich potdroid abschalten. ;)\n[/b][/quote]\nHow about no? :D :p',
          editedCount: 1,
          lastEdit: {
            user: {
              id: '66198',
              name: 'just 4 fun',
            },
            date: '2023-01-15T14:31:49.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/just4fun.png',
          contentHidden: false,
        },
        {
          id: '1249814177',
          author: {
            id: '59955',
            groupId: '3',
            name: 'Johnny Knoxville',
          },
          date: '2023-01-15T15:16:21.000Z',
          message: 'Was ist ein SPA Client und was ist eine API',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/Johnny Knoxville.gif',
          contentHidden: false,
        },
        {
          id: '1249814182',
          author: {
            id: '1131979',
            groupId: '3',
            name: 'luke_skywalker',
          },
          date: '2023-01-15T15:21:43.000Z',
          message:
            'SPA: Single-Page-Application.\r\nEine Webseite mit viel JavaScript statt konkreten HTML-Unterseiten für die Navigation.\r\nHat den Vorteil, dass man als Programmierer fast nur auf JavaScript setzen muss und die restliche Oberfläche damit programmiert - statt sich mit dem Wechselspiel HTML-Frontend/PHP-Backend abzustimmen.\r\n\r\n/edit: auch wenn am Ende hier bei der potber-App JavaScript generiert wird, kommt hier die sehr leistungsfähige Programmiersprache "TypeScript" zum Einsatz, die dann vom Compiler automatisch in JavaScript umgewandelt wird.',
          editedCount: 1,
          lastEdit: {
            user: {
              id: '1131979',
              name: 'luke_skywalker',
            },
            date: '2023-01-15T15:24:18.000Z',
          },
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/leet.gif',
          contentHidden: false,
        },
        {
          id: '1249814189',
          author: {
            id: '32066',
            groupId: '6',
            name: 'Kane*',
          },
          date: '2023-01-15T15:49:14.000Z',
          message:
            'Und eine API ist, sehr vereinfacht, eine Schnittstelle die Daten, in diesem Fall die des Forums, so zur Verfügung stellt das man damit bequem in Programmen arbeiten kann.\r\n\r\nMit anderen Worten: man kommt an alles dran ohne Zugriff auf die Datenbank des Forums zu brauchen.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U32066--kane_wolverine.png',
          contentHidden: false,
        },
        {
          id: '1249814201',
          author: {
            id: '1307582',
            groupId: '3',
            name: "M'Buse",
          },
          date: '2023-01-15T16:04:44.000Z',
          message:
            'Also benutze ich das auf dem iPhone über dem Browser und hab endlich ein vernünftig skaliertes Pot?',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1307582--hotline_miami_bender.png',
          contentHidden: false,
        },
        {
          id: '1249814202',
          author: {
            id: '1268185',
            groupId: '3',
            name: 'Ameisenfutter',
          },
          date: '2023-01-15T16:06:42.000Z',
          message:
            '[quote=219289,1249814201,"M\'Buse"][b]\nAlso benutze ich das auf dem iPhone über dem Browser und hab endlich ein vernünftig skaliertes Pot?\n[/b][/quote]\nIm Moment gibt\'s halt noch keinen Login und der BBCode wird noch nicht ganz richtig geparsed - aber ja.',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1268185--small.png',
          contentHidden: false,
        },
        {
          id: '1249814212',
          author: {
            id: '1307582',
            groupId: '3',
            name: "M'Buse",
          },
          date: '2023-01-15T16:19:30.000Z',
          message:
            'Hört sich sehr gut an. So fahre fort mit der Arbeit! Wehe ich erwische dich im Businessbrunch bevor das fertig ist!',
          editedCount: 0,
          threadId: '219289',
          boardId: '14',
          avatarUrl: './avatare/upload/U1307582--hotline_miami_bender.png',
          contentHidden: false,
        },
      ],
    },
  } as Thread,
};