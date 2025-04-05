
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageChange: (imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 将图像转换为灰度图像
  const convertToGrayscale = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageUrl); // 如果无法获取上下文，返回原始图像
          return;
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 绘制原始图像
        ctx.drawImage(img, 0, 0);
        
        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 应用灰度滤镜
        for (let i = 0; i < data.length; i += 4) {
          const gray = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
          data[i] = gray;     // 红色通道
          data[i + 1] = gray; // 绿色通道
          data[i + 2] = gray; // 蓝色通道
          // data[i + 3] 是 alpha 通道，保持不变
        }
        
        // 将处理后的数据放回画布
        ctx.putImageData(imageData, 0, 0);
        
        // 转换为 base64 字符串
        const grayImageUrl = canvas.toDataURL('image/png');
        resolve(grayImageUrl);
      };
      
      img.src = imageUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      // 将图像转换为灰度
      const grayImageUrl = await convertToGrayscale(result);
      setPreview(grayImageUrl);
      onImageChange(grayImageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium">头像上传</div>
      <div className="flex flex-col items-center">
        {preview ? (
          <div className="relative w-32 h-32 mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <Button 
          onClick={handleButtonClick}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Upload size={16} />
          上传图片
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
