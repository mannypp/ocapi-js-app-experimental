function DWShopProduct() {

}

DWShopProduct.prototype.resourceUrlWithId = function(id) {
	return "products/" + id;
}

DWShopProduct.prototype.findById = function(id, callback) {
    return this.findByIdWithExpand(id, null, callback);
}

DWShopProduct.prototype.findByIdWithExpand = function(id, expand, callback) {
    return $.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: baseURL + this.resourceUrlWithId(id) + "?expand=images,variations",
      dataType: "json",
      success: callback});
}

DWShopProduct.prototype.loadProductLink = function(link, callback) {
	return $.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: link + "?expand=images,variations",
	  dataType: "json",
	  success: callback});
}
