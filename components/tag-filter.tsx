"use client"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selectedTag === null ? "default" : "outline"}
        size="sm"
        onClick={() => onTagSelect(null)}
        className="h-8"
      >
        全部文章
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? "default" : "outline"}
          size="sm"
          onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
          className="h-8 relative"
        >
          {tag}
          {selectedTag === tag && <X className="h-3 w-3 ml-1" />}
        </Button>
      ))}
    </div>
  )
}
