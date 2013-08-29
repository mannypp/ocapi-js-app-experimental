function DWShopAccount() {
    DWAPIResource.call(this);
}

DWShopAccount.prototype = new DWAPIResource();
DWShopAccount.prototype.constructor = DWShopAccount;

DWShopAccount.prototype.resourceUrl = function(id) {
    return "account";
};

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
