
interface HtmlGeneratorParams {
  name: string;
  epitaph: string;
  imageUrl: string | null;
  template: string;
}

export const generateHtml = ({
  name,
  epitaph,
  imageUrl,
  template,
}: HtmlGeneratorParams): string => {
  // Base styles based on template
  let styles = '';
  let containerClass = '';
  let imageClass = '';
  
  switch (template) {
    case 'modern':
      styles = `
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .container { background-color: #D3E4FD; color: #333; }
        h2 { color: #0E5A8A; }
        .divider { background-color: #0E5A8A; }
        .image-container { border: 4px solid white; }
      `;
      containerClass = 'modern-container';
      imageClass = 'modern-image';
      break;
    case 'elegant':
      styles = `
        body { font-family: 'Playfair Display', serif; margin: 0; padding: 0; }
        .container { background-color: #FDE1D3; color: #333; }
        h2 { color: #5D4037; }
        .divider { background-color: #5D4037; }
        .image-container { border: 2px solid #5D4037; }
      `;
      containerClass = 'elegant-container';
      imageClass = 'elegant-image';
      break;
    case 'minimal':
      styles = `
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .container { background-color: #F1F0FB; color: #333; }
        h2 { color: #333; }
        .divider { background-color: #333; }
        .image-container { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
      `;
      containerClass = 'minimal-container';
      imageClass = 'minimal-image';
      break;
    case 'classic':
    default:
      styles = `
        body { font-family: 'Playfair Display', serif; margin: 0; padding: 0; }
        .container { background-color: white; color: #333; }
        h2 { color: #333; }
        .divider { background-color: #666; }
        .image-container { border: 4px solid #eee; }
      `;
      containerClass = 'classic-container';
      imageClass = 'classic-image';
      break;
  }
  
  // Common styles
  const commonStyles = `
    .container {
      padding: 24px;
      width: 320px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .image-container {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .no-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      color: #999;
      font-size: 14px;
    }
    h2 {
      margin: 0 0 12px 0;
      font-size: 24px;
      font-weight: 700;
    }
    .divider {
      width: 64px;
      height: 2px;
      margin: 0 0 16px 0;
    }
    p {
      margin: 0;
      line-height: 1.5;
      font-size: 16px;
    }
  `;
  
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name || '墓志铭'}卡片</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    ${commonStyles}
    ${styles}
  </style>
</head>
<body>
  <div class="container ${containerClass}">
    <div class="image-container ${imageClass}">
      ${imageUrl 
        ? `<img class="profile-image" src="${imageUrl}" alt="${name}" />`
        : `<div class="no-image">无图片</div>`
      }
    </div>
    <h2>${name || '姓名'}</h2>
    <div class="divider"></div>
    <p>${epitaph || '这里将显示墓志铭内容...'}</p>
  </div>
</body>
</html>
  `.trim();
  
  return html;
};
