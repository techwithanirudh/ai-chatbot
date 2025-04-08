'use client';

import { useState } from 'react';
import { LoaderIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown';

interface RAGDetailsProps {
  isLoading?: boolean;
  result?: string;
  args?: any;
}

export function RAGDetails({ isLoading, result, args }: RAGDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(isLoading);
  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      marginTop: '1rem',
      marginBottom: '0.5rem',
    },
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium">Getting information...</div>
          <div className="animate-spin">
            <LoaderIcon />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium">Got information</div>
          <button
            data-testid="message-rag-toggle"
            type="button"
            className="cursor-pointer"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <ChevronDown
              className={cn(
                {
                  'rotate-180': isExpanded,
                },
                'size-4',
              )}
            />
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            data-testid="message-rag"
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            className="pl-4 border-l flex flex-col gap-4"
          >
            <Markdown>{result}</Markdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
