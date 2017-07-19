package com.tuition.dao;

import java.util.ArrayList;
import java.util.List;

import com.tuition.model.Condition;
import com.tuition.model.CostDetail;
import com.tuition.model.CostItem;
import com.tuition.model.User;

public class AdminDao {

	//添加单个学生
	public void addSingleStu(User user,CostDetail cd,String admin,String payDur){
		StringBuilder sb=new StringBuilder();
		sb.append("insert into cost_detail(stuNum,adminNum,payDur,feeName,shouldFee,alreadyFee,reduceFee,returnFee,oweFee,payTime,createTime,flag) ");
		sb.append(" values(?,?,?,?,?,0,0,0,?,null,?,?)");
		Object[] params=new Object[]{user.getJobNum(),admin,payDur,cd.getFeeName(),cd.getFeeNum(),cd.getFeeNum(),new java.sql.Date(new java.util.Date().getTime()),cd.getFlag()};
		BaseDao.executeUpdate(sb.toString(), params);
	}
	
	//查询整个班级学生
	public List<User> getClassUser(User user){
		String sql="select jobNum from user_userInfo where gradeName=? and academyName=? and majorName=? and className=? and isDel=0";
		Object[] params=new Object[]{user.getGradeName(),user.getAcademyName(),user.getMajorName(),user.getClassName()};
		Class<?> clazz=null;
		try {
			clazz=Class.forName("com.tuition.model.User");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (List<User>) BaseDao.find(sql, params, clazz);
	}
	//查询整个专业学生
	public List<User> getMajorUser(User user){
		String sql="select jobNum from user_userInfo where gradeName=? and academyName=? and majorName=? and isDel=0 ";
		Object[] params=new Object[]{user.getGradeName(),user.getAcademyName(),user.getMajorName()};
		Class<?> clazz=null;
		try {
			clazz=Class.forName("com.tuition.model.User");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (List<User>) BaseDao.find(sql, params, clazz);
	}
	//查询整个学院学生
		public List<User> getAcademyUser(User user){
			String sql="select jobNum from user_userInfo where gradeName=? and academyName=?  and isDel=0";
			Object[] params=new Object[]{user.getGradeName(),user.getAcademyName()};
			Class<?> clazz=null;
			try {
				clazz=Class.forName("com.tuition.model.User");
			} catch (Exception e) {
				e.printStackTrace();
			}
			return (List<User>) BaseDao.find(sql, params, clazz);
		}
		//查询整个年级学生
				public List<User> getGradeUser(User user){
					String sql="select jobNum from user_userInfo where gradeName=?  and isDel=0";
					Object[] params=new Object[]{user.getGradeName()};
					Class<?> clazz=null;
					try {
						clazz=Class.forName("com.tuition.model.User");
					} catch (Exception e) {
						e.printStackTrace();
					}
					return (List<User>) BaseDao.find(sql, params, clazz);
				}
				
				//按照条件查询学生缴费情况
				public List<CostItem> getCostList(List<Condition> conditionList){
					StringBuilder sb=new StringBuilder();
					sb.append("select t1.gradeName,t3.academyName,t4.majorName,t1.className,t1.userName,t2.stuNum,t2.id,t2.payDur,t2.feeName,t2.shouldFee,t2.alreadyFee,t2.reduceFee,t2.returnFee,t2.oweFee,t2.payTime,t2.createTime ");
					sb.append(" from user_userinfo t1,cost_detail t2,home_academy t3,home_major t4 ");
					sb.append(" where t1.isDel=0  and t1.academyName=t3.id and t1.majorName=t4.id and t1.jobNum=t2.stuNum ");
					//参数
					List<Object> paramsList=new ArrayList<Object>();
					for(Condition condition:conditionList){
						if(condition.getConName().equals("academyName")){
							sb.append(" and stuNum in(select jobNum from user_userinfo where academyName=?) ");
							paramsList.add(condition.getConValue());
						}else if(condition.getConName().equals("oweFee")){
							sb.append(" and oweFee!=0 ");
						}else if(condition.getConName().equals("payDur")){
							sb.append(" and payDur=? ");
							paramsList.add(condition.getConValue());
						}else if(condition.getConName().equals("feeName")){
							sb.append(" and feeName=? ");
							paramsList.add(condition.getConValue());
						}else if(condition.getConName().equals("stuNum")){
							sb.append(" and stuNum=?");
							paramsList.add(condition.getConValue());
						}
					}
					Object[] params=paramsList.toArray();
					Class<?> clazz=null;
					try {
						clazz=Class.forName("com.tuition.model.CostItem");
					} catch (Exception e) {
						e.printStackTrace();
					}
					
					
					return (List<CostItem>) BaseDao.find(sb.toString(), params, clazz);
				}
		
		//增加操作
		public int addPlay(String jobNum,String content,java.sql.Date date){
			System.out.println("------------------"+jobNum+content+date);
			String sql="insert into admin_add(jobNum,content,createTime) values(?,?,?)";
			Object[] params=new Object[]{jobNum,content,date};
			return BaseDao.executeUpdate(sql, params);
		}
		//修改
		public int edit(String jobNum,int id,String reduceFee,java.sql.Date date){
			String sql="update cost_detail set reduceFee=? where id=?";
			String sql2="insert into admin_edit(adminNum,costId,feeNum,createTime) values(?,?,?,?)";
			//System.out.println(sql);
			Object[] params=new Object[]{reduceFee,id};
			Object[] params2=new Object[]{jobNum,id,reduceFee,date};
			BaseDao.executeUpdate(sql2, params2);
			return BaseDao.executeUpdate(sql, params);
		}
		//删除
		public int delete(String jobNum,String stuNum,java.sql.Date date){
			String sql="update user_userInfo set isDel=1 where jobNum=?";
			String sql2="insert into admin_delete(adminNum,stuNum,createTime) values(?,?,?)";
			Object[] params=new Object[]{stuNum};
			Object[] params2=new Object[]{jobNum,stuNum,date};
			BaseDao.executeUpdate(sql2, params2);
			return BaseDao.executeUpdate(sql, params);
		}
		
		//统计
		public List<CostItem> statistics(Condition condition){
			//查询语句
			StringBuilder sb=new StringBuilder();
			sb.append("select t1.gradeName,t3.academyName,t4.majorName,t1.className,t1.userName,t2.stuNum,t2.id,t2.payDur,t2.feeName,t2.shouldFee,t2.alreadyFee,t2.reduceFee,t2.returnFee,t2.oweFee,t2.payTime,t2.createTime ");
			sb.append("from user_userinfo t1,cost_detail t2,home_academy t3,home_major t4");
			sb.append(" where t1.isDel=0  and t1.academyName=t3.id and t1.majorName=t4.id and t1.jobNum=t2.stuNum ");
			//参数
			Object[] params=null;
			if(condition.getConName().equals("gradeName")){
				sb.append(" and  t1.gradeName=?");
				params=new Object[]{condition.getConValue()};
			}else if(condition.getConName().equals("academyName")){
				sb.append(" and  t1.academyName=?");
				params=new Object[]{condition.getConValue()};
			}else if(condition.equals("feeName")){
				sb.append(" and  t2.feeName=?");
				params=new Object[]{condition.getConValue()};
			}else{
				params=new Object[]{};
			}
			//查询结果
			Class<?> clazz=null;
			try {
				clazz=Class.forName("com.tuition.model.CostItem");
			} catch (Exception e) {
				e.printStackTrace();
			}
			return (List<CostItem>) BaseDao.find(sb.toString(), params, clazz);
			
		}
}
