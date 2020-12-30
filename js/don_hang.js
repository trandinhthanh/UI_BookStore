(function($) {

    var account = JSON.parse(localStorage.getItem("user"));
    if (account != null) {
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/transaction/findByIdKhachHang/" + account.idNguoiDung,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                if (result.length == 0) {
                    $('#container_giao_dich').empty();
                    $('#container_giao_dich').append(
                        `<div class="row">
                            <div class="col-lg-12 text-center">
                                <h2>Hiện tại không có đơn hàng nào!</h2>
                            </div>
                        </div>`
                    );
                    return;
                }
                $.each(result, function(key, item) {
                    var trangThai = null;
                    var statusClass = null;
                    var hiddenChangeStatus = "hidden";
                    if (item.trangThai == 0) {
                        trangThai = "Chờ xác nhận";
                        statusClass = "status--process";
                        hiddenChangeStatus = "";
                    } else if (item.trangThai == 1) {
                        trangThai = "Đang giao hàng";
                        statusClass = "status--process";
                    } else if (item.trangThai == 2) {
                        trangThai = "Đã giao hàng";
                        statusClass = "status--process";
                    } else if (item.trangThai == 3) {
                        trangThai = "Đơn đã hủy";
                        statusClass = "status--denied";
                    } else if (item.trangThai == 5) {
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
                });
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    }

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
        },
        error: function(e) {
            alert("Thực hiện không thành công!");
            console.log("ERROR : ", e);
        }
    });
}