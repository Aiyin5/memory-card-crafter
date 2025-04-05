
import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';

interface CardPreviewProps {
  name: string;
  epitaph: string;
  imageUrl: string | null;
  template: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  name,
  epitaph,
  imageUrl,
  template,
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
        return 'border-4 border-white';
      case 'elegant':
        return 'border-2 border-gray-800';
      case 'minimal':
        return 'border-none shadow-lg';
      case 'classic':
      default:
        return 'border-4 border-gray-200';
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

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-lg font-medium">预览</div>
      
      <div
        ref={cardRef}
        className={`${getTemplateClasses()} p-6 w-full max-w-xs mx-auto`}
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
            <div className={`w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center ${getImageStyles()}`}>
              <span className="text-gray-400 text-xl">无图片</span>
            </div>
          )}
          
          <h2 className={`text-xl font-serif font-bold ${template === 'classic' ? 'text-gray-800' : ''}`}>
            {name || '姓名'}
          </h2>
          
          <div className="w-16 h-0.5 bg-gray-400"></div>
          
          <p className={`text-center font-serif ${template === 'classic' ? 'text-gray-700' : ''}`}>
            {epitaph || '这里将显示墓志铭内容...'}
          </p>
        </div>
      </div>
      
      <Button
        onClick={handleDownload}
        className="mt-6 flex items-center gap-2"
        disabled={!name && !epitaph && !imageUrl}
      >
        <Download size={16} />
        下载卡片
      </Button>
    </div>
  );
};

export default CardPreview;
