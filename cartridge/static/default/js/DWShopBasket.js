function DWShopBasket() {
    DWAPIResource.call(this);
}

DWShopBasket.prototype = new DWAPIResource();
DWShopBasket.prototype.constructor = DWShopBasket;

DWShopBasket.prototype.currentBasket = null;
DWShopBasket.prototype.etag = null;

DWShopBasket.prototype.resourceUrl = function() {
    return "basket/this";
};

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
};

DWShopBasket.prototype.removeFromBasket = function(productId, callback) {
    var patchData = null;
    var items = this.currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{product_items:[{_delete_at:" + i + "}]}";     
            break;
        }
    }
    
    if (patchData === null)
        return;
    
    return this.sendUpdateToServer(patchData, callback);
};

DWShopBasket.prototype.updateQuantity = function(productId, quantity, callback) {
    var patchData = null;
    var items = this.currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{product_items:[{_at:" + i + ",quantity:" + quantity + "}]}";        
            break;
        }
    }
    
    if (patchData === null)
        return;
        
    return this.sendUpdateToServer(patchData, callback);
};

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
};

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
};

DWShopBasket.prototype.getBasket = function(callback) {
    return this.retrieveResource(callback);
};
