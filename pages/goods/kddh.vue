<template>
	<view>
		<view class="banner"><image class="img" src="../../static/kddh.jpg" mode="widthFix"></image></view>
		<inputs
			:inputsArray="inputsArray"
			activeName="提交"
			@chaildOpenEvent="openWin"
			@activeFc="activeFc"
			:onLoadData="onLoadData"
			animationType="rotate3d-fade"
			:animationDuration="0.1"
			submitReSet
			:buttonStyle="buttonStyle"
			:inputDebounceSet="inputDebounceSet"
		/>
	</view>
</template>

<script>
import inputs from '@/components/QuShe-inputs/inputs.vue';
export default {
	data() {
		return {
			inputDebounceSet: {
				openInputDebounce: true,
				delay: 500
			},
			buttonStyle: {
				//按钮样式
				activeButton: 'background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;', //主按钮样式
				changeButton: 'background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;', //picker类型更改按钮样式
				selectButton: 'background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;', //picker类型选择按钮样式
				confirmButton: 'background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;', //picker类型弹出框中确定按钮样式
				getcodeButton: 'background-color: #c0ebd7;border-radius: 30px;box-shadow: 2px 2px 1px 1px #c0ebd7;' //获取验证码按钮样式
			},
			inputsArray: [
				{
					segmentationTitle: '填写资料', //分割大标题
					border_top: '1px solid #f2f2f2', //上划线
					title: '企业/个人',
					ignore: false, //是否可忽略该值(判断时此项值可以为空)
					// defaultValue: '今天也要加油鸭~',
					tapClear: true, //input一键清除功能
					password: false, //input密码类型
					// icon: 'search', //input左边图标
					// iconColor: '#c0ebd7', //input图标颜色
					// filterFc: function(value) {
					// 	//input值过滤函数
					// 	//自定义过滤函数
					// 	value = 'filter过滤后的值';
					// 	return value;
					// },
					variableName: 'name' //自定义变量名
				},
				{
					title: '联系方式',
					verifyFc: function(value) {
						if (/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) return true;
						return false;
					},
					verifyErr: '手机号校验错误',
					tapClear: true, //input一键清除功能
					// "ignore": true
					variableName: 'phone' //自定义变量名
				}
			],
			onLoadData: 'data_'
		};
	},
	methods: {
		openWin(value) {
			//打开规则或协议页
			//若有一个以上的rule，则根据value打开规则页面
			console.log(value);
		},
		activeFc(res) {
			uni.showToast({
				title: '获取输入成功'
			});
			console.log(res);
			uni.request({
				url: this.$tempUrl + 'serveApply/insertSelective',
				data: {
					name: res.name,
					contact: res.phone
				},
				method: 'POST',
				success: res => {
					console.log(res);
					if (res.data.code === 0) {
						uni.showToast({ title: '申请成功', icon: 'success' });
						alert('申请成功');
					} else {
						alert('失败');
					}
				}
			});
		}
	},
	components: {
		inputs
	}
};
</script>

<style lang="scss">
.banner {
	width: 100%;
	text-align: center;
	.img {
		width: 98%;
	}
}
</style>
