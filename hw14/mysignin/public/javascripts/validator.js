var validator = {
    form:{
        username: {
            status: false,
            errorMessage: "用户名6~18位英文字母、数字或下划线，必须以英文字母开头"
        },
        uid: {
            status: false,
            errorMessage: "学号8位数字，不能以0开头"
        },
        password: {
            status: false,
            errorMessage: "密码为6~12位数字、大小写字母、中划线、下划线"
        },
        confirmPassword: {
            status: false,
            errorMessage: "重复密码与密码一致"
        },
        phone: {
            status: false,
            errorMessage: "电话11位数字，不能以0开头"
        },
        email: {
            status: false,
            errorMessage: "邮箱格式：*@*.*"
        },
    },
    isUsernameValid: function(username) {
        return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
    },
    isUidValid: function(uid) {
        return this.form.uid.status = /^[1-9][0-9]{7}$/.test(uid);
    },
    isPasswordValid: function(password) {
        return this.form.password.status = /^[a-zA-Z0-9_-]{6,12}$/.test(password);
    },
    isConfirmPasswordValid: function(confirmPassword) {
        return this.form.confirmPassword.status = !!($('#password').val() === confirmPassword);
    },
    isPhoneValid: function(phone) {
        return this.form.phone.status = /^[0-9]{11}$/.test(phone);
    },
    isEmailValid: function(email) {
        return this.form.email.status = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
    },
    isFieldValid: function(fieldname, buf) {
        var temp = fieldname[0].toUpperCase()+fieldname.slice(1, fieldname.length);
        return this['is'+temp+'Valid'](buf);
    },
    isFormValid: function() {
        return this.form.username.status && this.form.uid.status && this.form.password.status && this.form.confirmPassword.status && this.form.phone.status && this.form.email.status;
    },
    getErrorMessage: function(fieldname) {
        return this.form[fieldname].errorMessage;
    }
}

if (typeof module == 'object') {
    module.exports = validator;
}