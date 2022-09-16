import { decorateIcons, appendIcon } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const ulElement = block.getElementsByTagName('ul')[0];
  const numChildren = ulElement.children.length;
  for (let i = 0; i < numChildren - 1; i += 1) {
    const child = ulElement.children[i];
    appendIcon(child, 'icon-chevron-right');
  }
  await decorateIcons(block);
}
