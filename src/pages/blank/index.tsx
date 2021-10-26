/*
 * @Description: 空白异常页
 * @Autor: Wangxinyu
 * @Date: 2021-10-22 20:34:09
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 20:54:17
 */
import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import BottomBar from '@/components/BottomBar';
import BlankIcon from '@/assets/images/blank.png'

import './index.less'

const Blank = () => {
	const showBottomBar = Taro.getCurrentInstance().router?.params.showBottomBar
	return (
		<View className={`blank-page ${showBottomBar && 'showBottomBar'}`}>
			<Image className="blank-image" src={BlankIcon} />
			{
				showBottomBar ? <BottomBar /> : null
			}
		</View>
	)
}

export default Blank