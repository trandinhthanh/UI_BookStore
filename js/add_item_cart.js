(function($) {
    $("#addCart").click(function() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (cartItems == null) {
            cartItems = [];
        }
        let idSanPham = $("#idSanPham").text();
        let soLuong = Number($("#soLuong").val());
        var listID = [];
        $.each(cartItems, function(key, item) {
            if (Number(item.idSanPham) == idSanPham) {
                item.soLuong = Number(item.soLuong) + soLuong;
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
    });

})(jQuery);