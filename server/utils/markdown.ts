import { marked } from 'marked'
import { createHighlighter, type Highlighter } from 'shiki'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'bash',
        'sh',
        'shell',
        'yaml',
        'php',
        'json',
        'dotenv',
        'dockerfile',
        'javascript',
        'js',
        'typescript',
        'ts',
        'html',
        'css',
        'sql',
        'python',
        'text',
      ],
      engines: { oniguruma: createJavaScriptRegexEngine() },
    })
  }
  return highlighterPromise
}

export async function renderMarkdown(content: string): Promise<string> {
  const highlighter = await getHighlighter()
  const loadedLangs = highlighter.getLoadedLanguages()

  const renderer = new marked.Renderer()
  renderer.code = ({ text, lang }) => {
    const language = (lang || 'text').split(/\s+/)[0]
    const safeLang = loadedLangs.includes(language as any) ? language : 'text'
    try {
      return highlighter.codeToHtml(text, {
        lang: safeLang,
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      })
    } catch {
      return highlighter.codeToHtml(text, {
        lang: 'text',
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      })
    }
  }

  return marked.parse(content, { renderer })
}
