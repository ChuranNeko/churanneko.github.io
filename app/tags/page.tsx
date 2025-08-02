import { getAllTags, getAllPosts } from "@/lib/posts"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Tag } from "lucide-react"

export default async function TagsPage() {
  const [tags, posts] = await Promise.all([getAllTags(), getAllPosts()])

  const tagCounts = tags
    .map((tag) => ({
      name: tag,
      count: posts.filter((post) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="min-h-screen animated-gradient">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            文章标签
          </h1>
          <p className="text-lg text-muted-foreground">按标签浏览所有文章</p>
        </div>

        {tagCounts.length === 0 ? (
          <div className="text-center py-16">
            <Tag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">暂无标签</h2>
            <p className="text-muted-foreground">还没有文章添加标签</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tagCounts.map((tag) => (
              <Link key={tag.name} href={`/?tag=${encodeURIComponent(tag.name)}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary transition-colors">
                      <Tag className="h-4 w-4" />
                      {tag.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tag.count} 篇文章</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
