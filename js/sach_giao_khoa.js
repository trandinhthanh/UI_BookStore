$(document).ready(function() {
    var data;
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/listSanPhamTheoDanhMuc/1",
        data: data,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $('#tongSoSP').text(data.length);
            $.each(data, function(key, item) {
                $('#listBook').append(
                    `<div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__item">
                                <div class="product__item__pic set-bg" data-setbg="./img/product/product-13.jpg">
                                    <ul class="product__item__pic__hover">
                                        <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                        <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div class="product__item__text">
                                    <h6><a href="">${item.tenSanPham}</a></h6>
                                    <h5>${item.gia}</h5>
                                </div>
                                <div class="tinh__trang__product">
                                    <h6>Hết Hàng</h6>
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
});