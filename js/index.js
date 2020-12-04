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
                            <h5><a href='shop-details.html#${item.tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h5>
                        </div>
                    </div>`
                );
            });

        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });

    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/getListSanPhamGiamGia",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            if (data == null) {
                $('#siderGiamGia').remove();
                return;
            }
            $.each(data, function(key, item) {
                var giamGia = formatMoney(item.gia * ((100 - item.giamGia) / 100));
                var gia = formatMoney(item.gia);
                $('#listSanPhamGiamGia').append(
                    ` <div class="col-lg-4">
                        <div class="product__discount__item">
                            <div class="product__discount__item__pic set-bg" data-setbg="http://localhost:8080/file/img/${item.linkHinhChinh}">
                                <div class="product__discount__percent">-${item.giamGia}%</div>
                            </div>
                            <div class="product__discount__item__text">
                                <h5><a href='shop-details.html#${item.tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h5>
                                <div class="product__item__price">${giamGia}<span>${gia}</span></div>
                            </div>
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