import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { Post } from "@/lib/posts"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = Math.ceil(post.content.length / 500) // 估算阅读时间

  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group bg-card/90 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
            <Clock className="h-4 w-4 ml-2" />
            <span>{readingTime} 分钟阅读</span>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
