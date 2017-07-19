var tdArr = [];
var conditionName;
var conditionValue;

//缴费记录
$("#contributionRecord").click(function () {
    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent1").show();

    costList('null','',$("#tables"));

}).trigger("click");

// 筛选
$("#contributionSearchSelect").click(function () {
    var check = $(this).val();
    conditionName = check;
    if (conditionName == 'oweFee') {
        $("#contributionSearchInput").attr("placeholder","");
        $("#contributionSearchInput").attr("disabled","disabled");
        conditionValue = '';
    } else {
        $("#contributionSearchInput").removeAttr("disabled");
        if (conditionName == 'feeName') {
            $("#contributionSearchInput").attr("placeholder","请输入费用名称");
        } else if (conditionName == 'payDur') {
            $("#contributionSearchInput").attr("placeholder","请输入年度");
        } else {
            $("#contributionSearchInput").attr("placeholder","");
        }
    }
});
$('#contributionSearchInput').blur(function () {
    var text = $("#contributionSearchInput").val();
    conditionValue = text;
});
$("#contributionSearchBtn").off("click").on("click",function () {
    costList(conditionName,conditionValue,$("#tables"));
});

//欠费查询
$("#arrearsInquiry").click(function () {

    $(".leftTitle").removeClass('active2');
    $(this).addClass('active2');
    $(".rightContent").hide();
    $(".rightContent2").show();

    costList('null','',$("#tables2"));

});

function costList(conditionName,conditionValue,tables) {
    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/student/costList.do",
        method:"POST",
        data:{
            conditionStr:JSON.stringify({
                conditionName:conditionName,
                conditionValue:conditionValue
            })
        }
    });
    jqXHR.then(function(data){

        var data = JSON.parse(data);
        tables.empty();
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
        tables.append($$tr);
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
            tables.append(tr);
        }
        var $td1 = $("<td>总计</td>");
        var $td2 = $("<td></td>");
        var $td3 = $("<td></td>");
        var $td4 = $("<td></td>");
        var $td5 = $("<td></td>");
        var $td6 = $("<td></td>");
        var $td7 = $("<td id='all'>0</td>");
        var $tr = $("<tr></tr>");
        $tr.append($td1);
        $tr.append($td2);
        $tr.append($td3);
        $tr.append($td4);
        $tr.append($td5);
        $tr.append($td6);
        $tr.append($td7);
        tables.append($tr);

        var oweFee = $(".oweFee");
        var allNum = 0;
        for (var i = 0; i < oweFee.length; i ++) {
            var allOwe = oweFee[i].innerHTML;
            allNum = allNum + +allOwe;
        }
        $("#all").html(allNum);

        tdArr = [];
        conditionName = null;
        conditionValue = null;

    },function(){

    });
}