$(function() {
    $('.error').hide();
    //validating when blur
    $('input:not(.button input)').blur(function() {
        if (validator.isFieldValid(this.id, this.value)) {
            $(this).parent().find('.error').text('').hide();
        } else {
            $(this).parent().find('.error').text(validator.getErrorMessage(this.id)).show();
        }
    });
    //validating when click button
    $('.button').click(function() {
        $('input:not(.button input)').blur();
        if (!validator.isFormValid()) {
            return false;
        }
    });
    
});