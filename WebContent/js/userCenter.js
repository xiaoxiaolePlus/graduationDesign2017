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
        $(".name").html(essentialInformationData.userName);
        $(".jobNum").html(essentialInformationData.jobNum);
        $(".email").html(essentialInformationData.email);
        $(".phoneNum").html(essentialInformationData.phoneNum);
        $(".door").html('20' + essentialInformationData.gradeName + '级');
        $(".college").html(essentialInformationData.academyName);
        $(".clazz").html(essentialInformationData.majorName + essentialInformationData.className + '班');
        $(".headphoto").html('<img src="../img/schoolLogo.png" alt="校徽">');
    },function () {

    });
}).trigger("click");

//缴费信息
$("#attendanceStatus").click(function () {

    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent2").show();

    // 查询缴费信息

    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/student/costList.do",
        method:"POST",
        data:{
            conditionStr:JSON.stringify({
                conditionName:'all',
                conditionValue:''
            })
        }
    });
    jqXHR.then(function(data){

        var data = JSON.parse(data);
        $("#tables").empty();
        var $$td1 = $("<td>年度</td>");
        var $$td2 = $("<td>费用名称</td>");
        var $$td3 = $("<td>应缴费用</td>");
        var $$td4 = $("<td>已缴费用</td>");
        var $$td5 = $("<td>减免</td>");
        var $$td6 = $("<td>返还费用</td>");
        var $$td7 = $("<td>欠费</td>");
        var $$tr = $("<tr></tr>");
        $$tr.append($$td1);
        $$tr.append($$td2);
        $$tr.append($$td3);
        $$tr.append($$td4);
        $$tr.append($$td5);
        $$tr.append($$td6);
        $$tr.append($$td7);
        $("#tables").append($$tr);
        for (var i = 0; i < data.length; i ++) {
            var td1 = $("<td>"+ data[i].payDur +"</td>");
            var td2 = $("<td>"+ data[i].feeName +"</td>");
            var td3 = $("<td>"+ data[i].shouldFee +"</td>");
            var td4 = $("<td>"+ data[i].alreadyFee +"</td>");
            var td5 = $("<td>"+ data[i].reduceFee +"</td>");
            var td6 = $("<td>"+ data[i].returnFee +"</td>");
            var td7 = $("<td class='oweFee'>"+ data[i].oweFee +"</td>");
            var tr = $("<tr></tr>");
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
            tr.append(td7);
            $("#tables").append(tr);
        }
        var $td1 = $("<td>总计</td>");
        var $td2 = $("<td></td>");
        var $td3 = $("<td></td>");
        var $td4 = $("<td></td>");
        var $td5 = $("<td></td>");
        var $td6 = $("<td></td>");
        var $td7 = $("<td id='all'></td>");
        var $tr = $("<tr></tr>");
        $tr.append($td1);
        $tr.append($td2);
        $tr.append($td3);
        $tr.append($td4);
        $tr.append($td5);
        $tr.append($td6);
        $tr.append($td7);
        $("#tables").append($tr);

        var oweFee = $(".oweFee");
        var allNum = 0;
        for (var i = 0; i < oweFee.length; i ++) {
            var allOwe = oweFee[i].innerHTML;
            allNum = allNum + +allOwe;
        }
        $("#all").html(allNum);

    },function(){

    });

});

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