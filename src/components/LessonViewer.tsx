import { withBase } from '../lib/withBase'
import type { Lesson } from '../types'
import { Markdown } from './Markdown'

export function LessonViewer({ lesson }: { lesson: Lesson }) {
  const { resource, body } = lesson
  if (resource.kind === 'text') {
    return <Markdown source={body ?? ''} />
  }
  if (resource.kind === 'pdf') {
    const url = resource.src?.startsWith('http') ? resource.src : withBase(resource.src ?? '')
    return (
      <div className="card overflow-hidden">
        <iframe
          title={lesson.title}
          src={url}
          className="h-[70vh] w-full"
          allow="fullscreen"
        />
      </div>
    )
  }
  if (resource.kind === 'video') {
    const url = resource.src?.startsWith('http') ? resource.src : withBase(resource.src ?? '')
    return (
      <div className="card overflow-hidden">
        <video controls preload="metadata" className="w-full" src={url}>
          你的瀏覽器不支援內嵌影片，請<a href={url}>點此下載</a>。
        </video>
      </div>
    )
  }
  return null
}
