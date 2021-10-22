/*
 * @Description: 活动详情页
 * @Autor: Wangxinyu
 * @Date: 2021-10-19 16:42:49
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-19 17:56:43
 */

import React from 'react';
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { View, Text, WebView, ScrollView } from '@tarojs/components'

const Detail = () => {
	const url = getCurrentInstance().router?.params.url

	const getIntergral = () => {
		Taro.showToast({title: '+3积分'})
	}

	return (
		<View>
			<ScrollView
				className="paradise-activity-detail-page"
				scrollY
				style={{height: '100%'}}
				onScrollToUpper={getIntergral}
			>
				<WebView src={url || ''} onLoad={getIntergral}/>
			</ScrollView>
		</View>
	)
}

export default (Detail);