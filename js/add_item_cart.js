(function($) {
    $("#addCart").click(function() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (cartItems == null) {
            cartItems = [];
        }
        let idSanPham = $("#idSanPham").text();
        let soLuong = Number($("#soLuong").val());
        const soluongSanPham = Number($('#soluongSanPham').text());
        if (soLuong <= soluongSanPham) {
            var listID = [];
            $.each(cartItems, function(key, item) {
                if (Number(item.idSanPham) == idSanPham) {
                    if ((Number(item.soLuong) + soLuong) <= soluongSanPham) {
                        item.soLuong = Number(item.soLuong) + soLuong;
                    } else {
                        showMessage();
                    }
                }
                listID.push(item.idSanPham);

            });
            if (listID.indexOf(idSanPham) < 0) {
                let obj = {
                    idSanPham: idSanPham,
                    soLuong: soLuong
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