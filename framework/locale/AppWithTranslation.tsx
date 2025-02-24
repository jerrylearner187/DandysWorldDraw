'use client'

import { useLingui } from '@lingui/react'
import { Fragment, ReactNode } from 'react'
import { globalI18n } from './i18n'
import { ServerSideGeneratedI18nNamespace } from './types'
import useLoadTranslation from './useLoadTranslation'
import dynamic from 'next/dynamic'
const LinguiProvider = dynamic(
  () => import('@lingui/react').then((mod) => mod.I18nProvider),
  { ssr: true }
)

interface AppWithTranslationProps {
  i18n: ServerSideGeneratedI18nNamespace
  children: ReactNode
}

const WatchLocale = ({ children }: any) => {
  const { i18n: lingui } = useLingui();
  console.log('WatchLocale', lingui.locale);
  // console.log('WatchLocale', lingui);
  // Skip render when locale isn't loaded
  const locale = lingui.locale ? lingui.locale : 'en';
  // Force re-render when locale changes.
  // Otherwise string translations (ie: t`Macro`) won't be updated.
  return <Fragment key={locale}>{children}</Fragment>;
};

const AppWithTranslation = ({ i18n, children }: AppWithTranslationProps) => {
  const { locale } = i18n
  const i18nPropsNamespace = i18n._i18nPropsNamespace
  useLoadTranslation(i18nPropsNamespace, locale)
  // console.log('AppWithTranslation useLingui', useLingui);
  // console.log('AppWithTranslation', LinguiProvider);
  return <LinguiProvider i18n={globalI18n}>
           <WatchLocale>
             {children}
           </WatchLocale>
          </LinguiProvider>
}

export default AppWithTranslation
