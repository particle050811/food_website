$(document).ready(function () {
    // 绑定表单提交事件
    resetSubmit();
});

function resetSubmit() {
    document.getElementById('resetForm').addEventListener('submit', function (event) {
        event.preventDefault();
        handleFormSubmit();
    });
}

// 表单提交处理函数
function handleFormSubmit() {
    const email = document.getElementById('exampleInputEmail1').value;
    const emailCode = document.getElementById('exampleInputEmailCode').value;

    if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        alert('Email format is incorrect.');
        return;
    }

    const data = {};
    if (email) data.email = email;
    if (emailCode) data.code = emailCode;
    console.log(emailCode);
    axios.post('http://localhost:8080/verify', data)
        .then(function (response) {
            console.log(response);
            if (response.data.code == 0) {
                alert(response.data.msg);
            } else {
                id=response.data.id;
                stroage.setItem('id',id);
                resetPassword();
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('Reset failed.');
        });
}
function resetPassword() {
    const password = document.getElementById('exampleInputPassword1').value;
    const confirmPassword = document.getElementById('exampleInputPassword2').value;
    const id = stroage.getItem('id');
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    axios.put('http://localhost:8080/setNewPassword', {
        password: password,
        id: id
    })
        .then(function (response) {
            console.log(response);
            if (response.data.code == 0) {
                alert(response.data.msg);
            } else {
                //alert('Reset Successful.');
                window.location.href = '登录.html';
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('Reset failed.');
        });
}