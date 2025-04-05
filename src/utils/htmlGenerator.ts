
interface HtmlGeneratorParams {
  name: string;
  epitaph: string;
  imageUrl: string | null;
  template: string;
  birthDate?: Date;
}

export const generateHtml = ({
  name,
  epitaph,
  imageUrl,
  template,
  birthDate,
}: HtmlGeneratorParams): string => {
  // Base styles based on template
  let styles = '';
  let containerClass = '';
  
  switch (template) {
    case 'modern':
      styles = `
        body { font-family: 'Playfair Display', serif; margin: 0; padding: 0; background-color: #222; }
        .container { background-color: #2A3441; color: #e0e0e0; border: 1px solid #444; }
        h2 { color: #e0e0e0; }
        .divider { background-color: #666; }
        .image-container { border: 2px solid #444; }
      `;
      containerClass = 'modern-container';
      break;
    case 'elegant':
      styles = `
        body { font-family: 'Playfair Display', serif; margin: 0; padding: 0; background-color: #222; }
        .container { background-color: #1A1A1A; color: #f0f0f0; border: 1px solid #333; }
        h2 { color: #f0f0f0; }
        .divider { background-color: #777; }
        .image-container { border: 2px solid #333; }
      `;
      containerClass = 'elegant-container';
      break;
    case 'minimal':
      styles = `
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #222; }
        .container { background-color: #2C2C2C; color: #e0e0e0; border: 1px solid #444; }
        h2 { color: #e0e0e0; }
        .divider { background-color: #666; }
        .image-container { box-shadow: 0 4px 8px rgba(0,0,0,0.3); }
      `;
      containerClass = 'minimal-container';
      break;
    case 'classic':
    default:
      styles = `
        body { font-family: 'Playfair Display', serif; margin: 0; padding: 0; background-color: #222; }
        .container { background-color: #3A3A3A; color: #e0e0e0; border: 1px solid #555; }
        h2 { color: #e0e0e0; }
        .divider { background-color: #666; }
        .image-container { border: 2px solid #555; }
      `;
      containerClass = 'classic-container';
      break;
  }
  
  // Common styles
  const commonStyles = `
    .container {
      padding: 24px;
      width: 320px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      clip-path: polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 100%, 0% 100%);
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
      background-color: #555;
      color: #ddd;
      font-size: 14px;
    }
    h2 {
      margin: 0 0 12px 0;
      font-size: 24px;
      font-weight: 700;
    }
    .birth-date {
      margin: 0 0 12px 0;
      font-size: 14px;
      opacity: 0.8;
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

  // Format birth date if available
  const formattedBirthDate = birthDate 
    ? new Intl.DateTimeFormat('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(birthDate)
    : null;
  
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
    <div class="image-container">
      ${imageUrl 
        ? `<img class="profile-image" src="${imageUrl}" alt="${name}" />`
        : `<div class="no-image">无图片</div>`
      }
    </div>
    <h2>${name || '姓名'}</h2>
    ${formattedBirthDate ? `<div class="birth-date">${formattedBirthDate}</div>` : ''}
    <div class="divider"></div>
    <p>${epitaph || '这里将显示墓志铭内容...'}</p>
  </div>
</body>
</html>
  `.trim();
  
  return html;
};
