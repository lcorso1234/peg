'use client';

import { useState } from 'react';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const phoneNumber = '7089066526';
  const contactFileName = 'Peggy_McGonigle.vcf';
  const smsMessage = encodeURIComponent(
    'Hi! Thanks for connecting with Peggy McGonigle at McGonigle Dental. Looking forward to helping you stop hiding your smile!'
  );

  const saveContact = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Peggy McGonigle
N:McGonigle;Peggy;;;
TEL;TYPE=CELL:${phoneNumber}
ORG:McGonigle Dental
URL:https://mcgonigledental.com
NOTE:Stop hiding your smile
END:VCARD`;

    const vCardUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // iOS Safari ignores blob downloads; navigate directly to a data URL to open the contact sheet.
    if (isIOS) {
      window.location.href = vCardUrl;
      return;
    }

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = contactFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const launchSms = () => {
    const smsLink = `sms:${phoneNumber}?&body=${smsMessage}`;
    window.location.href = smsLink;
  };

  const handleSaveContact = () => {
    setIsAnimating(false);
    saveContact();
    setTimeout(launchSms, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 noise-bg">
      <main className="w-full max-w-md">
        {/* 3D Business Card */}
        <div className="business-card bg-gunmetal rounded-2xl p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
              Peggy McGonigle
            </h1>
            <div className="w-20 h-1 bg-neon-green mx-auto rounded-full shadow-neon"></div>
          </div>

          {/* Note */}
          <div className="text-center mb-8 py-4">
            <p className="text-neon-green text-2xl font-bold italic tracking-wide glow-text">
              "Stop hiding your smile"
            </p>
          </div>

          {/* Save Contact Button */}
          <button
            onClick={handleSaveContact}
            onMouseEnter={() => setIsAnimating(true)}
            className={`w-full bg-neon-green text-gunmetal font-bold py-4 px-6 rounded-xl 
              shadow-button hover:shadow-button-hover transition-all duration-300 
              hover:scale-105 active:scale-95 text-lg
              ${isAnimating ? 'jiggle' : ''}`}
          >
            💾 Save Contact
          </button>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-gray-600 pt-6">
            <p className="text-gray-300 text-sm font-semibold mb-1">
              Built in America, on earth.
            </p>
            <p className="text-gray-400 text-xs italic">
              Making relationships built to last, the American Way.
            </p>
          </div>

          {/* Decorative Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-green opacity-10 rounded-full blur-3xl"></div>
        </div>
      </main>
    </div>
  );
}
