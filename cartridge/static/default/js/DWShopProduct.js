function DWShopProduct() {
    DWAPIResource.call(this);
}

DWShopProduct.prototype = new DWAPIResource();
DWShopProduct.prototype.constructor = DWShopProduct;

DWShopProduct.prototype.resourceUrl = function() {
	return "products";
}

DWShopProduct.prototype.findByIdWithExpand = function(id, expand, callback) {
    var url = baseURL + this.resourceUrlWithId(id) + (expand == null ? "" : "?expand=" + expand);
    
    return $.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: url,
      dataType: "json",
      success: callback,
      error: this.errorFunction
    });
}

DWShopProduct.prototype.loadProductLink = function(link, callback) {
	return $.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: link + "?expand=images,variations",
	  dataType: "json",
	  success: callback,
      error: this.errorFunction
	});
}
