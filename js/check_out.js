(function($) {
    var account = JSON.parse(localStorage.getItem("user"));
    if (account != null) {
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/transaction/getChiTiet/" + account.idNguoiDung,
            crossDomain: true,
            contentType: false,
            success: function(data) {
                $("#hoVaTen").val(data.tenNguoiDung);
                $("#sdt").val(data.soDienThoai);
                $("#email").val(data.email);
                $("#diaChi").val(data.diaChi);

                $.each(data.sanPhamThanhTiens, function(index, item) {
                    var tien = formatMoney(item.gia);
                    $("#spThanhToan").append(`<li>${item.tenSanPham}<span> ${tien}</span></li>`);
                });

                $("#tongTien").text(formatMoney(data.tongCong));

            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    }

    $("#btnThanhToan").click(function() {
        var account = JSON.parse(localStorage.getItem("user"));
        if (account != null) {
            checkTonKho(account);
        } else {
            alert("Vui lòng đăng nhập để thực hiện thanh toán!")
        }
    });
})(jQuery);

function checkTonKho(account) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/transaction/checkTonKho/" + account.idNguoiDung,
        async: false,
        crossDomain: true,
        success: function(result) {
            if (result == true) {
                var dataInput = {
                    idKhachHang: account.idNguoiDung,
                    tenKhachHang: account.tenNguoiDung,
                    soDienThoai: $("#sdt").val(),
                    diaChiGiaoHang: $("#diaChi").val(),
                    email: $("#email").val(),
                    soTien: removeFormatMoney($("#tongTien").text()),
                    ghiChu: $("#ghiChu").val(),
                }

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "http://localhost:8080/transaction/create",
                    data: JSON.stringify(dataInput),
                    crossDomain: true,
                    success: function(data) {
                        localStorage.setItem('cartNumber', null);
                        localStorage.setItem('cartItems', null);
                        alert("Đặt hàng thành công!")
                        window.location.replace("index.html");

                    },
                    error: function(e) {
                        alert("Đặt hàng không thành công!")
                        console.log("ERROR : ", e);

                    }
                });
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