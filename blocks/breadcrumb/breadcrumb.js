import { decorateIcons } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const ulElement = block.getElementsByTagName('ul')[0];
  const numChildren = ulElement.children.length;
  for (let i = 0; i < numChildren - 1; i += 1) {
    const child = ulElement.children[i];
    const icon = document.createElement('span');
    icon.classList.add('icon', 'icon-chevron-right');
    child.append(icon);
  }
  await decorateIcons(block);
}
