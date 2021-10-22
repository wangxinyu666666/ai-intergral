/*
 * @Description: 活动详情
 * @Autor: Wangxinyu
 * @Date: 2021-10-18 20:03:59
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-19 16:43:17
 */
import React from 'react';
import { getCurrentInstance } from '@tarojs/taro'
import { View, Text, WebView } from '@tarojs/components'

const Detail = () => {
	const url = getCurrentInstance().router?.params.url

	return (
		<View className="activity-detail-page">
			<WebView src={url || ''} />
		</View>
	)
}

export default Detail;