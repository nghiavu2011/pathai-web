import React from 'react';

export const renderMarkdown = (text: string) => {
  if (!text) return null;

  const blocks = text.split(/\n\s*\n/);

  const elements = blocks.map((block, blockIndex) => {
    const processInlineFormatting = (str: string): React.ReactNode[] => {
      return str.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-slate-800 dark:text-slate-100">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    if (block.startsWith('### ')) {
      return <h4 key={blockIndex} className="text-lg font-bold mt-5 mb-2 text-slate-700 dark:text-slate-200">{processInlineFormatting(block.substring(4))}</h4>;
    }
    if (block.startsWith('## ')) {
      return <h3 key={blockIndex} className="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-100">{processInlineFormatting(block.substring(3))}</h3>;
    }

    const lines = block.split('\n').filter(line => line.trim() !== '');
    const isUl = lines.length > 0 && lines.every(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
    const isOl = lines.length > 0 && lines.every(line => line.trim().match(/^\d+\.\s/));

    if (isUl) {
      return (
        <ul key={blockIndex} className="list-none space-y-3 pl-2 mb-4">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex} className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-teal-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>{processInlineFormatting(line.trim().substring(2))}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (isOl) {
      return (
        <ol key={blockIndex} className="list-none space-y-3 pl-2 mb-4">
          {lines.map((line, lineIndex) => {
            const olMatch = line.trim().match(/^(\d+)\.\s/);
            if (!olMatch) return null;
            const number = olMatch[1];
            const textContent = line.trim().substring(olMatch[0].length);
            return (
              <li key={lineIndex} className="flex items-start">
                  <span className="mr-3 flex-shrink-0 h-6 w-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm mt-0.5">{number}</span>
                  <span>{processInlineFormatting(textContent)}</span>
              </li>
            );
          })}
        </ol>
      );
    }
    
    return <p key={blockIndex} className="mb-4">{processInlineFormatting(block)}</p>;
  });

  return <>{elements}</>;
};