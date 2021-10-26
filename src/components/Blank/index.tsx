/*
 * @Description: 空白异常页
 * @Autor: Wangxinyu
 * @Date: 2021-10-22 20:34:09
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 21:35:07
 */
import React, { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components'
import BlankIcon from '@/assets/images/blank.png'

import './index.less'

const Blank = () => {
	return (
		<View className={`blank-page`}>
			<Image className="blank-image" src={BlankIcon} />
		</View>
	)
}

export default Blank