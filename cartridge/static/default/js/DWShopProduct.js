function DWShopProduct() {

}

DWShopProduct.prototype.resourceUrlWithId = function(id) {
	return "products/" + id;
}

DWShopProduct.prototype.findByIdJSONP = function(productId) {
	$.getScript(baseURL + this.resourceUrlWithId(productId) + "?" + urlParams + "&callback=parseProductResponse");
}

DWShopProduct.prototype.loadProductLinkJSONP = function(link) {
	$.getScript(productLink + "&expand=images&callback=parseProductResponse");
}

DWShopProduct.prototype.findById = function(id, callback) {
		$.ajax({
		  type: "GET",
		  url: baseURL + this.resourceUrlWithId(id) + "?" + urlParams,
		  dataType: "json",
		  success: callback});
}

DWShopProduct.prototype.loadProductLink = function(link, callback) {
		$.ajax({
		  type: "GET",
		  url: link + "&expand=images,variations",
		  dataType: "json",
		  success: callback});
}
