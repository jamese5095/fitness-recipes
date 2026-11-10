const cards = [...document.querySelectorAll('.recipe-card')];
const categoryButtons = [...document.querySelectorAll('[data-filter]')];
const methodButtons = [...document.querySelectorAll('[data-method-filter]')];
const input = document.querySelector('input[type="search"]');
let category = '全部';
let method = '全部';

function updateMenu() {
  const query = input.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const card of cards) {
    const matches = (category === '全部' || card.dataset.category === category)
      && (method === '全部' || card.dataset.method === method)
      && card.dataset.search.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) count++;
  }
  document.querySelector('#result-count').textContent = `${count} 道菜品`;
  document.querySelector('.empty').hidden = count > 0;
}

for (const button of categoryButtons) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    categoryButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateMenu();
  });
}

for (const button of methodButtons) {
  button.addEventListener('click', () => {
    method = button.dataset.methodFilter;
    methodButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateMenu();
  });
}

input.addEventListener('input', updateMenu);
document.querySelectorAll('.filters').forEach(group => { group.hidden = false; });
document.querySelector('.search').hidden = false;
