
$(document).ready(function() {
    form();
});

function form() {
    const enabledFields = window.enabledFields || [];
    const searchField = document.getElementById('searchField');
    document.querySelectorAll('.form-group').forEach(function (field) {
        if (field !== searchField)
            field.style.display = 'none';
    });

    enabledFields.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);

        if (field) {
            field.style.display = 'block';
            console.log('Field enabled:', fieldId); // 调试信息
        } else {
            console.error('Field not found:', fieldId); // 错误信息
        }
    });
}



