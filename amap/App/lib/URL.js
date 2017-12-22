/**
 * Created by Administrator on 2017/9/16 0016.
 */

define([], function () {

    
//  var api_url = "http://192.168.0.116/user/";
	
	var api_url = 'http://cw.skylartech.cn/user/';

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
        //app登录接口
        GET_TOKEN: 'login/?act=api&username={0}&password={1}&model_id={2}&cpu={3}&mac={4}',
        
        userinfo: api_url + 'userinfo/?act=api&aut_token={0}',
        
        //用户上传地理位置
		upload_coordinate: api_url + 'upload_coordinate/?act=api&aut_token={0}&latitude={1}&longitude={2}',
		
		//我的任务集合
		mytask_new: api_url + 'mytask_new',
		
		//疑似违章和申请支援列表
		road_inspection_list: api_url + 'road_inspection_list',
		
		//用户每日签到，签退接口
		sign_in:api_url + 'sign_in/?act=api&aut_token={0}&latitude={1}&longitude={2}&img={3}&type={4}',
		
		//签到记录
		get_sign_log : api_url + 'get_sign_log',
		
		//该任务巡逻完成 / 补录资料
		excute_task:api_url + 'excute_task',
		
		//路面巡查疑似违章+申请支援
		road_inspection:api_url + 'road_inspection',
		
		//图片上传
		upload_img:api_url + 'upload_img/?act=api',	
		
		//疑似违章和申请支援详情
		road_inspection_info:api_url + 'road_inspection_info',
		
		//单个任务详情和操作记录
		get_task_info:api_url + 'get_task_info?act=api&aut_token={0}&task_id={1}',
		
		//退出登录接口
		log_out:api_url + 'log_out?act=api&aut_token={0}',
		
		//实时位置
		get_user_location:api_url + 'get_user_location?act=api&aut_token={0}',
		
		//推送get_messages
		get_messages:api_url + 'get_messages',
		
		//消息查看message_read
		message_read:api_url + 'message_read',
		
		//队员列表
		my_team:api_url + 'my_team/?act=api&aut_token={0}&page={1}&page_size={2}',
		
		//队员签到记录
		team_member_sign_log:api_url + 'team_member_sign_log/?act=api&aut_token={0}&user_id={1}&year_month={2}',
		
		//队员轨迹列表
		team_member_trajectory_list:api_url + 'team_member_trajectory_list/?act=api&aut_token={0}&page={1}&page_size={2}&user_id={3}',
		
		//单个队员轨迹
		team_member_trajectory_info:api_url + 'team_member_trajectory_info/?act=api&aut_token={0}&user_id={1}&id={2}',
		
		//单条轨迹详情
		trajectory_info:api_url + 'trajectory_info/?act=api&aut_token={0}&id={1}',
		
		//轨迹列表
		my_trajectory_list:api_url + 'my_trajectory_list/?act=api&aut_token={0}&page={1}&page_size={2}',
		
		
    };
});
