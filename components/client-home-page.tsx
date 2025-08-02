"use client"

import { useState } from "react"
import { PostCard } from "@/components/post-card"
import { TagFilter } from "@/components/tag-filter"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Post } from "@/lib/posts"

interface ClientHomePageProps {
  posts: Post[]
  tags: string[]
}

export function ClientHomePage({ posts, tags }: ClientHomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  console.log("ClientHomePage received:", { postsCount: posts.length, tagsCount: tags.length })

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesTag && matchesSearch
  })

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          欢迎来到我的博客
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">分享技术见解、学习心得和生活感悟</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold mb-2">好像没有文章欸</h2>
          <p className="text-muted-foreground">还没有发布任何文章，敬请期待！</p>
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/80 backdrop-blur-sm border-border/50"
            />
          </div>

          {/* Tag Filter */}
          {tags.length > 0 && <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />}

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold mb-2">没有找到相关文章</h2>
              <p className="text-muted-foreground">
                {selectedTag ? `标签 "${selectedTag}" 下` : ""}
                {searchQuery ? `搜索 "${searchQuery}"` : ""} 没有找到文章
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {selectedTag ? `标签: ${selectedTag}` : "最新文章"}
                  <span className="text-sm text-muted-foreground ml-2">({filteredPosts.length} 篇)</span>
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  )
}
