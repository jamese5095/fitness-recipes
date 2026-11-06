const cards = [...document.querySelectorAll('.recipe-card')];
const buttons = [...document.querySelectorAll('[data-filter]')];
const input = document.querySelector('input[type="search"]');
let category = '全部';

function updateMenu() {
  const query = input.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const card of cards) {
    const matches = (category === '全部' || card.dataset.category === category)
      && card.dataset.search.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) count++;
  }
  document.querySelector('#result-count').textContent = `${count} 道菜品`;
  document.querySelector('.empty').hidden = count > 0;
}

for (const button of buttons) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateMenu();
  });
}
input.addEventListener('input', updateMenu);
document.querySelector('.filters').hidden = false;
document.querySelector('.search').hidden = false;
