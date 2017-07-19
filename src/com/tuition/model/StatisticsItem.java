package com.tuition.model;

import java.util.ArrayList;
import java.util.List;

public class StatisticsItem {
	private String name;
	private List<CostItem> ower=null;
	private List<CostItem> unOwer=null;
	
	public StatisticsItem(String name) {
		this.name = name;
		ower=new ArrayList<CostItem>();
		unOwer=new ArrayList<CostItem>();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public List<CostItem> getOwer() {
		return ower;
	}
	public void setOwer(List<CostItem> ower) {
		this.ower = ower;
	}
	public List<CostItem> getUnOwer() {
		return unOwer;
	}
	public void setUnOwer(List<CostItem> unOwer) {
		this.unOwer = unOwer;
	}
	
	
	@Override
	public String toString() {
		return "StatisticsItem [name=" + name + ", ower=" + ower + ", unOwer="
				+ unOwer + "]";
	}
	
}
