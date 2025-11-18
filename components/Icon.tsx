import React from 'react';

const Icon = ({ name, className = 'w-6 h-6' }: { name: string; className?: string }) => {
  const icons: { [key: string]: React.JSX.Element } = {
    'home': <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    'services': <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 01-.547-1.806 2 2 0 01.547-1.022m13.378 0l-.477 2.387a6 6 0 01-.517 3.86l-.158.318a6 6 0 01-.517 3.86l-2.387.477a2 2 0 01-1.806-.547a2 2 0 01-.547-1.806l.477-2.387a6 6 0 01.517-3.86l.158-.318a6 6 0 01.517-3.86l2.387-.477a2 2 0 011.806.547a2 2 0 01.547 1.806m-15 0a2 2 0 00-1.022.547l-2.387.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L.55 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 01-.547-1.806 2 2 0 01.547-1.022" />,
    'designs': <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m6-5l-1.414-1.414a2 2 0 00-2.828 0L11 11m-2 2l-1-1m6-5l-1.414-1.414a2 2 0 00-2.828 0L11 11" />,
    'about': <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    'contact': <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    'language': <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4V5m0 4H5m11 4h-5l2.293-2.293M14 11a2 2 0 11-4 0 2 2 0 014 0z" />,
    'emergency': <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    'share': <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />,
    'terms': <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    'privacy': <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    'menu': <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />,
    'close': <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
    'user': <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    'location': <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657l-4.243 4.243a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
    'work': <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    'phone-filled': <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    'whatsapp': <path d="M16.6 7.4c-1.3-1.3-3-2-4.8-2A5.8 5.8 0 006 11.2c0 1 .3 2 .8 2.8l-1 3.5 3.6-1c.8.4 1.7.7 2.6.7h.1a5.8 5.8 0 005.8-5.8c0-1.8-.7-3.5-2-4.8zM12 20.3h-.1c-1 0-2-.2-2.8-.6l-.2-.1-2.1 1.1.6-2-.1-.2a6.9 6.9 0 01-1-4.6 6.8 6.8 0 016.8-6.8c1.9 0 3.6.7 4.8 2s2 3 2 4.8-1.3 6.2-5.1 6.8zm3.3-8.2l-.4-.2c-.2-.1-.4-.1-.6 0l-.7.6c-.1 0-.2.1-.4 0l-1.4-.8a5.7 5.7 0 01-1.3-1.2l-.2-.4.6-.7c.1-.1.1-.3 0-.4l-1-2.4c0-.2-.1-.2-.3-.2l-.8.1h-.1c-.2 0-.4.1-.6.3-.1.2-.6.7-.6 1.7s.7 2 .8 2.1c.1.1 1.3 2.1 3.2 2.8.4.2.8.3 1.1.4.5.1 1 .1 1.3-.1.4-.2 1-1.3 1.2-1.6.2-.3.2-.5.1-.6z" />,
    'facebook': <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
    'download': <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    'chevron-right': <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />,
    'sparkles': <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547a.5.5 0 01-.708 0l-4.242-4.242a.5.5 0 010-.708l.547-.548z" />,
    'movie': <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
    'upload': <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    'brick': <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18M8 6v12m8-12v12" />,
    'helmet': <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 00-10 10v1a1 1 0 001 1h18a1 1 0 001-1v-1A10 10 0 0012 2zM4.1 12a8 8 0 0115.8 0H4.1z" />,
    'building': <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-12a2 2 0 012-2h12a2 2 0 012 2v12M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4M8 12h.01M12 12h.01M16 12h.01M12 8h.01" />,
    'tile': <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />,
    'hammer': <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6l-4-4-6 6-4 4z M8 20l-4-4" />,
    'ruler': <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M8 4v16m8-16v16M6 8v-2m4 2v-2m4 2v-2m4 2v-2" />,
    'trowel': <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l2.5-2.5h10l2.5 2.5H5z M12.5 12.5V3h-1v9.5z" />,
    'email': <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      style={name === 'whatsapp' || name === 'facebook' ? { fill: 'currentColor', strokeWidth: 0 } : {}}
    >
      {icons[name] || <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />}
    </svg>
  );
};

export default Icon;
