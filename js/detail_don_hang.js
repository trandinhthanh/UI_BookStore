(function($) {
    var path = window.location.hash;
    var idGiaoDich = path.slice(path.indexOf("/") + 1, path.length);

    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/transaction/listTransaction/" + idGiaoDich,
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(item) {
            var trangThai = null;
            var statusClass = null;
            var hiddenChangeStatus = "hidden";
            if (item.trangThai == 0) {
                $('#choXacNhan').addClass("active");
                trangThai = "Chờ xác nhận";
                statusClass = "status--process";
                hiddenChangeStatus = "";
            } else if (item.trangThai == 1) {
                $('#choXacNhan').addClass("active");
                $('#dangGiao').addClass("active");
                trangThai = "Đang giao hàng";
                statusClass = "status--process";
            } else if (item.trangThai == 2) {
                $('#choXacNhan').addClass("active");
                $('#dangGiao').addClass("active");
                $('#daGiao').addClass("active");
                trangThai = "Đã giao hàng";
                statusClass = "status--process";
            } else if (item.trangThai == 3) {
                $('#huyDon').addClass("active");
                trangThai = "Đơn đã hủy";
                statusClass = "status--denied";
            } else if (item.trangThai == 5) {
                $('#huyDon').addClass("active");
                trangThai = "Giao không thành công";
                statusClass = "status--denied";
            }
            var listSP = '';
            $.each(item.sanPhamThanhTiens, function(key, sanPham) {
                listSP += sanPham.tenSanPham + "<br>";
            });

            $('#listDongHang').append(
                `<tr>
                        <td>
                            ${item.idGiaoDich}
                        </td>
                        <td >
                            ${item.diaChi}
                        </td>
                        <td >
                            ${listSP}
                        </td>
                        <td>
                            ${formatMoney(item.tongCong)}
                        </td>
                        <td >
                            ${formatDate(item.ngayMua)}
                        </td>
                        <td>
                            <span class="${statusClass}" id="status_${item.idGiaoDich}">${trangThai}</span>
                        </td>
                        <td class="shoping__cart__item__cancel">
                            <span class="fa fa-ban" ${hiddenChangeStatus} id="btnHuy_${item.idGiaoDich}" onclick="huyDonHang(${item.idGiaoDich})" title="Hủy đơn hàng"></span>
                        </td>   
                </tr>`

            );
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });

})(jQuery);


function huyDonHang(idGiaoDich) {
    var trangThai = "3";
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/transaction/updateTrangThai/" + idGiaoDich + "/" + trangThai,
        crossDomain: true,
        success: function(data) {
            $('#btnHuy_' + idGiaoDich).attr('hidden', "true");
            $('#status_' + idGiaoDich).text("Đơn đã hủy");
            $('#status_' + idGiaoDich).attr('class', "status--denied");
            $('#choXacNhan').attr('class', "step");
            $('#huyDon').addClass("active");
        },
        error: function(e) {
            alert("Thực hiện không thành công!");
            console.log("ERROR : ", e);
        }
    });
}