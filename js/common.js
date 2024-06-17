// common.js

// 检查用户是否已登录
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        // 用户已登录，更新导航栏
        document.getElementById('userButton').style.display = 'none';
        document.getElementById('avatarContainer').style.display = 'block';
    }
}

// 页面加载时检查登录状态
window.onload = checkLoginStatus;
