'use client'


import React, { useEffect, useMemo } from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
  User
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import useNavigation from '@/framework/hooks/useNavigation'
import { Dropdown as AntDropDown } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { t, Trans } from '@lingui/macro'
import useI18nLocale from '@/framework/hooks/useI18nLocale'
import { FaAngleRight, FaArrowUpFromBracket, FaChevronDown } from 'react-icons/fa6'
import NextLink from 'next/link'
import { SessionUser } from '@/framework/types/sessionUser'
import clsx from 'clsx'
import { LuLanguages } from 'react-icons/lu'
import { siteConfig } from '@/config/site'
import { FcGoogle } from 'react-icons/fc'
import { activateLocale, AVAILABLE_LOCALES } from '@/framework/locale/locale'
import { i18n } from '@lingui/core'
import { icons } from '@tabler/icons-react'

export interface NavItem extends Record<string, any> {
  title: any
  href: string
  tag: string
}


export type NavbarProps = {
  items: NavItem[]
  locale?: string
}


export default function Nav({ items, locale }: NavbarProps) {
  const [activeSection, setActiveSection] = React.useState('home');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()
  // const { data, status } = useSession()
  // const isUnauthenticated = useMemo(() => 'unauthenticated' === status, [status])
  // const isAuthenticated = useMemo(() => 'authenticated' === status, [status])
  const [pathWithoutLocale, isActive] = useNavigation(pathname)
  const [currentLocale, locales] = useI18nLocale(locale)
  const router = useRouter()
  // console.log('nav locale', locale)
  // console.log('nav pathanme', pathname)
  // console.log('nav pathWithoutLocale', pathWithoutLocale)
  // const user = data?.user as SessionUser
  // const [isLocaleReady, setIsLocaleReady] = React.useState(false);
  // useEffect(() => {
  //   activateLocale(currentLocale as AVAILABLE_LOCALES).then(() => {
  //     console.log(`Locale activated: ${currentLocale}`);
  //     setIsLocaleReady(true); // 等待语言加载完成
  //   });
  // }, [currentLocale]);
  // console.log('nav', isLocaleReady);
  // if (!isLocaleReady) {
  //   return <div>Loading...</div>; // 渲染加载状态
  // }
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'tips', 'faqs', 'about'];
      const scrollPosition = window.scrollY + 100; // 添加偏移量以提前触发

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });

      // 处理首页部分
      if (scrollPosition < document.getElementById('about')?.offsetTop! - 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const localDropdown = (
    <Dropdown shouldBlockScroll={false} classNames={{
      base: "", // change arrow background
      content: "p-1 border-small border-divider bg-secondary",
    }}>
      <DropdownTrigger>
        <Button variant="bordered" className="border-primary text-primary hover:bg-gray-200" startContent={<LuLanguages size={16}/>}>
          {currentLocale}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode={"single"}
        aria-label="change locale"
        itemClasses={{
          base: [
            "border-primary",
            "rounded-md",
            "data-[hover=true]:text-white",
            "data-[hover=true]:bg-gray-200",
            "dark:data-[hover=true]:bg-gray-200",
            "data-[selectable=true]:focus:bg-gray-200",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
        className='dropdown-grid p-0 bg-white/90 text-gray-300 !border-primary'
        style={{ width: "auto", minWidth: "200px" }} // 使用 NextUI 的 CSS-in-JS 来控制宽度
      >
        {locales.map((item) => (
          <DropdownItem key={item.key} className="col-span-1 text-white-300 !hover:bg-white hover:text-primary transition-colors">
            <NextLink
              className={currentLocale === item.key ? 'text-primary w-full' : 'flex items-center gap-2 text-gray-700 hover:text-primary w-full transition-colors'}
              replace={true}
              title={item.name}
              href={`/${item.key}${pathWithoutLocale}`}
            >
              <FaAngleRight />{item.name}
            </NextLink>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )


  return (
    <Navbar maxWidth="xl"
            classNames={{ base: "bg-white/70 backdrop-blur-md border-b border-primary/10", item: 'text-gray-700 data-[active=true]:px-5 data-[active=true]:py-1 data-[active=true]:text-white data-[active=true]:hover:text-primary data-[active=true]:bg-black data-[active=true]:rounded-2xl hover:text-primary transition-colors' }}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden text-primary"
      />
      <NavbarBrand>
        <a href="/" title="home" className="w-full flex flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border mr-10">
          <img className="md:ml-3 ml-0 w-auto h-8 md:h-12  object-cover "
               src="/logo.png"
               alt="logo" />
          <div className="w-full flex-grow">
            {/*<p className="ml-2 font-bold text-sm md:text-2xl">*/}
            {/*  {i18n._(siteConfig.name)}*/}
            {/*</p>*/}
            {/*{*/}
            {/*  siteConfig.slogan && (*/}
            {/*    <p className="ml-2 text-xs hidden md:block md:text-sm text-primary">{siteConfig.slogan}</p>*/}
            {/*  )*/}
            {/*}*/}
          </div>
        </a>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-10" justify="center">
        {
          items.map(it => (
              it.submenu && it.submenu.length > 0 ? (
                  <Dropdown key={it.title.id} shouldBlockScroll={false}>
                    <NavbarItem>
                      <DropdownTrigger>
                        <Button disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-gray-700 hover:text-primary"
                                endContent={<FaChevronDown/>}
                                radius="sm"
                                variant="light">
                          {i18n._(it.title)}
                        </Button>
                      </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                      selectionMode={"single"}
                      aria-label="change locale"
                      className='p-2 bg-white/70 backdrop-blur-md'
                      style={{ width: "auto", minWidth: "200px" }} // 使用 NextUI 的 CSS-in-JS 来控制宽度
                    >
                      {it.submenu.map((item: any) => (
                        <DropdownItem key={item.title.id} className="hover:text-primary transition-colors">
                          <NextLink
                            className={'flex items-center gap-2 text-gray-700 hover:text-primary w-full transition-colors'}
                            replace={true}
                            title={i18n._(item.title)}
                            href={locale ? `/${locale}${item.href}` : item.href}
                          >
                            {i18n._(item.title)}<FaAngleRight />
                          </NextLink>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
              ) :  (<NavbarItem key={it.title.id} isActive={isActive(it.href)}>
                <NextLink
                className={clsx('transition-colors', { 'hover:text-primary': isActive(it.href) })}
                title={i18n._(it.title)}
                href={locale ? `/${locale}${it.href}` : it.href}>{i18n._(it.title)}</NextLink></NavbarItem>)
          ))
        }
      </NavbarContent>

      <NavbarMenu>
        {
          items.map((it, index) => (
            it.submenu && it.submenu.length > 0 ? (
              <Dropdown key={it.title.id} shouldBlockScroll={false}>
                <NavbarMenuItem>
                  <DropdownTrigger>
                    <Button disableRipple
                            className="p-0 bg-transparent data-[hover=true]:bg-transparent text-gray-700 hover:text-primary"
                            endContent={<FaChevronDown/>}
                            radius="sm"
                            variant="light">
                      {i18n._(it.title)}
                    </Button>
                  </DropdownTrigger>
                </NavbarMenuItem>
                <DropdownMenu

                  selectionMode={"none"}
                  aria-label="change locale"
                  className='p-2 bg-white/70 backdrop-blur-md'
                  style={{ width: "auto", minWidth: "200px" }} // 使用 NextUI 的 CSS-in-JS 来控制宽度
                >
                  {it.submenu.map((item: any) => (
                    <DropdownItem key={item.title.id} className="hover:text-primary transition-colors" 
                    onPress={() => {
                      console.log('onPress')
                      setIsMenuOpen(false); // 关闭菜单
                      router.push(locale ? `/${locale}${item.href}` : item.href);
                    }}
                    href={locale ? `/${locale}${item.href}` : item.href}>
                      {/* <NextLink
                        className={'flex items-center gap-2 text-gray-700 hover:text-primary w-full'}
                        replace={true}
                        title={i18n._(item.title)}
                        href={locale ? `/${locale}${item.href}` : item.href}
                      > */}
                      <div className="flex items-center text-gray-700 hover:text-primary transition-colors">{i18n._(item.title)}<FaAngleRight /></div>
                      {/* </NextLink> */}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              ) : (
              <NavbarMenuItem key={`${it.title.id}-${index}`}>
                <NextLink
                  className={clsx('text-gray-700 transition-colors', { 'hover:text-primary': isActive(it.href) })}
                  title={i18n._(it.title)}
                  href={locale ? `/${locale}${it.href}` : it.href}>
                  {i18n._(it.title)}
                </NextLink>
              </NavbarMenuItem>
            )
          ))
        }
        <NavbarMenuItem key="locale" className="-ml-4">
          {
            localDropdown
          }
        </NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent as="div" justify="end">
        {/*{*/}
        {/*  isUnauthenticated && siteConfig.showLogin ? (*/}
        {/*    <>*/}
        {/*      <div className="hidden sm:block">*/}
        {/*        <Button*/}
        {/*          color={'primary'}*/}
        {/*          variant="flat"*/}
        {/*          startContent={<FcGoogle size="1em" color="white" />}*/}
        {/*          onClick={() => signIn('google')}*/}
        {/*        >{t`Sign In With Google`}</Button>*/}
        {/*      </div>*/}
        {/*      <div className="sm:hidden">*/}
        {/*        <Button*/}
        {/*          color={'primary'}*/}
        {/*          variant="flat"*/}
        {/*          startContent={<FcGoogle size="1em" color="white" />}*/}
        {/*          onClick={() => signIn('google')}*/}
        {/*        >{t`Sign In`}</Button>*/}
        {/*      </div>*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <AntDropDown menu={{*/}
        {/*      items: [*/}
        {/*        {*/}
        {/*          key: 'profile',*/}
        {/*          className: 'h-14 gap-2',*/}
        {/*          disabled: true,*/}
        {/*          label: <>*/}
        {/*            <p className="font-semibold">{user?.email ?? ''}</p>*/}
        {/*            <p className="font-semibold">{t`Credit:${user?.credit ?? 0}`}</p>*/}
        {/*          </>*/}
        {/*        },*/}
        {/*        {*/}
        {/*          key: 'logout',*/}
        {/*          itemIcon: <FaArrowUpFromBracket />,*/}
        {/*          label: t`Log Out`,*/}
        {/*          onClick: () => signOut()*/}
        {/*        }*/}
        {/*      ]*/}
        {/*    }}>*/}
        {/*      <Skeleton isLoaded={isAuthenticated} className="rounded-lg">*/}
        {/*        {*/}
        {/*          user?.image && (*/}
        {/*            <User*/}
        {/*              name={user?.name ?? ''}*/}
        {/*              description={t`Credit:${user?.credit ?? 0}`}*/}
        {/*              className="cursor-pointer"*/}
        {/*              avatarProps={{*/}
        {/*                lang: locale,*/}
        {/*                src: user?.image ?? '#'*/}
        {/*              }}></User>*/}
        {/*          )*/}
        {/*        }*/}
        {/*      </Skeleton>*/}
        {/*    </AntDropDown>)*/}
        {/*}*/}

        <div className="hidden sm:block">
          {
            localDropdown
          }
        </div>
      </NavbarContent>
    </Navbar>
  )
}