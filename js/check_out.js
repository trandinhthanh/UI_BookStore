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
            var data = {
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
                data: JSON.stringify(data),
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
            alert("Vui lòng đăng nhập để thực hiện thanh toán!")
        }
    });
})(jQuery);