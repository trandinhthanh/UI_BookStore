(function($) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems == null || cartItems.length == 0) {
        $('#container_shoping_cart').append(
            `<div class="row">
                <div class="col-lg-12 text-center">
                    <h2>Không có sản phẩm trong giỏ hàng!</h2>
                </div>
            </div>`
        );
        $('#tableCartItems').hide();
        $('#totalAmt').hide();
    } else {
        var tongTien = 0;
        $.each(cartItems, function(key, item) {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/sanPham/getSanPhamByID/" + item.idSanPham,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(result) {
                    var messageCart = '';
                    var giaSanPham = 0;
                    if (result.giamGia > 0) {
                        giaSanPham = result.gia * ((100 - result.giamGia) / 100);
                    } else {
                        giaSanPham = result.gia;
                    }
                    if (result.soLuong == 0) {
                        messageCart = 'Sản phẩm hết hàng';
                    } else if (item.soLuong > result.soLuong) {
                        messageCart = 'chỉ còn ' + result.soLuong + ' sản phẩm';
                    }

                    var tongTienSP = giaSanPham * item.soLuong;
                    tongTien += tongTienSP;

                    $('#cartItems').append(
                        `<tr id="row_${result.idSanPham}">
                        <td class="shoping__cart__item">
                            <img src="http:/localhost:8080/file/img/${result.linkHinhChinh}" alt="">
                            <h5>${result.tenSanPham}</h5>
                            <span id="soluongSanPham_${result.idSanPham}" hidden>${result.soLuong}</span>
                        </td>
                        <td class="shoping__cart__price" id="giaSanPham_${result.idSanPham}">
                            ${formatMoney(giaSanPham)}
                        </td>
                        <td class="shoping__cart__quantity">
                            <div class="quantity">
                                <div class="pro-qty">
                                    <input type="text" value="${item.soLuong}" onchange="changeSoluong(${result.idSanPham})" id="soLuong_${result.idSanPham}">
                                </div>
                            </div>
                            <h5 style="color: red;display: inline;" id="messageCart_${result.idSanPham}">${messageCart}</h5>
                        </td>
                        <td class="shoping__cart__total" id="tongTienSP_${result.idSanPham}">
                            ${formatMoney(tongTienSP)}
                        </td>
                        <td class="shoping__cart__item__close">
                            <span class="icon_close" onclick="removeSanPham(${result.idSanPham})"></span>
                        </td>
                    </tr>`
                    );
                },
                error: function(e) {
                    console.log("ERROR : ", e);

                }
            });
        });
        $('#tongTien').text(formatMoney(tongTien));
    }

})(jQuery);

function changeSoluong(idSanPham) {
    var tongTien = 0;
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var account = JSON.parse(localStorage.getItem("user"));
    var soLuong = Number($('#soLuong_' + idSanPham).val());
    var soluongSanPham = $('#soluongSanPham_' + idSanPham).text();
    if (soluongSanPham < soLuong) {
        $.each(cartItems, function(key, item) {
            if (Number(item.idSanPham) == idSanPham && item.soLuong <= soLuong) {
                $('#soLuong_' + idSanPham).val(item.soLuong);
            } else if (Number(item.idSanPham) == idSanPham && item.soLuong > soLuong) {
                var giaSanPham = removeFormatMoney($('#giaSanPham_' + idSanPham).text());
                var tongTienSP = giaSanPham * soLuong;
                $('#tongTienSP_' + idSanPham).text(formatMoney(tongTienSP));
                $.each(cartItems, function(key, item) {
                    if (Number(item.idSanPham) == idSanPham) {
                        item.soLuong = soLuong;
                        if (account != null) {
                            updateItemCartAPI(JSON.stringify(item));
                        }
                    }
                    tongTien += removeFormatMoney($('#tongTienSP_' + item.idSanPham).text());
                });
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                $('#tongTien').text(formatMoney(tongTien));
            }
        });
        messageCart = 'chỉ còn ' + soluongSanPham + ' sản phẩm';
        $('#messageCart_' + idSanPham).text(messageCart);
    } else {
        $('#messageCart_' + idSanPham).text('');
        var giaSanPham = removeFormatMoney($('#giaSanPham_' + idSanPham).text());
        var tongTienSP = giaSanPham * soLuong;
        $('#tongTienSP_' + idSanPham).text(formatMoney(tongTienSP));

        $.each(cartItems, function(key, item) {
            if (Number(item.idSanPham) == idSanPham) {
                item.soLuong = soLuong;
                if (account != null) {
                    updateItemCartAPI(JSON.stringify(item));
                }
            }
            tongTien += removeFormatMoney($('#tongTienSP_' + item.idSanPham).text());
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        $('#tongTien').text(formatMoney(tongTien));
    }
}

function removeSanPham(idSanPham) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var account = JSON.parse(localStorage.getItem("user"));
    var doHang = cartItems.filter((item) => item.idSanPham == idSanPham);
    if (account != null) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/donHang/delete",
            data: JSON.stringify(doHang[0]),
            crossDomain: true,
            success: function(data) {
                removeItem(cartItems, idSanPham);
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    } else {
        removeItem(cartItems, idSanPham);
    }
}

function removeItem(cartItems, idSanPham) {
    var tongTien = 0;
    cartItems = cartItems.filter((item) => item.idSanPham != idSanPham);
    $('#row_' + idSanPham).remove();
    if (cartItems.length == 0) {
        location.reload();
    }

    $.each(cartItems, function(key, item) {
        tongTien += removeFormatMoney($('#tongTienSP_' + item.idSanPham).text());
    });

    $('#tongTien').text(formatMoney(tongTien));
    localStorage.setItem('cartNumber', cartItems.length);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateItemCartAPI(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/donHang/update",
        data: data,
        crossDomain: true,
        success: function(data) {},
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
};