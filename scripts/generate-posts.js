const fs = require('fs')
const path = require('path')
const localeNames = require(path.join(__dirname, '../framework/locale/localeConfig'))
const matter = require('gray-matter')

function generatePostsData() {
  for (const langDir of Object.keys(localeNames)) {
    const blogs = "blogs"
    const filePath = path.join(blogs, langDir)
    const files = fs.readdirSync(filePath)
    let posts = [];
    files.forEach((file) => {
      const markdownFile = fs.readFileSync(
        path.join(blogs, langDir, file),
        'utf-8'
      )
      let slug = file.replace('.mdx', '')
      slug = decodeURIComponent(slug)
      const { data: frontMatter,content } = matter(markdownFile)
      posts.push({ slug,lang:langDir, content,title:frontMatter.title,description:frontMatter.description,createdAt:frontMatter.createdAt,image:frontMatter.image })
    })
      // 将数据写入 public 目录
    fs.writeFileSync(
        `./public/blogs/${langDir}/posts-data.json`,
        JSON.stringify(posts)
    );
  }
}

generatePostsData();