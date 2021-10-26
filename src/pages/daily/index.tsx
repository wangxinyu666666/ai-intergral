/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-20 20:30:26
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-23 00:08:26
 */
import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect, useDispatch, useSelector } from 'react-redux'
import { AtSteps, AtButton } from 'taro-ui'
import { IndexActions } from '@/pages/index/models'
import Background from '@/assets/images/daily-background.png'
import Coin from '@/assets/images/coin.png'
import Check from '@/assets/images/check.png'
import Article from '@/assets/images/article.png'

import './index.less';

const items = [
	{
		title: '1积分',
		desc: '今天',
	},
	{
		title: '2积分',
		desc: '第2天'
	},
	{
		title: '3积分',
		desc: '第3天',
	},
	{
		title: '4积分',
		desc: '第4天',
	},
	{
		title: '5积分',
		desc: '第5天'
	},
	{
		title: '6积分',
		desc: '第6天',
	},
	{
		title: '7积分',
		desc: '第7天',
	}
]

const Daily = (props) =>{
	const dispatch = useDispatch();
	const { userIntergral } = useSelector((state: any) => state.index);

	const { current } = props.daily;

	const onChange = () => {};

	const toDetail = () => {
		Taro.navigateTo({
			url: '/pages/paradise/detail?url=https://mp.weixin.qq.com/s/l6JTfdWVBLxmXBkIwu-VNQ'
		})
	}

	return (
		<View className="daily-page" style={{backgroundImage: `url(${Background})`}}>
			<View className="intergral-wrap">
				<Image className="coin" src={Coin} />
				<Text className="intergral">{userIntergral}</Text>积分
			</View>
			<View className="check-wrap" onClick={() => Taro.showToast({title: '暂未开放每日签到功能～', icon: 'none'})}>
				<Image className="check-image" src={Check} />
				{/* <View className="check-text-main">连续签到
				<Text className="check-days">1</Text>天</View>
				<View className="check-progress-wrap">
					<AtSteps
						items={items}
						current={current}
						onChange={onChange}
					/>
				</View> */}
			</View>
			<View className="article">
				<View className="article-title">阅读推文赚取积分</View>
				<View className="article-time">2021年11月20日</View>
				<Image className="article-image" src={Article} onClick={toDetail} />
				{/* <View className="article-title">阅读推文赚取积分</View>
				<View className="paradise-activity-wrap">
					<View className="activity-main">
						<View className="activity-title">最后7小时，全员送豪礼</View>
						<View className="activity-time">活动截止：9月18日 18:00</View>
					</View>
					<View className="activity-footer">
						赚3积分，约1分钟读完
						<AtButton className='read-btn' type='primary' size='small' circle onClick={toDetail}>去阅读</AtButton>
					</View>
				</View> */}
			</View>
		</View>
	)
}

export default connect(
	({
		daily,
		loading
	}: {
		daily: any,
		loading: any
	})=>({
		daily,
		loading
}))(Daily)
