import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { highlight } from 'sugar-high'

// 基础类型
interface CustomMarkdownProps {
  code: string; // contentlayer 会自动将 markdown 转换为 HTML
}

function CustomLink(props:any) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props:any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }: { children: React.ReactNode }) {
  const codeString = typeof children === 'string' ? children : '';
  let codeHTML = highlight(codeString);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str:string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level:number) {
  const Heading = ({ children }:{children:any}) => {
    let slug = slugify(children)
    const className = level === 1 ? 'text-primary' : 
                     level === 2 ? 'text-secondary' : 
                     level === 3 ? 'text-accent' : ''
                     
    return React.createElement(
      `h${level}`,
      { id: slug, className },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  strong: ({ children, ...props }:{children:any}) => (
    <strong className="text-white/50" {...props}>{children}</strong>
  ),
  p: ({ children, ...props }:{children:any}) => (
    <p className="text-white/30" {...props}>{children}</p>
  ),
}

export function CustomMarkdown({ code }: CustomMarkdownProps) {
  return (
    <div className="markdown-content">
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  )
}
