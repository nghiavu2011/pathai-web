import React from 'react';

interface QuizCardIconProps {
  quizId: string;
}

const QuizCardIcon: React.FC<QuizCardIconProps> = ({ quizId }) => {
  const iconSize = "48px";
  const commonProps = { width: iconSize, height: iconSize };
  
  // New Theme Colors
  const strokeColor = "#4A6753"; // Deep Sage Green (matches sage-600)
  const fillColor = "#E3E9E5";   // Light Sage (matches sage-100)
  const accentFill = "#4A6753";  // For filled dots

  switch (quizId) {
    case 'holland': // Compass for direction
      return (
        <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
            <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.1716 26.8284L28.2426 19.7574" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
            <path d="M28.2426 19.7574L25.4142 19.7574L28.2426 22.5858L28.2426 19.7574Z" fill={accentFill}/>
        </svg>
      );
    case 'mi': // Lightbulb for intelligence/ideas
       return (
        <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
            <path d="M24 28C27.3137 28 30 25.3137 30 22C30 18.6863 27.3137 16 24 16C20.6863 16 18 18.6863 18 22C18 23.8553 18.8553 25.5242 20.2426 26.5858" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 30H27" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 28L21.5 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 28L26.5 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.59 21.41L25.41 24.24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.59 24.24L25.41 21.41" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
       );
    case 'grit': // Mountain for perseverance
      return (
        <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
            <path d="M14 34L22 22L27 30L30 26L34 34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 22V16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 16L25 17.5L22 19" fill={accentFill}/>
        </svg>
      );
    case 'cdb': // Untangling lines for barriers
       return (
        <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
            <path d="M18 18C18 18 24 24 18 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 18C30 18 24 24 30 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 24H34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M34 24L30 21" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
       );
    case 'crs': // Rocket for readiness/launch
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <path d="M24 14C24 14 19 21 19 26C19 28.7614 21.2386 31 24 31C26.7614 31 29 28.7614 29 26C29 21 24 14 24 14Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 26L16 29" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29 26L32 29" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 31V34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 20C24 20 22 22 22 24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
            </svg>
        );
    case 'gms': // Growing plant for growth mindset
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <path d="M24 34V20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 20C24 20 19 18 19 14C19 11.7909 20.7909 10 23 10C25.2091 10 27 11.7909 27 14" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 26C24 26 28 25 28 22" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 24C24 24 20 23 20 20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
    case 'schein': // Anchor for career anchors
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <path d="M24 14V34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 20H31" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 28C16 32.4183 19.5817 36 24 36C28.4183 36 32 32.4183 32 28" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="13" r="3" stroke={strokeColor} strokeWidth="2"/>
            </svg>
        );
    case 'work-values': // Star or Diamond for Values
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <path d="M24 14L26.5 20.5L33.5 21L28 25.5L29.5 32.5L24 29L18.5 32.5L20 25.5L14.5 21L21.5 20.5L24 14Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
    case 'context': // Tree roots for context/foundation
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <path d="M24 14V26" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 26C24 26 20 30 16 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 26C24 26 28 30 32 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 20C24 20 20 18 20 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 22C24 22 28 20 28 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 30V34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
                <path d="M32 30V34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 26V34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>
            </svg>
        );
    case 'wheel': // Wheel chart icon
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <circle cx="24" cy="24" r="10" stroke={strokeColor} strokeWidth="2"/>
                <path d="M24 14V34" stroke={strokeColor} strokeWidth="2"/>
                <path d="M14 24H34" stroke={strokeColor} strokeWidth="2"/>
                <path d="M17 17L31 31" stroke={strokeColor} strokeWidth="2"/>
                <path d="M31 17L17 31" stroke={strokeColor} strokeWidth="2"/>
            </svg>
        );
    case 'big-five': // 5 connected dots or fingerprint
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <circle cx="24" cy="16" r="2" fill={accentFill}/>
                <circle cx="32" cy="22" r="2" fill={accentFill}/>
                <circle cx="29" cy="31" r="2" fill={accentFill}/>
                <circle cx="19" cy="31" r="2" fill={accentFill}/>
                <circle cx="16" cy="22" r="2" fill={accentFill}/>
                <path d="M24 16L32 22L29 31H19L16 22L24 16Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
    case 'eq': // Heart and Brain connection
        return (
            <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
                <path d="M17 20C17 17.7909 18.7909 16 21 16C23.2091 16 25 17.7909 25 20C25 22.2091 23 24 21 26L17 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31 20C31 17.7909 29.2091 16 27 16C24.7909 16 23 17.7909 23 20C23 22.2091 25 24 27 26L31 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 30L24 36L31 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
    default:
      return (
        <svg {...commonProps} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="40" height="40" rx="20" fill={fillColor}/>
            <circle cx="24" cy="24" r="10" stroke={strokeColor} strokeWidth="2"/>
        </svg>
      );
  }
};

export default QuizCardIcon;