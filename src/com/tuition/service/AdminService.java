package com.tuition.service;

import java.util.ArrayList;
import java.util.List;

import com.tuition.dao.AdminDao;
import com.tuition.model.Condition;
import com.tuition.model.CostDetail;
import com.tuition.model.CostItem;
import com.tuition.model.StatisticsItem;
import com.tuition.model.User;

public class AdminService {
	AdminDao adminDao=new AdminDao();
	
	//添加费用详情
	public int addCost(User user,List<CostDetail> feeList,String amin,String payDur){
		try {
			//如果学生学号不为0
			if(!user.getJobNum().equals("0")){
				//直接插入学生
				addSingleStu(user, feeList,amin,payDur);
			}else{
				//System.out.println("学生学号为0");
				//如果班级不为0
				if(!user.getClassName().equals("0")){
					//执行插入整个班级里的学生
					List<User> userList=adminDao.getClassUser(user);
					for(User userItem:userList){
						addSingleStu(userItem, feeList,amin,payDur);
					}
					
				}else{
					//如果专业不为0
					if(!user.getMajorName().equals("0")){
						//执行插入整个专业的学生
						List<User> userList=adminDao.getMajorUser(user);
						for(User userItem:userList){
							addSingleStu(userItem, feeList,amin,payDur);
						}
					}else{
						//如果学院不为0
						if(!user.getAcademyName().equals("0")){
							//执行插入整个学院的学生
							List<User> userList=adminDao.getAcademyUser(user);
							for(User userItem:userList){
								addSingleStu(userItem, feeList,amin,payDur);
							}
						}else{
							//执行插入整个学校的学生
							List<User> userList=adminDao.getGradeUser(user);
							for(User userItem:userList){
								addSingleStu(userItem, feeList,amin,payDur);
							}
						}
					}
				}
			}
			
		} catch (Exception e) {
			throw e;
		}
		return 1;
	}
	
	//添加单个学生
	public void addSingleStu(User user,List<CostDetail> feeList,String amin,String payDur){
		for(CostDetail cd:feeList){
			adminDao.addSingleStu(user, cd,amin,payDur);
		}
	}
	
	//修改
	public int edit(String jobNum,int id,String reduceFee,java.sql.Date date){
		return adminDao.edit(jobNum,id, reduceFee,date);
	}
	//删除
	public int delete(String jobNum,String stuNum,java.sql.Date date){
		return adminDao.delete(jobNum,stuNum,date);
	}
	//统计
	public List<StatisticsItem> statistics(Condition condition,String flag){
		List<CostItem> list=adminDao.statistics(condition);
		List<StatisticsItem> returnList=null;
		if(flag.equals("1")){
			returnList=toStatistics(list);
		}
		if(flag.equals("2")){
			returnList=toStatistics2(list);
		}
		return returnList;
	}
	
	//构造数据格式---按照费用
	public List<StatisticsItem> toStatistics(List<CostItem> list){
		StatisticsItem item1=new StatisticsItem("学费");
		StatisticsItem item2=new StatisticsItem("住宿费");
		StatisticsItem item3=new StatisticsItem("体检费");
		StatisticsItem item4=new StatisticsItem("医疗保险");
		StatisticsItem item5=new StatisticsItem("重修费");
		StatisticsItem item6=new StatisticsItem("补考费");
		StatisticsItem item7=new StatisticsItem("其他");
		List<StatisticsItem> list2=new ArrayList<StatisticsItem>();
		list2.add(item1);list2.add(item2);list2.add(item3);list2.add(item4);
		list2.add(item5);list2.add(item6);list2.add(item7);
		//遍历循环
		for(CostItem item:list){
			switch(item.getFeeName()){
				case "学费":
					if(item.getOweFee().equals("0")){
						//System.out.println("欠费");
						item1.getOwer().add(item);
					}else{
						//System.out.println("不欠费");
						item1.getUnOwer().add(item);	
					}
					break;
				case "住宿费":
					if(item.getOweFee().equals("0")){
						
						item2.getOwer().add(item);
					}else{
						item2.getUnOwer().add(item);
					}
					break;
				case "体检费":
					if(item.getOweFee().equals("0")){
						item3.getOwer().add(item);
					}else{
						item3.getUnOwer().add(item);
					}
					break;
				case "医疗保险":
					if(item.getOweFee().equals("0")){
						item4.getOwer().add(item);
					}else{
						item4.getUnOwer().add(item);
					}
					break;
				case "重修费":
					if(item.getOweFee().equals("0")){
						item5.getOwer().add(item);
					}else{
						item5.getUnOwer().add(item);
					}
					break;
				case "补考费":
					if(item.getOweFee().equals("0")){
						item6.getOwer().add(item);
					}else{
						item6.getUnOwer().add(item);
					}
					break;
				default:
					if(item.getOweFee().equals("0")){
						item7.getOwer().add(item);
					}else{
						item7.getUnOwer().add(item);
					}
					break;
			}
		}
		return list2;
	}
	
	//构造数据格式---按照费用
		public List<StatisticsItem> toStatistics2(List<CostItem> list){
			StatisticsItem item1=new StatisticsItem("材料科学与工程学院");
			StatisticsItem item2=new StatisticsItem("计算机与通信学院");
			StatisticsItem item3=new StatisticsItem("电气工程与信息工程学院");
			StatisticsItem item4=new StatisticsItem("机电工程学院");
			StatisticsItem item5=new StatisticsItem("理学院");
			StatisticsItem item6=new StatisticsItem("生命科学与工程学院");
			StatisticsItem item7=new StatisticsItem("设计艺术学院");
			StatisticsItem item8=new StatisticsItem("文学院与国际教育学院");
			StatisticsItem item9=new StatisticsItem("能源与动力工程学院");
			StatisticsItem item10=new StatisticsItem("石油化工学院");
			StatisticsItem item11=new StatisticsItem("土木工程学院");
			StatisticsItem item12=new StatisticsItem("经济管理学院");
			StatisticsItem item13=new StatisticsItem("外国语学院");
			List<StatisticsItem> list2=new ArrayList<StatisticsItem>();
			list2.add(item1);list2.add(item2);list2.add(item3);list2.add(item4);
			list2.add(item5);list2.add(item6);list2.add(item7);list2.add(item8);
			list2.add(item9);list2.add(item10);list2.add(item11);list2.add(item12);
			list2.add(item13);
			
			//遍历循环
			for(CostItem item:list){
				switch(item.getAcademyName()){
					case "材料科学与工程学院":
						if(item.getOweFee().equals("0")){
							item1.getOwer().add(item);
						}else{
							item1.getUnOwer().add(item);	
						}
						break;
					case "计算机与通信学院":
						if(item.getOweFee().equals("0")){
							
							item2.getOwer().add(item);
						}else{
							item2.getUnOwer().add(item);
						}
						break;
					case "电气工程与信息工程学院":
						if(item.getOweFee().equals("0")){
							item3.getOwer().add(item);
						}else{
							item3.getUnOwer().add(item);
						}
						break;
					case "机电工程学院":
						if(item.getOweFee().equals("0")){
							item4.getOwer().add(item);
						}else{
							item4.getUnOwer().add(item);
						}
						break;
					case "理学院":
						if(item.getOweFee().equals("0")){
							item5.getOwer().add(item);
						}else{
							item5.getUnOwer().add(item);
						}
						break;
					case "生命科学与工程学院":
						if(item.getOweFee().equals("0")){
							item6.getOwer().add(item);
						}else{
							item6.getUnOwer().add(item);
						}
						break;
					case "设计艺术学院":
						if(item.getOweFee().equals("0")){
							item7.getOwer().add(item);
						}else{
							item7.getUnOwer().add(item);	
						}
						break;
					case "文学院与国际教育学院":
						if(item.getOweFee().equals("0")){
							
							item8.getOwer().add(item);
						}else{
							item8.getUnOwer().add(item);
						}
						break;
					case "能源与动力工程学院":
						if(item.getOweFee().equals("0")){
							item9.getOwer().add(item);
						}else{
							item9.getUnOwer().add(item);
						}
						break;
					case "经济管理学院":
						if(item.getOweFee().equals("0")){
							item10.getOwer().add(item);
						}else{
							item10.getUnOwer().add(item);
						}
						break;
					case "土木工程学院":
						if(item.getOweFee().equals("0")){
							item11.getOwer().add(item);
						}else{
							item11.getUnOwer().add(item);
						}
						break;
					case "石油化工学院":
						if(item.getOweFee().equals("0")){
							item12.getOwer().add(item);
						}else{
							item12.getUnOwer().add(item);
						}
						break;
					case "外国语学院":
						if(item.getOweFee().equals("0")){
							item13.getOwer().add(item);
						}else{
							item13.getUnOwer().add(item);
						}
						break;
				}
			}
			return list2;
		}
	//按照条件查询学生缴费情况
	public List<CostItem> getCostList(List<Condition> conditionList){
		return adminDao.getCostList(conditionList);
	}
	
	//增加操作
	public int addPlay(String jobNum,String content,java.sql.Date date){
		return adminDao.addPlay(jobNum,content,date);
	}
}
