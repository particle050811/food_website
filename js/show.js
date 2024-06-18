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
            articleHtml += `<img src="${images[i]}" alt="图片${i+1}" class="img-responsive" alt="Responsive image">`;
        const articleLink = `./笔记展示.html?id=${article.id}`;
        articleHtml = `
            <div class="box" onclick="location.href='${articleLink}'">
                <div class="left" style="width: 40%">
                    ${articleHtml}
                </div>
                <div class="right" style="width: 54%; height: 80%; margin-left: 3%">
                    <div class="title">
                        ${article.title}
                    </div>
                    <div class="content" style="  display: -webkit-box;
                        overflow: hidden;
                        -webkit-line-clamp: 6;
                        -webkit-box-orient: vertical;"
                    >
                        ${article.content}
                    </div>            
                </div>
            </div>
        
        `;
        showHtml += articleHtml;
    }
    showHtml=`
        <div class=article>
            ${showHtml}
        </div>
    `;
    return showHtml;
}
$(document).ready(function() {
    (async () => {
        const showHtml = await showPosts();
        document.getElementById('show-container').innerHTML = showHtml;
    })();
})