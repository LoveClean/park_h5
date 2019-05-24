<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="banner.cover"></image>
			<view class="banner-title">{{ banner.title }}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{ banner.createBy }}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{ banner.createDate }}</text>
		</view>
		<!-- <view class="article-content"><rich-text :nodes="banner.content"></rich-text></view> -->

		<div class="tbody"><u-parse :content="banner.content" @preview="preview" @navigate="navigate"></u-parse></div>

		<!-- #ifdef MP-WEIXIN -->
		<ad v-if="htmlString" unit-id="adunit-01b7a010bf53d74e"></ad>
		<!-- #endif -->
	</view>
</template>

<script>
import uParse from '@/components/un-parse/u-parse.vue';

export default {
	components: {
		uParse
	},
	data() {
		return {
			title: 'list-triplex-row',
			banner: {},
			htmlString: ''
		};
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop >= this.anchorlist[2].top ? 2 : e.scrollTop >= this.anchorlist[1].top ? 1 : 0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	onShareAppMessage() {
		return {
			title: this.banner.title,
			path: '/pages/template/list2detail-detail/list2detail-detail?detailDate=' + JSON.stringify(this.banner)
		};
	},
	onLoad(option, event) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.informationId); //打印出上个页面传递的参数。
		uni.request({
			url: uni.getStorageSync('tempUrl') + 'public/selectInformation',
			data: {
				informationId: option.informationId
			},
			method: 'GET',
			success: res => {
				this.banner = res.data.data;
				console.log(this.banner); //打印出上个页面传递的参数。
			}
		});

		//兼容H5下排序栏位置
		// #ifdef H5
		//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
		let Timer = setInterval(() => {
			let uniHead = document.getElementsByTagName('uni-page-head');
			if (uniHead.length > 0) {
				this.headerTop = uniHead[0].offsetHeight + 'px';
				clearInterval(Timer); //清除定时器
			}
		}, 1);
		// #endif
	},
	methods: {
		preview(src, e) {
			// do something
		},
		navigate(href, e) {
			// do something
		}
	}
};
</script>

<style lang="scss">
view {
	font-size: 28upx;
	line-height: 1.8;
}
.tbody {
	padding: 0 10upx 0 10upx;
}
.banner {
	height: 360upx;
	overflow: hidden;
	position: relative;
	background-color: #ccc;
}

.banner-img {
	width: 100%;
}

.banner-title {
	max-height: 84upx;
	overflow: hidden;
	position: absolute;
	left: 30upx;
	bottom: 30upx;
	width: 90%;
	font-size: 32upx;
	font-weight: 400;
	line-height: 42upx;
	color: white;
	z-index: 11;
}

.article-meta {
	padding: 20upx 40upx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	color: gray;
}

.article-text {
	font-size: 26upx;
	line-height: 50upx;
	margin: 0 20upx;
}

.article-author,
.article-time {
	font-size: 30upx;
}

.article-content {
	padding: 0 30upx;
	overflow: hidden;
	font-size: 30upx;
	margin-bottom: 30upx;
}
</style>
