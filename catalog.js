(() => {
 const filters = [...document.querySelectorAll('[data-filter]')];
 const products = [...document.querySelectorAll('.product')];
 const search = document.querySelector('#search');
 const count = document.querySelector('#count');
 const empty = document.querySelector('#empty');
 const categories = filters.map(button => button.dataset.filter);
 let selected = 'all';
 function render() {
  const query = search.value.trim().toLocaleLowerCase('ru');
  let visible = 0;
  for (const item of products) {
   item.hidden = !((selected === 'all' || item.dataset.category === selected) && item.dataset.search.toLocaleLowerCase('ru').includes(query));
   if (!item.hidden) visible++;
  }
  for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.filter === selected));
  count.textContent = `Вещей: ${visible}`;
  empty.hidden = visible !== 0;
 }
 function fromUrl() {
  const query = new URLSearchParams(location.search);
  selected = categories.includes(query.get('category')) ? query.get('category') : 'all';
  search.value = query.get('q') || '';
  render();
 }
 function updateUrl() {
  const url = new URL(location.href);
  if (selected === 'all') url.searchParams.delete('category');
  else url.searchParams.set('category', selected);
  if (search.value.trim()) url.searchParams.set('q', search.value.trim());
  else url.searchParams.delete('q');
  history.replaceState(null, '', url);
  render();
 }
 filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.filter; updateUrl(); }));
 search.addEventListener('input', updateUrl);
 document.querySelector('#reset').addEventListener('click', () => { selected = 'all'; search.value = ''; updateUrl(); search.focus(); });
 window.addEventListener('popstate', fromUrl);
 fromUrl();
})();
