package com.tuition.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.tuition.model.Condition;
import com.tuition.model.CostItem;
import com.tuition.model.User;
import com.tuition.service.StudentService;

@Controller
@RequestMapping("/student")
public class StudentController {
	StudentService studentService=new StudentService();

	//学生缴费明细
	@RequestMapping("/costList")
	public void costList(HttpServletRequest request,HttpServletResponse response){
		Gson gson=new Gson();
		//System.out.println("这是学生的查询");
		//要查询的用户
		User currentUser=(User)request.getSession().getAttribute("currentUser");
		//User currentUser=new User();
		currentUser.setJobNum(currentUser.getJobNum());
		currentUser.setFlag(1);
		
		//查询条件
		String conditionStr=request.getParameter("conditionStr");
		Condition condition=gson.fromJson(conditionStr,Condition.class );
		
		//接受查询结果
		List<CostItem> costItemList = null;
		
		//查询结果
		if(currentUser.getFlag()==1){
			costItemList=studentService.getCostList(currentUser,condition);
		}
		try {
			responseJson(response,costItemList);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//缴费
	@RequestMapping("/pay")
	public void pay(HttpServletRequest request,HttpServletResponse response){
		//缴费信息
		User user=(User)request.getSession().getAttribute("currentUser");
		CostItem costItem=new CostItem();
		costItem.setAlreadyFee(request.getParameter("payNum"));//金额
		costItem.setFeeName(request.getParameter("feeName"));//费用名称
		costItem.setPayDur(request.getParameter("payDur"));//哪一学年
		costItem.setStuNum(user.getJobNum());//学生学号
		
		try {
			responseJson(response,studentService.pay(costItem));
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
