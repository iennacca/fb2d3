/// <reference path="../../js/facebook.d.ts" />
/// <reference path="../infrastructure.ts" />

class FBDataSource implements InfoNodeSource {
    //TODO: Switch this back to instance member!
    static token: string;
    static graphAPIQuery: string;

    private getToken(reply?: (token: string) => void ) {
        if (FBDataSource.token != undefined) {
            reply(FBDataSource.token);
            return;
        }

        FB.init({
            appId: '3983783298', // App ID from the App Dashboard
            status: true, // check the login status upon init?
            cookie: true, // set sessions cookies to allow your server to access the session?
            xfbml: true  // parse XFBML tags on this page?
        });

        FB.getLoginStatus(function (response:IFacebookUserAuthenticate) {
            if (response.status === 'connected') {
                FBDataSource.token = response.authResponse.accessToken;
                reply(FBDataSource.token);
            } else if (response.status === 'not_authorized') {
                throw 'Unauthorized';
            } else {
                throw 'Not logged in';
            }
        });
    }

    GetInfoNodes(reply?: (nodes: InfoNode[]) => void ) {
        this.getToken(function (token) {
            FB.api('/me/friends?limit=20,fields=address,hometown,location,locale,name', function (response: any) {
                var nodeArray: InfoNode[] = [];

                if (response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);
                    for (var i = 0; i < response.data.length; i++) {
                        nodeArray[i] = new GenericInfoNode();
                        nodeArray[i].Name = response.data[i].name;
                        nodeArray[i].id = response.data[i].id;
                    }
                }
                else
                    throw 'Indecipherable call to the Graph API';

                reply(nodeArray);
            });
        });
    }

    GetFirstInfoNodePage(reply?: (nodes: InfoNode[]) => void ){
        this.getToken(function (token) {
            FB.api('/me/friends?limit=20,fields=address,hometown,location,locale,name', function (response: any) {
                var nodeArray: InfoNode[] = [];

                if (response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);
                    for (var i = 0; i < response.data.length; i++) {
                        nodeArray[i] = new GenericInfoNode();
                        nodeArray[i].Name = response.data[i].name;
                        nodeArray[i].id = response.data[i].id;
                    }
                    FBDataSource.graphAPIQuery = response.paging.next;
                    console.log('GraphAPIQuery = ' + FBDataSource.graphAPIQuery);
                }
                else
                    throw 'Indecipherable call to the Graph API';

                reply(nodeArray);
            });
        });
    }

    GetNextInfoNodePage(reply?: (nodes: InfoNode[]) => void ){
        if (FBDataSource.graphAPIQuery == undefined)
            throw 'Invalid call to GetNextInfoNodePage; call GetInfoNodePage() first.';

        this.getToken(function (token) {
            FB.api(FBDataSource.graphAPIQuery, function (response: any) {
                var nodeArray: InfoNode[] = [];

                if (response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);
                    for (var i = 0; i < response.data.length; i++) {
                        nodeArray[i] = new GenericInfoNode();
                        nodeArray[i].Name = response.data[i].name;
                        nodeArray[i].id = response.data[i].id;
                    }
                    FBDataSource.graphAPIQuery = response.paging.next;
                    console.log('GraphAPIQuery = ' + FBDataSource.graphAPIQuery);
                }
                else
                    throw 'Indecipherable call to the Graph API';

                reply(nodeArray);
            });
        });
    }

    GetFirstInfoNodePageAsync(): JQueryPromise<InfoNode[]> {
        var def = $.Deferred();
        var nodeArray: InfoNode[] = [];
        def.resolve(nodeArray);
        return def.promise();
    }

    GetNextInfoNodePageAsync(): JQueryPromise<InfoNode[]> {
        var def = $.Deferred();
        var nodeArray: InfoNode[] = [];
        def.resolve(nodeArray);
        return def.promise();
    }

    // test stuff
    private testGetInfoNodes(reply?: (names: string[]) => void ) {
        this.getToken(function (token) {
            FB.api('/me/friends?limit=10', function (response: any) {
                var names: string[] = [];

                console.log('Friends count: ' + response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    names[i] = response.data[i].name;
                }
                reply(names);
            });
        });
    }

    private testGetInfoNodesExt(reply?: (nodes: InfoNode[]) => void ) {
        this.getToken(function (token) {
            // /me/friends?limit=10
            // /me/friends?fields=address,hometown,location,locale,name
            FB.api('/me/friends?limit=20,fields=address,hometown,location,locale,name', function (response: any) {
                var nodeArray: InfoNode[] = [];

                console.log('Friends count: ' + response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    nodeArray[i] = new GenericInfoNode();
                    nodeArray[i].Name = response.data[i].name;
                    nodeArray[i].id = response.data[i].id;
                }
                reply(nodeArray);
            });
        });
    }
}
