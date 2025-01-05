'use client'
import { useEffect, useState } from 'react'
// import {
//   FaBrain,
//   FaRobot,
//   FaMicrochip,
//   FaLaptop,
//   FaSatelliteDish,
//   FaGlobe,
//   FaGear,
//   FaBattleNet,
//   FaGamepad,
//   FaTree, FaBoxOpen, FaUsers, FaLayerGroup, FaHeart, FaBolt, FaCrosshairs, FaGem, FaLink, FaFire
// } from 'react-icons/fa6'
import {FaGear} from 'react-icons/fa6'
import React from 'react'
// import {
//   FaArrowsAlt,
//   FaExchangeAlt,
//   FaExpandArrowsAlt,
//   FaFistRaised, FaRunning,
//   FaShieldAlt, FaSync,
//   FaSyncAlt,
//   FaUserAlt
// } from 'react-icons/fa'
// import * as FaIcons from 'react-icons/fa'
// import { BsLightning, BsLightningCharge, BsShieldFill } from 'react-icons/bs'
// import * as BsIcons from 'react-icons/bs'
// import {
//   GiCrossedSwords,
//   GiCrystalBall,
//   GiCrystalCluster,
//   GiCrystalGrowth, GiCrystalize,
//   GiFireGem,
//   GiMagicSwirl,
//   GiSkeletonInside, GiSwordsPower, GiTeamUpgrade, GiTreeBranch, GiUpgrade,
//   GiWoodFrame
// } from 'react-icons/gi'
// import * as GiIcons from 'react-icons/gi'

// const iconMapping: any = {
//   "FaBrain": <FaBrain />,
//   "FaRobot": <FaRobot />,
//   "FaMicrochip": <FaMicrochip />,
//   "FaLaptop": <FaLaptop />,
//   "FaSatelliteDish": <FaSatelliteDish />,
//   "FaGlobe": <FaGlobe />,
//   "FaBattleNet": <FaBattleNet />,
//   "FaGamepad": <FaGamepad />,
//   "FaUserAlt": <FaUserAlt />,
//   "FaTree": <FaTree/>,
//   "FaShieldAlt": <FaShieldAlt />,
//   "FaSyncAlt": <FaSyncAlt />,
//   "FaBoxOpen": <FaBoxOpen />,
//   "FaUsers": <FaUsers />,
//   "FaFistRaised": <FaFistRaised />,
//   "FaExpandArrowsAlt": <FaExpandArrowsAlt />,
//   "FaExchangeAlt": <FaExchangeAlt />,
//   "FaLayerGroup": <FaLayerGroup />,
//   "FaHeart": <FaHeart />,
//   "FaBolt": <FaBolt />,
//   "FaArrowsAlt": <FaArrowsAlt />,
//   "FaSync": <FaSync />,
//   "FaCrosshairs": <FaCrosshairs />,
//   "FaRunning": <FaRunning />,
//   "BsLightningCharge": <BsLightningCharge />,
//   "GiMagicSwirl": <GiMagicSwirl />,
//   "GiSkeletonInside": <GiSkeletonInside />,
//   "BsShieldFill": <BsShieldFill />,
//   "GiCrystalGrowth": <GiCrystalGrowth />,
//   "GiCrystalCluster": <GiCrystalCluster />,
//   "GiFireGem": <GiFireGem />,
//   "GiWoodFrame": <GiWoodFrame />,
//   "GiCrystalBall": <GiCrystalBall />,
//   "GiCrystalize": <GiCrystalize />,
//   "GiCrossedSwords": <GiCrossedSwords />,
//   "GiUpgrade": <GiUpgrade />,
//   "GiTreeBranch": <GiTreeBranch />,
//   "GiSwordsPower": <GiSwordsPower />,
//   "GiTeamUpgrade": <GiTeamUpgrade />,
//   "FaGem": <FaGem />,
//   "FaLink": <FaLink />,
//   "FaFire": <FaFire />
// };

// const iconMapping: { [key: string]: React.ReactElement } = {}

// 自动生成图标映射
// Object.keys(Fa6Icons).forEach(iconName => {
//   const Icon = (Fa6Icons as any)[iconName]
//   if (typeof Icon === 'function') {  // 确保是有效的图标组件
//     iconMapping[iconName] = <Icon />
//   }
// })
// Object.keys(FaIcons).forEach(iconName => {
//   const Icon = (FaIcons as any)[iconName]
//   if (typeof Icon === 'function') {  // 确保是有效的图标组件
//     if (!iconMapping[iconName]){
//       iconMapping[iconName] = <Icon />
//     }
//   }
// })
// Object.keys(BsIcons).forEach(iconName => {
//   const Icon = (BsIcons as any)[iconName]
//   if (typeof Icon === 'function') {  // 确保是有效的图标组件
//     if (!iconMapping[iconName]){
//       iconMapping[iconName] = <Icon />
//     }
//   }
// })
// Object.keys(GiIcons).forEach(iconName => {
//   const Icon = (GiIcons as any)[iconName]
//   if (typeof Icon === 'function') {  // 确保是有效的图标组件
//     if (!iconMapping[iconName]){
//       iconMapping[iconName] = <Icon />
//     }
//   }
// })

const DynamicFaIcon = ({ iconName, className} : {iconName: string, className?: string}) => {
  const [Icon, setIcon] = useState<React.ReactElement>(<FaGear />)

  useEffect(() => {
    let exist = false
    import('react-icons/fa6').then((icons) => {
      if (icons[iconName]) {
        const IconComponent = icons[iconName] as React.ComponentType
        setIcon(<IconComponent />)
        exist = true
      }
    })
    if (!exist) {
      import('react-icons/fa').then((icons) => {
        if (icons[iconName]) {
          const IconComponent = icons[iconName] as React.ComponentType
          setIcon(<IconComponent />)
          exist = true
        }
      })
    }
  }, [iconName])

  return React.cloneElement(Icon, {className: `${className}`})
  // return (
  //   React.cloneElement(iconMapping[iconName] || <Fa6Icons.FaGear/>, {className: `${className}`})
  // );
};

export default DynamicFaIcon