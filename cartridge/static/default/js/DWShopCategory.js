function DWShopCategory() {

}

DWShopCategory.prototype.resourceUrlWithId = function(id) {
	return "categories/" + id;
}

DWShopCategory.prototype.findByIdJSONP = function(categoryId) {
	$.getScript(baseURL + this.resourceUrlWithId(categoryId) + "?levels=1&" + urlParams + "&callback=parseCategoryResponse");
}

DWShopCategory.prototype.findById = function(id, callback) {
		$.ajax({
		  type: "GET",
		  url: baseURL + this.resourceUrlWithId(id) + "?levels=1&" + urlParams,
		  dataType: "json",
		  success: callback});
}
