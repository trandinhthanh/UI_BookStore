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
            localStorage.setItem('user', null);
            window.location.replace("index.html");
        } else if (part == "dangNhap") {
            window.location.replace("login.html");
        } else if (part == "dangKy") {
            window.location.replace("login.html#dangKy");
        } else if (part == "thanhToan") {
            var user = JSON.parse(localStorage.getItem("user"));
            if (user != null) {
                window.location.replace("checkout.html");
            } else {
                window.location.replace("login.html");
            }
        } else if (dsLinkDanhMuc.indexOf(part) < 0) {
            location.reload();
            window.location.replace("shop-details.html" + window.location.hash);
        }
    });
})(jQuery);