/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:04:00
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-16 21:26:07
 */
import React from 'react';
 import { View,Text } from '@tarojs/components';
 import { connect, useDispatch } from 'react-redux'
 import './index.less';
 
 const Homepage = () =>{
	 return (
			<View className="homePage-page">
			  <Text>正如你所见这是你的homePage页面</Text>
			</View>
			)
 }

 export default (Homepage)
 