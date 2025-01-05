"use client";
// components/skills/SkillCard.tsx
import { t, Trans } from '@lingui/macro'
import Image from 'next/image';
import { Skill } from '@/lib/types/skill';
import { Tooltip } from '@nextui-org/react'

interface SkillCardProps {
  skill: Skill;
  onClick?: (skill: Skill) => void;
}

export function SkillCard({ skill, onClick }: SkillCardProps) {
  // 处理描述文本
  const fullDescription = skill.description ? skill.description.replace(/\\n/g, '\n') : '';
  const truncatedDescription = fullDescription.length > 200
    ? `${fullDescription.slice(0, 200)}...`
    : fullDescription;
  const bgColorMap = {
    red: 'bg-red-100 border-red-500 text-red-700 hover:bg-red-300 hover:text-red-500',
    green: 'bg-green-100 border-green-500 text-green-700 hover:bg-green-300 hover:text-green-500',
    blue: 'bg-blue-100 border-green-500 text-blue-700 hover:bg-blue-300 hover:text-blue-500'
  } as const;

  const needsTruncation = fullDescription.length > 300;
  return (
    <div
      className={`relative rounded-lg p-4 transition-colors cursor-pointer ${bgColorMap[skill.category]}`}
    >
      <div className="flex flex-col items-start space-x-4">
        <div className="flex items-center">
          <div className="relative w-16 h-16">
            <Image
              src={skill.icon ? skill.icon : '/images/default.webp'}
              alt={skill.name}
              fill
              className="object-contain"
            />
            {skill.isNewSkill && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
              {t`New`}
            </span>
            )}
          </div>
          <h3 className="text-lg font-semibold ml-4">{skill.name}</h3>
        </div>

        <div className="flex-1">
          {needsTruncation ? (
            <Tooltip
              content={<p className="max-w-md whitespace-pre-line">{fullDescription}</p>}
              placement="bottom"
              showArrow
              className="bg-gray-900 text-sm p-4"
            >
              <p className="text-sm whitespace-pre-line cursor-help">
                {truncatedDescription}
              </p>
            </Tooltip>
          ) : (
            <p className="text-sm whitespace-pre-line">
              {fullDescription}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {skill.tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex flex-col justify-between text-sm">
          <div className="flex justify-between">
            <div>
              {t`Level:`} {skill.level}
            </div>
            {skill.type == 'active' ? skill.cost && (
              <span>
                {t`COST:`} {skill.cost}
              </span>
            ) : skill.cost_multiplier && (
              <span>
                {t`COST MULTIPLIER:`} {skill.cost_multiplier}
              </span>)}
          </div>
          <div className="flex justify-between mt-2">
            {skill.type == 'active' ? skill.attack_speed && (
              <span>
                {t`SPEED:`} {skill.attack_speed}
              </span>
            ) : skill.support_requirements && (
              <span>
                {t`REQUIREMENTS:`} {skill.support_requirements}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-2">
            {skill.type == 'active' && skill.attack_damage && (
              <span>
                {t`DAMAGE:`} {skill.attack_damage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
