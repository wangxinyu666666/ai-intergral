/*
 * @Description: 我的活动
 * @Autor: Wangxinyu
 * @Date: 2021-10-18 17:01:51
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 16:22:02
 */
import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, WebView } from '@tarojs/components'
import { connect, useDispatch } from 'react-redux'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'
import { ActivityActions } from './models'
import { QRCode } from 'taro-code'
import BottomBar from '@/components/BottomBar'

import './index.less';

const tabList = [{ title: '全部' }, { title: '已报名' }, { title: '已参加' }, { title: '已结束' }]
 
const Activity = (props) =>{
	const dispatch = useDispatch();
	const { current, ifShowCode } = props.activity;

	const handleClick = (index: number) => {
		dispatch({
			type: ActivityActions.update,
			payload: { current: index, ifShowCode: false }
		})
	}

	const showCode = () => {
		dispatch({
			type: ActivityActions.update,
			payload: { ifShowCode: true }
		})
	}

	const handleClose = () => {
		dispatch({
			type: ActivityActions.update,
			payload: { ifShowCode: false }
		})
	}

	const toDetail = () => {
		Taro.navigateTo({
			url: '/pages/activity/detail?url=https://www.jianshu.com/p/e768cc7a871d'
		})
	}

	return (
		<View className="activity-page">
			<BottomBar />
			<AtTabs current={current} tabList={tabList} onClick={handleClick}>
				<AtTabsPane current={current} index={0} >
					<View className="activity-item" onClick={toDetail}>
						<View className="activity-header">
							<Text>活动名称</Text>
							<Text>已参加</Text>
							<Text>预计可获得30积分</Text>
						</View>
						<View className="activity-introduction">活动简介：xxxxxxx</View>
						<View className="activity-time">活动时间：xxxxxxx</View>
						<View className="activity-location">活动地址：xxxxxxx</View>
						<View className="activity-count">已参加人数：xxxxxxx</View>
						<View className="activity-code" onClick={showCode}>活动二维码</View>
					</View>
				</AtTabsPane>
			</AtTabs>
			<AtFloatLayout className='qr-code-modal' isOpened={ifShowCode} onClose={handleClose}>
				<View className="qr-code-wrap">
					<QRCode
						text='world'
						size={100}
						scale={4}
						errorCorrectLevel='M'
						typeNumber={2}
					/>
				</View>
			</AtFloatLayout>
		</View>
	)
 }

export default connect(
	({
		activity,
		loading
	}: {
		activity: any,
		loading: any
	})=>({
		activity,
		loading
}))(Activity)
 