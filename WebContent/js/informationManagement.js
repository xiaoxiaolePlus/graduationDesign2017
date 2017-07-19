//信息录入
$("#essentialInformation").click(function () {
    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent1").show();
}).trigger("click");

//信息修改
$("#attendanceStatus").click(function () {
    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent2").show();
});

//信息删除
$("#modifyPassword").click(function () {
    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent4").show();
});

// 定义全局变量：项目，金额，对象，时间
var paymentPro = '';
var paymentMon = '';
var paymentTar = '';
var paymentTime = '';
var paymentProName = '';
var paymentTarName = '';
var objStr = {
    jobNum:'0',
    gradeName:'0',
    academyName:'0',
    majorName:'0',
    className:'0'
};
var feeStr = [];

// 根据年级开放学院
$("#inputContentTargetGrade").off("click").on("click",function () {
    paymentTarName = "";
    var grade = $("#inputContentTargetGrade").val();
    if (grade == 0) {
        $(".inputContentTarget > select:gt(0)").hide();
        $("#inputContentTargetCollege0,#inputContentTargetSpecialty0,#inputContentTargetClasses0").show().attr("disabled","disabled");
        $("#inputContentTargetStudentId").removeAttr("disabled");
    } else {
        paymentTarName = $("#inputContentTargetGrade > option:checked").html();
        paymentTar = grade;
        objStr.gradeName = grade;


        $("#inputContentTargetCollege0").hide();
        $(".inputContentTarget > select:gt(2)").hide();
        $("#inputContentTargetSpecialty0,#inputContentTargetClasses0").show().attr("disabled","disabled");
        $("#inputContentTargetStudentId").attr("disabled","disabled");

        // 根据学院选择专业
        $("#inputContentTargetCollege").show().off("click").on("click",function () {
            var college = $("#inputContentTargetCollege").val();
            if (college == 0) {
                $(".inputContentTarget > select:gt(2)").hide();
                $("#inputContentTargetSpecialty0,#inputContentTargetClasses0").show();
            } else {
                paymentTarName = $("#inputContentTargetGrade > option:checked").html()
                    + $("#inputContentTargetCollege > option:checked").html();
                paymentTar = grade + college;
                objStr.academyName = college;

                $(".inputContentTargetSpecialty").hide();
                $(".inputContentTarget > select:gt(16)").hide();
                $("#inputContentTargetClasses0").show().attr("disabled","disabled");

                // 根据专业选择班级
                var specialt = $("#inputContentTargetSpecialty" + college);
                specialt.show().off("click").on("click",function () {
                    var specialty = specialt.val();
                    if (specialty == 0) {
                        $(".inputContentTarget > select:gt(16)").hide();
                        $("#inputContentTargetClasses0").show().attr("disabled","disabled");
                    } else {
                        paymentTarName = $("#inputContentTargetGrade > option:checked").html()
                            + $("#inputContentTargetCollege > option:checked").html()
                            + $("#inputContentTargetSpecialty" + college + "> option:checked").html();
                        paymentTar = grade + college + specialt;
                        objStr.majorName = college + specialty;
                        $(".inputContentTarget > select:gt(16)").hide();

                        //选择班级
                        $("#inputContentTargetClasses" + college + specialty).show().off("click").on("click",function () {
                            var clazz = $("#inputContentTargetClasses" + college + specialty).val();
                            var clazzName = $("#inputContentTargetClasses" + college + specialty + "> option:checked").html();
                            if (clazz == "0") {
                                paymentTarName = $("#inputContentTargetGrade > option:checked").html()
                                    + $("#inputContentTargetCollege > option:checked").html()
                                    + $("#inputContentTargetSpecialty" + college + "> option:checked").html();
                                paymentTar = grade + college + specialt;
                                objStr.majorName = college + specialty;
                            } else {
                                paymentTarName = $("#inputContentTargetGrade > option:checked").html()
                                    + $("#inputContentTargetCollege > option:checked").html()
                                    + $("#inputContentTargetSpecialty" + college + "> option:checked").html()
                                    + clazzName;
                                paymentTar = grade + college + specialt + specialty;
                                objStr.majorName = college + specialty;
                                objStr.className = clazz;
                            }
                        });

                    }
                });
            }
        });
    }
});

// 输入学号
$("#inputContentTargetStudentId").focus(function () {
    $("#inputContentTargetGrade").attr("disabled","disabled");
}).blur(function () {
    var studentId = $("#inputContentTargetStudentId").val();
    if (studentId == '') {
        $("#inputContentTargetGrade").removeAttr("disabled");
    } else {
        //确认缴费对象
        paymentTar = paymentTarName = studentId;
        objStr.jobNum = studentId;
    }
});

// 缴费项目
$(".inputContentNa").off("click").on("click",function () {
    paymentPro = '';
    paymentProName = '';
    $(".inputContentName > div").removeClass("active4");
    $(this).addClass("active4");
    paymentPro = $(this)[0].id;
    paymentProName = $(this).html();

});
$("#inputContentName_other").focus(function () {
    paymentPro = '';
    paymentProName = '';
    $(".inputContentName > div").removeClass("active4");
    $(".inputContentName_other").addClass("active4");
}).blur(function () {
    var inputContentName_other = $("#inputContentName_other").val();
    if (inputContentName_other == '') {
        $(".inputContentName_other").removeClass("active4");
    } else {
        paymentPro = "7";
        paymentProName = inputContentName_other;
    }
});

//缴费金额
$("#inputContentMoney").blur(function () {
    paymentMon = $("#inputContentMoney").val();
    if (paymentMon != '') {
        var fee = [{
            flag:paymentPro,
            feeName:paymentProName,
            feeNum:paymentMon
        }];
        feeStr = fee;
    }
});

// 缴费时间
$("#inputContentTime").blur(function () {
    paymentTime = $("#inputContentTime").val();
});


// 确认录入
$("#inputContentBtn").off("click").on("click",function () {
    if (paymentTime == "" || paymentPro == "" || paymentMon == "" || paymentTar == "") {
        alert("请填写完整信息在进行提交！");
    } else {
        console.log(objStr);
        console.log(feeStr);
        console.log(paymentTime);
        var jqXHR=$.ajax({
            url:"/CollegeTuitionManageSys/admin/add.do",
            method:"POST",
            data:{
                objStr:JSON.stringify(objStr),
                feeStr:JSON.stringify(feeStr),
                payDur:paymentTime
            }
        });
        jqXHR.then(function(data){
                if (data == "1") {
                    var showContent = $("<p>"+ paymentTime + "-" + paymentProName + "," + paymentMon + "元：" + paymentTarName +"</p>");
                    $(".showTextContent").append(showContent);

                    addPlay(showContent.html());
                } else {
                    alert("录入失败，请检查录入信息是否正确。");
                }

            },
            function(){

            });

    }
});

function addPlay(content) {
    var jqXHR2=$.ajax({
        url:"/CollegeTuitionManageSys/admin/addPlay.do",
        method:"POST",
        data:{
            content:content
        }
    });
    jqXHR2.then(function(data){

        },
        function(){

        });
}

// 返回
$(".back").off("click").on("click",function () {
    window.location.href = 'index_manager.html';
});

//查询
function searchStudent(stuNum,table) {
    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/admin/costList.do",
        method:"POST",
        data:{
            conditionStr:JSON.stringify([{
                conditionName:'stuNum',
                conditionValue:stuNum
            }])
        }
    });
    jqXHR.then(function(data){
            var data = JSON.parse(data);
            table.empty();
            document.getElementById('showJobTable').style.border = '1px solid darkgrey';
            document.getElementById('showJobTable').style.width = '200%';
            document.getElementById('showJobTable1').style.border = '1px solid darkgrey';
            document.getElementById('showJobTable1').style.width = '200%';
            document.getElementById('showJobTable2').style.border = '1px solid darkgrey';
            document.getElementById('showJobTable2').style.width = '120%';
            var $$id = $("<td>ID</td>");
            var $$tdd = $("<td style='width: 10vw'>学院</td>");
            var $$td = $("<td style='width: 12vw'>专业班级</td>");
            var $$td0 = $("<td>学号</td>");
            var $$td00 = $("<td>姓名</td>");
            var $$td1 = $("<td>年度</td>");
            var $$td2 = $("<td>费用名称</td>");
            var $$td3 = $("<td>应缴费用</td>");
            var $$td4 = $("<td>已缴费用</td>");
            var $$td5 = $("<td>减免</td>");
            var $$td6 = $("<td>返还费用</td>");
            var $$td7 = $("<td>欠费</td>");
            var $$tr = $("<tr></tr>");
            $$tr.append($$id);
            $$tr.append($$tdd);
            $$tr.append($$td);
            $$tr.append($$td0);
            $$tr.append($$td00);
            $$tr.append($$td1);
            $$tr.append($$td2);
            $$tr.append($$td3);
            $$tr.append($$td4);
            $$tr.append($$td5);
            $$tr.append($$td6);
            $$tr.append($$td7);
            table.append($$tr);
            for (var i = 0; i < data.length; i ++) {
                var id = $("<td>"+ data[i].id +"</td>");
                var tdd = $("<td>"+ data[i].academyName +"</td>");
                var td = $("<td>"+ data[i].majorName + data[i].className + "班" +"</td>");
                var td0 = $("<td>"+ data[i].stuNum +"</td>");
                var td00 = $("<td>"+ data[i].userName +"</td>");
                var td1 = $("<td>"+ data[i].payDur +"</td>");
                var td2 = $("<td>"+ data[i].feeName +"</td>");
                var td3 = $("<td>"+ data[i].shouldFee +"</td>");
                var td4 = $("<td>"+ data[i].alreadyFee +"</td>");
                var td5 = $("<td>"+ data[i].reduceFee +"</td>");
                var td6 = $("<td>"+ data[i].returnFee +"</td>");
                var td7 = $("<td class='oweFee'>"+ data[i].oweFee +"</td>");
                var tr = $("<tr></tr>");
                tr.append(id);
                tr.append(tdd);
                tr.append(td);
                tr.append(td0);
                tr.append(td00);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tr.append(td5);
                tr.append(td6);
                tr.append(td7);
                table.append(tr);
            }
        },
        function(){

        });
}

//输入学号（修改）
$("#jobNumBtn").click(function () {
    var stu = $("#jobNumText").val();
    if (stu == '') {

    } else {
        searchStudent(stu,$("#showJobTable"));
    }
});

// 确认修改
$("#moneyBtn").click(function () {
    var id = $("#proText").val();
    var red = $("#moneyText").val();
    var stu = $("#jobNumText").val();
    if (stu == ''){
        alert("请先输入要修改的学生学号！")
    } else {
        var jqXHR=$.ajax({
            url:"/CollegeTuitionManageSys/admin/edit.do",
            method:"POST",
            data:{
                id:id,
                reduceFee:red
            }
        });
        jqXHR.then(function(data){
                if (data == '1') {
                    $(".oldBox").hide();
                    $(".newBox").show();
                    searchStudent(stu,$("#showJobTable1"));
                } else {
                    alert("修改失败，请重试！");
                }
            },
            function(){

            });
    }
});

//删除
$("#firBtn").click(function () {
    var fieInputText = $("#fieInputText").val();
    if (fieInputText == '') {

    } else {
        $(".firInput").hide();
        $(".secBox").show();
        searchStudent(fieInputText,$("#showJobTable2"));
    }
});

// backUp
$(".backUp").click(function () {
    $(".firInput").show();
    $(".secBox").hide();

    var f = document.getElementById("fieInputText");
    var form = document.createElement('form'),ref = f.nextSibling,p = f.parentNode;
    form.appendChild(f);
    form.reset();
    p.insertBefore(f,ref);

});

//确定删除
$("#secBtn").click(function () {

    var fieInputText = $("#fieInputText").val();
    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/admin/delete.do",
        method:"POST",
        data:{
            stuNum:fieInputText
        }
    });
    jqXHR.then(function(data){
            if (data == '1') {
                alert("已成功删除该学生所以缴费信息！");
                $(".firInput").show();
                $(".secBox").hide();

                var f = document.getElementById("fieInputText");
                var form = document.createElement('form'),ref = f.nextSibling,p = f.parentNode;
                form.appendChild(f);
                form.reset();
                p.insertBefore(f,ref);

            } else {
                alert("删除失败，请重试！");
            }
        },
        function(){

        });
});