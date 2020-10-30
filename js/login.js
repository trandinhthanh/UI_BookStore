(function($) {
    $("#signUpAcc").click(function(e) {
        var data = convertJson('.form-signup');
        if ($('#matKhau').val() != $('#nhapLaiMK').val()) {
            $('#nhapLaiMK').focus();
            return;
        }
        if (data != null) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/nguoiDung/create",
                data: data,
                async: false,
                crossDomain: true,
                success: function(data) {
                    if (data == false) {
                        e.preventDefault();
                        $('#logreg-forms .form-signup').toggle();
                    }

                },
                error: function(e) {
                    console.log("ERROR : ", e);

                }
            });
        }
    });
})(jQuery);

function toggleResetPswd(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(() => {
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
})