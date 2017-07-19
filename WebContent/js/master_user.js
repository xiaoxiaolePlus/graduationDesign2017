$("#tab_main").click(function () {
    $("#mainBody").load("../html/myRecords.html");
    $(".tab").removeClass('active1');
    $(this).addClass('active1');
});
$("#tab_personalCenter").click(function () {
    $("#mainBody").load("../html/userCenter.html");
    $(".tab").removeClass('active1');
    $(this).addClass('active1');
}).trigger("click");
$("#tab_forum").click(function () {
    $("#mainBody").load("../html/payment.html");
    $(".tab").removeClass('active1');
    $(this).addClass('active1');
});

//欢迎你
function loginTo() {
    var jqXHR=$.ajax({
        url:'/CollegeTuitionManageSys/user/userInfo.do'
    });
    jqXHR.then (
        function (data) {
            var userInfoData = JSON.parse(data);
            console.log(userInfoData);
            $("#myName").html(userInfoData.userName);
            $("#myId").html(userInfoData.id);
        },
        function () {}
    );
}
loginTo();