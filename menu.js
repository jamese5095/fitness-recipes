const cards = [...document.querySelectorAll('.recipe-card')];
const buttons = [...document.querySelectorAll('[data-filter]')];
const versionButtons = [...document.querySelectorAll('[data-version-filter]')];
const input = document.querySelector('input[type="search"]');
let category = '全部';
let version = '全部';

function updateMenu() {
  const query = input.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const card of cards) {
    const matches = (category === '全部' || card.dataset.category === category)
      && (version === '全部' || card.dataset.version === version)
      && card.dataset.search.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) count++;
  }
  document.querySelector('#result-count').textContent = `${count} 道菜品`;
  document.querySelector('.empty').hidden = count > 0;
}

for (const button of versionButtons) {
  button.addEventListener('click', () => {
    version = button.dataset.versionFilter;
    versionButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateMenu();
  });
}

for (const button of buttons) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateMenu();
  });
}
input.addEventListener('input', updateMenu);
document.querySelectorAll('.filters').forEach(group => { group.hidden = false; });
document.querySelector('.search').hidden = false;
