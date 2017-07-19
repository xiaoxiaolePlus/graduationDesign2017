package com.tuition.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.ws.RespectBinding;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.tuition.model.User;
import com.tuition.service.UserService;
import com.tuition.util.MD5Util;
import com.tuition.util.MailUtil;

@Controller
@RequestMapping("/user")
public class UserController {

	UserService userService=new UserService();
	
	//登录
	@RequestMapping("/login")
	public void login(HttpServletRequest request,HttpServletResponse response){
		String password=request.getParameter("password");
		User user=new User();
		user.setJobNum(request.getParameter("jobNum"));
		user.setFlag(Integer.parseInt(request.getParameter("flag")));
			try {
				user.setPassword(MD5Util.getMD5(password));
				List<User> userList=userService.login(user);
				if(userList.size()==1){
					HttpSession session=request.getSession();
					session.setAttribute("currentUser", userList.get(0));
					addLog(userList.get(0).getJobNum(),userList.get(0).getFlag());
					//System.out.println(userList.get(0));
					responseJson(response,userList.get(0));
				}else{
					responseJson(response,"0");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		
	}
	
	
	//检查用户是否存在
	@RequestMapping("/isExistUser")
	public void isExistUser(HttpServletRequest request,HttpServletResponse response){
		User user=new User();
		user.setFlag(Integer.parseInt(request.getParameter("flag")));
		user.setEmail(request.getParameter("email"));
		List<User> userList=userService.isExistUser(user);
		try {
			if(userList.size()==1){
				responseJson(response,userList.get(0));
			}else{
				responseJson(response,0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	//忘记密码发送验证码
	@RequestMapping("/securityCode")
	public void securityCode(HttpServletRequest request,HttpServletResponse response){
		String receiveMail=request.getParameter("receiveMail");
		String userName=request.getParameter("userName");
		//生成随机验证码
		long random=Math.round(Math.random()*100000);
		HttpSession session=request.getSession();
		session.setAttribute("securityCode", random);
		//System.out.println("session-----"+(long)session.getAttribute("securityCode"));
		try {
			MailUtil.sendMail(random,receiveMail,userName);
			responseJson(response,random);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//修改密码
	@RequestMapping("/changePWD")
	public void changePWD(HttpServletRequest request,HttpServletResponse response){
		User user=new User();
		String originPWD=request.getParameter("originPWD");
		try {
			user.setPassword(MD5Util.getMD5(request.getParameter("currentPWD")));
			//如果原密码为空，直接修改密码
			if(originPWD==null){
				user.setId(Integer.parseInt(request.getParameter("id")));
				user.setFlag(Integer.parseInt(request.getParameter("flag")));
				int result=userService.changePWD(user);
				responseJson(response,result);
			}else{
				User user2=(User)request.getSession().getAttribute("currentUser");
				user.setId(user2.getId());
				user.setFlag(user2.getFlag());
				if(!MD5Util.getMD5(originPWD).equals(user2.getPassword())){
					responseJson(response,0);
				}else{
					responseJson(response,userService.changePWD(user));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	//获取用户信息
	@RequestMapping("/userInfo")
	public void userInfo(HttpServletRequest request,HttpServletResponse response){
		HttpSession session=request.getSession();
		User user= (User) session.getAttribute("currentUser");
		try {
			responseJson(response,user);
		} catch (IOException e) {
		
			e.printStackTrace();
		}
		
		
	}
	
	
	//退出
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request){
		HttpSession session=request.getSession();
		//清除session
		if(session.getAttribute("currentUser")!=null){
			session.removeAttribute("currentUser");
		}		
		return "redirect:/login.html";
	}
	
	//添加登陆日志
	public void addLog(String jobNum,int flag){
		InetAddress netAddress=null;
		try {
			netAddress = InetAddress.getLocalHost();
		} catch (UnknownHostException e) {
		
			e.printStackTrace();
		}
		String ip=netAddress.getHostAddress();
		java.sql.Date date=new java.sql.Date(new java.util.Date().getTime());
		userService.addLog(jobNum,ip,date,flag);
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
