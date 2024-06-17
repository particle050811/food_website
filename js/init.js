//let id = window.location.search.get('id'); 该函数似乎有误
//url=http://localhost:63342/Critical%20Project/%E7%AC%94%E8%AE%B0%E5%B1%95%E7%A4%BA.html?id=1&_ijt=o0eun3hc8qmjnbj5qhiq0asbtc&_ij_reload=RELOAD_ON_SAVE#
//let id = window.location.search.split('=')[1]; 这样使得id=1&_ijt
let id = window.location.search.split('=')[1].split('&')[0];
//let id=2;
console.log(id);
let token = localStorage.getItem('token');
//if (!token) window.location.href = '登录.html';
function setupAxiosDefaults(token) {
    axios.defaults.headers.common['token'] = token;
}
setupAxiosDefaults(token);
$(document).ready(function() {
    $("#header-placeholder").load("header.html");
    axios.defaults.headers.common['token'] = token;
});
