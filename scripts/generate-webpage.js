const content =
  `
  In Jujutsu Kaisen: Phantom Parade, players can control a variety of characters from the original series, as well as some newly introduced ones. Here’s an overview of some key characters in the game:
Playable Characters
Yuji Itadori
Voice Actor: Junya Enoki
Background: A first-year student at Tokyo Jujutsu High who becomes the vessel for Ryomen Sukuna after ingesting one of his fingers.
Yuji Itadori
Megumi Fushiguro
Voice Actor: Yuma Uchida
Background: A talented Grade 2 Jujutsu Sorcerer known for his unique shadow techniques.
Megumi Fushiguro
Nobara Kugisaki
Voice Actor: Asami Seto
Background: A confident and fierce Jujutsu Sorcerer who uses cursed tools in battle.
Nobara Kugisaki
Maki Zenin
Voice Actor: Mikako Komatsu
Background: A powerful sorcerer from the Zenin family, she excels in physical combat and cursed techniques.
Maki Zenin
Satoru Gojo
Voice Actor: Yuichi Nakamura
Background: The strongest sorcerer in the series, known for his exceptional skills and protective nature towards his students.
Satoru Gojo
New Characters
Saki Rindo
Background: A first-year student at the Fukuoka campus of Tokyo Jujutsu High, known for her unique combat style.
Kaito Yuki
Background: Another first-year from the Fukuoka campus, he possesses barrier-related cursed techniques.
Zetsu
Background: An original Special Grade Cursed Spirit introduced in the game, with a unique ability to nullify other cursed techniques.
These characters contribute to a rich gameplay experience where players can explore their abilities and strategies while engaging with the game's narrative and challenges.

`

const content2 =
  `
  In Jujutsu Kaisen: Phantom Parade, redeem codes are combinations of letters and numbers provided by the developers that players can enter to receive free in-game rewards. These rewards often include game currency, items, and supply packs, which can help players enhance their gameplay experience.
Current Active Redeem Codes and Their Rewards
JJK2024
Reward: 300 Cubes
ReleaseDay
Reward: 1 AP Supplementary Pack and 1 Gacha Ticket (Android only)
JJKGIFT
Reward: 1 AP Supplementary Pack
JJK777
Reward: 20,000 Beacon of Training
JJKCODE
Reward: 10,000 Beacon of Recollection Bits and 10,000 JP
JJKPPDomEx
Reward: 3 AP Supplementary Packs
JJKPPSPECIAL
Reward: 10,000 Beacon of Recollection Bits
JJKPPCURSE
Reward: 20,000 JP
Purpose of Redeem Codes
Enhance Gameplay Experience: The rewards obtained from redeem codes can help players quickly level up characters, acquire new characters, or strengthen existing ones.
Save Time and Resources: These rewards are typically items that would require in-game purchases or completing tasks to obtain, so using redeem codes can save time and effort, allowing players to enjoy the game more effectively.
How to Redeem Codes
Complete the tutorial to unlock menu features.
Open Jujutsu Kaisen: Phantom Parade on your device.
Tap the "Menu" button located at the bottom right corner of the screen.
Select the "Code" option from the menu.
Enter a valid redeem code into the provided text box and tap "OK" to confirm.
Go back to the home screen and tap the "Gift" button to claim your rewards.
Please note that redeem codes usually have an expiration date, so it’s advisable to use them as soon as possible to avoid missing out on rewards!

  `

const h1 = `jujutsu kaisen phantom parade character`
const description = `In Jujutsu Kaisen Phantom Parade, players can control a variety of characters from the original series, as well as some newly introduced ones. Here’s an overview of some key characters in the game:`
const prompt = `请根据这些资料${content}生成一个页面，H1为${h1},p为${description},生成包含图片，名称和描述的宫格图，
要求：SEO友好，页面美观，自适应手机端和PC端，使用nextjs和tailwind css`

const redeemCodePrompt = `请根据这些资料${content2}生成一个页面，H1为jujutsu kaisen phantom parade redeem code,
请生成合适的详情内容放在p标签中，
第一个h2标签内容为Current Active Jujutsu Kaisen Phantom Parade Redeem Codes and Their Rewards,按顺序生成合适的表格布局；
第二个h2标签内容为Purpose of Jujutsu Kaisen Phantom Parade Redeem Codes，请生成带图片和文字的宫格布局；
第三个h2标签内容为How to Redeem Jujutsu Kaisen Phantom Parade Codes，按顺序生成合适的列表布局
要求：SEO友好，页面美观，自适应手机端和PC端，使用nextjs和tailwind css`

async function generate() {
  console.log(redeemCodePrompt)
}

generate().then(() => {
})