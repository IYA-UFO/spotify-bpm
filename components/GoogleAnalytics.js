import NextScript from 'next/script';

const GoogleAnalytics = () => (
  <>
    <NextScript
      src="https://www.googletagmanager.com/gtag/js?id=UA-68022202-4"
      strategy="afterInteractive"
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
