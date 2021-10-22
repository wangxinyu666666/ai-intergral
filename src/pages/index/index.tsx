/*
 * @Description: 首页
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:14:03
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 16:17:23
 */
import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import { connect, useDispatch } from 'react-redux'
import { AtAvatar, AtTabs, AtTabsPane, AtButton, AtTabBar } from 'taro-ui'
import { IndexActions } from './models'
import BottomBar from '@/components/BottomBar'
import Association from '@/assets/images/association.svg'
import Daily from '@/assets/images/daily.svg'
import Paradise from '@/assets/images/paradise.svg'
import Portrait from '@/assets/images/portrait.svg'
import Star from '@/assets/images/star.svg'
import Hollowstar from '@/assets/images/hollowstar.svg'
import Tianluo from '@/assets/images/tianluo.svg'
import Banner1 from '@/assets/images/banner1.jpeg'
import Banner2 from '@/assets/images/banner2.jpeg'
import Banner3 from '@/assets/images/banner3.jpeg'
import './index.less'

const tabList = [{ title: '田螺内购' }, { title: '外部商城' }]

const Index = (props) => {
	const dispatch = useDispatch();
	let [windowWidth, setWindowWidth] = useState(0);
	let [goodsHeight, setGoodsHeight] = useState(0);
	const { userName, userLevel, userIntergral, current, ifLogin, currentBottonBar, goodsData, pageSize, totalPages, pageIndex } = props.index;

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
		Taro.navigateTo({
			url: '/pages/association/index'
		})
	}
	const toActivityPage = () => {
		Taro.navigateTo({
			url: '/pages/activity/index'
		})
	}
	const toParadisePage = () => {
		Taro.navigateTo({
			url: '/pages/paradise/index'
		})
	}
	const toDailyPage = () => {
		Taro.navigateTo({
			url: '/pages/daily/index'
		})
	}

	const toOtherPage = (index) => {
		dispatch({
			type: IndexActions.update,
			payload: { currentBottonBar: index }
		})
		switch (index) {
			case 0:
				Taro.navigateTo({
					url: '/pages/activity/index'
				})
				break
			case 1:
				// Taro.navigateTo({
				// 	url: '/pages/activity/index'
				// })
				break
			case 2:
				break
		}
	}

	const login = () => {
		console.log('login')
		Taro.getUserProfile({
			desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				console.log(7, res)
				Taro.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
				dispatch({
					type: IndexActions.update,
					payload: { ifLogin: true }
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
					<View className="index-basic-info" style={{backgroundImage: Portrait}}>
						{/* <Image className="portrait-circle" src={Portrait} /> */}
						<View className="portrait-circle" style={{backgroundImage: `url(${Portrait})`}}>
							<AtAvatar className="portrait" circle image={Taro.getStorageSync('avatarUrl') || ''}/>
						</View>
						<View className="index-basic-text">
							<Text className="index-username common_display_block">{userName || ''}</Text>
							<View className="index-userlevel">{getStars()}</View>
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
						indicatorActiveColor={'#fff'}
						circular
						indicatorDots
						autoplay
					>
						<SwiperItem className="swiper-item">
							<Image className="banner-image" src={Banner1} />
						</SwiperItem>
						<SwiperItem className="swiper-item">
							<Image className="banner-image" src={Banner2} />
						</SwiperItem>
						<SwiperItem className="swiper-item">
							<Image className="banner-image" src={Banner3} />
						</SwiperItem>
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
										goodsData.map((goods) => (
											<View
												className="shop-goods-item"
												id="shop_goods_item"
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
										pageIndex === totalPages - 1 ? <View className="shop-bottom-wrap">已经到底了</View> : null
									}
								</View>
								</ScrollView>
							</View>
						</AtTabsPane>
						<AtTabsPane current={current} index={1} >
							<View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页er的内容</View>
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
 