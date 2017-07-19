package com.tuition.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.RespectBinding;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tuition.model.Condition;
import com.tuition.model.CostDetail;
import com.tuition.model.CostItem;
import com.tuition.model.StatisticsItem;
import com.tuition.model.User;
import com.tuition.service.AdminService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	AdminService adminService=new AdminService();
	
	//添加缴费信息
	@RequestMapping("/add")
	public void add(HttpServletRequest request,HttpServletResponse response){
		Gson gson=new Gson();
		User user2=(User)request.getSession().getAttribute("currentUser");
		String objStr=request.getParameter("objStr");//缴费对象
		String feeStr=request.getParameter("feeStr");//费用详情
		String payDur=request.getParameter("payDur");//应缴日期
		String admin=user2.getJobNum();//管理员
		
		User user=gson.fromJson(objStr, User.class);
		List<CostDetail> feeList = gson.fromJson(feeStr,new TypeToken<List<CostDetail>>() {}.getType());
		
		try {
			int result=adminService.addCost(user, feeList,admin,payDur);
			responseJson(response,result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//按条件查询
	@RequestMapping("/costList")
	public void costList(HttpServletRequest request,HttpServletResponse response){
		Gson gson=new Gson();
		
		//查询条件
		String conditionStr=request.getParameter("conditionStr");
		List<Condition> conditionList=gson.fromJson(conditionStr,new TypeToken<List<Condition>>() {}.getType() );
		List<CostItem> costList=adminService.getCostList(conditionList);
		
		//返回结果
		try {
			responseJson(response,costList);
		} catch (IOException e) {
			
			e.printStackTrace();
		}
	}
	
	//修改
	@RequestMapping("/edit")
	public void edit(HttpServletRequest request,HttpServletResponse response){
		//参数
		int id=Integer.parseInt(request.getParameter("id"));
		String reduceFee=request.getParameter("reduceFee");
		User user=(User)request.getSession().getAttribute("currentUser");
		java.sql.Date date=new java.sql.Date(new java.util.Date().getTime());
		//System.out.println(id+"----"+reduceFee);
		try {
			responseJson(response,adminService.edit(user.getJobNum(),id, reduceFee,date));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//统计
	@RequestMapping("/statistics")
	public void statistics(HttpServletRequest request,HttpServletResponse response){
		Gson gson=new Gson();
		//查询条件
		String conditionStr=request.getParameter("conditionStr");
		String flag=request.getParameter("flag");
		Condition condition=gson.fromJson(conditionStr,Condition.class);
		
		//查询结果
		List<StatisticsItem> returnList=adminService.statistics(condition,flag);
		try {
			responseJson(response,returnList);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//删除
	@RequestMapping("/delete")
	public void delete (HttpServletRequest request,HttpServletResponse response){
		String stuNum=request.getParameter("stuNum");
		User user=(User)request.getSession().getAttribute("currentUser");
		java.sql.Date date=new java.sql.Date(new java.util.Date().getTime());
		try {
			responseJson(response,adminService.delete(user.getJobNum(),stuNum,date));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//增加操作
	@RequestMapping("/addPlay")
	public void addPlay(HttpServletRequest request,HttpServletResponse response){
		String content=request.getParameter("content");
		System.out.println(content);
		User user=(User)request.getSession().getAttribute("currentUser");
		java.sql.Date date=new java.sql.Date(new java.util.Date().getTime());
		try {
			responseJson(response,adminService.addPlay(user.getJobNum(), content, date));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//输出json
			private void responseJson(HttpServletResponse response,Object result) throws IOException{
				response.setCharacterEncoding("UTF-8");
				Gson gson=new Gson();
				String resultJson=gson.toJson(result);
				PrintWriter out = response.getWriter();
				out.write(resultJson);
				out.close();
			}
}
