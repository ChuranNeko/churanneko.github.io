import { getAllPosts, getAllTags } from "@/lib/posts"
import { ClientHomePage } from "@/components/client-home-page"
import { Header } from "@/components/header"

export default async function HomePage() {
  // 在服务器端获取数据
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()])

  return (
    <div className="min-h-screen animated-gradient">
      <Header />
      <ClientHomePage posts={posts} tags={tags} />
    </div>
  )
}
