import type { SponsorConfig } from "../types/config";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 赞助用途说明
	usage: "所有赞助将用于网站维护、服务器费用以及内容创作。",

	// 是否显示赞助者列表
	showSponsorsList: true,

	// 是否在文章详情页底部显示赞助按钮
	showButtonInPost: true,

	// 赞助方式列表
	methods: [
		{
			name: "支付宝",
			icon: "fa7-brands:alipay",
			// 收款码图片路径（需要放在 public 目录下）
			qrCode: "/assets/images/sponsor/alipay.png",
			link: "",
			description: "使用 支付宝 扫码赞助",
			enabled: true,
		},
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			qrCode: "/assets/images/sponsor/wechat.png",
			link: "",
			description: "使用 微信 扫码赞助",
			enabled: true,
		},
		{
			name: "ko-fi",
			icon: "simple-icons:kofi",
			qrCode: "",
			link: "https://ko-fi.com/KaguyaRing",
			description: "Buy me a coffee",
			enabled: true,
		},
		{
			name: "爱发电",
			icon: "simple-icons:afdian",
			qrCode: "",
			link: "https://afdian.com/a/KaguyaRing",
			description: "通过 爱发电 进行赞助",
			enabled: true,
		},
	],

	// 赞助者列表（可选）
	sponsors: [
		{
			name: "Acheron",
			amount: "30 CNY",
			date: "2026.5.31",
			message: "我祝Acheron星辰璀璨",
		},
		{
			name: "无痕",
			amount: "30 CNY",
			date: "2026.5.31",
			message: "我祝无痕星辰璀璨",
		},
		{
			name: "公羊戾",
			amount: "5 CNY",
			date: "2026.5.31",
			message: "我祝公羊戾星辰璀璨",
		},
		{
			name: "吴彦祖",
			amount: "100 CNY",
			date: "2026.5.31",
			message: "我祝你星辰璀璨",
		},
		{
			name: "汤面桢子",
			amount: "100 CNY",
			date: "2026.6.3",
			message: "我祝汤面桢子星辰璀璨",
		},
		{
			name: "吴彦祖",
			amount: "50 CNY",
			date: "2026.6.3",
			message: "我祝你星辰璀璨",
		},
		{
			name: "吴彦祖",
			amount: "30 CNY",
			date: "2026.6.3",
			message: "我祝你星辰璀璨",
		},
	],
};
