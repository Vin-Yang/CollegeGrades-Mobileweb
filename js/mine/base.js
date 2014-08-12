/**
 * Created by 文鹏 on 2014/7/30.
 */
(function () {
    var host;
    $.ajaxSetup({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback"
    });
    /*构造函数*/
    Base = function () {
    };
    Base.prototype.setHost = function (value) {
        host = value;
    };
    Base.prototype.Ajax = function (data, api, callback) {
        $.ajax({
            url: host + api,
            data: data,
            success: function (res, status, xhr) {
                callback(res);
            },
            error: function (xhr, errorText, errorStatus) {
                alert(xhr.status + ':' + xhr.statusText);
            }
        });
    };
    /*选择学校并匹配主机名*/
    Base.prototype.fitHost = function (val) {
        switch (val) {
            case 'xy':
                host = "http://api.xiyoumobile.com/XiyouScoreApi";
                break;
            case 'cy':
                host = 'http://api.xiyoumobile.com/CityCollegeScoreApi/';
                break;
            case 'xkd':
                host = 'http://api.xiyoumobile.com/XikeScoreApi';
                break;
            default :
                alert('亲，你没有选择学校哦！');
        }
    }
})();
var base = function () {
    return new Base();
};
