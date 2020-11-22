(function($) {
    var path = window.location.hash;
    var numberPage = path.slice(path.indexOf("/") + 1, path.length);
    var linkDanhMuc = path.slice(1, path.indexOf("/"));
    var listSanPham = null;
    let listSPOld = [];
    if (linkDanhMuc != '' && numberPage != '') {
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/sanPham/listSanPhamTheoPage/" + linkDanhMuc + "/" + numberPage,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                listSanPham = result.sanPhamOutputs;
                listSPOld = listSanPham;
                $('#tongSoSP').text(listSanPham.length);
                if (listSanPham.length == 0) {
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
                    loadSanPham(listSanPham);
                }
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    }

    $("#sortSanPham").change(function() {
        $('#listBook').empty();
        var data = null;
        if ($("#sortSanPham").val() == "1") {
            data = sortByGia(listSanPham, "giam_dan");
        } else if ($("#sortSanPham").val() == "2") {
            data = sortByGia(listSanPham, "tang_dan");
        } else {
            data = sortByNewSP(listSPOld);
        }
        loadSanPham(data);
        $('.set-bg').each(function() {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
    });

})(jQuery);

function loadSanPham(data) {
    $.each(data, function(key, item) {
        var tenSanPham = item.tenSanPham.replaceAll(" ", "_");
        var trangThai = "Còn Hàng";
        var status = "status--process";
        if (item.soLuong == 0) {
            status = "status--denied";
            trangThai = "Hết Hàng";
        }
        var giamGia = formatMoney(item.gia * ((100 - item.giamGia) / 100));
        var gia = formatMoney(item.gia);
        if (item.giamGia > 0) {
            $('#listBook').append(
                `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="http://localhost:8080/file/img/${item.linkHinhChinh}">
                <div class="product__discount__percent">-${item.giamGia}%</div>
                </div>
                <div class="product__discount__item__text">
                    <h5><a href='#${tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h5>
                    <div class="product__item__price">${giamGia}<span>${gia}</span></div>
                </div>
                <div class="${status}">
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
                <div class="product__discount__item__text">
                    <h5><a href='#${tenSanPham}/${item.idSanPham}'>${item.tenSanPham}</a></h5>
                    <div class="product__item__price">${gia}</div>
                </div>
                <div class="${status}">
                    <h6>${trangThai}</h6>
                </div>
            </div>
        </div>`
            );
        }
    });
}

function sortByGia(data, type) {
    data.sort(function(a, b) {
        var giamGiaA = formatMoney(a.gia * ((100 - a.giamGia) / 100));
        var giamGiaB = formatMoney(b.gia * ((100 - b.giamGia) / 100));
        if (type == "tang_dan") {
            if (giamGiaA < giamGiaB) return -1;
            if (giamGiaA > giamGiaB) return 1;
            return 0;
        } else {
            if (giamGiaA > giamGiaB) return -1;
            if (giamGiaA < giamGiaB) return 1;
            return 0;
        }
    });
    return data;
}

function sortByNewSP(data) {
    data.sort(function(a, b) {
        var ngayTaoA = new Date(a.ngayTao);
        var ngayTaoB = new Date(b.ngayTao);

        if (ngayTaoA > ngayTaoB) return -1;
        if (ngayTaoA < ngayTaoB) return 1;
        return 0;
    });
    return data;
}