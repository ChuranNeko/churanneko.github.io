import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
      <p className="text-muted-foreground mb-8">抱歉，您访问的页面不存在。</p>
      <Link href="/">
        <Button>返回首页</Button>
      </Link>
    </div>
  )
}
