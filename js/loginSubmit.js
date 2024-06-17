$(document).ready(function() {
    loginSubmit();
});

function loginSubmit() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nameOrPhone = document.getElementById('exampleID').value;
        const password = document.getElementById('exampleInputPassword1').value;

        axios.post('http://localhost:8080/login', {
            nameOrPhone: nameOrPhone,
            password: password
        })
            .then(function(response) {
                if (response.data.code) {
                    localStorage.setItem('token', response.data.data.token);
                    console.log(response.data.data.token);
                    window.location.href = "首页.html";
                } else {
                    // 显示错误消息
                    alert(response.data.msg);
                    document.getElementById('messageContainer').innerHTML = `<div class="alert alert-danger">${response.data.message}</div>`;
                }
            })
            .catch(function(error) {
                console.error(error);
                // 显示错误消息
                document.getElementById('messageContainer').innerHTML = '<div class="alert alert-danger">An error occurred while logging in. Please try again later.</div>';
            });
    });
}
