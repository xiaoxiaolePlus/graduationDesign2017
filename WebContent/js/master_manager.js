$("#tab_main").click(function () {
    $("#mainBody").load("../html/managerCenter.html");
    $(".tab").removeClass('active1');
    $(this).addClass('active1');
}).trigger("click");
$("#tab_personalCenter").click(function () {
    $("#mainBody").load("../html/informationManagement.html");
    $(".tab").removeClass('active1');
    $(this).addClass('active1');
});
$("#tab_forum").click(function () {
    $("#mainBody").load("../html/informationServices.html");
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
            $("#myName").html(userInfoData.userName);
            $("#myId").html(userInfoData.id);
        },
        function () {}
    );
}
loginTo();