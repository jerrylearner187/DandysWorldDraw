const { openAIChat4 } = require('./openai-chat')
const fs = require('fs')
const path = require('path')
/**
 * 1. 基于给定的关键词，生成TDK，并给出一些合适的网站名称
 * 2. 基于给定的关键词，生成4篇文章标题、描述和详情内容
 * 3. 基于给定的关键词，生成4篇文章的图片
 * 4. 基于给定的关键词，生成网站logo
 */
// 网站关键词
const keyword = 'Dandys World Draw Generator'
// 网站该要描述
const description = `
        <p>1. Choose from 12 different colors and adjust brush size to create your masterpiece</p>
        <p>2. Use preset shapes like circles, squares, triangles, and ellipses</p>
        <p>3. Add body parts like hands, feet, eyes, and nose to draw characters</p>
        <p>4. Create nature elements with preset shapes for leaves, flowers, and petals</p>
        5. Clear canvas if you want to create another drawing
        6. save as png or jpg after you have finished your artwork.
`
// 参考的网站地址
const website_likes = [
  'https://www.crazygames.com/game/golf-orbit',
  'https://geometrydash.io/golf-orbit',
  'https://1games.io/golf-orbit'
]
const store_path = path.join(__dirname)

// 生成网站TDK
async function generateTDK() {
  let prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}`
    if (description) {
      prompt += `网站的主要参考资料是：${description},`
    }
    prompt += `请基于这些信息给出合适的TDH(使用英文返回)。
    title不超过65个字符，description不超过155个字符
    请使用json格式返回。返回格式示例：{"title":"","description":"","h1":""}
    `
  console.log(prompt)
  return
  let tdk = await openAIChat4(prompt)
  tdk = tdk.replace(/^```json\s*|\s*```$/g, '');
  tdk = tdk.replace(/^[^{]*/g, '');
  console.log('tdk:\n', tdk)
  let obj = JSON.parse(tdk)
  let content = JSON.stringify(obj, null, 2);
  content = content.replace("\"" + obj.title + "\"", "msg`" + obj.title + "`");
  content = content.replace("\"" + obj.description + "\"", "msg`" + obj.description + "`");
  content = content.replace("\"" + obj.keywords + "\"", "msg`" + obj.keywords + "`");
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'tdk.json'), content)
}

async function generateHero() {
  const prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，网站的主要参考资料是：${description},请基于这些信息给出合适的网站首屏宣传标语(使用英文返回)。
    Path of Exile 2的缩写为POE2, 出现Path of Exile 2的地方一律用POE2代替。
    请使用json格式返回。返回格式示例：{"title":"","description":""}
    `
  console.log(prompt)
  return
  let hero = await openAIChat4(prompt)
  console.log('hero:\n', hero)
  hero = hero.replace(/^```json\s*|\s*```$/g, '');
  hero = hero.replace(/^[^{]*/g, '');
  let obj = JSON.parse(hero)
  let content = JSON.stringify(obj, null, 2);
  content = content.replace("\"" + obj.title + "\"", "msg`" + obj.title + "`");
  content = content.replace("\"" + obj.description + "\"", "msg`" + obj.description + "`");
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'hero.json'), content)
}

async function generateHowto() {
  let prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，`
  if (description) {
    prompt += `网站的主要参考资料是：${description},`
  }
  prompt += `请基于这些信息给出合适的如何使用说明(使用英文返回)。
    请合理布局关键词，保持关键词密度在3%以上。
    请使用json格式返回。返回格式示例：[{"step":"1","img":"","type":"image","instruction":"","description":""}]
    `
  console.log(prompt)
  return
  let json = await openAIChat4(prompt)
  console.log('hero:\n', json)
  json = json.replace(/^```json\s*|\s*```$/g, '');
  json = json.replace(/^[^{]*/g, '');
  let obj = JSON.parse(json)
  let content = JSON.stringify(obj, null, 2);
  for(let i = 0; i < obj.length; i++) {
    let item = obj[i];
    content = content.replace("\"" + item['instruction'] + "\"", "msg`" + item['instruction'] + "`");
    content = content.replace("\"" + item['description'] + "\"", "msg`" + item['description'] + "`");
  }
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'howto.json'), content)
}

function parseHowto(){
  const json = `
  [
{
"step": "1",
"img": "getting-started.jpg",
"instruction": "Getting Started with Dandy's World Drawing",
"description": "Welcome to Dandy's World drawing tutorials! Before starting, gather essential tools: pencils (HB, 2B), erasers, quality paper, and coloring materials. For digital artists, ensure you have a drawing tablet and software like Procreate or Photoshop ready."
},
{
"step": "2",
"img": "basic-shapes.jpg",
"instruction": "Understanding Basic Shapes in Dandy's World Characters",
"description": "Begin by breaking down Dandy's World characters into basic shapes. Most characters start with simple geometric forms - circles for Rodger's head, rectangles for body structure. Practice these foundational shapes before adding details."
},
{
"step": "3",
"img": "character-proportions.jpg",
"instruction": "Mastering Character Proportions",
"description": "Learn the correct proportions for Dandy's World characters. Use the head size as a basic unit of measurement. For example, Rodger's body is typically 2.5 heads tall. Create guidelines to maintain consistent proportions throughout your drawing."
},
{
"step": "4",
"img": "line-art.jpg",
"instruction": "Creating Clean Line Art",
"description": "Once comfortable with basic shapes, focus on line art. Start with light sketching, then gradually refine your lines. For Dandy's World characters, use varying line weights to add depth and character to your drawings."
},
{
"step": "5",
"img": "coloring-guide.jpg",
"instruction": "Coloring Your Dandy's World Character",
"description": "Apply colors using the official Dandy's World color palette. Start with base colors, then add shading and highlights. Remember that each character has their unique color scheme - like Rodger's gray tuxedo and purple-blue band."
},
{
"step": "6",
"img": "details-expression.jpg",
"instruction": "Adding Details and Expressions",
"description": "Focus on character-specific details and expressions. Practice drawing various emotions and poses typical in Dandy's World. Pay attention to unique features like Rodger's squinted eye or distinctive accessories."
},
{
"step": "7",
"img": "final-touches.jpg",
"instruction": "Final Touches and Background",
"description": "Complete your Dandy's World drawing by adding final touches and optional background elements. Review your work for consistency with the original character design. Share your artwork with the Dandy's World drawing community for feedback."
},
{
"step": "8",
"img": "practice-tips.jpg",
"instruction": "Practice and Improvement Tips",
"description": "Regular practice is key to mastering Dandy's World character drawing. Join online communities, participate in drawing challenges, and study official reference materials. Keep a sketchbook dedicated to Dandy's World practice."
}
]
  `;
  let obj = JSON.parse(json)
  let content = JSON.stringify(obj, null, 2);
  for(let i = 0; i < obj.length; i++) {
    let item = obj[i];
    content = content.replace("\"" + item['instruction'] + "\"", "msg`" + item['instruction'] + "`");
    content = content.replace("\"" + item['description'] + "\"", "msg`" + item['description'] + "`");
  }
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'howto.json'), content)
}

async function generateTip() {
  let prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，`
    if (description) {
      prompt += `网站的主要参考资料是：${description},`
    }
    prompt += `请基于这些信息给出合适的${keyword}特点说明(使用英文返回)。
    img使用合适的react-icons图标。
    请合理布局关键词，保持关键词密度在3%以上。
    请使用json格式返回。返回格式示例：[{"img":"","tip":"","description":""},{"img":"","tip":"","description":""}]
    `
  console.log(prompt)
  return
  let json = await openAIChat4(prompt)
  console.log('hero:\n', json)
  json = json.replace(/^```json\s*|\s*```$/g, '');
  json = json.replace(/^[^{]*/g, '');
  let obj = JSON.parse(json)
  let content = JSON.stringify(obj, null, 2);
  for(let i = 0; i < obj.length; i++) {
    let item = obj[i];
    content = content.replace("\"" + item['tip'] + "\"", "msg`" + item['tip'] + "`");
    content = content.replace("\"" + item['description'] + "\"", "msg`" + item['description'] + "`");
  }
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'tip.json'), content)
}

function parseTip(){
  const json = `
    [
  {
    "img": "FaPalette",
    "tip": "Rich Color Options",
    "description": "Dandys World Draw Generator offers 12 vibrant colors and adjustable brush sizes, giving you complete control to create stunning character artwork with precision and style."
  },
  {
    "img": "FaShapes", 
    "tip": "Preset Shapes Library",
    "description": "Access a variety of preset shapes in Dandys World Draw Generator including circles, squares, triangles and ellipses to quickly build your character's basic structure."
  },
  {
    "img": "FaUserEdit",
    "tip": "Character Parts Collection",
    "description": "Easily add detailed character features with Dandys World Draw Generator's preset body parts library including hands, feet, eyes and nose elements."
  },
  {
    "img": "FaLeaf",
    "tip": "Nature Elements",
    "description": "Create beautiful backgrounds using Dandys World Draw Generator's nature-themed shapes like leaves, flowers and petals to enhance your character drawings."
  },
  {
    "img": "FaTrash",
    "tip": "Easy Reset",
    "description": "Start fresh anytime with Dandys World Draw Generator's one-click canvas clear feature, perfect for experimenting with different drawing styles."
  },
  {
    "img": "FaSave",
    "tip": "Multiple Export Options", 
    "description": "Save and share your Dandys World Draw Generator creations in PNG or JPG format, making it simple to preserve and showcase your artwork."
  }
]
  `;
  let obj = JSON.parse(json)
  let content = JSON.stringify(obj, null, 2);
  for(let i = 0; i < obj.length; i++) {
    let item = obj[i];
    content = content.replace("\"" + item['tip'] + "\"", "msg`" + item['tip'] + "`");
    content = content.replace("\"" + item['description'] + "\"", "msg`" + item['description'] + "`");
  }
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'tip.json'), content)
}

async function generateFAQ() {
  let prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，`
    if (description) {
      prompt += `网站的主要参考资料是：${description},`
    }
    prompt += `请基于这些信息给出合适的faq(使用英文返回)。
    请合理布局关键词，保持关键词密度在3%以上。
    请使用json格式返回。返回格式示例：[{"question":'',"answer":''}]
    `
  console.log(prompt)
  return
  let json = await openAIChat4(prompt)
  console.log('faq:\n', json)
  json = json.replace(/^```json\s*|\s*```$/g, '');
  json = json.replace(/^[^\[]*/g, '');
  let obj = JSON.parse(json)
  let content = JSON.stringify(obj, null, 2);
  for(let i = 0; i < obj.length; i++) {
    let item = obj[i];
    content = content.replace("\"" + item['question'] + "\"", "msg`" + item['question'] + "`");
    content = content.replace("\"" + item['answer'] + "\"", "msg`" + item['answer'] + "`");
  }
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'faq.json'), content)
}

function generateAbout() {
  let prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，`
  if (description) {
    prompt += `网站的主要参考资料是：${description},`
  }
  prompt += `请基于这些信息给出合适的一段话背景介绍(使用英文返回)。
    请合理布局关键词，保持关键词密度在3%以上。
    `
  console.log(prompt)
}

function parseFAQ(){
  const json = `
  [
  {
    "question": "What is Dandys World Draw Generator?",
    "answer": "Dandys World Draw Generator is an intuitive drawing tool that allows users to create characters and artwork using preset shapes, customizable colors, and various drawing elements. It's designed to make character creation accessible for artists of all skill levels."
  },
  {
    "question": "What features does Dandys World Draw Generator offer?",
    "answer": "Dandys World Draw Generator provides multiple features including 12 different color options, adjustable brush sizes, preset shapes (circles, squares, triangles, ellipses), character body parts, and nature elements. You can also clear your canvas and save your artwork in PNG or JPG format."
  },
  {
    "question": "How do I save my artwork in Dandys World Draw Generator?",
    "answer": "With Dandys World Draw Generator, you can easily save your completed artwork in either PNG or JPG format. Simply click the save button when you're finished with your drawing to export it to your preferred file format."
  },
  {
    "question": "Can I create characters using Dandys World Draw Generator?",
    "answer": "Yes! Dandys World Draw Generator includes a comprehensive set of preset body parts like hands, feet, eyes, and nose, making it easy to create unique characters. Combined with various shapes and colors, you can bring your character designs to life."
  },
  {
    "question": "Is Dandys World Draw Generator suitable for beginners?",
    "answer": "Absolutely! Dandys World Draw Generator is designed to be user-friendly for artists of all skill levels. With preset shapes, easy-to-use tools, and intuitive controls, beginners can start creating artwork immediately."
  },
  {
    "question": "Can I draw nature elements using Dandys World Draw Generator?",
    "answer": "Yes, Dandys World Draw Generator includes preset shapes specifically designed for creating nature elements such as leaves, flowers, and petals. These tools make it easy to add beautiful environmental details to your artwork."
  },
  {
    "question": "What if I make a mistake while using Dandys World Draw Generator?",
    "answer": "Don't worry! Dandys World Draw Generator features a canvas clear function that allows you to start fresh whenever needed. This makes it perfect for experimenting and practicing your drawing skills."
  },
  {
    "question": "What drawing tools are available in Dandys World Draw Generator?",
    "answer": "Dandys World Draw Generator offers a variety of drawing tools including adjustable brush sizes, 12 different colors, preset geometric shapes, character body parts, and nature elements. These tools provide everything you need to create detailed artwork."
  }
]
  `;
  let obj = JSON.parse(json)
  let content = JSON.stringify(obj, null, 2);
  for(let i = 0; i < obj.length; i++) {
    let item = obj[i];
    content = content.replace("\"" + item['question'] + "\"", "msg`" + item['question'] + "`");
    content = content.replace("\"" + item['answer'] + "\"", "msg`" + item['answer'] + "`");
  }
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'faq.json'), content)
}

async function generateBlogs() {
  const prompt = `
    我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，网站的主要功能是：${description}
    请你帮我根据以上素材，并且在网络上搜索一些与可能会出现的关键词相关的独一无二的，有趣的信息，帮我完成博客文章的标题和概要描述（使用英文返回）。
    要求：
        1. 提升 ${keyword} 的关键词密度 2. SEO 优秀。3. 以用户视角提问方式编写标题。4.至少3篇以上
    请使用json格式返回。返回格式示例：{"title":"","description":""}
    `
  const blogs = await openAIChat4(prompt)
  // 将结果写入文件目录中使用json保存
  fs.writeFileSync(path.join(store_path, 'blogs.json'), JSON.stringify(JSON.parse(blogs), null, 2))

  console.log('blogs:\n', blogs)
}


async function generateBlogContent() {
  // 读取blogs.json文件，并创建一个子目录
  const blogs = JSON.parse(fs.readFileSync(path.join(store_path, 'blogs.json'), 'utf-8'))
  const blogDir = path.join(store_path, 'blogs')
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir)
  }
  // 循环生成4篇文章
  const articles = blogs['articles']
  for (const blog of articles) {
    const prompt = `
        我希望你扮演一位SEO专家。作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
        你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
        我正在开发一个网站，网站的关键词是:${keyword}，网站的主要功能是：${description}，博客的标题:${blog.title},博客的描述:${blog.description}
        请你帮我根据以上素材，并且在网络上搜索一些与可能会出现的关键词相关的独一无二的，有趣的信息，帮我完成博客的内容（使用英文返回）。
        要求：
            1. 提升 ${keyword} 的关键词密度 2. SEO 优秀。3.使用markdown格式返回，并遵守以下返回格式
        返回格式示例：
            ---
            title: 'How to Make a Picture Have a Transparent Background Using the Best Online Tools'
            slug: how-to-make-a-picture-have-a-transparent-background
            description: 'Learn how to easily create transparent backgrounds for your pictures using top online tools like Adobe Express and Photoroom. Enhance your images for professional and personal use with simple steps.'
            createdAt: '2024-06-12 10:41:05'
            fileName: How-to-Make-a-Picture-Have-a-Transparent-Background.mdx
            image: https://public-image.fafafa.ai/fa-image/2024/06/bd4b570fbe665c6ca155bd16faea03b4.webp
            ---
            博客内容
        `
    const blogContent = await openAIChat4(prompt)
    // 将结果写入文件目录中使用json保存
    fs.writeFileSync(path.join(blogDir, `${blog.title}.mdx`), blogContent)
    console.log('blogContent:\n', blogContent)
  }
}

async function generateModule() {
  const prompt = `
    我希望你扮演一位产品经理和SEO专家。
    作为产品经理，你能够准确洞悉用户的需求，根据需求设计出用户体验优秀的网页。
    作为一位SEO专家，你拥有广泛的知识和经验，能够帮助网站提高在搜索引擎结果中的排名，吸引更多的流量和用户。
    你熟悉各种搜索引擎的算法和规则，并能运用各种策略和技巧来优化网站的内容、结构和链接，以提升其在搜索结果中的可见性。
    我正在开发一个网站，网站的关键词是:${keyword}，网站的主要参考资料是：${description},请基于这些信息分析用户进来网站想获得哪些方面的帮助，
    我们如何设计网页来满足他们的需求，需要包括哪些模块。请综合分析并给出具体的网页设计方案
    `
  console.log(prompt)
}

async function modifyPrimaryColor(mainColor) {
  const prompt = `主要颜色为：${mainColor}

请修改如下颜色内容：
 primary: {
          DEFAULT: '#ec008c',
          50: 'rgb(255, 230, 204)', // 最浅的橙色调
          100: 'rgb(255, 204, 153)', // 较浅的橙色
          200: 'rgb(255, 178, 102)', // 稍微淡化的橙色
          300: 'rgb(255, 153, 51)',  // 接近原始颜色的橙色
          400: 'rgb(255, 128, 25)',  // 橙色略微加深
          500: '#FF6600',            // 原始的橙色，色彩饱和
          600: 'rgb(204, 82, 0)',    // 明显加深的橙色
          700: 'rgb(153, 61, 0)',    // 深橙色
          800: 'rgb(102, 41, 0)',    // 极深的橙色
          900: 'rgb(76, 30, 0)',     // 几乎黑色的橙色
          950: 'rgb(51, 20, 0)'      // 深邃的橙黑色
        }`

  const result = await openAIChat4(prompt)
  console.log('修改后的主要颜色结果:\n', result)
}

// 生成网页logo
async function generateLogo(keyword, primaryColor) {
  // const prompt = `a website logo with word:"${word}" ,Highlight primary color is ${primaryColor} Use rounded rectangular square to wrap characters`
  const prompt = `I am creating a website logo with the content "${keyword}", displaying all words in one line. Please assign suitable color combinations for each word. Make the background be transparent`
  console.log('prompt:', prompt)
}

async function generate() {
  // await generateTDK()
  // await generateHero()
  // await generateHowto()
  // parseHowto();
  // await generateTip()
  // parseTip();
  // await generateFAQ()
  parseFAQ();
  // generateAbout();
  // await generateLogo('Dandys World Draw', '#2E8F15')
  // generateModule();
  // await generateBlogs()
  // await generateBlogContent()
}

generate().then(() => {
})

