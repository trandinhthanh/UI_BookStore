(function($) {
    $("#signUpAcc").click(function(e) {
        var data = convertJson('.form-signup');
        if ($('#matKhau').val() != $('#nhapLaiMK').val()) {
            $('#nhapLaiMK').focus();
            alert("Mật khẩu và xác nhận mật khẩu không trùng khớp!");
            return;
        }
        if (data != null && $('.form-signup')[0].checkValidity()) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/nguoiDung/create",
                data: data,
                async: false,
                crossDomain: true,
                success: function(data) {
                    if (data == true) {
                        alert("Tạo tài khoản thành công!")
                        window.location.replace("login.html");
                    }
                },
                error: function(e) {
                    $('#messageCreate').text("Email đã được đăng ký, vui lòng chọn email khác!")
                    console.log("ERROR : ", e);

                }
            });
        } else {
            alert("Email sai định dạng vui lòng kiểm tra lại!");
            return;
        }
    });
    $("#btnDangnhap").click(function(e) {
        if (!$('.form-signin')[0].checkValidity()) {
            alert("Email hoặc mật khẩu sai vui lòng kiểm tra lại!");
            return false;
        }
        var data = convertJson('.form-signin');
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/nguoiDung/dangNhap",
            data: data,
            async: false,
            crossDomain: true,
            success: function(result) {
                saveUser(result.idNguoiDung, result.email, result.tenNguoiDung);
                loadItemsCart(result.idNguoiDung)
                window.location.replace("index.html");
            },
            error: function(e) {
                alert("Email hoặc mật khẩu không chính xác");
                console.log("ERROR : ", e);

            }
        });
    });

    $("#btnQuenMK").click(function(e) {
        if (!$('.form-reset')[0].checkValidity()) {
            alert("Vui lòng nhập Email!");
            return false;
        }
        var formData = new FormData();
        formData.append("laQuanLy", false);
        formData.append("email", $("#resetEmail").val());

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/nguoiDung/quenMatKhau", false);
        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                alert("Mật khẩu đã được đặt thành số điện thoại của bạn. Bạn vui lòng đăng nhập lại và đổi mật khẩu mới!");
                window.location.replace("login.html");
            } else {
                alert("Email không tồn tại, vui lòng kiểm tra lại!");
            }
        };
        request.send(formData);
    });

    $("#btnBack").click(function(e) {
        history.back();
    })
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

var hash = window.location.hash;
var part = hash.slice(1);
if (part == "dangKy") {
    $('#logreg-forms .form-signin').hide();
    $('#logreg-forms .form-signup').show();
}

function saveUser(id, email, tenNguoiDung) {
    var user = {
        idNguoiDung: id,
        email: email,
        tenNguoiDung: tenNguoiDung
    }
    localStorage.setItem('user', JSON.stringify(user));
}

function loadItemsCart(idNguoiDung) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/donHang/getDonHangByIdNguoiDung/" + Number(idNguoiDung),
        async: false,
        crossDomain: true,
        success: function(data) {

            var cartItems = [];
            var listIdSP = [];
            var cartItemsLocal = JSON.parse(localStorage.getItem("cartItems"));

            $.each(data, function(key, item) {
                let obj = {
                    idNguoiGiaoDich: item.idNguoiGiaoDich,
                    idSanPham: item.idSanPham,
                    soLuong: item.soLuong
                }
                listIdSP.push(item.idSanPham);
                cartItems.push(obj);
            });

            $.each(cartItemsLocal, function(key, item) {
                if (listIdSP.indexOf(item.idSanPham) < 0) {
                    item.idNguoiGiaoDich = idNguoiDung;
                    cartItems.push(item);
                    addItemCartAPI(JSON.stringify(item));
                }
            });

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
};

function addItemCartAPI(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/donHang/create",
        data: data,
        async: false,
        crossDomain: true,
        success: function(data) {},
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
};