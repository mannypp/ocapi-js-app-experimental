var scheme = "http://";
var secureScheme = "https://";
var host = "wliu.vbox.demandware.net";
//var host = "http://demo.ocapi.demandware.net";
var baseURL = scheme + host + "/s/DevCenterTest/dw/shop/v13_4/";
var secureBaseURL = secureScheme + host + "/s/DevCenterTest/dw/shop/v13_4/";
var clientId = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

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
    return this.resourceUrl() + "/" + id;
}

DWAPIResource.prototype.resourceUrlWithAction = function(action) {
    return this.resourceUrl() + "/" + action;
}

DWAPIResource.prototype.retrieveResource = function(callback) {
    return this.findWithUrl(baseURL + this.resourceUrl(), callback);
}

DWAPIResource.prototype.findById = function(id, callback) {
    return this.findWithUrl(baseURL + this.resourceUrlWithId(id), callback);
}

DWAPIResource.prototype.findWithUrl = function(url, callback) {
    return $.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: url,
      dataType: "json",
      success: callback,
      error: this.errorFunction
    });
}

function DWShopAccount() {
    DWAPIResource.call(this);
}

DWShopAccount.prototype = new DWAPIResource();
DWShopAccount.prototype.constructor = DWShopAccount;

DWShopAccount.prototype.resourceUrl = function(id) {
    return "account";
}

DWShopAccount.prototype.login = function(username, password, callback) {
    var url = secureBaseURL + this.resourceUrlWithAction("login");
    var data = {username: username, password: password};
    var headers = {"x-dw-client-id": clientId};
    
    return $.post(url + "?client_id=" + clientId, {username: username, password: password}, callback, "application/json");

    /*return $.ajax({
      type: "POST",
      contentType: "application/json",
      data: data,
      headers: headers,
      url: url,
      dataType: "json",
      success: callback, 
      error: this.errorFunction
    });*/
}

DWShopAccount.prototype.logout = function(callback) {
    return $.ajax({
      type: "POST",
      contentType: "application/json",
      headers: {"x-dw-client-id": clientId},
      url: secureBaseURL + this.resourceUrlWithAction("logout"),
      dataType: "json",
      success: callback, 
      error: this.errorFunction
    });
}

function DWShopBasket() {
    DWAPIResource.call(this);
}

DWShopBasket.prototype = new DWAPIResource();
DWShopBasket.prototype.constructor = DWShopBasket;

DWShopBasket.prototype.currentBasket = null;
DWShopBasket.prototype.etag = null;

DWShopBasket.prototype.resourceUrl = function() {
    return "basket/this";
}

DWShopBasket.prototype.addToBasket = function(productId, quantity, callback) {
	return $.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: "{product_id: \"" + productId + "\", quantity: " + quantity + "}",
      headers: {"x-dw-client-id": clientId},
	  url: baseURL + this.resourceUrlWithAction("add"),
	  dataType: "json",
	  success: callback, 
      error: this.errorFunction
	});
}

DWShopBasket.prototype.removeFromBasket = function(productId, callback) {
    var patchData = null;
    var items = this.currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{product_items:[{_delete_at:" + i + "}]}";     
            break;
        }
    }
    
    if (patchData == null)
        return;
    
    return this.sendUpdateToServer(patchData, callback);
}

DWShopBasket.prototype.updateQuantity = function(productId, quantity, callback) {
    var patchData = null;
    var items = this.currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{product_items:[{_at:" + i + ",quantity:" + quantity + "}]}";        
            break;
        }
    }
    
    if (patchData == null)
        return;
        
    return this.sendUpdateToServer(patchData, callback);
}

DWShopBasket.prototype.updateQuantities = function(updates, callback) {
    var patchData = "{product_items:[";
    var items = this.currentBasket.product_items;
    
    for (var u = 0; u < updates.length; u++) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].product_id == updates[u].product_id) {
                patchData += "{_at:" + i + ",quantity:" + updates[u].quantity + "}";
                break;    
            }
        }
        if (u < updates.length - 1)
            patchData += ",";
    }
    
    patchData += "]}";
    
    return this.sendUpdateToServer(patchData, callback);
}

DWShopBasket.prototype.sendUpdateToServer = function(patchData, callback) {
    return $.ajax({
      type: "PATCH",
      contentType: "application/json",
      data: patchData,
      headers: {"If-Match": this.etag, "x-dw-client-id": clientId},
      url: baseURL + this.resourceUrl(),
      dataType: "json",
      success: callback,
      error: this.errorFunction
    });
}

DWShopBasket.prototype.getBasket = function(callback) {
    return this.retrieveResource(callback);
}

function DWShopCategory() {
    DWAPIResource.call(this);
}

DWShopCategory.prototype = new DWAPIResource();
DWShopCategory.prototype.constructor = DWShopCategory;

DWShopCategory.prototype.resourceUrl = function() {
	return "categories";
}

DWShopCategory.prototype.findById = function(id, callback) {
    return this.findWithUrl(baseURL + this.resourceUrlWithId(id) + "?levels=1", callback);
}

function DWShopContent() {
    DWAPIResource.call(this);
}

DWShopContent.prototype = new DWAPIResource();
DWShopContent.prototype.constructor = DWShopContent;

DWShopContent.prototype.resourceUrl = function() {
    return "content";
}

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

function DWShopProductSearch() {
    DWAPIResource.call(this);
}

DWShopProductSearch.prototype = new DWAPIResource();
DWShopProductSearch.prototype.constructor = DWShopProductSearch;

DWShopProductSearch.prototype.resourceUrl = function() {
	return "product_search";
}

DWShopProductSearch.prototype.search = function(query, callback) {
	return $.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: baseURL + this.resourceUrl() + "?q=" + query + "&expand=images",
	  dataType: "json",
	  success: callback,
      error: this.errorFunction
	});
}

function DWShopStore() {
    DWAPIResource.call(this);
}

DWShopStore.prototype = new DWAPIResource();
DWShopStore.prototype.constructor = DWShopStore;

DWShopStore.prototype.resourceUrl = function(id) {
    return "stores";
}
