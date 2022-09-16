/**
 * @typedef TabInfo
 * @property {string} name
 * @property {HTMLElement} $tab
 * @property {HTMLElement} $content
 */

import { appendIcon, decorateIcons } from '../../scripts/scripts.js';

/**
 * @param {HTMLElement} $block
 * @return {TabInfo[]}
 */
export function createTabs($block) {
  const $ul = $block.querySelector('ul');
  if (!$ul) {
    return null;
  }
  /** @type TabInfo[] */
  const tabs = [...$ul.querySelectorAll('li')].map(($li) => {
    const title = $li.textContent;
    const name = title.toLowerCase().trim();
    return {
      title,
      name,
      $tab: $li,
    };
  });
  // move $ul below section div
  $block.replaceChildren($ul);

  // decorate x next referenced sections, based on the number of tabs
  const $wrapper = $block.parentElement;
  const $container = $wrapper.parentElement;
  let $div = $container.nextElementSibling;

  for (let i = 0; i < tabs.length; i++) { // eslint-disable-line no-plusplus
    $div.id = tabs[i].name;
    $div.classList.add('tab-item');
    $div.classList.add('hidden');
    tabs[i].$content = $div;
    $div = $div.nextElementSibling;
  }
  return tabs;
}

async function createTabDropdown(tabs) {
  const firstTabTitle = tabs[0].title;
  const tabButton = document.createElement('button');
  tabButton.classList.add('mobile-only', 'tab-dropdown-button');
  tabButton.innerHTML = `<span>${firstTabTitle}</span>`;
  appendIcon(tabButton, 'icon-chevron-right');
  await decorateIcons(tabButton);
  return tabButton;
}

/**
* @param {HTMLElement} $block
*/
export default async function decorate($block) {
  const tabs = createTabs($block);

  const tabButton = await createTabDropdown(tabs);

  // Set initial state for tab dropdown on mobile
  $block.prepend(tabButton);
  $block.querySelector('ul').classList.add('hidden');

  const toggleDropdownOpen = () => {
    $block.querySelector('ul').classList.toggle('hidden');
    tabButton.classList.toggle('menu-open');
  };

  tabButton.addEventListener('click', () => {
    toggleDropdownOpen(tabButton, $block);
  });

  tabs.forEach((tab, index) => {
    const $button = document.createElement('button');
    const { $tab, title, name } = tab;
    $button.textContent = title;
    $tab.replaceChildren($button);

    // This attribute is used to prevent layout shift on hover
    // https://css-tricks.com/bold-on-hover-without-the-layout-shift/
    $button.setAttribute('data-text', title);

    $button.addEventListener('click', () => {
      tabButton.querySelector('span').innerText = title;
      toggleDropdownOpen(tabButton, $block);
      const $activeButton = $block.querySelector('button.active');
      if ($activeButton !== $tab.children[0]) {
        $activeButton.classList.remove('active');
        $button.classList.add('active');
        tabs.forEach((t) => {
          if (name === t.name) {
            t.$content.classList.remove('hidden');
          } else {
            t.$content.classList.add('hidden');
          }
        });
      }
    });

    if (index === 0) {
      $button.classList.add('active');
      tab.$content.classList.remove('hidden');
    }
  });
}
