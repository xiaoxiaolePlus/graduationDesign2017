package com.tuition.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {

	public static String getMD5(String source) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		String result="";
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(source.getBytes());
			byte tmp[] = md.digest();// MD5 的计算结果是一个 128 位的长整数，
			for(int i=0;i<tmp.length;i++){
				int temp=tmp[i] & 0xff;
				String tempHex=Integer.toHexString(temp);
				if(tempHex.length()<2){
					result+="0"+tempHex;
				}else{
					result+=tempHex;
				}
			}  
	        
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			return result;
		}
	
}
	/*public static void main(String[] args) {
		try {
			System.out.println("21232f297a57a5a743894a0e4a801fc3".equals(MD5Util.getMD5("admin")));
		} catch (NoSuchAlgorithmException e) {
			
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
		
			e.printStackTrace();
		}
	}*/
}