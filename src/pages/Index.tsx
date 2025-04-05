
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ImageUpload from '@/components/ImageUpload';
import CardForm from '@/components/CardForm';
import CardPreview from '@/components/CardPreview';
import HtmlCode from '@/components/HtmlCode';
import { generateHtml } from '@/utils/htmlGenerator';

const Index = () => {
  const [name, setName] = useState('');
  const [epitaph, setEpitaph] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [template, setTemplate] = useState('classic');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [htmlCode, setHtmlCode] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  // Generate HTML whenever form data changes
  useEffect(() => {
    const code = generateHtml({
      name,
      epitaph,
      imageUrl,
      template,
      birthDate,
    });
    setHtmlCode(code);
  }, [name, epitaph, imageUrl, template, birthDate]);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-100">墓志铭卡片生成器</h1>
          <p className="text-gray-400 mt-2">创建并下载个性化的墓志铭卡片</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-800">
            <TabsTrigger value="edit">编辑</TabsTrigger>
            <TabsTrigger value="preview">预览</TabsTrigger>
            <TabsTrigger value="code">代码</TabsTrigger>
          </TabsList>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <TabsContent value="edit">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-6">
                    <ImageUpload onImageChange={setImageUrl} />
                    
                    <Separator className="bg-gray-700" />
                    
                    <CardForm
                      name={name}
                      epitaph={epitaph}
                      template={template}
                      birthDate={birthDate}
                      setName={setName}
                      setEpitaph={setEpitaph}
                      setTemplate={setTemplate}
                      setBirthDate={setBirthDate}
                    />
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setName('');
                          setEpitaph('');
                          setImageUrl(null);
                          setTemplate('classic');
                          setBirthDate(undefined);
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                      >
                        重置
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('preview')}
                        className="bg-gray-700 hover:bg-gray-600"
                      >
                        预览卡片
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="preview">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <CardPreview
                    name={name}
                    epitaph={epitaph}
                    imageUrl={imageUrl}
                    template={template}
                    birthDate={birthDate}
                  />
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('edit')}
                      className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                      返回编辑
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('code')}
                      className="bg-gray-700 hover:bg-gray-600"
                    >
                      查看代码
                    </Button>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="code">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <HtmlCode htmlCode={htmlCode} />
                  
                  <div className="flex justify-start mt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('preview')}
                      className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                      返回预览
                    </Button>
                  </div>
                </ScrollArea>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
