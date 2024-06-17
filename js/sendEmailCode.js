$(document).ready(function () {
    // 绑定发送验证码事件
    sendEmailCode();
});

function sendEmailCode() {
    document.getElementById('sendEmailCode').addEventListener('click', function (event) {
        if (this.disabled) {
            alert('Please wait for 20 seconds before sending again.');
            return;
        }

        this.disabled = true;
        setTimeout(() => this.disabled = false, 20000);

        event.preventDefault();
        const email = document.getElementById('exampleInputEmail1').value;

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            alert('Email format is incorrect.');
            return;
        }

        axios.get('http://localhost:8080/getCode?email=' + email)
            .then(function (response) {
                console.log(response);
                alert('Email code sent!');
            })
            .catch(function (error) {
                console.error(error);
                alert('Failed to send email code.');
            });

    });
}
