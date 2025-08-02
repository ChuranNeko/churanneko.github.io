import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "data/posts")

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(postsDirectory)) {
      console.log("Posts directory does not exist, returning sample posts...")
      return getSamplePosts()
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"))

    if (markdownFiles.length === 0) {
      console.log("No markdown files found, returning sample posts...")
      return getSamplePosts()
    }

    const posts = markdownFiles.map((name) => {
      const slug = name.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 150) + "...",
        content,
        tags: data.tags || [],
      }
    })

    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    console.log(
      `Found ${sortedPosts.length} posts:`,
      sortedPosts.map((p) => p.title),
    )
    return sortedPosts
  } catch (error) {
    console.error("Error reading posts:", error)
    return getSamplePosts()
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      // 如果文件不存在，检查是否是示例文章
      const samplePosts = getSamplePosts()
      const samplePost = samplePosts.find((post) => post.slug === slug)
      if (samplePost) {
        console.log(`Found sample post: ${samplePost.title}`)
        return samplePost
      }
      console.log(`Post not found: ${slug}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const post = {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.slice(0, 150) + "...",
      content,
      tags: data.tags || [],
    }

    console.log(`Found post: ${post.title}`)
    return post
  } catch (error) {
    console.error("Error reading post:", error)
    // 尝试从示例文章中查找
    const samplePosts = getSamplePosts()
    return samplePosts.find((post) => post.slug === slug) || null
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = posts.flatMap((post) => post.tags)
  const uniqueTags = Array.from(new Set(tags)).sort()
  console.log(`Found ${uniqueTags.length} unique tags:`, uniqueTags)
  return uniqueTags
}

// 示例文章数据，当没有真实文章时使用
function getSamplePosts(): Post[] {
  const samplePosts = [
    {
      slug: "hello-world",
      title: "Hello World - 我的第一篇博客",
      date: "2024-01-15",
      excerpt: "欢迎来到我的博客！这是我的第一篇文章，介绍了这个博客的基本功能和特色。",
      tags: ["博客", "介绍", "Hello World"],
      content: `# 欢迎来到我的博客！

这是我使用 Next.js 和 Markdown 创建的第一篇博客文章。

## 博客特色

- 🚀 基于 Next.js App Router
- 📝 使用 Markdown 编写文章
- 🎨 现代化的 UI 设计
- 📱 响应式布局
- 🌙 支持深色模式

## 技术栈

这个博客使用了以下技术：

1. **Next.js 15** - React 框架
2. **TypeScript** - 类型安全
3. **Tailwind CSS** - 样式框架
4. **React Markdown** - Markdown 渲染
5. **Gray Matter** - Front Matter 解析

## 代码示例

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

## 引用

> "代码是写给人看的，只是顺便能在机器上运行。" - Harold Abelson

感谢你的阅读！希望你喜欢这个博客。`,
    },
    {
      slug: "nextjs-features",
      title: "Next.js 15 新特性介绍",
      date: "2024-01-20",
      excerpt: "深入了解 Next.js 15 的新特性，包括 App Router、Server Components 等现代化功能。",
      tags: ["Next.js", "React", "前端开发", "技术"],
      content: `# Next.js 15 新特性介绍

Next.js 15 带来了许多令人兴奋的新特性，让我们一起来探索这些功能。

## App Router

App Router 是 Next.js 13 引入的新路由系统，现在已经非常稳定：

- 基于文件系统的路由
- 支持嵌套布局
- 更好的性能优化
- 简化的数据获取

## Server Components

React Server Components 让我们能够在服务器端渲染组件：

\`\`\`tsx
// 这是一个 Server Component
export default async function BlogPost({ params }) {
  const post = await getPost(params.id);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

## 性能优化

Next.js 15 在性能方面有显著提升：

- 更快的构建时间
- 优化的打包大小
- 改进的缓存策略
- 更好的图片优化

## 总结

Next.js 15 是一个非常棒的版本，推荐大家升级使用！`,
    },
    {
      slug: "markdown-guide",
      title: "Markdown 语法指南",
      date: "2024-01-25",
      excerpt: "完整的 Markdown 语法指南，包含标题、列表、代码块、表格等常用语法。",
      tags: ["Markdown", "写作", "语法", "指南"],
      content: `# Markdown 语法指南

Markdown 是一种轻量级标记语言，让我们能够使用简单的语法来格式化文本。

## 标题

\`\`\`markdown
# 一级标题
## 二级标题
### 三级标题
\`\`\`

## 文本格式

- **粗体文本**
- *斜体文本*
- ~~删除线~~
- \`行内代码\`

## 列表

### 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

### 有序列表

1. 第一项
2. 第二项
3. 第三项

## 链接和图片

[链接文本](https://example.com)

![图片描述](/placeholder.svg?height=200&width=400&query=markdown-example)

## 代码块

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

## 表格

| 语法 | 描述 | 示例 |
|------|------|------|
| \`**text**\` | 粗体 | **粗体** |
| \`*text*\` | 斜体 | *斜体* |
| \`\`code\`\` | 代码 | \`代码\` |

## 引用

> 这是一个引用块。
> 可以包含多行内容。

希望这个指南对你有帮助！`,
    },
  ]

  console.log(`Returning ${samplePosts.length} sample posts`)
  return samplePosts
}
