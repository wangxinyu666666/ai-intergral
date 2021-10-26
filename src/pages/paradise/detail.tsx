/*
 * @Description: 活动详情页
 * @Autor: Wangxinyu
 * @Date: 2021-10-19 16:42:49
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-23 00:10:41
 */

import React from 'react';
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { View, Text, WebView, ScrollView } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { IndexActions } from '@/pages/index/models'


const Detail = () => {
	const dispatch = useDispatch();
	const url = getCurrentInstance().router?.params.url

	const getIntergral = () => {
		dispatch({
			type: IndexActions.updateIntergral,
			payload: {
				id: Taro.getStorageSync('userId'),
				integral: 3
			}
		})
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