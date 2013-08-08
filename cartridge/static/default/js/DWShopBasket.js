function DWShopBasket() {

}

DWShopBasket.prototype.addToBasket = function(productId, quantity, callback) {
		$.ajax({
		  type: "POST",
		  contentType: "application/json",
		  data: "{product_id: \"" + productId + "\", quantity: " + quantity + "}",
		  url: baseURL + "basket/this/add?" + urlParams,
		  dataType: "json",
		  success: callback,
		  error: function(jqXHR, status, errmsg) {
		  	$("#errmsg").addClass("alert alert-error");
		  	$("#errmsg").html(status + "-" + errmsg + "<br/>" + jqXHR.responseJSON.fault.message + "<br/>" + jqXHR.responseJSON.fault.type + "<br/>");
		  	$("#errmsg").append("<a class='btn' href='#' onclick='$(\"#errmsg\").empty();$(\"#errmsg\").removeClass();'>Clear</a>");
		  }
		});
}

DWShopBasket.prototype.getBasket = function(callback) {
	$.ajax({
		type: "GET",
		url: baseURL + "basket/this?" + urlParams,
		dataType: "json",
		success: callback
	});
}
