function DWShopCategory() {

}

DWShopCategory.prototype.resourceUrlWithId = function(id) {
	return "categories/" + id;
}

DWShopCategory.prototype.findById = function(id, callback) {
	return $.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: baseURL + this.resourceUrlWithId(id) + "?levels=1",
	  dataType: "json",
	  success: callback});
}
