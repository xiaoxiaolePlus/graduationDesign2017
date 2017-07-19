//展示用户信息
$("#essentialInformation").click(function () {
    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent1").show();
    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/user/userInfo.do",
        method:"POST",
        data:{

        }
    });
    jqXHR.then(function(data){
        var essentialInformationData = JSON.parse(data);
        $(".apartment").html(essentialInformationData.apartment);
        $(".name").html(essentialInformationData.userName);
        $(".jobNum").html(essentialInformationData.jobNum);
        $(".email").html(essentialInformationData.email);
        $(".phoneNum").html(essentialInformationData.phoneNum);
    },function () {

    });
}).trigger("click");

//修改密码
$("#modifyPassword").click(function () {
    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent4").show();
    $("#newPWD").blur(function () {
        var newP = $("#newPWD").val();
        var again = $("#surePWD").val();
        if (again == '') {
            $(".P01").hide();
        } else {
            if (newP == again) {
                $(".P01").hide();
                $("#changeBtn").click(function () {
                    var originPWD = $("#oldPWD").val();
                    var currentPWD = $("#surePWD").val();
                    var jqXHR=$.ajax({
                        url:"/CollegeTuitionManageSys/user/changePWD.do",
                        method:"POST",
                        data:{
                            originPWD:originPWD,
                            currentPWD:currentPWD
                        }
                    });
                    jqXHR.then(function(data){
                        var PWDdata = JSON.parse(data);
                        if (PWDdata == "1") {
                            alert("修改成功！将在下次登陆时更新。")
                        } else {
                            alert("修改失败，请核对信息。")
                        }

                    },function () {

                    });
                });
            } else {
                $(".P01").show();
            }
        }
    });
    $("#surePWD").blur(function () {
        var newP = $("#newPWD").val();
        var again = $("#surePWD").val();
        if (newP == again) {
            $(".P01").hide();
            $("#changeBtn").click(function () {
                var originPWD = $("#oldPWD").val();
                var currentPWD = $("#surePWD").val();
                var jqXHR=$.ajax({
                    url:"/CollegeTuitionManageSys/user/changePWD.do",
                    method:"POST",
                    data:{
                        originPWD:originPWD,
                        currentPWD:currentPWD
                    }
                });
                jqXHR.then(function(data){
                    var PWdata = JSON.parse(data);
                    if (PWdata == "1") {
                        alert("修改成功！将在下次登陆时更新。")
                    } else {
                        alert("修改失败，请核对信息。")
                    }

                },function () {

                });
            });
        } else {
            $(".P01").show();
        }
    });
});

/*
 * 首页去掉    年份选择   柱图数据    加一   饼图
 *
 *
 * 说明书上下不留白（图）   visio
 *
 *
 * 图的字体统一大小
 *
 *
 **/