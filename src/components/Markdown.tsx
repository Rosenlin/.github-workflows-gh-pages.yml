import { useMemo } from 'react'

// 極小化 Markdown 渲染器：標題、粗體、斜體、列表、表格、引用、程式碼、段落。
// 目的是不引入額外依賴，保持 bundle 輕量、能在離線 WebView 運作。
// 安全性：對輸入先做 HTML escape，只在受控片段重新注入標籤。
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function inline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em]">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function renderTable(lines: string[]): string {
  const [headerLine, , ...bodyLines] = lines
  const headers = headerLine
    .split('|')
    .slice(1, -1)
    .map((c) => c.trim())
  const rows = bodyLines.map((l) =>
    l
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim()),
  )
  const thead = `<thead><tr>${headers
    .map((h) => `<th class="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold">${inline(h)}</th>`)
    .join('')}</tr></thead>`
  const tbody = `<tbody>${rows
    .map(
      (r) =>
        `<tr>${r
          .map((c) => `<td class="border-b border-slate-100 px-3 py-2 text-sm">${inline(c)}</td>`)
          .join('')}</tr>`,
    )
    .join('')}</tbody>`
  return `<div class="my-3 overflow-x-auto rounded-xl ring-1 ring-slate-200"><table class="w-full">${thead}${tbody}</table></div>`
}

function toHtml(md: string): string {
  const src = escapeHtml(md).split('\n')
  const out: string[] = []
  let i = 0
  while (i < src.length) {
    const line = src[i]
    if (!line.trim()) {
      i++
      continue
    }
    if (line.startsWith('# ')) {
      out.push(`<h1 class="mt-4 text-2xl font-bold">${inline(line.slice(2))}</h1>`)
      i++
      continue
    }
    if (line.startsWith('## ')) {
      out.push(`<h2 class="mt-5 text-xl font-semibold">${inline(line.slice(3))}</h2>`)
      i++
      continue
    }
    if (line.startsWith('### ')) {
      out.push(`<h3 class="mt-4 text-lg font-semibold">${inline(line.slice(4))}</h3>`)
      i++
      continue
    }
    if (line.startsWith('&gt; ')) {
      out.push(
        `<blockquote class="my-3 border-l-4 border-brand-300 bg-brand-50/50 px-3 py-2 text-slate-700">${inline(line.slice(5))}</blockquote>`,
      )
      i++
      continue
    }
    // table
    if (line.startsWith('|') && src[i + 1]?.match(/^\|[\s:|-]+\|$/)) {
      const block: string[] = []
      while (i < src.length && src[i].startsWith('|')) {
        block.push(src[i])
        i++
      }
      out.push(renderTable(block))
      continue
    }
    // ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < src.length && /^\d+\.\s/.test(src[i])) {
        items.push(`<li>${inline(src[i].replace(/^\d+\.\s/, ''))}</li>`)
        i++
      }
      out.push(`<ol class="my-2 list-decimal space-y-1 pl-6">${items.join('')}</ol>`)
      continue
    }
    // unordered list
    if (/^-\s/.test(line)) {
      const items: string[] = []
      while (i < src.length && /^-\s/.test(src[i])) {
        items.push(`<li>${inline(src[i].slice(2))}</li>`)
        i++
      }
      out.push(`<ul class="my-2 list-disc space-y-1 pl-6">${items.join('')}</ul>`)
      continue
    }
    // paragraph
    out.push(`<p class="my-2 leading-relaxed text-slate-800">${inline(line)}</p>`)
    i++
  }
  return out.join('')
}

export function Markdown({ source }: { source: string }) {
  const html = useMemo(() => toHtml(source), [source])
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
