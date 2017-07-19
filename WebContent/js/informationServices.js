var tdArr = [];
var conditionName;
var conditionValue;
var arr3 = new Array();
function  ObjStory(conName,conValue) //声明对象
{
    conditionName = conName;
    conditionValue = conValue;

}

function costList(arr) {
    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/admin/costList.do",
        method:"POST",
        data:{
            conditionStr:JSON.stringify(arr)
        }
    });
    jqXHR.then(function(data){
        var data = JSON.parse(data);
        $("#tables").empty();
        document.getElementById('tables').style.width = '120%';
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
        $("#tables").append($$tr);
        for (var i = 0; i < data.length; i ++) {
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
            $("#tables").append(tr);
        }
        var $td0 = $("<td>总计</td>");
        var $td1 = $("<td></td>");
        var $td2 = $("<td></td>");
        var $td3 = $("<td></td>");
        var $td4 = $("<td></td>");
        var $td5 = $("<td></td>");
        var $td6 = $("<td></td>");
        var $td8 = $("<td></td>");
        var $td9 = $("<td></td>");
        var $td10 = $("<td></td>");
        var $td7 = $("<td id='all'></td>");
        var $tr = $("<tr></tr>");
        $tr.append($td0);
        $tr.append($td1);
        $tr.append($td2);
        $tr.append($td3);
        $tr.append($td4);
        $tr.append($td5);
        $tr.append($td6);
        $tr.append($td8);
        $tr.append($td9);
        $tr.append($td10);
        $tr.append($td7);
        $("#tables").append($tr);

        var oweFee = $(".oweFee");
        var allNum = 0;
        for (var j = 0; j < oweFee.length; j ++) {
            var allOwe = oweFee[j].innerHTML;
            allNum = allNum + +allOwe;
        }
        $("#all").html(allNum);

        arr3 = [];

    },function(){

    });
}

// 返回首页
$(".backTo").off("click").on("click",function () {
    window.location.href = 'index_manager.html';
});

// 删除元素的方法
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

//数组去重
//将对象元素转换成字符串以作比较
function obj2key(obj, keys){
    var n = keys.length,
        key = [];
    while(n--){
        key.push(obj[keys[n]]);
    }
    return key.join('|');
}
//去重操作
function uniqeByKeys(array,keys){
    var arr = [];
    var hash = {};
    for (var i = 0, j = array.length; i < j; i++) {
        var k = obj2key(array[i], keys);
        if (!(k in hash)) {
            hash[k] = true;
            arr .push(array[i]);
        }
    }
    return arr ;
}

// 筛选
$("#contributionSearchSelect").click(function () {
    var contributionSearchSelect = $("#contributionSearchSelect").val();
    if (contributionSearchSelect == '0') {
        $("#contributionSearchInput").attr("disabled","disabled");
        $("#inputContentTargetCollege").attr("disabled","disabled");
    } else if (contributionSearchSelect == 'studentNum') {
        $("#contributionSearchInput").show().removeAttr("disabled");
        $("#inputContentTargetCollege").hide();
    } else {
        $("#inputContentTargetCollege").show().removeAttr("disabled");
        $("#contributionSearchInput").hide();
    }
    conditionName = contributionSearchSelect;

});
$('#contributionSearchInput').blur(function () {
    var text = $("#contributionSearchInput").val();
    if (text == '') {
        var conditionValue1 = '';
    } else {
        conditionValue1 = text;
    }
    if (conditionName != '' && conditionValue1 != '') {
        var obj01 = {
            conditionName:conditionName,
            conditionValue:conditionValue1
        };
        arr3.push(obj01);
        uniqeByKeys(arr3,["conditionName",'conditionValue']);

    } else {
        arr3.removeByValue({
            conditionName:conditionName,
            conditionValue:conditionValue1
        });
    }
});
$("#inputContentTargetCollege").click(function () {
    var va = $(this).val();
    if (va == '0') {
        var conditionValue2 = '';
    } else {
        conditionValue2 = va;
    }
    if (conditionName != '' && conditionValue2 != '') {
        var obj01 = {
            conditionName:conditionName,
            conditionValue:conditionValue2
        };
        arr3.push(obj01);
        uniqeByKeys(arr3,["conditionName",'conditionValue']);

    } else {
        arr3.removeByValue({
            conditionName:conditionName,
            conditionValue:conditionValue2
        });
    }
});
$("#contributionSearchYear").blur(function () {
    var contributionSearchYear = $(this).val();
    if (contributionSearchYear != '') {
        var obj02 = {
            conditionName:'payDur',
            conditionValue:contributionSearchYear
        };
        arr3.push(obj02);
        uniqeByKeys(arr3,["conditionName",'conditionValue']);
    } else {
        arr3.removeByValue({
            conditionName:"payDur",
            conditionValue:contributionSearchYear
        });
    }
});
$("#contributionSearchFeeName").click(function () {
    var vall = $(this).val();
    if (vall != '0') {
        var obj03 = {
            conditionName:'feeName',
            conditionValue:vall
        };
        arr3.push(obj03);

    } else {

        arr3.removeByValue({
            conditionName:"feeName",
            conditionValue:vall
        });
    }
});
$('#contributionSearchOwe').click(function () {
    if ($("#contributionSearchOwe").is(':checked')) {
        var obj04 = {
            conditionName:'oweFee',
            conditionValue:''
        };
        arr3.push(obj04);
        
    } else {
        arr3.removeByValue({
            conditionName:"oweFee",
            conditionValue:''
        });

    }
});

// 点击筛选
$("#contributionSearchBtn").off("click").on("click",function () {
    var collegea = $("#inputContentTargetCollege").val();
    var feea = $("#contributionSearchFeeName").val();
    var yeara = $("#contributionSearchYear").val();
    if (collegea == 0) {
        if (feea == 0) {
            var obj3 = {
                conditionName:"gradeName",
                conditionValue:yeara
            };
            myAjax(obj3,1,3,100);
        } else {
            var obj4 = {
                conditionName:"feeName",
                conditionValue:feea
            };
            myAjax(obj4,2,3,2400);
        }
    } else {
        var obj5 = {
            conditionName:"academyName",
            conditionValue:collegea
        };
        myAjax(obj5,1,1,600);
    }
    if (collegea != 0 || feea != 0 || yeara != '') {
        $(".per").hide();
        $(".personalCenter_right").show();
    } else {
        $(".per").hide();
    }

    costList(arr3);

    document.getElementById("contributionSearchFeeName").options[0].removeAttribute("selected");
    document.getElementById("contributionSearchFeeName").selectedIndex = 0;
    document.getElementById("inputContentTargetCollege").options[0].removeAttribute("selected");
    document.getElementById("inputContentTargetCollege").selectedIndex = 0;

    if ($("#contributionSearchInput")) {
        var g = document.getElementById("contributionSearchInput");
        var form1 = document.createElement('form'),ref1 = g.nextSibling,h = g.parentNode;
        form1.appendChild(g);
        form1.reset();
        h.insertBefore(g,ref1);
    }

    var f = document.getElementById("contributionSearchYear");
    var form = document.createElement('form'),ref = f.nextSibling,p = f.parentNode;
    form.appendChild(f);
    form.reset();
    p.insertBefore(f,ref);
    arr3 = [];

});

function myAjax(obj,flag,num,nums) {
    var jqXHR=$.ajax({
        url:"/CollegeTuitionManageSys/admin/statistics.do",
        method:"POST",
        data:{
            conditionStr:JSON.stringify(obj),
            flag:flag
        }
    });
    jqXHR.then(function(data){
            var myData = JSON.parse(data);
        console.log(myData);

            var ower = [];
            var unOwer = [];

            for (var i = 0; i < myData.length; i ++) {

                ower.push(myData[i].ower.length);
                unOwer.push(myData[i].unOwer.length);

            }

            if (num == 1 || num == 2) {
                var myDa = ['学费','住宿费','体检费','医保费','补考费','重修费','其他费用'];
            } else {
                myDa = ['材料科学与工程学院',
                    '计算机与通信学院',
                    '电气工程与信息工程学院',
                    '机电工程学院',
                    '理学院',
                    '生命科学与工程学院',
                    '设计艺术学院',
                    '文学院 国际教育学院',
                    '能源与动力工程学院',
                    '石油化工学院',
                    '土木工程学院',
                    '经济管理学院',
                    '外国语学院'];
            }

            var nu = nums;

            column(unOwer,ower,myDa,nu);

        },
        function(){

        });
}

function column(ower,unOwer,data,number) {
    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('showBox'));

    // 指定图表的配置项和数据
    var option = {
        title : {
            subtext: '人数'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['欠费人数','已缴费人数']
        },
        toolbox: {
            show : true,
            feature : {
                magicType : {show: true, type: ['line', 'bar'] },
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis: [
            {
                type: 'category',
                data: data,
                axisPointer: {
                    type: 'shadow'
                },
                rotate:90
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人数',
                min: 0,
                max: number,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series : [
            {
                name:'欠费人数',
                type:'bar',
                data:ower

            },
            {
                name:'已缴费人数',
                type:'bar',
                data:unOwer

            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

$(".personalCenter_left").click(function () {
    $(".contributionRecordBox").hide();
    $("#fir").show();
    $(".per").hide();
    $(".personalCenter_right").show();
});

$(".personalCenter_right").click(function () {
    $(".contributionRecordBox").hide();
    $("#showBox").show();
    $(".per").hide();
    $(".personalCenter_left").show();
});