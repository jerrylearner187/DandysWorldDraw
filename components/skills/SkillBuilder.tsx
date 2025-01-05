// components/skills/SkillBuilder.tsx
'use client';

import { useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Skill } from '@/lib/types/skill'
import { SkillCard } from './SkillCard'
import { Button, Input, Textarea } from '@nextui-org/react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AVAILABLE_LOCALES } from '@/framework/locale/locale'

interface SkillBuilderProps {
  availableSkills: Skill[];
  lang: AVAILABLE_LOCALES;
  maxMainSkills?: number;
  maxSupportSkills?: number;
}

export interface BuildData {
  title: string;
  author: string;
  description: string;
  mainSkills: Skill[];
  supportSkills: Skill[];
}

export function SkillBuilder({
                               availableSkills: initialAvailableSkills, // 重命名为 initialAvailableSkills,
                               lang,
                               maxMainSkills = 3,
                               maxSupportSkills = 2
                             }: SkillBuilderProps) {
  const locale = lang || AVAILABLE_LOCALES.en;
  // 添加新的状态来跟踪可用技能
  const [availableSkills, setAvailableSkills] = useState<Skill[]>(initialAvailableSkills);
  const [mainSkills, setMainSkills] = useState<Skill[]>([]);
  const [supportSkills, setSupportSkills] = useState<Skill[]>([]);
  // 新增状态
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false); // 添加保存状态
  const router = useRouter();
  console.log("SkillBuilder description", description);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const skill = availableSkills.find(s => s.id === result.draggableId);
    if (!skill) return;

    if (destination.droppableId === 'mainSkills') {
      if (mainSkills.length >= maxMainSkills) {
        toast.error(`Maximum ${maxMainSkills} main skills allowed`);
        return;
      }
      if (!mainSkills.find(s => s.id === skill.id)) {
        setMainSkills([...mainSkills, skill]);
        // 从可用技能中移除
        setAvailableSkills(availableSkills.filter(s => s.id !== skill.id));
      }
    } else if (destination.droppableId === 'supportSkills') {
      if (supportSkills.length >= maxSupportSkills) {
        toast.error(`Maximum ${maxSupportSkills} support skills allowed`);
        return;
      }
      if (!supportSkills.find(s => s.id === skill.id)) {
        setSupportSkills([...supportSkills, skill]);
        // 从可用技能中移除
        setAvailableSkills(availableSkills.filter(s => s.id !== skill.id));
      }
    }
  };

  const removeSkill = (skillId: string, type: 'main' | 'support') => {
    // 找到要移除的技能
    const skill = type === 'main'
      ? mainSkills.find(s => s.id === skillId)
      : supportSkills.find(s => s.id === skillId);

    if (skill) {
      // 将技能添加回可用技能列表
      setAvailableSkills([...availableSkills, skill]);

      // 从对应列表中移除
      if (type === 'main') {
        setMainSkills(mainSkills.filter(s => s.id !== skillId));
      } else {
        setSupportSkills(supportSkills.filter(s => s.id !== skillId));
      }
    }
  };

  const handleSave = async () => {
    if (isSaving) return; // 如果正在保存，直接返回
    // 验证必填字段
    if (!title.trim()) {
      toast.error(t`Please enter a title`);
      return;
    }
    if (!author.trim()) {
      toast.error(t`Please enter an author`);
      return;
    }
    if (mainSkills.length === 0) {
      toast.error(t`Please select at least one main skill`);
      return;
    }
    try {
      setIsSaving(true); // 开始保存时设置为 true

      toast.loading(t`Saving build...`);
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.UE_WEB_API_URL
      const response = await fetch(`${baseUrl}/api/builds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          author: author,
          description: description,
          mainSkills: mainSkills.map((s: Skill) => s.id).join(','),
          supportSkills: supportSkills.map((s: Skill) => s.id).join(','),
        }),
      });

      if (!response.ok) throw new Error('Failed to save skill build');

      await response.json();
      toast.success('Skill planner saved successfully!');
      setTimeout(() => {
        router.push(`/${locale}/builds`);
      }, 1000);
    } catch (error) {
      toast.error(t`Failed to save build`);
    } finally {
      setIsSaving(false); // 无论成功失败都重置状态
    }
  };

  return (
    <div className="space-y-6">
      {/* 技能构建区域 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Available Skills Column */}
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-[600px]"> {/* 添加固定高度和flex布局 */}
              <h3 className="text-lg font-semibold mb-4">
                <Trans>Available Skills</Trans>
              </h3>
              {/* 添加 flex-1 和滚动条 */}
              <Droppable droppableId="availableSkills">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 flex-1 overflow-y-auto"
                  >
                    {availableSkills.map((skill, index) => (
                      <Draggable
                        key={skill.id}
                        draggableId={skill.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SkillCard skill={skill} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Main Skills Column */}
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-[600px]"> {/* 添加固定高度和flex布局 */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  <Trans>Main Skills</Trans>
                </h3>
                <span className="text-sm text-gray-400">
          {mainSkills.length}/{maxMainSkills}
        </span>
              </div>
              {/* 添加 flex-1 和滚动条 */}
              <Droppable droppableId="mainSkills">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 flex-1 overflow-y-auto"
                  >
                    {mainSkills.map((skill, index) => (
                      <div key={skill.id} className="relative">
                        <SkillCard skill={skill} />
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="absolute top-2 right-2 text-red-500 p-0"
                          onPress={() => removeSkill(skill.id, 'main')}
                        >
                          <X size={20} />
                        </Button>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Support Skills Column */}
            {/* 添加固定高度和flex布局 */}
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-[600px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  <Trans>Support Skills</Trans>
                </h3>
                <span className="text-sm text-gray-400">
          {supportSkills.length}/{maxSupportSkills}
        </span>
              </div>
              {/* 添加 flex-1 和滚动条 */}
              <Droppable droppableId="supportSkills">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 flex-1 overflow-y-auto"
                  >
                    {supportSkills.map((skill, index) => (
                      <div key={skill.id} className="relative">
                        <SkillCard skill={skill} />
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="absolute top-2 right-2 text-red-500 p-0"
                          onPress={() => removeSkill(skill.id, 'support')}
                        >
                          <X size={20} />
                        </Button>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
        </div>
      </DragDropContext>
      {/* 构建信息表单 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
        <Input
          label="Title"
          placeholder="Enter build title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isRequired
          className="w-full"
        />
        <Input
          label="Author"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          isRequired
          className="w-full"
        />
        <Input
          label="Description"
          placeholder="Enter build description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full md:col-span-2"
        />
      </div>
      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button
          color="primary"
          onPress={handleSave}
          className="px-8"
          isLoading={isSaving}
          isDisabled={isSaving}
        >
          {isSaving ? t`Saving...` : t`Save Build`}
        </Button>
      </div>
    </div>
  );
}
