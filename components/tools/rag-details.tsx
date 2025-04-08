'use client';

import { useState } from 'react';
import { LoaderIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
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
            <div className="space-y-4">
              {toolName === 'getInformation' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-medium">Question</div>
                    <p className="text-muted-foreground">{args?.question}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-medium">Results</div>
                    {isLoading && (
                      <span className="font-medium">Getting results...</span>
                    )}
                    {result?.map((item: any, index: number) => (
                      <div key={index} className="flex flex-col gap-2 relative">
                        <div className="text-sm font-medium text-muted-foreground absolute bottom-0 right-0 m-[1px] text-[10px] bg-card rounded-br-xl rounded-t-md p-1">
                          {Number(item?.similarity).toFixed(3)}
                        </div>
                        <CodeBlock
                          node={item?.content}
                          inline={false}
                          className="text-sm"
                        >
                          {item?.name?.trim()}
                        </CodeBlock>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {toolName === 'understandQuery' && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-medium">Query</div>
                    <p className="text-muted-foreground">{args?.query}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-medium">Results</div>
                    {isLoading && (
                      <span className="font-medium">Getting results...</span>
                    )}
                    <ul className="list-disc pl-4">
                      {result?.map((item: any, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
