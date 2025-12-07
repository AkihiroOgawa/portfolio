
document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("post-list");

  // posts/index.jsonを読み込み
  fetch("posts/index.json")
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        fetch(`posts/${post}`)
          .then(response => {
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            return response.text();
          })
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            let title = doc.querySelector("h1")?.textContent || "無題";
            let summary = doc.querySelector("p")?.textContent || "";
            const articleElem = document.createElement("article");
            articleElem.innerHTML = `
              <h3>${title}</h3>
              ${summary ? `<p>${summary}</p>` : ""}
              <a href="posts/${post}">続きを読む</a>
            `;
            postList.appendChild(articleElem);
          })
          .catch(error => console.error("記事読み込みエラー:", error));
      });
    })
    .catch(error => console.error("JSON読み込みエラー:", error));



  // モーダル機能（画像拡大）
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".clickable").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // スムーススクロール
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
