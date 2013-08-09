function DWShopContent() {
    DWAPIResource.call(this);
}

DWShopContent.prototype = new DWAPIResource();
DWShopContent.prototype.constructor = DWShopContent;

DWShopContent.prototype.resourceUrl = function() {
    return "content";
}

DWShopContent.prototype.resourceUrlWithId = function(id) {
    return this.resourceUrl() + "/" + id;
}

DWShopContent.prototype.findById = function(contentId, callback) {
    return $.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: baseURL + this.resourceUrlWithId(contentId),
      dataType: "json",
      success: callback,
      error: this.errorFunction
    });
}
