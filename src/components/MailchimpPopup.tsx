'use client';

import { useEffect } from 'react';

const MailchimpPopup = () => {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_MAILCHIMP_POPUP === 'true';
  const scriptSrc =
    'https://chimpstatic.com/mcjs-connected/js/users/4b2ca0f52158d3cc1c7e02cde/ec0148639445a3b88c06c214d.js';

  useEffect(() => {
    if (!enabled) return;

    const script = document.createElement('script');
    script.id = 'mcjs';
    script.async = true;
    script.src = scriptSrc;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
      // Avoid noisy console errors in production
      console.warn('Mailchimp popup script failed to load');
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('mcjs');
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [enabled, scriptSrc]);

  return null;
};

export default MailchimpPopup;
