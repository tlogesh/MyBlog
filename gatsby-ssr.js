import * as React from 'react';

// Apply the saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en' });
  setHeadComponents([
    <script key="theme" dangerouslySetInnerHTML={{ __html: themeScript }} />,
    <link key="pc1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="pc2" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
    />,
  ]);
};
