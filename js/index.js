(function($) {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/listSanPhamNoiBat",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                $('#listSPNoiBat').append(
                    ` <div class="col-lg-3">
                        <div class="categories__item set-bg" data-setbg="http://localhost:8080/file/img/${item.linkHinhChinh}">
                            <h5><a href='shop-list.html#${item.tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h5>
                        </div>
                    </div>`
                );
            });

        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
})(jQuery);