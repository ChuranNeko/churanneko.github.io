import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const readingTime = Math.ceil(post.content.length / 500)

  return (
    <div className="min-h-screen animated-gradient">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:bg-primary/10 bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        <article className="bg-card/90 backdrop-blur-sm rounded-lg shadow-lg border p-8">
          <header className="mb-8 pb-6 border-b">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} 分钟阅读</span>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                    <Badge
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-medium mt-4 mb-2 text-foreground">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-7 text-foreground">{children}</p>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-1 text-foreground">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground">{children}</ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/50 py-2 rounded-r">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className
                  if (isInline) {
                    return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                  }
                  return (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4 border">
                      <code className={className}>{children}</code>
                    </pre>
                  )
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">{children}</th>
                ),
                td: ({ children }) => <td className="border border-border px-4 py-2">{children}</td>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto bg-background/80 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              查看更多文章
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
