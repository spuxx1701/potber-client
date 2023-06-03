export const videoTagMocks: ContentParserMock[] = [
  {
    input: 'hello world',
    expected: 'hello world',
  },
  {
    input: `[video]https://video.twimg.com/ext_tw_video/1654245265388322820/pu/vid/480x848/giPQ-V_G5ydzW01q.mp4?tag=12[/video]
    [URL]https://twitter.com/Phil_Lewis_/status/1654245302642126851[/URL]
    
    [quote]Russian and Ukrainian representatives broke out into physical fights while attending a conference in Turkey on Thursday, footage and social media posts show. Videos from the scene appears to show a Russian delegate ripping the Ukrainian flag away from a representative on the sidelines of the Summit of the Parliamentary Assembly of the Black Sea Economic Cooperation (PABSEC), leading to a fistfight between him and Ukrainian official Oleksandr Marikovskyi, who tried to take the flag back. Another clip shared by Anadolu Agency shows members of Ukrainian parliament trying to display the flag while Russian representative Ola Timofeeva was speaking, prompting another scuffle between attendees. “Paws off our flag, paws off Ukraine, Russian bastard,” Marikovskyi later said in a social media post.[/quote]
    [URL]https://www.thedailybeast.com/russian-and-ukrainian-delegates-brawl-over-ukrainian-flag-at-summit-in-turkey?utm_campaign=owned_social&utm_medium=socialflow&via=twitter_page&utm_source=twitter_owned_tdb[/URL]`,
    expected: `<video src="https://video.twimg.com/ext_tw_video/1654245265388322820/pu/vid/480x848/giPQ-V_G5ydzW01q.mp4?tag=12" controls/>
    [URL]https://twitter.com/Phil_Lewis_/status/1654245302642126851[/URL]
    
    [quote]Russian and Ukrainian representatives broke out into physical fights while attending a conference in Turkey on Thursday, footage and social media posts show. Videos from the scene appears to show a Russian delegate ripping the Ukrainian flag away from a representative on the sidelines of the Summit of the Parliamentary Assembly of the Black Sea Economic Cooperation (PABSEC), leading to a fistfight between him and Ukrainian official Oleksandr Marikovskyi, who tried to take the flag back. Another clip shared by Anadolu Agency shows members of Ukrainian parliament trying to display the flag while Russian representative Ola Timofeeva was speaking, prompting another scuffle between attendees. “Paws off our flag, paws off Ukraine, Russian bastard,” Marikovskyi later said in a social media post.[/quote]
    [URL]https://www.thedailybeast.com/russian-and-ukrainian-delegates-brawl-over-ukrainian-flag-at-summit-in-turkey?utm_campaign=owned_social&utm_medium=socialflow&via=twitter_page&utm_source=twitter_owned_tdb[/URL]`,
  },
  {
    input: `[video]https://i.imgur.com/3L4B6FD.mp4[/video]
    Funny? Impressive?
    Both!
    
    [video]https://i.imgur.com/hryNUcS.mp4[/video]
    [video]https://i.imgur.com/MvdqRZa.mp4[/video]
    The difference a year makes.`,
    expected: `<video src="https://i.imgur.com/3L4B6FD.mp4" controls/>
    Funny? Impressive?
    Both!
    
    <video src="https://i.imgur.com/hryNUcS.mp4" controls/>
    <video src="https://i.imgur.com/MvdqRZa.mp4" controls/>
    The difference a year makes.`,
  },
  {
    input: `[video]https://i.imgur.com/MbpN77F.mp4[/video]



    [video]https://i.imgur.com/6zzsiYM.mp4[/video]
    
    
    
    [video]https://i.imgur.com/pQWWFJy.mp4[/video]
    
    
    
    [video]https://i.imgur.com/hiUieas.mp4[/video]`,
    expected: `<video src="https://i.imgur.com/MbpN77F.mp4" controls/>



    <video src="https://i.imgur.com/6zzsiYM.mp4" controls/>
    
    
    
    <video src="https://i.imgur.com/pQWWFJy.mp4" controls/>
    
    
    
    <video src="https://i.imgur.com/hiUieas.mp4" controls/>`,
  },
  {
    input: `[video]https://www.youtube.com/watch?v=--y3Rw3a4Zs[/video]`,
    expected: `<iframe class="youtube-player" type="text/html" src="https://www.youtube.com/embed/--y3Rw3a4Zs?origin=https://test.potber.de" frameborder="0"></iframe>`,
  },
  {
    input: `[video]https://www.youtube.com/watch?v=tleu80PP-UE[/video]

    Ich finds leider nicht separat aber der erste, mit Schleff :D:D:D:D
    
    
    
    Gestorben :D`,
    expected: `<iframe class="youtube-player" type="text/html" src="https://www.youtube.com/embed/tleu80PP-UE?origin=https://test.potber.de" frameborder="0"></iframe>

    Ich finds leider nicht separat aber der erste, mit Schleff :D:D:D:D
    
    
    
    Gestorben :D`,
  },
  {
    input: `[quote=219374,1249918547,"-=Charon=-"][b]

    [quote=219374,1249916307,"da t0bi"][b]
    
    [url]https://www.youtube.com/watch?v=CdC1vrwvysU[/url]
    
    [/b][/quote]
    
    Er war schon immer gut drauf:
    
    
    
    [url]https://www.youtube.com/watch?v=NnbL-Hm-xws[/url]
    
    [/b][/quote]
    
    [video]https://youtu.be/U5yhs5HTCpU?t=105[/video]`,
    expected: `[quote=219374,1249918547,"-=Charon=-"][b]

    [quote=219374,1249916307,"da t0bi"][b]
    
    [url]https://www.youtube.com/watch?v=CdC1vrwvysU[/url]
    
    [/b][/quote]
    
    Er war schon immer gut drauf:
    
    
    
    [url]https://www.youtube.com/watch?v=NnbL-Hm-xws[/url]
    
    [/b][/quote]
    
    <iframe class="youtube-player" type="text/html" src="https://www.youtube.com/embed/U5yhs5HTCpU?t=105&origin=https://test.potber.de" frameborder="0"></iframe>`,
  },
];
