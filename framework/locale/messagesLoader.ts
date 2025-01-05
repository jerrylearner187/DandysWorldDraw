import { Messages } from '@lingui/core'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './locale'
// 静态导入所有语言文件
import enMessages from '@/translations/en/messages.json'
import frMessages from '@/translations/fr/messages.json'
import deMessages from '@/translations/de/messages.json'
import esMessages from '@/translations/es/messages.json'
import itMessages from '@/translations/it/messages.json'
import jaMessages from '@/translations/ja/messages.json'
import koMessages from '@/translations/ko/messages.json'
import ruMessages from '@/translations/ru/messages.json'
import twMessages from '@/translations/tw/messages.json'

// 定义一个类型来匹配实际的消息格式
type RawMessages = Record<string, {
  message: string;
  translation?: string;
  comments?: string[];
  origin?: (string | number)[][];
}>

async function convertToMessagesProduction(rawMessages: RawMessages): Promise<Messages> {
  if (!rawMessages || !rawMessages.messages) {
    console.warn('原始消息对象为空或不包含 messages 属性');
    return {};
  }

  return Object.entries(rawMessages.messages).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      // 处理直接是字符串的情况
      acc[key] = value;
    } else if(typeof value === 'object' && Array.isArray(value)) {
      const arr = value.map((item) => {
        if (typeof item === 'string') {
          return item;
        } else if (typeof item === 'object' && Array.isArray(item) && item.length == 1) {
          return `\{${item[0]}\}`;
        } else {
          return '';
        }
      });
      acc[key] = arr.join(' ');
    } else {
      // 对于其他情况，使用空字符串并记录警告
      console.warn(`无法处理的消息格式: ${key}`, value);
      acc[key] = '';
    }
    return acc;
  }, {} as Messages);
}

// 创建一个函数来转换 RawMessages 为 Messages
async function convertToMessages(rawMessages: RawMessages): Promise<Messages> {
  // if(process.env.NODE_ENV === "production"){
    return convertToMessagesProduction(rawMessages);
  // }
  // if (!rawMessages) {
  //   console.warn('原始消息对象为空');
  //   return {};
  // }
  //
  // return Object.entries(rawMessages).reduce((acc, [key, value]) => {
  //   const v = value.translation
  //   if (typeof v === 'string'){
  //     acc[key] = v
  //   } else {
  //     // 对于其他情况，使用空字符串并记录警告
  //     console.warn(`无法处理的消息格式: ${key}`, value);
  //     acc[key] = ''
  //   }
  //   return acc;
  // }, {} as Messages);
}

// 创建 messagesMap
const messagesMap: Record<string, Messages|undefined> = {
  "en": undefined,
  "fr": undefined,
  "de": undefined,
  "es": undefined,
  "it": undefined,
  "ja": undefined,
  "ko": undefined,
  "ru": undefined,
  "tw": undefined,
  "pt": undefined,
}


async function getLocalMessage(locale: string): Promise<Messages> {
  if (locale === 'en') {
    return convertToMessages(enMessages as RawMessages);
  } else if (locale === 'fr') {
    return convertToMessages(frMessages as RawMessages);
  } else if (locale === 'de') {
    return convertToMessages(deMessages as RawMessages);
  } else if (locale === 'es') {
    return convertToMessages(esMessages as RawMessages);
  } else if (locale === 'it') {
    return convertToMessages(itMessages as RawMessages);
  } else if (locale === 'ja') {
    return convertToMessages(jaMessages as RawMessages);
  } else if (locale === 'ko') {
    return convertToMessages(koMessages as RawMessages);
  } else if (locale === 'ru') {
    return convertToMessages(ruMessages as RawMessages);
  }  else if (locale === 'tw') {
    return convertToMessages(twMessages as RawMessages);
  } else {
    return {};
  }

}

export const loadTranslationMessagesOnServerSide = async (
  locale: AVAILABLE_LOCALES,
): Promise<Messages> => {
  if(!messagesMap[locale]){
    messagesMap[locale] = await getLocalMessage(locale);
  }
  return messagesMap[locale] || messagesMap[DEFAULT_LOCALE];
}
