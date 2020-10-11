(function($) {
    var path = window.location.hash;
    var numberPage = path.slice(path.indexOf("/") + 1, path.length);
    var linkDanhMuc = path.slice(1, path.indexOf("/"));
    if (linkDanhMuc != '' && numberPage != '') {
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/sanPham/listSanPhamTheoPage/" + linkDanhMuc + "/" + numberPage,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                var data = result.sanPhamOutputs;
                $('#tongSoSP').text(data.length);
                if (data.length == 0) {
                    $('#listBook').empty();
                } else {
                    for (i = 1; i <= result.totalPages; i++) {
                        if (numberPage == i) {
                            $('#page').append(`<a style="background: #7fad39;" href='#${linkDanhMuc}/${i}'>${i}</a>`);
                        } else {
                            $('#page').append(`<a href='#${linkDanhMuc}/${i}'>${i}</a>`);
                        }
                    }
                    // $('#nextPage').attr("href", '#${linkDanhMuc}/${result.totalPages}');
                    $.each(data, function(key, item) {
                        var tenSanPham = item.tenSanPham.replaceAll(" ", "_");
                        var trangThai = "Còn Hàng";
                        if (item.soLuong == 0) {
                            trangThai = "Hết Hàng";
                        }
                        if (item.giamGia > 0) {
                            $('#listBook').append(
                                `<div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__item">
                                <div class="product__item__pic set-bg" data-setbg="http://localhost:8080/file/img/${item.linkHinhChinh}">
                                <div class="product__discount__percent">-${item.giamGia}%</div>
                                </div>
                                <div class="product__item__text">
                                    <h6><a href='#${tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h6>
                                    <h5>${item.gia}</h5>
                                </div>
                                <div class="tinh__trang__product">
                                    <h6>${trangThai}</h6>
                                </div>
                            </div>
                        </div>`
                            );
                        } else {
                            $('#listBook').append(
                                `<div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__item">
                                <div class="product__item__pic set-bg" data-setbg="http://localhost:8080/file/img/${item.linkHinhChinh}">
                                </div>
                                <div class="product__item__text">
                                    <h6><a href='#${tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h6>
                                    <h5>${item.gia}</h5>
                                </div>
                                <div class="tinh__trang__product">
                                    <h6>${trangThai}</h6>
                                </div>
                            </div>
                        </div>`
                            );
                        }
                    });
                }
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    }
})(jQuery);