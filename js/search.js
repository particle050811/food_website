async function showPosts(detail) {
    var showHtml = "";
    const response = await axios.get(`http://localhost:8080/community/search?detail=${detail}`);
    const articles=response.data.data;
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const images=article.images;
        var articleHtml = "";
        for (let i = 0; i < images.length; i++)
            articleHtml += `<img src="${images[i]}" alt="图片${i+1}" class="img-responsive" alt="Responsive image">`;
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

$(document).ready(function () {
    document.getElementById('search-button').addEventListener('click', async function() {
        event.preventDefault();
        console.log("Button clicked!");
        const detail = document.getElementById('search-input').value;
        console.log("Detail: ", detail);
        if (detail) {
            try {
                const showHtml = await showPosts(detail);
                console.log("HTML: ", showHtml);
                document.getElementById('show-container').innerHTML = showHtml;
            } catch (error) {
                console.error("Error in showPosts: ", error);
            }
        } else {
            alert('Please enter search content');
        }
    });
});


