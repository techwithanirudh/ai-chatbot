'use client';

import { useState } from 'react';
import { LoaderIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlockCode } from '../chat/markdown/code-block';
import { TextShimmer } from '../ui/text-shimmer';

interface ToolDetailsProps {
  toolName: string;
  isLoading?: boolean;
  result?: any;
  args?: any;
}

export function ToolDetails({
  isLoading,
  toolName,
  result,
  args,
}: ToolDetailsProps) {
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

  const formatContent = (content: any): string => {
    try {
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          return JSON.stringify(parsed, null, 2);
        } catch {
          return content;
        }
      }
      return JSON.stringify(content, null, 2);
    } catch {
      return String(content);
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-row gap-2 items-center">
          <TextShimmer className="font-medium">{`Calling ${toolName}`}</TextShimmer>
          <div className="animate-spin">
            <LoaderIcon />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium">Called {toolName}</div>
          <button
            data-testid="message-tool-details-toggle"
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
            data-testid="message-tool-details"
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            className="pl-4 border-l flex flex-col gap-4"
          >
            <div className="space-y-4">
              {!!args && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground/70">
                    <Code className="size-4" />
                    <span>Arguments</span>
                  </div>
                  <CodeBlockCode
                    className="text-xs rounded-xl"
                    language="json"
                    code={formatContent(args)}
                  />
                </div>
              )}

              {!!result && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground/70">
                    <ArrowRight className="size-4" />
                    <span>Result</span>
                  </div>
                  <CodeBlockCode
                    className="text-xs rounded-xl"
                    language="json"
                    code={formatContent(result)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
