function DWAPIResource() {

}

DWAPIResource.prototype.resourceUrl = function() {
	return null;
}

DWAPIResource.prototype.resourceUrlWithId = function(id) {
	return null;
}

DWAPIResource.prototype.retrieveResource = function() {
	$.getScript(baseURL + this.resourceUrl() + "?" + urlParams + "&callback=parseCategoryResponse");
}

DWAPIResource.prototype.findById = function(id) {
	$.getScript(baseURL + this.resourceUrlWithId(id) + "?" + urlParams + "&callback=parseResponse");
}