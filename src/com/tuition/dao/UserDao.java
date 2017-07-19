package com.tuition.dao;

import java.util.List;

import com.tuition.model.User;

public class UserDao {

	//登录
	public List<User> login(User user){
		StringBuilder sb=new StringBuilder();
		
		if(user.getFlag()==1){
			sb.append("select t1.id,t1.jobNum,t1.userName,t1.password,t1.gradeName,t2.academyName,t3.majorName,className,email,phoneNum,flag ");
			sb.append(" from user_userinfo t1,home_academy t2, home_major t3 ");
			sb.append(" where t1.academyName=t2.id and t1.majorName=t3.id and jobNum=? and password=?");
		}else{
			sb.append("select id,jobNum,userName,password,apartment,email,phoneNum,flag ");
			sb.append(" from user_adminInfo");
			sb.append(" where jobNum=? and password=?");
		}
		Object[] params=new Object[]{user.getJobNum(),user.getPassword()};
		Class<?> clazz=null;
		System.out.println(sb.toString());
		for(int i=0;i<params.length;i++){
			System.out.println(params[i]);
		}
		try {
			clazz=Class.forName("com.tuition.model.User");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return (List<User>) BaseDao.find(sb.toString(), params, clazz);
	}
	
		
	//根据邮箱判断用户是否存在
		public List<User> isExistUser(User user){
			StringBuilder sb=new StringBuilder();
			sb.append("select id,userName,flag ");
			if(user.getFlag()==1){
				sb.append("from user_userInfo ");
			}else{
				sb.append("from user_adminInfo ");
			}
			sb.append(" where email=?");
			Object[] params=new Object[]{user.getEmail()};
			Class<?> clazz=null;
			try {
				clazz=Class.forName("com.tuition.model.User");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			return (List<User>) BaseDao.find(sb.toString(), params, clazz);
		}
		//修改密码
		public int changePWD(User user){
			StringBuilder sb=new StringBuilder();
			if(user.getFlag()==1){
				sb.append("update user_userInfo ");
			}else{
				sb.append("update user_adminInfo ");
			}
			sb.append(" set password=? where id=?");
			Object[] params=new Object[]{user.getPassword(),user.getId()};
			return BaseDao.executeUpdate(sb.toString(), params);
		}
		//登录日志
		public void addLog(String jobNum,String ip,java.sql.Date date,int flag){
			String str=String.valueOf(flag);
			StringBuilder sb=new StringBuilder();
			if(str.equals("1")){
				sb.append("insert into user_log");
			}else{
				sb.append("insert into admin_log");
			}
			sb.append("(jobNum,ip,time) values(?,?,?)");
			Object[] params=new Object[]{jobNum,ip,date};
			BaseDao.executeUpdate(sb.toString(), params);
		}
}
