export const changelog: ChangelogItem[] = [
  {
    version: '1.7.1',
    type: 'minor',
    fixed: [
      'Der Lade-Indikator ist nun wieder sichtbar.',
      'Emojis, die dem Schema :xyz: folgen, werden nun auch dann korrekt dargestellt, wenn sie in Klammern stehen.',
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
