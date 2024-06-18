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
async function load(detail){
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
}
$(document).ready(function () {
    document.getElementById('search-button').addEventListener('click', async function() {
        event.preventDefault();
        console.log("Button clicked!");
        const detail = document.getElementById('search-input').value;
        console.log("Detail: ", detail);
        load(detail)
    });
    const detail = window.location.search.split('=')[1].split('&')[0];
    if (detail){
        //search-input中填入deatil
        document.getElementById('search-input').value = detail;
        load(detail);
    }
});


