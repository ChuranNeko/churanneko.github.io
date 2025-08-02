import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen, Home, Tags } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            我的博客
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-accent/50">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">首页</span>
            </Button>
          </Link>
          <Link href="/tags">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-accent/50">
              <Tags className="h-4 w-4" />
              <span className="hidden sm:inline">标签</span>
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
