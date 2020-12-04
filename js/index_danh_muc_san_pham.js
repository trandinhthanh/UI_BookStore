(function($) {
    var listDanhMuc = [];
    var dsLinkDanhMuc = [];
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhMucSP/getDanhMucSPHoatDong",
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                $('#danh_muc_san_pham').append(
                    `<li><a href='#${item.linkDanhMuc}/1'>${item.tenDanhMuc}</a></li>`
                );
                listDanhMuc.push(JSON.stringify(item));
                dsLinkDanhMuc.push(item.linkDanhMuc);
            });
            localStorage.setItem('listDanhMuc', listDanhMuc);
            localStorage.setItem('dsLinkDanhMuc', dsLinkDanhMuc);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
})(jQuery);