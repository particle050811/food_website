async function fetcharticle() {
    var articleHtml = "";
    const response=await axios.get(`http://localhost:8080/community/post/${id}`);
    const article=response.data.data;
    const images=article.images;
    //加载图片;
    //console.log(images);
    for (let i = 0; i < images.length; i++)
        articleHtml += `<img src="${images[i]}" alt="图片${i+1}" class="img-responsive" alt="Responsive image">`;
    articleHtml = `
        <div class="article">
            ${articleHtml}
            <div class="title">
                ${article.title}
            </div>
            <div class="content">
                ${article.content}
            </div>
            <button class="comment-button" data-reply-id="${id}" data-type="1" >Add Comment</button>
        </div>
    `;
    return articleHtml;
}
$(document).ready(function() {
    (async () => {
        const articleHtml=await fetcharticle();
        document.getElementById('article-container').innerHTML = articleHtml;
        //console.log(articleHtml);
    })();
    $(document).on('click', '.comment-button', function() {
        $('#comment-interface').show();
        replyId = $(this).data('reply-id');
        type=$(this).data('type');
    });

    $('#close-button').click(function() {
        $('#comment-interface').hide();
    });

    $('#submit-button').click(async function() {
        const commentText = $('#comment-text').val();

        const commentData = {
            id: replyId,
            address: type,
            content: commentText,
            location: "",
            images: null
        };

        try {
            const response = await axios.post('http://localhost:8080/community/reply', commentData);
            console.log('Comment submitted:', response.data);
            $('#comment-interface').hide();
            location.reload(); // 提交评论后重新加载页面以更新评论列表
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    });
});