
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CardFormProps {
  name: string;
  epitaph: string;
  template: string;
  setName: (name: string) => void;
  setEpitaph: (epitaph: string) => void;
  setTemplate: (template: string) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  name,
  epitaph,
  template,
  setName,
  setEpitaph,
  setTemplate,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">姓名</Label>
        <Input
          id="name"
          placeholder="请输入姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="epitaph">
          墓志铭内容 <span className="text-xs text-gray-500">(最多100字)</span>
        </Label>
        <Textarea
          id="epitaph"
          placeholder="请输入墓志铭内容"
          value={epitaph}
          onChange={(e) => setEpitaph(e.target.value)}
          rows={4}
          maxLength={100}
          className="resize-none"
        />
        <div className="text-xs text-right text-gray-500">
          {epitaph.length}/100
        </div>
      </div>

      <div className="space-y-2">
        <Label>卡片样式</Label>
        <RadioGroup
          value={template}
          onValueChange={setTemplate}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="classic" id="classic" />
            <Label htmlFor="classic" className="cursor-pointer">经典</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="modern" id="modern" />
            <Label htmlFor="modern" className="cursor-pointer">现代</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="elegant" id="elegant" />
            <Label htmlFor="elegant" className="cursor-pointer">优雅</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="minimal" />
            <Label htmlFor="minimal" className="cursor-pointer">简约</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default CardForm;
