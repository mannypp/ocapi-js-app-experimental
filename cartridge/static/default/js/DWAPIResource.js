function DWAPIResource() {
}

DWAPIResource.prototype.errorFunction = null;

DWAPIResource.prototype.registerErrorHandler = function(errorHandler) {
    this.errorFunction = errorHandler;
}

DWAPIResource.prototype.resourceUrl = function() {
	return null;
}

DWAPIResource.prototype.resourceUrlWithId = function(id) {
    return null;
}

DWAPIResource.prototype.resourceUrlWithAction = function(action) {
    return null;
}
