function DWShopAccount() {
    DWAPIResource.call(this);
}

DWShopAccount.prototype = new DWAPIResource();
DWShopAccount.prototype.constructor = DWShopAccount;

DWShopAccount.prototype.resourceUrl = function(id) {
    return "account";
};

DWShopAccount.prototype.login = function(username, password, callback) {
    return $.ajax({
      type: "POST",
      contentType: "application/json",
      data: "{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}",
      headers: {"x-dw-client-id": clientId},
      url: secureBaseURL + this.resourceUrlWithAction("login"),
      dataType: "json",
      success: callback, 
      error: this.errorFunction
    });
};

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
};

DWShopAccount.prototype.getProfile = function(callback) {
    return $.ajax({
      type: "GET",
      contentType: "application/json",
      headers: {"x-dw-client-id": clientId},
      url: secureBaseURL + this.resourceUrlWithAction("this"),
      dataType: "json",
      success: callback, 
      error: this.errorFunction
    });
};
