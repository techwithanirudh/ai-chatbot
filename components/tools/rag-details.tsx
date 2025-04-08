'use client';

import { useState } from 'react';
import { LoaderIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Markdown } from '@/components/markdown';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from '../artifact/code/code-block';

interface RAGDetailsProps {
  toolName: string;
  isLoading?: boolean;
  result?: any;
  args?: any;
}

const getAction = ({
  toolName,
  isLoading,
}: { toolName: string; isLoading: boolean }) => {
  const actions = {
    getInformation: isLoading ? 'Getting information' : 'Got information',
    understandQuery: isLoading ? 'Understanding query' : 'Understood query',
    addResource: isLoading ? 'Adding resource' : 'Added resource',
    default: isLoading ? 'Thinking' : 'Thought',
  };

  return actions[toolName as keyof typeof actions] || actions.default;
};

export function RAGDetails({
  isLoading,
  toolName,
  result,
  args,
}: RAGDetailsProps) {
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

  const action = getAction({
    toolName,
    isLoading: isLoading ?? false,
  });

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium">{action}...</div>
          <div className="animate-spin">
            <LoaderIcon />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium">{action}</div>
          <button
            data-testid="message-reasoning-toggle"
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
            data-testid="message-reasoning"
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
              <div>
                <h3 className="text-lg font-semibold mb-2">Arguments</h3>
                <CodeBlock
                  node={{ type: 'code', value: JSON.stringify(args, null, 2) }}
                  inline={false}
                  className="text-xs"
                >
                  {args
                    ? JSON.stringify(args, null, 2)
                    : isLoading
                      ? 'Loading...'
                      : 'No arguments available'}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Result</h3>
                <CodeBlock
                  node={{
                    type: 'code',
                    value: JSON.stringify(result, null, 2),
                  }}
                  inline={false}
                  className="text-xs"
                >
                  {result
                    ? JSON.stringify(result, null, 2)
                    : isLoading
                      ? 'Loading...'
                      : 'No result available'}
                </CodeBlock>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
