
// =======================
// モーダル機能
// =======================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.clickable').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
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
// スクロール時のフェードイン
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

// =======================
// 記事一覧の自動生成
// =======================
// 記事データ（必要に応じて追加）
const articles = [
    {
        title: "記事タイトル1",
        summary: "ここに記事の概要を記載します。",
        link: "articles/article1.html"
    },
    {
        title: "記事タイトル2",
        summary: "ここに記事の概要を記載します。",
        link: "articles/article2.html"
    },
    {
        title: "記事タイトル3",
        summary: "ここに記事の概要を記載します。",
        link: "articles/article3.html"
    }
];

// 記事一覧を生成
const postList = document.getElementById('post-list');

articles.forEach(article => {
    const articleElem = document.createElement('article');
    articleElem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <a href="${article.link}" target="_blank">続きを読む</a>
    `;
    postList.appendChild(articleElem);
});
