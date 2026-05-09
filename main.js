document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("post-list");
  if (!postList) return;

  fetch("posts/articles.json")
    .then(res => {
      if (!res.ok) throw new Error(`articles.json 読み込み失敗: ${res.status}`);
      return res.json();
    })
    .then(posts => {
      if (!Array.isArray(posts)) throw new Error("articles.json は配列である必要があります。");

      // 1) categoryごとにグルーピング
      const groups = posts.reduce((acc, post) => {
        const cat = (post.category || "未分類").trim();
        (acc[cat] ||= []).push(post);
        return acc;
      }, {});

      // 2) カテゴリ順（日本語）
      const categories = Object.keys(groups).sort((a, b) => a.localeCompare(b, "ja"));

      postList.innerHTML = "";

      categories.forEach((category, idx) => {
        // 見出し（クリック対象）
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "post-category";
        btn.setAttribute("aria-expanded", "false");
        btn.innerHTML = `
          <span class="post-category__label">${category}</span>
          <span class="post-category__count">(${groups[category].length})</span>
          <span class="post-category__icon" aria-hidden="true">▾</span>
        `;

        // 開閉される領域
        const wrap = document.createElement("div");
        wrap.className = "post-category-list";
        wrap.hidden = true; // 初期は全部閉じる（最初だけ開きたいなら idx===0 の時 false にする）

        // 記事生成
        groups[category].forEach(post => {
          const article = document.createElement("article");
          article.innerHTML = `
            <h4>${post.title ?? "無題"}</h4>
            <a href="${post.url ?? "#"}">Read more</a>
          `;
          wrap.appendChild(article);
        });

        // ★アコーディオン強制：クリックしたら他は全部閉じて、これだけ開く（開いてたら閉じる）
        btn.addEventListener("click", () => {
          const isOpen = !wrap.hidden;

          // いったん全部閉じる
          postList.querySelectorAll(".post-category-list").forEach(el => (el.hidden = true));
          postList.querySelectorAll(".post-category").forEach(el => el.setAttribute("aria-expanded", "false"));

          // クリックしたカテゴリだけトグル（開いてたなら閉じたまま）
          if (!isOpen) {
            wrap.hidden = false;
            btn.setAttribute("aria-expanded", "true");
          }
        });

        postList.appendChild(btn);
        postList.appendChild(wrap);
      });
    })
    .catch(err => {
      console.error(err);
      postList.innerHTML =
        "<p style='color:#c00;'>Post一覧の読み込みに失敗しました（Consoleを確認してください）</p>";
    });
});