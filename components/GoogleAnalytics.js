import React from 'react';

const GoogleAnalytics = () => (
  <>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-68022202-4"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', 'UA-68022202-4');
        `,
      }}
    />
  </>
);

export default GoogleAnalytics;
