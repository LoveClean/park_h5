<template>
	<view>
		<view class="header" :style="{ position: headerPosition, top: headerTop }">
			<view class="target" v-for="(target, index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected ? 'on' : '']">
				{{ target.text }}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place0"></view>
		<!-- 园区介绍 -->
		<view class="">
			<view class="park">
				<image :src="park.logo" mode="aspectFit"></image>
				<view class="slogan">{{ park.introduction }}</view>
				<view class="info">
					<image class="rrr" src="../../static/img/temp/erweima.jpg" mode="aspectFit"></image>
					<view class="slogan"></view>
					<view class="ttt">长按关注园服大师公众号，随时随地关注园区最新动态</view>
				</view>
				<hr class="parkhr" />
				<!-- <view class="kjczlb">空间出租列表如下：</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			park: {
				id: 0,
				name: '园区加载中，请稍等。。',
				logo: 'http://obs-312.obs.cn-east-2.myhuaweicloud.com/20190426206c5f6d08.jpg',
				location: '330108',
				address: '聚业路28号',
				sort: 0,
				introduction: '环境好，风景优美',
				createBy: '黄鹏飞2号',
				createDate: '2019-04-19 21:04:03',
				updateBy: '黄鹏飞2号',
				updateDate: '2019-04-26 20:37:44',
				status: 1
			},
			//轮播图下标
			currentSwiper: 0,
			loadingText: '正在加载...',
			headerTop: '0px',
			headerPosition: 'fixed',
			orderbyList: [
				{ text: '默认', selected: true, orderbyicon: false, orderby: 0 }
				// { text: '价格', selected: false, orderbyicon: ['sheng', 'jiang'], orderby: 0 },
				// { text: '面积', selected: false, orderbyicon: ['sheng', 'jiang'], orderby: 0 }
			],
			orderby: 'sheng'
		};
	},
	onLoad(option) {
		//option为object类型，会序列化上个页面传递的参数
		uni.request({
			url: this.$tempUrl + 'park/selectByPrimaryKey',
			data: { id: option.parkId },
			method: 'GET',
			success: res => {
				const data = res.data.data;
				this.park = data;
				this.orderbyList[0].text = this.park.name;
			}
		});
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(() => {
			this.reload();
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//排序类型
		select(index) {
			let tmpTis = this.orderbyList[index].text + '排序 ';
			if (this.orderbyList[index].orderbyicon) {
				let type = this.orderbyList[index].orderby == 0 ? '升序' : '降序';
				if (this.orderbyList[index].selected) {
					type = this.orderbyList[index].orderby == 0 ? '降序' : '升序';
					this.orderbyList[index].orderby = this.orderbyList[index].orderby == 0 ? 1 : 0;
				}
				tmpTis += type;
			}
			this.orderbyList[index].selected = true;
			let len = this.orderbyList.length;
			for (let i = 0; i < len; i++) {
				if (i != index) {
					this.orderbyList[i].selected = false;
				}
			}
			uni.showToast({ title: tmpTis, icon: 'none' });
		}
	}
};
</script>

<style lang="scss">
@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMMAAsAAAAAB3gAAALAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCfgqCXII4ATYCJAMMCwgABCAFhG0HQxuDBsiemjxBRCmUAtQ2VRCBG4ig2u+zZ3c/ortTgBIoQOVPBYSJYkUggWRSPqyjY2yEQyPe5FzmkfXucrOArBAKSdt/TjNmNTZyfrOTKAwgNQXmqbkEBgj2eS6nNz3A+YFyXHs9P2raURxQgHtR7yiyEknMW4bXLsaDeEygbVEkxYXiyhqgV+BVgbgmCQzQ55xKS2doCvWag0W8o9FMz9M24G34/fgvPvQktQxvPL5axIPc38m/U/JI9VSLIKjm80M7RsYWoBAXa4PHVHFxi0rbKaotAfuaFfxOqSp+Jwvlbv/wCImow+1dsAaGdEcqZnRrKhAggQzqaOI24Bmw02JRZmZ88bS/fq2vH6Y1yywb576F7tn3l1/5e7zm6Ze2+cW37DBXjFEftC+6U7vil0/zOvXIl3lf7cx/3DkeysBDV/tDQ5N7tli9AzsiHDgcO55136FS8LLTzBygm4Q9u6bCp1zAy0lh7v/L+PnQ0P71YAZeG0pE3eWwRIIOANX5dz4JQCX8hQLB+5z/hXZb5ofeVMCvjc0fKFEp+rs1bzkU/H5Vz67iarArF1vJlH4oO8g0SGi7EVU4OnY43jzr3U5omqVIGhaQNS2Rhd1CTcc26ppOo21TyfGOCUIlSgsbJhHC0DqSvp/IhnbIwh6gZu4BdcNQoe1iuC7sWAnJWEAQQxEP2V4ocQE/ph5qjDqrkNDpZUhWE4rrEJGlDIyLji1WSpAfkTm2yF1CPKUYYhLwwWL0HPJ6AzBIAm7E0WiR0mB6TAyue1M0F/ABo/MIhEEhPIjVC5JwAvywGE8ZS5+vggg6eTFIC6ejWAchZNL0UJxosT3IEqO/F+dehMi6COJRFAZhRIAPVIz8iJcUA6Bg/Tw3hENFE0fkg9LFSP1wX2P0+mbf952ANvxUjhQ5is4tRurpjHJLjF9IRbKIHAAA')
		format('woff2');
}
.park {
	padding-left: 15upx;
	padding-right: 15upx;
	text-align: center;
	.slogan {
		text-align: left;
		color: #807c87;
		font-size: 30upx;
	}
	.parkhr {
		margin: 25upx 10upx 25upx 10upx;
	}
	.kjczlb {
		color: #e65339;
		font-size: 30upx;
		font-weight: 600;
	}
	.rrr {
		padding-top: 20upx;
		height: 230upx;
	}
	.ttt {
		color: red;
		font-size: 22upx;
	}
}
.icon {
	font-family: 'HMfont-home' !important;
	font-size: 26upx;
	font-style: normal;
	&.sheng {
		&:before {
			content: '\e737';
		}
	}
	&.jiang {
		&:before {
			content: '\e736';
		}
	}
}
.header {
	width: 92%;
	padding: 0 4%;
	height: 79upx;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;
	border-bottom: solid 1upx #eee;
	.target {
		width: 50%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-bottom: -2upx;
		color: #aaa;
		&.on {
			color: #555;
			border-bottom: 4upx solid #f06c7a;
			font-weight: 600;
			font-size: 30upx;
		}
	}
}
.place0 {
	background-color: #ffffff;
	height: 100upx;
}
.place {
	background-color: #ffffff;
	height: 20upx;
}
.goods-list {
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 100%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 4;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 70vw;
	swiper {
		width: 100%;
		height: 70vw;
		swiper-item {
			image {
				width: 100%;
				height: 70vw;
			}
		}
	}
	.indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
</style>
