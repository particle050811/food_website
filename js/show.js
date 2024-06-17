async function showPosts() {
    var showHtml = "";

    const pageData = {
        page:1,
        pageSize:5
    };
    const response = await axios.post('http://localhost:8080/community/posts',pageData);
    const articles=response.data.data;
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const images=article.images;
        var articleHtml = "";
        for (let i = 0; i < images.length; i++)
            articleHtml += `<img src="${images[i]}" alt="图片${i+1}" width=100px height=100px>`;
        const articleLink = `./笔记展示.html?id=${article.id}`;
        articleHtml = `
        <a href="${articleLink}" class="article-link">
        <div class="article">
            <div class="title">
                ${article.title}
            </div>
            ${articleHtml}
            <div class="content">
                ${article.content}
            </div>
        </div>
        </a>
        `;
        showHtml += articleHtml;
    }
    return showHtml;
}
$(document).ready(function() {
    (async () => {
        const showHtml = await showPosts();
        document.getElementById('show-container').innerHTML = showHtml;
    })();
})