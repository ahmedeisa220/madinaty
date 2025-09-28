async function loadJSON(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(url);return r.json();}
async function loadText(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(url);return r.text();}

(async () => {
  // Restaurants
  const listEl = document.getElementById('restaurants-list');
  if (listEl) {
    try {
      const items = await loadJSON('content/restaurants/index.json');
      const render = (rows) => listEl.innerHTML = rows.map(r => `
        <div class="card">
          <h3>${r.name||''}</h3>
          <p>📞 ${r.phone||'-'}</p>
          ${r.menu_url?`<p><a href="${r.menu_url}" target="_blank">المنيو</a></p>`:''}
          <p class="small">${r.cuisine||''}</p>
          <small class="small">${r.delivery_hours||''}</small>
        </div>
      `).join('');

      render(items);

      // search/filter
      const search = document.getElementById('search');
      if (search) {
        search.addEventListener('input', () => {
          const q = search.value.trim().toLowerCase();
          const filtered = items.filter(r => {
            return (r.name||'').toLowerCase().includes(q) ||
                   (r.cuisine||'').toLowerCase().includes(q);
          });
          render(filtered);
        });
      }
    } catch(e){ console.error(e); listEl.textContent = 'تعذّر تحميل البيانات'; }
  }

  // News
  const newsEl = document.getElementById('news-list');
  if (newsEl) {
    try {
      const items = await loadJSON('content/news/index.json'); // [{slug,title,date,link}]
      let html = '';
      for (const n of items) {
        let bodyHTML = '';
        try {
          const md = await loadText(`content/news/${n.slug}.md`);
          bodyHTML = (window.marked ? marked.parse(md) : `<pre>${md}</pre>`);
        } catch {}
        html += `
          <article class="card news">
            <h3>${n.title}</h3>
            <small class="small">${n.date||''}</small>
            ${n.link?` — <a href="${n.link}" target="_blank">رابط خارجي</a>`:''}
            <div class="body">${bodyHTML}</div>
          </article>
        `;
      }
      newsEl.innerHTML = html || '<p>لا توجد أخبار بعد.</p>';
    } catch(e){ console.error(e); newsEl.textContent = 'تعذّر تحميل الأخبار'; }
  }
})();