'use client';

import { useEffect } from 'react';

/**
 * Mailchimp Popup Integration Component
 * 
 * This component loads the Mailchimp popup script into the application.
 * It uses useEffect to ensure the script only runs on the client side.
 * The script is added to the document head and removed on component unmount.
 */
const MailchimpPopup = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.id = 'mcjs';
    script.innerHTML = `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/4b2ca0f52158d3cc1c7e02cde/ec0148639445a3b88c06c214d.js")`;
    
    // Add the script to the document head
    document.head.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      const existingScript = document.getElementById('mcjs');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs once when component mounts

  // This component doesn't render anything visible
  return null;
};

export default MailchimpPopup; 