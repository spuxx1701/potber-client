export const changelog: ChangelogItem[] = [
  {
    version: '1.12.0',
    type: 'minor',
    added: [
      'Die Anwendung unterstützt nun personalisierte Farbthemen. Du kannst Dein Thema in den Einstellungen ändern. Eine Anleitung, wie Du eigene Farbthemen erstellen kannst, findest Du im Startpost.',
    ],
    changed: [
      'Die Seite für Lesezeichen verfügt nun über einen ähnliche Aufbau wie die Seite für private Nachrichten.',
      'Gruppierung und Kategorien in den Einstellungen wurden überarbeitet.',
      'Bender werden nun stadardmäßig angezeigt.',
    ],
  },
  {
    version: '1.11.1',
    type: 'patch',
    fixed: [
      '[mod]-Tags werden nun nicht geparsed, wenn sie von einer Nutzer:in ohne Modrechte verwendet werden.',
    ],
  },
  {
    version: '1.11.0',
    type: 'minor',
    changed: [
      'Webanwendung und PWA haben ein neues Icon erhalten.',
      'Die Navigationsbuttons werden auf mobilen Geräten nun ausgeblendet, wenn die Sidebar ausgeklappt ist.',
    ],
    fixed: [
      'Der Lade-Indikator ist nun wieder sichtbar.',
      'Ein Fehler wurde behoben, der dazu geführt hat, dass noch weitere Original-Links zum Forum manchmal nicht korrekt mit potber-Links ersetzt wurden.',
      'Aus der Profilansicht kann man nun wieder zum jeweiligen Originalprofil abspringen.',
      'Die Anwendung versucht nun nicht länger, Zeichen, die als Emojis interpretiert werden können, innerhalb von URLs zu parsen. Das Problem betraf insbesondere Bild-URLs von Bluesky.',
    ],
  },
  {
    version: '1.10.2',
    type: 'patch',
    fixed: [
      'Posts lassen sich nun wieder über das Kebabmenü im Original öffnen.',
      'Ein Fehler wurde behoben, der dazu geführt hat, dass Original-Links zum Forum manchmal nicht korrekt mit potber-Links ersetzt wurden.',
    ],
  },

  {
    version: '1.10.1',
    type: 'patch',
    changed: [
      'Das Abdunkeln von bereits gelesenen Posts ist nun wieder verfügbar und kann in den Einstellungen eingeschaltet werden.',
      'Tabellen wurden geringfügig visuell angepasst.',
    ],
    fixed: [
      "Video-Tags mit 'play' werden jetzt korrekt angezeigt.",
      'Ein Fehler beim Parsen von Listen wurde behoben.',
    ],
  },
  {
    version: '1.10.0',
    type: 'minor',
    added: [
      'In Vorbereitung auf die bevorstehende Migration auf Ember 5.x.x & Ember Polaris verwendet das Projekt jetzt Glint.',
      'In Vorbereitung auf die bevorstehende Migration auf Ember 5.x.x & Ember Polaris unterstützt das Projekt jetzt First-Class Component Templates.',
      'Original-Links zu Posts, Threads und Board zeigen nun beim Öffnen auf die entsprechenden Seiten von potber. Das Verhalten kann in den Einstellungen deaktiviert werden.',
      'Beim Einfügen von Bildern kann nun optional eine URL für eine Thumbnail angegeben werden. Dadurch können etwa Bilder von imgur in geringerer Größe und mit einem Direktlink zum Original eingebunden werden.',
    ],
    changed: [
      'Der Navigationsbutton, mit dem man in die nächsthöhere Ebene gelangt (z.B. zurück ins Board, wenn man sich in einem Thread befindet) verwendet nun einen Pfeil nach oben, um sich besser von anderen Funktionen abzusetzen.',
      'Beim Aufrufen eines Lesezeichens werden bereits gelesene Posts nun durch einen Trenner statt durch Abdunkeln gekennzeichnet.',
      'Beim Kopieren eines Post-Links wird nun der Originallink zum Forum verwendet.',
    ],
    fixed: [
      'Besonders lange Wörter werden nun auf mehrere Zeilen umgebrochen, statt über den Bildrand hinauszuragen.',
      'Beim Klick auf eine private Nachricht in der Sidebar wird nun die Sidebar geschlossen.',
      'HTML und Emojis in Privatnachrichten werden nun korrekt geparsed.',
    ],
  },
  {
    version: '1.9.1',
    type: 'patch',
    fixed: ['Posts können nun wieder abgeschickt werden.'],
  },
  {
    version: '1.9.0',
    type: 'minor',
    added: [
      'Eingebettete Videos beinhalten nun auch einen Direktlink zum Video.',
    ],
    fixed: [
      'Eingebettete YouTube-Videos erlauben nun das Wechseln in den Vollbildmodus.',
      'In den Bookmarks kann das Optionsmenü eines Gespeicherten Posts nun nicht mehr außerhalb des Viewports liegen.',
      'Die user experience des Postformulars auf Chrome & Firefox wurde verbessert. Insbesondere muss nun die Tastatur nicht eingeklappt oder nach unten gescrollt werden, um den Post abzuschicken.',
      'Verschiedene klein visuelle Fixes rund um die einstellbare Schriftgröße.',
      'Diverse kleinere Fixes.',
    ],
  },
  {
    version: '1.8.0',
    type: 'minor',
    added: ['Die Textgröße kann nun in den Einstellungen geändert werden.'],
    changed: [
      'Im Desktopmodus wird der Seiteninhalt nun mit einigem Abstand zum unteren Bildrand dargestellt.',
      'Beim initialen Laden gibt es nun Katzen. Credit geht an: https://www.deviantart.com/emoxynha/art/Gif-309653475 😻',
    ],
    fixed: [
      'Beim Einfügen von Code mit CRLF line endings werden nun nicht mehr redundante Zeilenumbrüche eingefügt.',
    ],
  },
  {
    version: '1.7.1',
    type: 'patch',
    fixed: [
      'Der Lade-Indikator ist nun wieder sichtbar.',
      'Emojis, die dem Schema :xyz: folgen, werden nun auch dann korrekt dargestellt, wenn sie in Klammern stehen.',
      'URL-Tags werden nun auch dann korrekt angezeigt, wenn sie sich über mehrere Zeilen erstrecken.',
      'Verschiedene visuelle Fixes.',
    ],
  },
  {
    version: '1.7.0',
    type: 'minor',
    added: [
      'Privatnachrichten können nun direkt in der Anwendung gelesen werden.',
      'Nutzerprofile enthalten nun Informationen zum Alter des Accounts.',
      'Verschiedene visuelle Verbesserungen.',
    ],
    changed: [
      'Beim Zitierten werden IMG- und VIDEO-Tags nun in URL-Tags konvertiert.',
    ],
    fixed: [
      'Umlaute in Nutzerprofilen werden nun korekt dargestellt.',
      'Diverse kleinere Fixes.',
    ],
  },
  {
    version: '1.6.2',
    type: 'patch',
    changed: ['Passwörter dürfen nun bis zu 100 Zeichen lang sein.'],
  },
  {
    version: '1.6.1',
    type: 'patch',
    changed: ['Editieren von Posts ist nun wieder möglich.'],
  },
  {
    version: '1.6.0',
    type: 'minor',
    changed: [
      'Buttons zum Einfügen von code, quote und spoiler tags verwenden nun ein Dialogfenster mit einem Eingabefeld.',
    ],
  },
  {
    version: '1.5.3',
    type: 'patch',
    fixed: ['BBCode-Inhalte in [code]-Tags werden nun korrekt dargestellt.'],
  },
  {
    version: '1.5.2',
    type: 'patch',
    fixed: [
      'Postinhalte werden nun vor dem Parsen von potentiellem HTML bereinigt.',
    ],
  },
  {
    version: '1.5.1',
    type: 'patch',
    fixed: [
      'Videos verhindern nun nicht mehr, dass nachfolgende Inhalte angezeigt werden.',
    ],
  },
  {
    version: '1.5.0',
    type: 'minor',
    added: [
      'Der [trigger] tag wird nun unterstützt und kann im Postformular verwendet werden.',
    ],
    changed: [
      'Der BBCode-Parser wurde von Grund auf neugeschrieben. Das BBCode-Parsing sollte nun erheblich besser funktionieren. Fehlerhafte Posts bitte melden!',
    ],
  },
  {
    version: '1.4.0',
    type: 'minor',
    changed: [
      'Die Anwendung lässt sich nun auf großen Monitoren erheblich besser bedienen.',
    ],
    fixed: [
      'Die PWA respektiert nun die Rotationssperre des Endgeräts. Hinweis für Chrome-Nutzer: Chrome cached das PWA-Manifest sehr lange. Es kann dauern, bis diese Einstellung wirksam wird.',
      "Fehlendes 'FrogeLove' meme hinzugefügt.",
    ],
  },
  {
    version: '1.3.0',
    type: 'minor',
    added: [
      'Der Newsfeed zeigt nun ungelesene eingehende Privatnachrichten an und verlinkt dorthin. Ein roter Punkt über dem Sidebar-Button zeigt ungelesene Nachrichten an.',
      'Froge memes!',
      'Die PWA unterstützt nun landscape orientation. Sollte das bei Dir nicht klappen, installiere bitte die PWA neu oder warte ein paar Tage.',
      'Du kannst nun auf den Autorennamen eines Posts klicken, um das Profil anzusehen.',
    ],
    changed: [
      'potber wird nun auf einer neuen Infrastruktur betrieben. Das bringt für Dich einige konkrete Vorteile, darunter Hochverfügbarkeit der Anwendung (Ausfälle sind nun erheblich unwahrscheinlicher) und Updates ohne Downtimes.',
    ],
    fixed: ['Diverse kleinere Fixes.'],
  },
  {
    version: '1.2.1',
    type: 'patch',
    fixed: [
      'Beim Zitieren wird die Scroll-Position nun korrekt zurückgesetzt.',
    ],
  },
  {
    version: '1.2.0',
    type: 'minor',
    added: [
      'Das Post-Formular enthält nun eine Vorschaufunktion.',
      'Posts können jetzt lokal gespeichert werden. Deine gespeicherten Posts findest Du unter Deinen Lesezeichen.',
      'Das Post-Formular enthält nun eine Funktion zum schnellen Einfügen von pOT-Memes. Wünsche für neue Kategorien & Memes immer willkommen!',
      'Ein kleiner Punkt über dem Sidebar-Button verrät nun, ob es Neugikeiten gibt.',
      'Das Board-Kontextmenü enthält nun einen Button zum Navigieren zur ersten Seite.',
    ],
    changed: [
      'Verbesserungen beim Navigieren zwischen Board- und Threadseiten.',
    ],
    fixed: [
      'Beim Aufrufen von Lesezeichen wird nun die korrekte Anzahl Posts verblasst dargestellt.',
      'Verschiedene Verbesserungen & Fixes beim Scroll-Verhalten nach Seitenwechseln.',
      'Beim Wechseln auf ein anderes Board wird nun nicht nun auch die Seitennummer zurückgesetzt.',
      'Der Spoiler-Button fügt nun die korrekten tags ein.',
      'Diverse kleine fixes.',
    ],
  },
  {
    version: '1.1.1',
    type: 'patch',
    fixed: ['Bender werden nun wieder korrekt angezeigt.'],
  },
  {
    version: '1.1.0',
    type: 'minor',
    added: [
      'Die Sidebar und alle Dialoge können nun durch Tippen in den Bereich außerhalb der Sidebar bzw. des Dialogs geschlossen werden.',
      'Position und Layout der Sidebar können nun in den Einstellungen angepasst werden.',
      'Verschiedene Seiten (Post erstellen u.a.) beinhalten nun einen Button zum Zurückkehren auf die vorherige Seite.',
      'Es gibt nun eine neue optionale Startseite ("Home"), auf der Lesezeichen und Board-Favoriten angezeigt werden.',
      'Wird die Sidebar ausgeklappt, werden die Neuigkeiten nun automatisch aktualisiert. Das Verhalten lässt sich in den Einstellungen abstellen.',
    ],
    changed: [
      'Informationen über die laufende Sitzung finden sich nun in den Einstellungen.',
      'Die Einstellungen sind nun übersichtlicher strukturiert.',
      '⚠ Einstellungen werden nun auf eine andere Art und Weise gespeichert. Bereits gesetzte Einstellungen wurden zurückgesetzt.',
    ],
    removed: ['Die Seite "Laufende Sitzung" wurde entfernt.'],
    fixed: ['Diverse kleinere Fixes.'],
  },
  {
    version: '1.0.3',
    type: 'patch',
    fixed: ['Das Post-Kontextmenü wird nun nicht mehr abgeschnitten.'],
  },
  {
    version: '1.0.2',
    type: 'patch',
    fixed: [
      'Eingebundene Videos führen nun nicht mehr dazu, dass nachfolgende Postinhalte nicht sichtbar sind.',
      'Code-Blöcke und Tabellen erlauben nun horizontales scrollen.',
      'Posts werden im "Hobelware"-Design nun korrekt angezeigt.',
    ],
  },
  {
    version: '1.0.1',
    type: 'patch',
    fixed: [
      'Die Fußleiste nimmt auf iOS nun nicht mehr Raum ein als vorgesehen.',
    ],
  },
  {
    version: '1.0.0',
    type: 'major',
    added: ['Release! 🍾 🥳 🎉'],
  },
];

export interface ChangelogItem {
  version: string;
  type: ChangelogItemType;
  added?: string[];
  changed?: string[];
  removed?: string[];
  fixed?: string[];
}

export type ChangelogItemType = 'major' | 'minor' | 'patch';