$(document).ready(function () {
    // 绑定表单提交事件
    registerSubmit();
});

function registerSubmit() {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        handleFormSubmit();
    });
}

// 表单提交处理函数
function handleFormSubmit() {
    const userName = document.getElementById('exampleInputName').value;
    const email = document.getElementById('exampleInputEmail1').value;
    const phone = document.getElementById('exampleInputPhone').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const emailCode = document.getElementById('exampleInputEmailCode').value;

    if (userName && userName.length > 8) {
        alert('Username cannot exceed 8 characters.');
        return;
    }
    if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        alert('Email format is incorrect.');
        return;
    }
    if (phone && !/^1[3456789]\d{9}$/.test(phone)) {
        alert('Phone number format is incorrect.');
        return;
    }

    const data = {};
    if (userName) data.username = userName;
    if (email) data.email = email;
    if (phone) data.phone = phone;
    if (password) data.password = password;
    if (emailCode) data.code = emailCode;
    console.log(emailCode);
    axios.post('http://localhost:8080/register', data)
        .then(function (response) {
            console.log(response);
            if (response.data.code == 0) {
                alert(response.data.msg);
            } else {
                alert('Registration successful!');
                window.location.href = "登录.html";
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('Registration failed.');
        });
}