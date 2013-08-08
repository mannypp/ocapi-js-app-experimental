function DWShopProductSearch() {

}

DWShopProductSearch.prototype.resourceUrl = function() {
	return "product_search";
}

DWShopProductSearch.prototype.search = function(query, callback) {
	return $.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: baseURL + this.resourceUrl() + "?q=" + query + "&expand=images",
	  dataType: "json",
	  success: callback});
}
