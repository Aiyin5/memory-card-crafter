
import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface CardPreviewProps {
  name: string;
  epitaph: string;
  imageUrl: string | null;
  template: string;
  birthDate: Date | undefined;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  name,
  epitaph,
  imageUrl,
  template,
  birthDate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const getTemplateClasses = () => {
    const baseClasses = "card-template";
    switch (template) {
      case 'modern':
        return `${baseClasses} card-modern`;
      case 'elegant':
        return `${baseClasses} card-elegant`;
      case 'minimal':
        return `${baseClasses} card-minimal`;
      case 'classic':
      default:
        return `${baseClasses} card-classic`;
    }
  };

  const getImageStyles = () => {
    switch (template) {
      case 'modern':
        return 'border-2 border-gray-600';
      case 'elegant':
        return 'border-2 border-gray-500';
      case 'minimal':
        return 'border-none shadow-lg';
      case 'classic':
      default:
        return 'border-2 border-gray-500';
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${name || '墓志铭'}_卡片.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('下载失败:', error);
    }
  };

  const formattedBirthDate = birthDate 
    ? format(birthDate, 'yyyy年MM月dd日', { locale: zhCN })
    : null;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-lg font-medium">预览</div>
      
      <div
        ref={cardRef}
        className={`${getTemplateClasses()} p-6 w-full max-w-xs mx-auto shadow-lg`}
      >
        <div className="flex flex-col items-center space-y-4">
          {imageUrl ? (
            <div className={`w-24 h-24 rounded-full overflow-hidden ${getImageStyles()}`}>
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center ${getImageStyles()}`}>
              <span className="text-gray-300 text-xl">无图片</span>
            </div>
          )}
          
          <h2 className="text-xl font-serif font-bold">
            {name || '姓名'}
          </h2>
          
          {formattedBirthDate && (
            <p className="text-sm opacity-80">
              {formattedBirthDate}
            </p>
          )}
          
          <div className="w-16 h-0.5 bg-gray-400"></div>
          
          <p className="text-center font-serif">
            {epitaph || '这里将显示墓志铭内容...'}
          </p>
        </div>
      </div>
      
      <Button
        onClick={handleDownload}
        className="mt-6 flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200 rounded-lg shadow-md hover:shadow-lg active:scale-95 transform"
        disabled={!name && !epitaph && !imageUrl}
      >
        <Download size={16} />
        下载卡片
      </Button>
    </div>
  );
};

export default CardPreview;
