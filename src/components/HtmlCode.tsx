
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface HtmlCodeProps {
  htmlCode: string;
}

const HtmlCode: React.FC<HtmlCodeProps> = ({ htmlCode }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode)
      .then(() => {
        setCopied(true);
        toast({
          title: "复制成功",
          description: "HTML代码已复制到剪贴板",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('复制失败:', err);
        toast({
          variant: "destructive",
          title: "复制失败",
          description: "请手动选择并复制代码",
        });
      });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">HTML代码</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check size={14} />
              已复制
            </>
          ) : (
            <>
              <Copy size={14} />
              复制代码
            </>
          )}
        </Button>
      </div>
      
      <Textarea
        value={htmlCode}
        readOnly
        rows={6}
        className="font-mono text-xs bg-gray-50"
      />
      
      <p className="text-xs text-gray-500">
        您可以复制此HTML代码并嵌入到您的网站中。
      </p>
    </div>
  );
};

export default HtmlCode;
