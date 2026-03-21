import { useState, useRef, useEffect, type ReactNode } from 'react';

interface GlossaryEntry {
  term: string;
  definition: string;
}

interface TooltipProps {
  glossary: GlossaryEntry[];
  text: string;
}

function TooltipWord({ term, definition }: { term: string; definition: string }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'above' | 'below'>('above');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition(rect.top < 120 ? 'below' : 'above');
    }
  }, [show]);

  return (
    <span
      ref={ref}
      className="relative inline-block cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      <span className="border-b border-dashed border-gold/60 text-saffron font-medium">
        {term}
      </span>
      {show && (
        <span
          className={`absolute z-50 left-1/2 -translate-x-1/2 w-56 px-3 py-2 rounded-lg shadow-lg bg-gray-900 text-white text-sm font-sans leading-snug pointer-events-none ${
            position === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <span className="block font-semibold text-gold mb-0.5">{term}</span>
          <span className="block text-gray-200">{definition}</span>
          <span
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 ${
              position === 'above' ? '-bottom-1' : '-top-1'
            }`}
          />
        </span>
      )}
    </span>
  );
}

/**
 * Tooltip component that scans text for glossary terms and wraps them
 * in interactive tooltip spans. Used as a React island in Astro.
 */
export default function Tooltip({ glossary, text }: TooltipProps) {
  if (!glossary || glossary.length === 0 || !text) return <>{text}</>;

  // Sort terms by length (longest first) to match longer terms before substrings
  const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length);

  // Build regex matching any glossary term (case-insensitive, word boundaries)
  const pattern = new RegExp(
    `\\b(${sorted.map((g) => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  // Track which terms we've already tooltipped to avoid duplicates in same block
  const seen = new Set<string>();

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const matchedTerm = match[0];
    const termLower = matchedTerm.toLowerCase();

    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Only tooltip the first occurrence of each term
    if (seen.has(termLower)) {
      parts.push(matchedTerm);
    } else {
      const entry = sorted.find((g) => g.term.toLowerCase() === termLower);
      if (entry) {
        seen.add(termLower);
        parts.push(
          <TooltipWord key={`${termLower}-${match.index}`} term={matchedTerm} definition={entry.definition} />
        );
      } else {
        parts.push(matchedTerm);
      }
    }

    lastIndex = match.index + matchedTerm.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
