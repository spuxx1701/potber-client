export const quoteTagMocks: ContentParserMock[] = [
  {
    input: 'hello world',
    expected: 'hello world',
  },
  {
    input: '[quote]hello world[/quote]',
    expected: '<span class="quote"><blockquote>hello world</blockquote></span>',
  },
  {
    input: `[quote=1268185,1249841625,"Ameisenfutter"]<b>foo</b>[/quote]

    bar`,
    expected: `<span class="quote"><a class="quote-header" href="https://test.potber.de/thread?TID=1268185&PID=1249841625"><p>Ameisenfutter</p></a><blockquote><b>foo</b></blockquote></span>

    bar`,
  },
  {
    input: `[quote=219289,1249894846,"Ameisenfutter"]<b>
    [quote=219289,1249894747,"audax"]<b>
    Feature Wunsch: Pausieren von Videos wenn man weiter scrollt, bis sie nicht mehr als 30% sichtbar sind.
    </b>[/quote]
    
    Puh. Mach mal issue auf github :D
    </b>[/quote]
    
    Wird gemacht! Anschließend kannst du es ganz nach hinten ins Backlog schieben weil Viewports Krieg sind.`,
    expected: `<span class="quote"><a class="quote-header" href="https://test.potber.de/thread?TID=219289&PID=1249894846"><p>Ameisenfutter</p></a><blockquote><b>
    <span class="quote"><a class="quote-header" href="https://test.potber.de/thread?TID=219289&PID=1249894747"><p>audax</p></a><blockquote><b>
    Feature Wunsch: Pausieren von Videos wenn man weiter scrollt, bis sie nicht mehr als 30% sichtbar sind.
    </b></blockquote></span>
    
    Puh. Mach mal issue auf github :D
    </b></blockquote></span>
    
    Wird gemacht! Anschließend kannst du es ganz nach hinten ins Backlog schieben weil Viewports Krieg sind.`,
  },
  {
    input: `[quote=219289,1249882746,"[DtS]theSameButcher"]<b>

    Gibt es eigentlich auch schon Statistiken wieviele User, Posts via potber erstellt wurden?
    
    </b>[/quote]
    
    Ne, ich sammle solche Daten absichtlich nicht. Das könnte ich easy tun, aber:`,
    expected: `<span class="quote"><a class="quote-header" href="https://test.potber.de/thread?TID=219289&PID=1249882746"><p>[DtS]theSameButcher</p></a><blockquote><b>

    Gibt es eigentlich auch schon Statistiken wieviele User, Posts via potber erstellt wurden?
    
    </b></blockquote></span>
    
    Ne, ich sammle solche Daten absichtlich nicht. Das könnte ich easy tun, aber:`,
  },
];
