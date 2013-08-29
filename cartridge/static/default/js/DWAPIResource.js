function DWAPIResource() {
}

DWAPIResource.prototype.errorFunction = null;

DWAPIResource.prototype.registerErrorHandler = function(errorHandler) {
    this.errorFunction = errorHandler;
};

DWAPIResource.prototype.resourceUrl = function() {
	return null;
};

DWAPIResource.prototype.resourceUrlWithId = function(id) {
    return this.resourceUrl() + "/" + id;
};

DWAPIResource.prototype.resourceUrlWithAction = function(action) {
    return this.resourceUrl() + "/" + action;
};

DWAPIResource.prototype.retrieveResource = function(callback) {
    return this.findWithUrl(baseURL + this.resourceUrl(), callback);
};

DWAPIResource.prototype.findById = function(id, callback) {
    return this.findWithUrl(baseURL + this.resourceUrlWithId(id), callback);
};

DWAPIResource.prototype.findWithUrl = function(url, callback) {
    return $.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: url,
      dataType: "json",
      success: callback,
      error: this.errorFunction
    });
};
