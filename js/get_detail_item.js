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

            $('#view').text("Lượt xem: " + data.luotXem);
            $('#like').text(data.luotThich);
            $('#hinhChinh').attr("src", "http:/localhost:8080/file/img/" + data.linkHinhChinh);
            $.each(data.danhSachLinkHinh, function(key, item) {
                $('#listImg').append(
                    `<img data-imgbigurl="http:/localhost:8080/file/img/${item}" src="http://localhost:8080/file/img/${item}" alt="">`
                );
            });
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });


})(jQuery);