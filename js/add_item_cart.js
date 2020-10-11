(function($) {
    $("#addCart").click(function() {
        var cartNumber = localStorage.getItem("cartNumber") == null ? 0 : Number(localStorage.getItem("cartNumber")) + 1;
        $("#cartNumver").text(cartNumber);
        localStorage.setItem('cartNumber', cartNumber);
        addCart();
    });

    function addCart() {
        let idSanPham = $("#idSanPham").text();
        let soLuong = $("#soLuong").val();
        let obj = {
            idSanPham: idSanPham,
            soLuong: soLuong
        }
        localStorage.setItem('cartItems', JSON.stringify(obj));
    }
})(jQuery);