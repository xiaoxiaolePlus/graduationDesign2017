package com.tuition.model;

public class Condition {
	private String conditionName;
	private String conditionValue;
	
	public String getConName() {
		return conditionName;
	}
	public void setConName(String conName) {
		this.conditionName = conName;
	}
	public String getConValue() {
		return conditionValue;
	}
	public void setConValue(String conValue) {
		this.conditionValue = conValue;
	}
	
	@Override
	public String toString() {
		return "Condition [conName=" + conditionName + ", conValue=" + conditionValue + "]";
	}
	
	
}
