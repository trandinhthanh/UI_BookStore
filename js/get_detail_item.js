(function($) {
    var path = window.location.hash;
    var idSanPham = path.slice(path.indexOf("/") + 1, path.length);
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/getSanPhamByID/" + idSanPham,
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $('#idSanPham').text(data.idSanPham);
            $('#tenSanPham').text(data.tenSanPham);
            $('#moTa').text(data.moTa);

            if (data.giamGia > 0) {
                var giamGia = data.gia * ((100 - data.giamGia) / 100);
                $('#giamGia').text(formatMoney(giamGia));
                $('#giaGoc').text(formatMoney(data.gia));
                $('#phanTramGiam').text(data.giamGia + "%");
            } else {
                $('#giamGia').text(formatMoney(data.gia));
                $('#phan__tram').hide();
            }
            $('#soluongSanPham').text(data.soLuong);
            $('#view').text("Lượt xem: " + data.luotXem);
            $('#like').text(data.luotThich);
            $('#hinhChinh').attr("src", "http:/localhost:8080/file/img/" + data.linkHinhChinh);
            $.each(data.danhSachLinkHinh, function(key, item) {
                $('#listImg').append(
                    `<img data-imgbigurl="http:/localhost:8080/file/img/${item}" src="http://localhost:8080/file/img/${item}" alt="">`
                );
            });
            getSanPhamLienQuan(data.idDanhMucSP, idSanPham);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });


})(jQuery);

function getSanPhamLienQuan(idDanhMucSP, idSanPham) {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/listSanPhamLienQuan/" + idDanhMucSP,
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                if (item.idSanPham != idSanPham) {
                    var gia = formatMoney(item.gia);
                    $('#sanPhamLienQuan').append(
                        `<div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="http://localhost:8080/file/img/${item.linkHinhChinh}">
                        </div>
                        <div class="product__item__text">
                            <h6><a href='#${item.tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h6>
                            <h5>${gia}</h5>
                        </div>
                    </div>
                </div>`
                    );
                }
            });

        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}