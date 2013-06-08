/// <reference path="../../js/facebook.d.ts" />
/// <reference path="../infrastructure.ts" />

class FBFilteredSource implements InfoNodeSource {
    //TODO: Switch these back to instance members?
    static token: string;
    static startQuery: string;
    static pagingQuery: string;
    static queryFields: Object;

    constructor() {
        FBFilteredSource.startQuery = "/me/friends";
        FBFilteredSource.queryFields = {fields: 'name,id,location,birthday', limit: 20};
    }

    // TODO: Investigate FB token authorization
    private getToken(reply?: (token: string) => void ) {
        if (FBFilteredSource.token != undefined) {
            reply(FBFilteredSource.token);
            return;
        }

        FB.init({
            appId: '3983783298', // App ID from the App Dashboard
            status: true, // check the login status upon init?
            cookie: true, // set sessions cookies to allow your server to access the session?
            xfbml: true  // parse XFBML tags on this page?
        });

        FB.getLoginStatus(function (response:FBUserAuthenticate) {
            if (response.status === 'connected') {
                FBFilteredSource.token = response.authResponse.accessToken;
                reply(FBFilteredSource.token);
            } else if (response.status === 'not_authorized') {
                throw 'Unauthorized';
            } else {
                throw 'Not logged in';
            }
        });
    }

    GetInfoNodes(reply?: (nodes: InfoNode[]) => void ) {
        this.getToken(function (token) {
            FB.api(FBFilteredSource.startQuery, FBFilteredSource.queryFields, function (response: any) {
                var nodeArray: InfoNode[] = [];

                if (response.data == undefined)
                    throw 'Indecipherable call to the Graph API';

                console.log('Friends count: ' + response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    var rawNode = response.data[i];

                    nodeArray[i] = new GenericInfoNode();
                    nodeArray[i].Name = rawNode.name;
                    nodeArray[i].Id = rawNode.id;
                }

                reply(nodeArray);
            });
        });
    }

    GetFirstInfoNodePage(reply?: (nodes: InfoNode[]) => void ){
        FBFilteredSource.pagingQuery = FBFilteredSource.startQuery;
        this.getNodePage(reply);
    }

    GetNextInfoNodePage(reply?: (nodes: InfoNode[]) => void ){
        this.getNodePage(reply);
    }

    GetFirstInfoNodePageAsync(): JQueryPromise {
        FBFilteredSource.pagingQuery = FBFilteredSource.startQuery;
        var def = $.Deferred();
        this.getNodePage(function(nodes: InfoNode[]) {
            def.resolve(nodes);
        });
        return def.promise();
    }

    GetNextInfoNodePageAsync(): JQueryPromise {
        // pagingQuery has been reset by initial call to GetFirstInfoNodePageAsync()
        var def = $.Deferred();
        this.getNodePage(function(nodes: InfoNode[]) {
            def.resolve(nodes);
        });
        return def.promise();
    }

    private getNodePage(reply?: (nodes: InfoNode[]) => void ){
        if (FBFilteredSource.pagingQuery == undefined)
            throw 'Invalid call to GetNextInfoNodePage; call GetInfoNodePage() first.';

        this.getToken(function (token) {
            FB.api(FBFilteredSource.pagingQuery, FBFilteredSource.queryFields, function (response: any) {
                var nodeArray: InfoNode[] = [];

                if (response.data != undefined) {
                    console.log('Friends count: ' + response.data.length);

                    var numNodes = 0;
                    for (var i = 0; i < response.data.length; i++) {
                        var rawNode = response.data[i];

                        if (rawNode.location == undefined) continue;

                        nodeArray[numNodes] = new GenericInfoNode();
                        nodeArray[numNodes].Name = rawNode.name;
                        nodeArray[numNodes].Id = rawNode.id;
                        nodeArray[numNodes].TextLocation = rawNode.location.name;
                        numNodes++;
                    }
                    FBFilteredSource.pagingQuery = response.paging.next;
                    console.log('GraphAPIQuery = ' + FBFilteredSource.pagingQuery);
                }
                else
                    throw 'Indecipherable call to the Graph API';

                reply(nodeArray);
            });
        });
    }
}
