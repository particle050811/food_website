async function fetchComments() {

    var commentHtml = "";
    const reponse1=await axios.get(`http://localhost:8080/community/postReplies/${id}`);
    const comments=reponse1.data.data;


    for(let i=0;i<comments.length;i++) {
        const comment = comments[i];
        const reposnse2=await axios.get(`http://localhost:8080/community/replyReplies/${comment.id}`);
        replies=reposnse2.data.data;
        var replyHtml = "";
        for(let j=0;j<replies.length;j++) {
            const reply = replies[j];
            const image=reply.photo;
            replyHtml += `
                    <div class="comment-son">
                        <div class="comment-header">
                            <img src="${image}" alt="User Image" style="width: 1.5em; height: 1.5em">
                            <div>${reply.username}</div>
                            <div style="font-weight: normal">&nbspreply to&nbsp</div>
                            <div>${reply.name}</div>
                        </div>
                        <div class="comment-cab">
                            <div class="comment-content">${reply.content}</div>
                            <button class="comment-button" data-reply-id="${reply.id}" data-type="2">Reply</button>
                        </div>
                    </div>
                `;

        }
        const image=comment.image;
        commentHtml+=`
                <div class="comment">
                    <div class="comment-header">
                        <img src="${image}" alt="User Image" style="width: 1.5em; height: 1.5em">
                        <div>${comment.username}</div>
                    </div>
                    <div class="comment-cab">
                        <div class="comment-content">${comment.content}</div>
                        <button class="comment-button" data-reply-id="${comment.id}" data-type="2">Reply</button>
                    </div>
                    ${replyHtml}
                </div>
            `;
    }
    return commentHtml;
}
$(document).ready(function() {
    (async () => {
        const commentHtml = await fetchComments();
        document.getElementById('comments-container').innerHTML = commentHtml;
        //console.log(commentHtml);
    })();
});
