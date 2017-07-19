package com.tuition.service;

import java.util.List;

import com.tuition.dao.StudentDao;
import com.tuition.model.Condition;
import com.tuition.model.CostItem;
import com.tuition.model.User;

public class StudentService {
	StudentDao studentDao=new StudentDao();
	
	//½É·ÑÃ÷Ï¸
	public List<CostItem> getCostList(User user,Condition condition){
		return studentDao.getCostList(user,condition);
	}
	
	//½É·Ñ
	public int pay(CostItem costItem){
		return studentDao.pay(costItem);
	}
}
