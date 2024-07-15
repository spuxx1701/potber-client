export const texTagMocks: ContentParserMock[] = [
  {
    input: `[tex]hello world[/tex]`,
    expected: `<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>h</mi><mi>e</mi><mi>l</mi><mi>l</mi><mi>o</mi><mi>w</mi><mi>o</mi><mi>r</mi><mi>l</mi><mi>d</mi></mrow><annotation encoding="application/x-tex">hello world</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">h</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.01968em;">ll</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal" style="margin-right:0.02778em;">or</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">d</span></span></span></span>`,
  },
];
