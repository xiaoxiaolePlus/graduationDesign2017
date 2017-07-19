package com.tuition.service;

import java.util.List;

import com.tuition.dao.UserDao;
import com.tuition.model.User;

public class UserService {
	//dao层--user
	private UserDao userDao=new UserDao();

	//登录
	public	List<User> login(User user){
		return userDao.login(user);
	}
	
	
	//根据邮箱判断用户是否存在
	public List<User> isExistUser(User user){
		return userDao.isExistUser(user);
	}
	
	//修改密码
	public int changePWD(User user){
		return userDao.changePWD(user);
	}
	
	//登录日志
	public void addLog(String jobNum,String ip,java.sql.Date date,int flag){
		userDao.addLog(jobNum,ip,date,flag);
	}
}
