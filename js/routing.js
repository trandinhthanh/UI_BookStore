(function($) {
    $(window).on("hashchange", function() {
        var dsLinkDanhMuc = localStorage.getItem("dsLinkDanhMuc");
        var path = window.location.hash;
        var linkDanhMuc = path.slice(1, path.indexOf("/"));
        if (dsLinkDanhMuc.indexOf(linkDanhMuc) >= 0) {
            location.reload();
            window.location.replace("shop-list.html" + window.location.hash);
        } else if (dsLinkDanhMuc.indexOf(linkDanhMuc) < 0) {
            location.reload();
            window.location.replace("shop-details.html" + window.location.hash);
        }
    });
})(jQuery);