(function($) {
    $(window).on("hashchange", function() {
        var dsLinkDanhMuc = localStorage.getItem("dsLinkDanhMuc");
        var hash = window.location.hash;
        var part = null;
        if (hash.indexOf("/") >= 0) {
            part = hash.slice(1, hash.indexOf("/"));
        } else {
            part = hash.slice(1);
        }

        if (dsLinkDanhMuc.indexOf(part) >= 0) {
            location.reload();
            window.location.replace("shop-list.html" + window.location.hash);
        } else if (part == "gioHang") {
            window.location.replace("shoping-cart.html");
        } else if (part == "dangXuat") {
            localStorage.setItem('cartNumber', null);
            localStorage.setItem('user', null);
            localStorage.setItem('cartItems', null);
            window.location.replace("index.html");
        } else if (part == "dangNhap") {
            window.location.replace("login.html");
        } else if (part == "dangKy") {
            window.location.replace("login.html#dangKy");
        } else if (part == "editUser") {
            window.location.replace("editUser.html");
        } else if (part == "thanhToan") {
            var user = JSON.parse(localStorage.getItem("user"));
            if (user != null) {
                checkTonKho(user.idNguoiDung)
            } else {
                window.location.replace("login.html");
            }
        } else if (part == "search") {
            location.reload();
        } else if (part == "donHang") {
            window.location.replace("don-hang-detail.html" + window.location.hash);
        } else if (dsLinkDanhMuc.indexOf(part) < 0) {
            location.reload();
            window.location.replace("shop-details.html" + window.location.hash);
        }
    });
})(jQuery);

function checkTonKho(idNguoiDung) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/transaction/checkTonKho/" + idNguoiDung,
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data == true) {
                window.location.replace("checkout.html");
            } else {
                alert("Hiện tại có 1 số sản phẩm không còn đủ hàng để bán, bạn vui lòng kiểm tra lại số lượng sản phẩm trong giỏ hàng của bạn.")
                window.location.replace("shoping-cart.html");
            }
        },
        error: function(e) {
            console.log("ERROR : ", e);
        }
    });
}