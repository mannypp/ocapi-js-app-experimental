function DWShopProductSearch() {

}

DWShopProductSearch.prototype.resourceUrl = function() {
	return "product_search";
}

DWShopProductSearch.prototype.searchJSONP = function(query, callback) {
	$.getScript(baseURL + "product_search?q=" + categoryId + "&expand=images&" + urlParams + "&callback=parseProductsResponse");
}

DWShopProductSearch.prototype.search = function(query, callback) {
		$.ajax({
		  type: "GET",
		  url: baseURL + this.resourceUrl() + "?q=" + query + "&expand=images&" + urlParams,
		  dataType: "json",
		  success: callback});
}
