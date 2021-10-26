/*
 * @Description: 首页
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:14:03
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-23 11:32:28
 */
import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import { connect, useDispatch } from 'react-redux'
import { AtAvatar, AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import { IndexActions } from './models'
import BottomBar from '@/components/BottomBar'
import Association from '@/assets/images/association.png'
import Daily from '@/assets/images/daily.png'
import Paradise from '@/assets/images/paradise.svg'
import Portrait from '@/assets/images/portrait.svg'
import Star from '@/assets/images/star.svg'
import Hollowstar from '@/assets/images/hollowstar.svg'
import Tianluo from '@/assets/images/tianluo.svg'
import GreenTianluo from '@/assets/images/green-tianluo.png'
import './index.less'

const tabList = [{ title: '田螺内购' }, { title: '外部商城' }]

const Index = (props) => {
	const dispatch = useDispatch();
	let [windowWidth, setWindowWidth] = useState(0);
	let [goodsHeight, setGoodsHeight] = useState(0);
	const { userName, userLevel, userIntergral, current, ifLogin, avatarUrl, goodsData, pageSize, totalPages, pageIndex, homeBannerData } = props.index;

	useEffect(() => {
		Taro.getSystemInfo({
			success: res => {
				setWindowWidth(res.windowWidth)
			}
		})
		dispatch({
			type: IndexActions.getAllMall,
			payload: {
				pageIndex: 0,
				pageSize: 4
			}
		})
		dispatch({
			type: IndexActions.getHomeBanner,
		})
		dispatch({
			type: IndexActions.update,
			payload: { currentBottonBar: 0 }
		})
		// if(userName && avatarUrl) {
		// 	dispatch({
		// 		type: IndexActions.getUserInfo,
		// 		payload: {
		// 			image: avatarUrl,
		// 			name: userName,
		// 		}
		// 	})
		// }
	}, [])

	useEffect(() => {
		const imageWidth = parseFloat(((windowWidth - 32) / 2).toFixed(1)) // 每个商品的图片的宽高
		const goodsHeight = imageWidth + 136 // 得到每个商品占的高度
		setGoodsHeight(goodsHeight)
	}, [windowWidth])

	const handleClick = (index: number) => {
		dispatch({
			type: IndexActions.update,
			payload: { current: index }
		})
	}
	const fetchGoodsData = () => {
		if (pageIndex === totalPages - 1) return
		dispatch({
			type: IndexActions.getAllMall,
			payload: {
				pageIndex: pageIndex + 1,
				pageSize: 4
			}
		})
	}
	const toAssociationPage = () => {
		Taro.redirectTo({
			url: '/pages/association/index'
		})
	}
	const toActivityPage = () => {
		Taro.redirectTo({
			url: '/pages/activity/index'
		})
	}
	const toParadisePage = () => {
		Taro.redirectTo({
			url: '/pages/paradise/index'
		})
	}
	const toDailyPage = () => {
		Taro.redirectTo({
			url: '/pages/daily/index'
		})
	}
	const toLevelPage = () => {
		Taro.redirectTo({
			url: '/pages/level/index'
		})
	}

	const login = () => {
		Taro.getUserProfile({
			desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				Taro.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
				Taro.setStorageSync('userName', res.userInfo.nickName)
				dispatch({
					type: IndexActions.update,
					payload: {
						ifLogin: true,
						avatarUrl: res.userInfo.avatarUrl,
						userName: res.userInfo.nickName,
					}
				})
				dispatch({
					type: IndexActions.getUserInfo,
					payload: {
						image: res.userInfo.avatarUrl,
						name: 'hiahiaa',
					}
				})
			}
		})
	}

	const toDetail = () => {

	}
	
	const getStars = () => {
		let starCount = userLevel % 5;
		let result: JSX.Element[] = [];
		for (let i = 0; i < 5; i++) {
			if(i < starCount) {
				result.push(
					<Image className="star" src={Star} />
				)
			}
			else {
				result.push(
					<Image className="star" src={Hollowstar} />
				)
			}
		}
		return result;
	}
	if(Taro.getStorageSync('avatarUrl') || ifLogin ) {
		return (
			<View className="index-page">
				<View className="index-header-wrap">
					<View className="index-basic-info">
						{/* <Image className="portrait-circle" src={Portrait} /> */}
						<View onClick={toLevelPage}>
							<View className="portrait-circle" style={{backgroundImage: `url(${Portrait})`}}>
								<AtAvatar className="portrait" circle image={Taro.getStorageSync('avatarUrl') || ''}/>
							</View>
							<View className="index-basic-text">
								<Text className="index-username common_display_block">{userName || 'hiahia'}</Text>
								<View className="index-userlevel">{getStars()}</View>
							</View>
						</View>
						<AtButton className='see-intergral-btn' type='primary' size='small' circle onClick={toDetail}>
							<Image className="tianluo-icon" src={Tianluo}/>
							<Text className="see-intergral-text">
							查看积分</Text></AtButton>
					</View>
				</View>
				<BottomBar />
				{/* <AtTabBar
					className="index-bar-fixed"
					fixed
					tabList={[
						{ title: '我的活动', image: Activity},
						{ title: '购物车', image: Shop },
						{ title: '个人中心', image: Homepage }
					]}
					onClick={toOtherPage}
					current={currentBottonBar}
				/> */}
				{/* <View className="personal-wrap common_display_flex">
					<View className="personal-item" onClick={toActivityPage}>
						<Text>我的活动</Text>
					</View>
					<View className="personal-item">
						<Text>购物车</Text>
					</View>
					<View className="personal-item">
						<Text>个人中心</Text>
					</View>
				</View> */}
				<View className="main-function-wrap common_display_flex">
					<View className="function-item" onClick={toAssociationPage}>
						<Image className="function-item-image" src={Association} />
						<Text className="function-title common_display_block">范式社团</Text>
						<Text className="fuction-info common_display_block">社团活动，邀你加入</Text>
					</View>
					<View className="function-item" onClick={toDailyPage}>
						<Image className="function-item-image" src={Daily} />
						<Text className="function-title common_display_block">每日签到</Text>
						<Text className="fuction-info common_display_block">阅读推文，获取积分</Text>
					</View>
					<View className="function-item" onClick={toParadisePage}>
						<Image className="function-item-image" src={Paradise} />
						<Text className="function-title common_display_block">范式乐园</Text>
						<Text className="fuction-info common_display_block">热门活动，速来参加</Text>
					</View>
				</View>
				<View className="banner-wrap">
					<Swiper
						className="index-banner-swiper"
						indicatorActiveColor={'#fff'}
						circular
						autoplay
					>
						{
							homeBannerData.map((banner, index) => (
								<SwiperItem className="swiper-item" key={index}>
									<Image className="banner-image" src={banner.image} />
								</SwiperItem>
							))
						}
						{/* <SwiperItem className="swiper-item">
							<Image className="banner-image" src={Banner1} />
						</SwiperItem> */}
						{/* <SwiperItem className="swiper-item">
							<Image className="banner-image" src={Banner2} />
						</SwiperItem>
						<SwiperItem className="swiper-item">
							<Image className="banner-image" src={Banner3} />
						</SwiperItem> */}
					</Swiper>
				</View>
				<View className="index-shop-wrap">
					<AtTabs current={current} tabList={tabList} onClick={handleClick}>
						<AtTabsPane current={current} index={0} >
							<View className="shop-goods-wrap">
							<ScrollView
								className='scrollview'
								scrollY
								//refresherEnabled
								lowerThreshold={140}
								style={{height: `${goodsHeight * 2}px`, marginBottom: pageIndex === totalPages - 1 ? '160rpx' : 0}}
								onScrollToLower={fetchGoodsData}
							>
								<View className="scroll-view-wrap">
									{
										goodsData.map((goods, index) => (
											<View
												className="shop-goods-item"
												key={index}
											>
												<View className="image-wrap">
												<Image
													src={goods.image}
													className="shop-goods-item-cover"
												/>
												</View>
												<View className="shop-goods-item-main">
													<Text className="shop-goods-item-title common_ellipsis">
														{goods.name}
													</Text>
												</View>
												<View className="shop-goods-item-footer">
													<Text className="shop-goods-item-price">
														{goods.price}积分
													</Text>
													<Text className="shop-goods-item-num">
														{goods.numbers}人已购买
													</Text>
												</View>
											</View>
										))
									}
									{
										pageIndex === totalPages - 1 ? <View className="shop-bottom-wrap"><Image className="shop-bottom-image" src={GreenTianluo}/>没有更多了呦</View> : null
									}
								</View>
								</ScrollView>
							</View>
						</AtTabsPane>
						<AtTabsPane current={current} index={1} >
							<View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >暂未接入～</View>
						</AtTabsPane>
					</AtTabs>
				</View>
			</View>
		)
	}
	else return <AtButton className='read-btn' type='primary' size='small' circle onClick={login}>微信登录</AtButton>
}
export default connect(
	({
		index,
		loading
	}: {
		index: any,
		loading: any
	})=>({
		index,
		loading
}))(Index)
 