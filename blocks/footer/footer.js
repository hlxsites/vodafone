import { readBlockConfig, decorateIcons, appendIcon } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  await decorateIcons(footer);
  block.append(footer);

  const socialMediaContainer = block.children[0].children[0];
  const linksContainer = block.children[0].children[1];
  const copyrightContainer = block.children[0].children[2];

  socialMediaContainer.classList.add('socialmedia-container');
  linksContainer.classList.add('links-container');
  copyrightContainer.classList.add('copyright-container');

  // Add icons to link section titles
  linksContainer.querySelectorAll('h2').forEach((h2) => {
    h2.classList.add('link-hidden');
    appendIcon(h2, 'icon-chevron-right');
    h2.addEventListener('click', () => {
      h2.classList.toggle('link-hidden');
    });
  });
  decorateIcons(linksContainer);
}
