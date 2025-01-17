// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    image: { type: 'string', required: false },
    fileName: { type: 'string', required: false },
    // ... 其他字段
  },
  computedFields: {
      locale: {
        type: 'string',
        resolve: (doc) => {
          const pathSegments = doc._raw.flattenedPath.split('/');
          return pathSegments[0]; // 现在语言代码是路径的第一个部分
        }
      }
  }
}))

export default makeSource({
  contentDirPath: 'blogs',
  documentTypes: [Post]
})
