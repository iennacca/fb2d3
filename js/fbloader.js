/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 4/16/13
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

(function (d, debug) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));
