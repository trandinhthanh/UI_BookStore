$(document).ready(function() {
    var data;
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhMucSP/listDanhMucSanPham",
        data: data,
        crossDomain: true,
        contentType: false,
        success: function(data) {

            $.each(data, function(key, item) {
                $('#danh_muc_san_pham').append(
                    `<li><a href="">${item.tenDanhMuc}</a></li>`
                );
            });

        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
});