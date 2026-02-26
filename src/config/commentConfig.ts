import type { CommentConfig } from "../types/config";

export const commentConfig: CommentConfig = {
	// 评论系统类型：none, twikoo, waline, giscus, disqus, artalk，默认为 none，即不启用评论系统
	type: "giscus",

	//giscus 评论系统配置
	giscus: {
		// 设置 Giscus 评论系统仓库
		repo: "ChuranNeko/churanneko.github.io",
		// 设置 Giscus 评论系统仓库 ID
		repoId: "R_kgDOPsGxcg",
		// 设置 Giscus 评论系统分类
		category: "Ideas",
		// 获取 Giscus 评论系统分类 ID
		categoryId: "DIC_kwDOPsGxcs4CzLgj",
		// 获取 Giscus 评论系统映射方式
		mapping: "pathname",
		// 获取 Giscus 评论系统严格模式
		strict: "0",
		// 获取 Giscus 评论系统反应功能
		reactionsEnabled: "1",
		// 获取 Giscus 评论系统元数据功能
		emitMetadata: "1",
		// 获取 Giscus 评论系统输入位置
		inputPosition: "top",
		// 获取 Giscus 评论系统语言
		lang: "zh-CN",
		// 获取 Giscus 评论系统加载方式
		loading: "lazy",
	},
};
