function DWShopCategory() {
    DWAPIResource.call(this);
}

DWShopCategory.prototype = new DWAPIResource();
DWShopCategory.prototype.constructor = DWShopCategory;

DWShopCategory.prototype.resourceUrl = function() {
	return "categories";
};

DWShopCategory.prototype.findById = function(id, callback) {
    return this.findWithUrl(baseURL + this.resourceUrlWithId(id) + "?levels=1", callback);
};
