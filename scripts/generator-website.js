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
const keyword = 'Dandys World Draw Slot Maker'
// 网站该要描述
const description = `

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
"img": "Sparkles",
"tip": "Random Story Generation",
"description": "Dandys World Draw Slot Maker creates unique story combinations with every spin, featuring beloved Dandys World characters in unexpected scenarios."
},
{
"img": "Shuffle",
"tip": "Slot Machine Experience",
"description": "Experience the thrill of a slot machine with the Dandys World Draw Slot Maker, where each spin reveals new character combinations and story elements."
},
{
"img": "Users",
"tip": "Cartoon Characters",
"description": "Dive into the charming world of Dandys World characters through the Dandys World Draw Slot Maker, where your favorite heroes become part of randomly generated tales."
},
{
"img": "Zap",
"tip": "Instant Results",
"description": "The Dandys World Draw Slot Maker instantly generates fresh story combinations with each spin, making every interaction unique and entertaining."
},
{
"img": "HeartHandshake",
"tip": "Interactive Fun",
"description": "Engage with the Dandys World Draw Slot Maker for an entertaining experience that brings Dandys World characters to life in surprising ways."
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
"question": "What is Dandys World Draw Slot Maker?",
"answer": "Dandys World Draw Slot Maker is an interactive story generation tool that combines slot machine mechanics with storytelling. It randomly generates unique stories featuring Dandys World characters through a spin-and-match system."
},
{
"question": "How does the Dandys World Draw Slot Maker work?",
"answer": "The Dandys World Draw Slot Maker works by spinning virtual reels containing different story elements and Dandys World characters. When you press the spin button, it randomly combines these elements to create unique story scenarios. Each spin generates a new combination of characters, settings, and plot elements."
},
{
"question": "Can I save the stories generated by Dandys World Draw Slot Maker?",
"answer": "Yes, the Dandys World Draw Slot Maker allows you to save your favorite story combinations. Once you find a story combination you like, you can save it to revisit later or share it with other Dandys World fans."
},
{
"question": "Is Dandys World Draw Slot Maker suitable for all ages?",
"answer": "Yes, the Dandys World Draw Slot Maker is designed to be family-friendly and suitable for all ages. All generated story combinations are appropriate for children while remaining entertaining for adults who enjoy the Dandys World universe."
},
{
"question": "How often are new characters added to the Dandys World Draw Slot Maker?",
"answer": "The Dandys World Draw Slot Maker is regularly updated with new characters, story elements, and features. Updates typically occur monthly, bringing fresh content and expanding the possibilities for story generation within the Dandys World universe."
},
{
"question": "Can I customize the story elements in Dandys World Draw Slot Maker?",
"answer": "While the Dandys World Draw Slot Maker primarily operates on random generation, you can influence certain aspects of the story creation process by selecting specific character categories or story themes before spinning. This allows for some customization while maintaining the exciting element of randomness."
},
{
"question": "Are there any tips for using Dandys World Draw Slot Maker effectively?",
"answer": "To get the most out of your Dandys World Draw Slot Maker experience, try these tips: 1) Spin multiple times to explore different combinations, 2) Use the theme filters to focus on specific types of stories, 3) Save your favorite combinations for inspiration, and 4) Experiment with different character combinations to discover unique storylines."
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

