(function($) {
    $("#addCart").click(function() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        var account = JSON.parse(localStorage.getItem("user"));
        if (cartItems == null) {
            cartItems = [];
        }
        let idSanPham = Number($("#idSanPham").text());
        let soLuong = Number($("#soLuong").val());
        const soluongSanPham = Number($('#soluongSanPham').text());
        if (soLuong <= soluongSanPham) {
            var listID = [];
            $.each(cartItems, function(key, item) {
                if (Number(item.idSanPham) == idSanPham) {
                    if ((Number(item.soLuong) + soLuong) <= soluongSanPham) {
                        item.soLuong = Number(item.soLuong) + soLuong;
                        if (account != null) {
                            updateItemCartAPI(JSON.stringify(item));
                        }
                    } else {
                        showMessage();
                    }
                }
                listID.push(item.idSanPham);

            });
            if (listID.indexOf(idSanPham) < 0) {
                var obj = {};
                if (account == null) {
                    obj = {
                        idNguoiGiaoDich: null,
                        idSanPham: idSanPham,
                        soLuong: soLuong
                    }
                } else if (account != null) {
                    obj = {
                        idNguoiGiaoDich: account.idNguoiDung,
                        idSanPham: idSanPham,
                        soLuong: soLuong
                    }
                    addItemCartAPI(JSON.stringify(obj));
                }

                cartItems.push(obj);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            $("#cartNumber").text(cartItems.length);
            localStorage.setItem('cartNumber', cartItems.length);
        } else {
            $("#soLuong").val(soluongSanPham);
            showMessage();
        }
    });

    function showMessage() {
        $("#messageAddCart").text("Số lượng sản phẩm không đủ");
        $("#messageAddCart").addClass("show");
        setTimeout(() => { $("#messageAddCart").removeClass("show"); }, 1500);
    }

})(jQuery);

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

function updateItemCartAPI(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/donHang/update",
        data: data,
        async: false,
        crossDomain: true,
        success: function(data) {},
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
};