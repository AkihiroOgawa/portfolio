
document.addEventListener("DOMContentLoaded", () => {
    // =======================
    // 記事一覧の自動生成
    // =======================
    const postList = document.getElementById("post-list");

    // 表示したい記事ファイルのパス
    const posts = [
        "posts/article1.html",
        "posts/article2.html",
        "posts/article3.html",
        "posts/article4.html",
        "posts/article5.html"
    ];

    posts.forEach(post => {
        fetch(post)
            .then(response => {
                if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
                return response.text();
            })
            .then(html => {
                // HTMLをパース
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // タイトルを取得（<h1>があればそれを使う）
                let title = doc.querySelector("h1")?.textContent || "無題";

                // 概要を取得（最初の<p>タグ）
                let summary = doc.querySelector("p")?.textContent || "";

                // 要素を生成
                const articleElem = document.createElement("article");
                articleElem.innerHTML = `
                    <h3>${title}</h3>
                    ${summary ? `<p>${summary}</p>` : ""}
                    <a href="${post}">続きを読む</a>
                `;
                postList.appendChild(articleElem);
            })
            .catch(error => console.error("記事読み込みエラー:", error));
    });

    // =======================
    // モーダル機能（画像拡大）
    // =======================
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

    // =======================
    // スムーススクロール
    // =======================
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // =======================
    // Worksセクションのフェードイン
    // =======================
    const items = document.querySelectorAll('.work-item');
    window.addEventListener('scroll', () => {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
    });
    // 初期スタイル設定
    items.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
    });
});
