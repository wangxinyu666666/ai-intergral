/*
 * @Description: 范式乐园
 * @Autor: Wangxinyu
 * @Date: 2021-10-19 16:08:40
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 23:11:28
 */
import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import { connect, useDispatch } from 'react-redux'
import { ParadiseActions } from './models'
import Article from '@/assets/images/article.png'

import './index.less'

const tabList = [{ title: '范式新闻' }, { title: '线上活动' }, { title: '线下活动' }]
 
const Paradise = (props) => {
	const dispatch = useDispatch();
	const { current, bannerData } = props.paradise;

	useEffect(() => {
		dispatch({
			type: ParadiseActions.getBanner
		})
	}, [])

	const handleClick = (index: number) => {
		dispatch({
			type: ParadiseActions.update,
			payload: { current: index }
		})
	}

	const toDetail = () => {
		Taro.redirectTo({
			url: '/pages/paradise/detail?url=https://mp.weixin.qq.com/s/l6JTfdWVBLxmXBkIwu-VNQ'
		})
	}

	return (
		<View className="paradise-page">
			<View className="paradise-header">
				<Image className="paradise-header-image" src={bannerData.length ? bannerData[0].image : ''} />
			</View>
			<AtTabs current={current} tabList={tabList} onClick={handleClick}>
				<AtTabsPane current={current} index={0}>
					<Image className="article-image" src={Article} onClick={toDetail} />
					{/* <View className="paradise-activity-wrap">
						<View className="activity-main">
							<View className="activity-title">最后7小时，全员送豪礼</View>
							<View className="activity-time">活动截止：9月18日 18:00</View>
						</View>
						<View className="activity-footer">
							赚3积分，约1分钟读完
							<AtButton className='read-btn' type='primary' size='small' circle onClick={toDetail}>去阅读</AtButton>
						</View>
					</View> */}
				</AtTabsPane>
			</AtTabs>
		</View>
	)
}

 export default connect(
	 ({
	 paradise,
	 loading
	 }: {
		paradise: any,
		loading: any
		})=>({
	 paradise,
	 loading
 }))(Paradise)
 