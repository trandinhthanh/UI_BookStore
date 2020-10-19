function formatMoney(gia) {
    return Number((gia).toFixed(1)).toLocaleString() + " đ ";
}

function removeFormatMoney(gia) {
    return Number(gia.replace(/[^0-9.-]+/g, ""));
}