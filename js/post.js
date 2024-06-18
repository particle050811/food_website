
async function post() {
    const formData = new FormData();
    const image= document.getElementById('post-image').files[0];
    formData.append('file', image);
    const response = await axios.post('http://localhost:8080/community/upload', formData);
    const url=response.data.data;
    const content=document.getElementById('post-content').value;
    const title=document.getElementById('post-title').value;
    post={
        "address":1,
        "content":content,
        "title":title,
        "location":"",
        "images":[url]
    }
    const res=await axios.post('http://localhost:8080/community/post',post);
    if (res.data.code){
        alert("发布成功");
    }
    else{
        console.error(res.data.message);
    }
}
$(document).ready(function () {
    addEventListener('submit', function (event) {
        event.preventDefault();
        post();
    })
})