'use client';

import { useState } from 'react';
import { LoaderIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown';
import { TextShimmer } from '../ui/text-shimmer';

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
          <TextShimmer className="font-medium">
            Getting information...
          </TextShimmer>
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Question</div>
                <p className="text-muted-foreground">{args?.question}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Results</div>
                {isLoading && !result && (
                  <span className="text-muted-foreground">Thinking...</span>
                )}
                <Markdown className={'text-muted-foreground'}>
                  {result}
                </Markdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
