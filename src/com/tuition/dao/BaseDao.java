package com.tuition.dao;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/*
 *JDBC通用dao 
 * 1.获取连接
 * 2.通用的增删改查方法
 * 3.释放连接
 * @author	ZhangXiaoLe
* */
public class BaseDao {
	//mysql连接参数
	private static final String URL="jdbc:mysql://localhost:3306/db_collegeTuitionManageSys";
	private static final String DRIVER="com.mysql.jdbc.Driver";
	private static final String USER="root";
	private static final String PASSWORD="root";
	
	//获取连接对象
	public static Connection getConn(){
		Connection conn=null;
		try {
			Class.forName(DRIVER);
			conn=DriverManager.getConnection(URL, USER, PASSWORD);
		} 
		catch(ClassNotFoundException e){
			e.printStackTrace();
		}
		catch (SQLException se) {
			se.printStackTrace();
		}
		
		return conn;
	}
	
	//关闭连接对象
	public static void closeAll(Connection conn,Statement stmt,ResultSet rs){
		try {
			if(rs!=null){
				rs.close();
			}
			if(stmt!=null){
				stmt.close();
			}
			if(conn!=null){
				conn.close();
			}
		} catch (SQLException se) {
			se.printStackTrace();
		}
	}
	
	//关闭连接对象
	public static void closeAll(Connection conn,Statement stmt){
		try {
			if(stmt!=null){
				stmt.close();
			}
			if(conn!=null){
				conn.close();
			}
		} catch (SQLException se) {
			se.printStackTrace();
		}
	}
	
	/*
	 * 通用的增删改方法
	 * return 受影响的行数
	 * */
	public static int executeUpdate(String sql,Object[] params){
		//得到连接对象
		Connection conn=null;
		PreparedStatement stmt=null;
		
		//受影响的行数
		int rows=0;
		try {
			conn=getConn();
			stmt=conn.prepareStatement(sql);
			if(stmt!=null){
				for(int i=0;i<params.length;i++){
					stmt.setObject(i+1, params[i]);
				}
				
			}
			System.out.println(params.toString());
			rows=stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			closeAll(conn,stmt);
		}
		return rows;
	}
	
	/*
	 * 通用的查询方法，封装成List<T>
	 * return 查询的结果
	 * */
	public static <T> List<T> find(String sql,Object[] params,Class<T> clazz){
		//得到连接对象
		Connection conn=null;
		PreparedStatement stmt=null;
		ResultSet rs=null;
		
		//创建集合
		List<T> list=new ArrayList<T>();
		try {
			conn=getConn();
			stmt=conn.prepareStatement(sql);
			//System.out.println(stmt);
			if(stmt!=null){
				for(int i=0;i<params.length;i++){
					stmt.setObject(i+1, params[i]);
				}
			}
			//得到结果集
			//System.out.println(stmt);
			rs=stmt.executeQuery();
			ResultSetMetaData rsmd=rs.getMetaData();
			//遍历结果集
			while(rs.next()){
				T obj=clazz.newInstance();
				
				//得到结果集的列数
				for(int i=0;i<rsmd.getColumnCount();i++){
					//得到列名
					String colName=rsmd.getColumnName(i+1);
					//System.out.println(colName);
					//列序号从1开始，得到每一列的值
					Object value=rs.getObject(colName);
					//把名字和值负值赋值到对象中
					Field field=clazz.getDeclaredField(colName);
					field.setAccessible(true);
					field.set(obj, value);
				}
				//添加到集合中
				list.add(obj);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			closeAll(conn,stmt,rs);
		}
		return list;
		
	}
}
