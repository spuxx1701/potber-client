export function getNode(
  nodeName: string,
  element: Element | ChildNode | XMLDocument
): any {
  for (const node of element.childNodes) {
    if (node.nodeName === nodeName) {
      return node;
    }
  }
  return undefined;
}

export function getNodeTextContent(
  nodeName: string,
  element: Element | ChildNode
) {
  const node = getNode(nodeName, element);
  if (node) return node.textContent;
  return undefined;
}

export function getAttributeValue(attributeName: string, element: any) {
  if (element?.attributes[attributeName]?.value) {
    return element.attributes[attributeName].value;
  }
  return undefined;
}
