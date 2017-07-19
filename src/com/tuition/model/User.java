package com.tuition.model;

public class User {
	private int id;//id
	private String jobNum;//学号/工号
	private String userName;//用户名
	private String password;//密码
	private String apartment;//部门
	private String gradeName;//年级
	private String	academyName;//学院
	private String majorName;//专业
	private String className;//班级
	
	private String	email;//邮箱
	private String phoneNum;//手机号
	private int flag;
	
	
	
	public String getMajorName() {
		return majorName;
	}
	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getJobNum() {
		return jobNum;
	}
	public void setJobNum(String jobNum) {
		this.jobNum = jobNum;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public String getApartment() {
		return apartment;
	}
	public void setApartment(String apartment) {
		this.apartment = apartment;
	}
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	public String getAcademyName() {
		return academyName;
	}
	public void setAcademyName(String academyName) {
		this.academyName = academyName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", jobNum=" + jobNum + ", userName="
				+ userName + ", password=" + password + ", apartment="
				+ apartment + ", gradeName=" + gradeName + ", academyName="
				+ academyName + ", majorName=" + majorName + ", className="
				+ className + ", email=" + email + ", phoneNum=" + phoneNum
				+ ", flag=" + flag + "]";
	}
	
	

	
	
	
}
