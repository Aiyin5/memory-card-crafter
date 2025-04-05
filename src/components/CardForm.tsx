
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface CardFormProps {
  name: string;
  epitaph: string;
  template: string;
  birthDate: Date | undefined;
  setName: (name: string) => void;
  setEpitaph: (epitaph: string) => void;
  setTemplate: (template: string) => void;
  setBirthDate: (date: Date | undefined) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  name,
  epitaph,
  template,
  birthDate,
  setName,
  setEpitaph,
  setTemplate,
  setBirthDate,
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
          className="bg-secondary/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">出生日期</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-secondary/50",
                !birthDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {birthDate ? format(birthDate, 'yyyy年MM月dd日', { locale: zhCN }) : <span>选择出生日期</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={birthDate}
              onSelect={setBirthDate}
              initialFocus
              locale={zhCN}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="epitaph">
          墓志铭内容 <span className="text-xs text-muted-foreground">(最多100字)</span>
        </Label>
        <Textarea
          id="epitaph"
          placeholder="请输入墓志铭内容"
          value={epitaph}
          onChange={(e) => setEpitaph(e.target.value)}
          rows={4}
          maxLength={100}
          className="resize-none bg-secondary/50"
        />
        <div className="text-xs text-right text-muted-foreground">
          {epitaph.length}/100
        </div>
      </div>

      <div className="space-y-2">
        <Label>墓碑样式</Label>
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
            <Label htmlFor="elegant" className="cursor-pointer">庄重</Label>
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
