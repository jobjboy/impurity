/**
 * Created by Administrator on 2017/9/16 0016.
 */

define([], function () {


    //var api_url = "http://dev.api.smarthome.com/api/";

    //var api_url = "http://192.168.0.132/api/";

    var api_url = "http://www.smart-ihome.net:8086/api/";

     var controller_url = 'http://php.smart-ihome.net/Home/Index/';

    return {

        'API_URL': api_url,

        /**
         * 获取访问令牌
         * 返回参数:
         {
             "code": "1",
             "msg": "success",
             "data": "a687a7c5-57c1-4574-99dc-ddd023cab8a3"
         }
         */
        GET_TOKEN: 'token?account={0}&password={1}',

        //设备类型
        equipment: {
            controller_name: "eqptype",
            list: api_url + "eqptype?name={0}",
            action: api_url + "eqptype",
        },

        //设备品牌
        equipment_brand: {
            controller_name: "eqpbrand",
            list: api_url + "eqpbrand?name={0}",
            action: api_url + "eqpbrand",
        },

        //设备型号
        equipment_eqpmodel: {
            controller_name: "eqpmodel",
            list: api_url + "eqpmodel?name={0}",
            action: api_url + "eqpmodel",
        },

        //设备列表信息
        equipment_eqpbaseinfo: {
            controller_name: "eqpbaseinfo",
            list: api_url + "eqpbaseinfo?no={0}&name={1}",
            action: api_url + "eqpbaseinfo",
        },

        //场景
        equipment_scene: {
            controller_name: "scene",
            list: api_url + "scene?name={0}",
            action: api_url + "scene",
        },

        //情景模式
        contextualmodel: {
            controller_name: "contextualmodel",
            list: api_url + "contextualmodel?name={0}",
            action: api_url + "contextualmodel",
        },
        //会员中心
        user: {
            controller_name: "user",
            list: api_url + "user?account={0}&name={1}&custNo={2}",
            action: api_url + "user",
        },

        //用户签约和解约
        usersignagreement: {
            controller_name: "usersignagreement",
            list: api_url + "usersignagreement?userNo={0}&username={1}",
            action: api_url + "usersignagreement",
        },

        //协议详细
        agreement: {
            controller_name: "agreement",
            list: api_url + "agreement?name={0}",
            action: api_url + "agreement",
        },

        //小区信息
        estate: {
            controller_name: "estate",
            list: api_url + "estate?name={0}",
            action: api_url + "estate",
        },

        //楼栋信息
        estateridgepole: {
            controller_name: "estateridgepole",
            list: api_url + "estateridgepole?name={0}",
            action: api_url + "estateridgepole",
        },

        //房号信息
        estatehouse: {
            controller_name: "estatehouse",
            list: api_url + "estatehouse?estateId={0}&name={1}",
            action: api_url + "estatehouse",
        },

        //执行控制指令
        executecontrolcmd: {
            action: api_url + "executecontrolcmd",
        },

        //获取单个用户设备的状态
        eqpstatus: api_url + "eqpstatus?installedId={0}",
        //情景设备指令
        contextualmodeleqpcmd: {
            controller_name: "contextualmodeleqpcmd",
            list: api_url + "contextualmodeleqpcmd?eqpNo={0}&eqpName={1}",
            action: api_url + "contextualmodeleqpcmd",
        },
        //用户已安装设备汇总
        installedeqpstatistics: {
            controller_name: "installedeqpstatistics",
            list: api_url + "installedeqpstatistics?userNo={0}&username={1}",
            action: api_url + "installedeqpstatistics",
        },

        //用户已安装设备
        installedeqp: {
            controller_name: "installedeqp",
            list: api_url + "installedeqp?userId={0}&eqpName={1}&sceneId={2}",
            action: api_url + "installedeqp",
        },


        //管理员信息
        admin: {
            controller_name: "admin",
            list: api_url + "admin?name={0}",
            action: api_url + "admin",
        },


        //管理员组
        admingroup: {
            controller_name: "admingroup",
            list: api_url + "admingroup?name={0}",
            action: api_url + "admingroup",
        },

        //报表管理
        systemconfig: {
            controller_name: "systemconfig",
            list: api_url + "systemconfig?name={0}",
            action: api_url + "systemconfig",
        },
        //日志
        getloginlog: {
            controller_name: "log/getloginlog",
            list: api_url + "log/getloginlog?account={0}",
            action: api_url + "log/getloginlog",
        },

        //预警系统
        warning: {
            controller_name: "warning",
            list: api_url + "warning?status={0}&username={1}",
            action: api_url + "warning",
        },

        //获取小区列表[包括经纬度]
        estate_list: api_url + "estate/getestatestatisticsinfo?pIndex=1&pSize=100",


        //后台首页 【小区数量、住户数量、总设备数量、在线设备数量】
        statistics: api_url + "report/getbaseinfo",

        //设备类型数量 柱状图
        geteqptypenumber: api_url + "report/geteqptypenumber",

        //小区用户数量
        getestateusernumber: api_url + "report/getestateusernumber",

        //按小时统计设备使用数量
        geteqpusenumberbyhour: api_url + "report/geteqpusenumberbyhour",

        //按小时统计电占比
        getelecstatisticsbyhour: api_url + "report/getelecstatisticsbyhour?year={0}",

        //小区年度用电汇总
        getelecstatisticsbyestateyear: api_url + "report/getelecstatisticsbyestateyear?year={0}",

        //小区季度用电汇总
        getelecstatisticsbyestateseason: api_url + "report/getelecstatisticsbyestateseason?year={0}&&season={1}",

        //小区月度用电汇总
        getelecstatisticsbyestatemonth: api_url + "report/getelecstatisticsbyestatemonth?year={0}&&month={1}",

        //设备类型用电汇总
        getelecstatisticsbyeqptype: api_url + "report/getelecstatisticsbyeqptype?year=2017",

        // 设备能耗监控
        geteqpelecmonitoring: api_url + "report/geteqpelecmonitoring?estateId={0}",

        // 按小时监控总能耗
        gettotalelecmonitoringbyhour: api_url + "report/gettotalelecmonitoringbyhour",

        // 按分钟监控总能耗
        gettotalelecmonitoringbyminute: api_url + "report/gettotalelecmonitoringbyminute",

        //小区列表
        plot_estate: api_url + "estate?name=&pindex={0}&psize={1}",

        // 小区电力信息
        getestateelecinfo: api_url + "report/getestateelecinfo?estateId={0}",

        // 小区房间信息
        getestatehouseinfo: api_url + "report/getestatehouseinfo?estateId={0}",

        // 获取用户电力信息
        getestateuserelecinfo: api_url + "report/getestateuserelecinfo?userId={0}",

        // 按分钟监控小区能耗（动态数据，5分钟更新一次）
        getestatetotalelecmonitoringbyminute: api_url + "report/getestatetotalelecmonitoringbyminute?estateId={0}",

        // 按小时监控设备能耗（动态数据，5分钟更新一次）
        geteqpelecmonitoringbyhour: api_url + "report/geteqpelecmonitoringbyhour?estateId={0}",

        // 按分钟监控设备能耗（动态数据，5分钟更新一次）
        geteqpelecmonitoringbyminute: api_url + "report/geteqpelecmonitoringbyminute?estateId={0}",


        //小区用户统计报表
        getestateuserstatisticsreport: api_url + "report/getestateuserstatisticsreport",

        //用户电力报表
        getuserelecreport: api_url + "report/getuserelecreport?userno={0}&starttime={1}&endtime={2}",

        //用户安装设备报表
        getuserinstalleqpreport: api_url + "report/getuserinstalleqpreport?userno={0}",

        //用户安装设备报表（详情）
        getuserinstalleqpreportdetail: api_url + "report/getuserinstalleqpreportdetail?userid={0}",

        //用户预警统计报表
        getuserwarningstatisticsreport: api_url + "report/getuserwarningstatisticsreport?userno={0}",

        //用户预警统计报表（详情）
        getuserwarningstatisticsreportdetail: api_url + "report/getuserwarningstatisticsreportdetail?userid={0}",

        //控制策略
        control_strategy: controller_url+'control_strategy_list?strategy_name={0}&strategy_no={1}',
		
		//执行控制策略
		executestrategy: api_url+'executestrategy'

    }


});
