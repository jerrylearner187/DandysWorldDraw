import React from 'react'
import { msg, Trans } from '@lingui/macro'
import Navbar from './navbar'

export default function Header({ lang }: { lang?: string }) {
  const navigation = [
    { title: msg`Home`, href: '/', current: true, tag: 'home' },
    { title: msg`Generator`, href: '/generator', current: false, tag: 'generator' },
    // { title: msg`Features`, href: '/#features', current: false, tag: 'features'
    //   // submenu: [
    //   //   { title: msg`All Skills`, href: '/skills' },
    //   //   { title: msg`Strength Skills`, href: '/skills/red' },
    //   //   { title: msg`Dexterity Skills`, href: '/skills/green' },
    //   //   { title: msg`Intelligence Skills`, href: '/skills/blue' },
    //   // ]
    // },
    // { title: msg`Tips`, href: '/#tips', current: false, tag: 'tips'
    //   // submenu: [
    //   //   { title: msg`All Gems`, href: '/gems' },
    //   //   { title: msg`Skill Gems`, href: '/gems/skill' },
    //   //   { title: msg`Support Gems`, href: '/gems/support' },
    //   // ]
    // },
    // { title: msg`FAQs`, href: '/#faqs', current: false, tag: 'faqs'},
    // {
    //   title: msg`About`, href: '/#about', tag: 'about'
    // },
    // { title: msg`Guides`, href: '/guides' },
    // { title: msg`Download`, href: '/download', current: false },
    // { title: msg`Character`, href: '/character', current: false },
    // { title: msg`Redeem Codes`, href: '/redeem', current: false },
    // { title: msg`Reroll`, href: '/reroll', current: false },
    // { title: msg`Tier List`, href: '/tier', current: false },
    // { title: t`Pricing`, href: '/pricing', current: false },
    // { title: t`Blogs`, href: '/blogs', current: false }
    // { title: t`Explore`, href: '/user-case' }
  ]
  return <Navbar items={navigation as any} locale={lang}/>
}