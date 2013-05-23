var FBDataSource = (function () {
    function FBDataSource() { }
    FBDataSource.prototype.getToken = function (reply) {
        if(FBDataSource.token != undefined) {
            reply(FBDataSource.token);
            return;
        }
        FB.init({
            appId: '3983783298',
            status: true,
            cookie: true,
            xfbml: true
        });
        FB.getLoginStatus(function (response) {
            if(response.status === 'connected') {
                FBDataSource.token = response.authResponse.accessToken;
                reply(FBDataSource.token);
            } else if(response.status === 'not_authorized') {
                throw 'Unauthorized';
            } else {
                throw 'Not logged in';
            }
        });
    };
    FBDataSource.prototype.GetInfoNodes = function (reply) {
        this.getToken(function (token) {
            FB.api('/me/friends?limit=20,fields=address,hometown,location,locale,name', function (response) {
                var nodeArray = [];
                if(response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);
                    for(var i = 0; i < response.data.length; i++) {
                        nodeArray[i] = new GenericInfoNode();
                        nodeArray[i].Name = response.data[i].name;
                        nodeArray[i].Id = response.data[i].id;
                    }
                } else {
                    throw 'Indecipherable call to the Graph API';
                }
                reply(nodeArray);
            });
        });
    };
    FBDataSource.prototype.GetFirstInfoNodePage = function (reply) {
        this.getToken(function (token) {
            FB.api('/me/friends?limit=20,fields=address,hometown,location,locale,name', function (response) {
                var nodeArray = [];
                if(response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);
                    for(var i = 0; i < response.data.length; i++) {
                        nodeArray[i] = new GenericInfoNode();
                        nodeArray[i].Name = response.data[i].name;
                        nodeArray[i].Id = response.data[i].id;
                    }
                    FBDataSource.graphAPIQuery = response.paging.next;
                    console.log('GraphAPIQuery = ' + FBDataSource.graphAPIQuery);
                } else {
                    throw 'Indecipherable call to the Graph API';
                }
                reply(nodeArray);
            });
        });
    };
    FBDataSource.prototype.GetNextInfoNodePage = function (reply) {
        if(FBDataSource.graphAPIQuery == undefined) {
            throw 'Invalid call to GetNextInfoNodePage; call GetInfoNodePage() first.';
        }
        this.getToken(function (token) {
            FB.api(FBDataSource.graphAPIQuery, function (response) {
                var nodeArray = [];
                if(response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);
                    for(var i = 0; i < response.data.length; i++) {
                        nodeArray[i] = new GenericInfoNode();
                        nodeArray[i].Name = response.data[i].name;
                        nodeArray[i].Id = response.data[i].id;
                    }
                    FBDataSource.graphAPIQuery = response.paging.next;
                    console.log('GraphAPIQuery = ' + FBDataSource.graphAPIQuery);
                } else {
                    throw 'Indecipherable call to the Graph API';
                }
                reply(nodeArray);
            });
        });
    };
    FBDataSource.prototype.testGetInfoNodes = function (reply) {
        this.getToken(function (token) {
            FB.api('/me/friends?limit=10', function (response) {
                var names = [];
                console.log('Friends count: ' + response.data.length);
                for(var i = 0; i < response.data.length; i++) {
                    names[i] = response.data[i].name;
                }
                reply(names);
            });
        });
    };
    FBDataSource.prototype.testGetInfoNodes = function (reply) {
        this.getToken(function (token) {
            FB.api('/me/friends?limit=20,fields=address,hometown,location,locale,name', function (response) {
                var nodeArray = [];
                console.log('Friends count: ' + response.data.length);
                for(var i = 0; i < response.data.length; i++) {
                    nodeArray[i] = new GenericInfoNode();
                    nodeArray[i].Name = response.data[i].name;
                    nodeArray[i].Id = response.data[i].id;
                }
                reply(nodeArray);
            });
        });
    };
    return FBDataSource;
})();
//@ sourceMappingURL=fbapi.js.map
