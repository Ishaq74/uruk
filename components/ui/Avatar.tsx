import React from 'react';

const Avatar: React.FC<{ src?: string; alt?: string; className?: string }> = ({ src, alt, className }) => (
    <img src={src} alt={alt} className={`rounded-full object-cover ${className}`} />
);

export default Avatar;
