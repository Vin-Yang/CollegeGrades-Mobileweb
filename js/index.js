/**
 * Created by 文鹏 on 2014/7/26.
 */

$(function () {
    isRemember();
    var h1;
    var temp = $('#selectSchool').children(':selected').val();
    changeTitle(temp);
    $('.content').find('h3').text(h1);
    $('#selectSchool').change(function(){
        temp=$(this).children(':selected').val();
        changeTitle(temp);
        $('.content').find('h3').text(h1);
    });


    var apiName;
    var data;
    var isFinished = true;
    /*点击登录按钮时触发*/
    $('.submit').on("click", function () {
        if ($('#username').val().trim() != '' && $('#password').val().trim() != '') {
            data = $("form#loginForm").serialize().trim();
            apiName = 'login';
            if (isFinished) {
                isFinished = false;
                base().fitHost(temp);
                score().Api(data, apiName, function (returnData) {
                    saveUserInfo();
                    if (returnData.Result) {
                        var Session = returnData.Detail;
                        isFinished = true;
                        window.location.href = "main.html?session=" + Session+"&temp="+temp;
                    } else {
                        alert('亲，账号或密码错了,请检查下学校是否选择正确哦！');
                        isFinished = true;
                    }
                });
            } else {
                alert('亲，您的小爪子点击的实在是太快了哦！');
            }

        } else {
            alert('亲，用户名密码不能为空哦！');
        }
    });

    /**cookie相关的函数**/
    /*判断是否记住了密码*/
    function isRemember() {
        if ($.cookie("score-rmbUser") == "true") {
            $("#loginkeeping").attr("checked", true);
            $("#username").val($.cookie("score-username"));
            $("#password").val($.cookie("score-password"));
        }
    }

    /*看是否记住密码若记住则保存*/
    function saveUserInfo() {
        var username = $("#username").val();
        var password = $("#password").val();
        if ($("#loginkeeping").is(':checked')) {
            $.cookie("score-rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("score-username", username, { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("score-password", password, { expires: 7 }); // 存储一个带7天期限的 cookie
        }
        else {
            $.cookie("score-rmbUser", "false", { expires: -1 });
            $.cookie("score-username", '', { expires: -1 });
            $.cookie("score-password", '', { expires: -1 });
        }
    }
    /*更换标题*/
    function changeTitle(temp){
        switch (temp) {
            case 'xy':
                h1 = "西安邮电大学欢迎您";
                break;
            case 'cy':
                h1 = '交大城市学院欢迎您';
                break;
            case 'xkd':
                h1 = '西安科技大学欢迎您';
                break;
            default :
                alert('亲，你没有选择学校哦！');
        }
    }
});
