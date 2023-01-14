export function getNode(nodeName: string, xmlDocument: any) {
  if (nodeName === 'pages') debugger;
  for (const node of xmlDocument.childNodes) {
    if (node.nodeName === nodeName) {
      return node;
    }
  }
}

export function getAttributeValue(attributeName: string, node: any) {
  if (node?.attributes[attributeName]) {
    return node.attributes[attributeName].value;
  }
}
