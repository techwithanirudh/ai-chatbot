import type { Message } from 'ai';
import { useSWRConfig } from 'swr';
import { useCopyToClipboard } from 'usehooks-ts';

import type { Vote } from '@/server/db/schema';

import { ThumbDownIcon, ThumbUpIcon } from '../../icons';
import { Button } from '../../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { memo, useState } from 'react';
import equal from 'fast-deep-equal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Check, Copy } from 'lucide-react';

const itemVariants = cva(
  '!p-1 h-fit text-muted-foreground border-none shadow-none transition-colors duration-200 ease-in-out',
  {
    variants: {
      active: {
        true: 'text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
}: {
  chatId: string;
  message: Message;
  vote: Vote | undefined;
  isLoading: boolean;
}) {
  const { mutate } = useSWRConfig();
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  if (isLoading) return null;
  if (message.role === 'user') return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="text-muted-foreground items-center flex flex-row gap-2 opacity-0 transition-opacity group-hover/message:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="p-1 w-fit h-fit text-muted-foreground rounded-md relative"
              variant="ghost"
              onClick={async () => {
                const textFromParts = message.parts
                  ?.filter((part) => part.type === 'text')
                  .map((part) => part.text)
                  .join('\n')
                  .trim();

                if (!textFromParts) {
                  toast.error("There's no text to copy!");
                  return;
                }

                await copyToClipboard(textFromParts);
                setCopied(true);
                toast.success('Copied to clipboard!');
                setTimeout(() => setCopied(false), 2000);
              }}
              aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            >
              <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
              <Copy
                className={`h-4 w-4 transition-all duration-300 ${
                  copied ? 'scale-0' : 'scale-100'
                }`}
              />
              <Check
                className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                  copied ? 'scale-100' : 'scale-0'
                }`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? 'Copied' : 'Copy'}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-upvote"
              className={cn(itemVariants(), 'pointer-events-auto!')}
              disabled={vote?.isUpvoted}
              variant="outline"
              onClick={async () => {
                const upvote = fetch('/api/vote', {
                  method: 'PATCH',
                  body: JSON.stringify({
                    chatId,
                    messageId: message.id,
                    type: 'up',
                  }),
                });

                toast.promise(upvote, {
                  loading: 'Upvoting Response...',
                  success: () => {
                    mutate<Array<Vote>>(
                      `/api/vote?chatId=${chatId}`,
                      (currentVotes) => {
                        if (!currentVotes) return [];

                        const votesWithoutCurrent = currentVotes.filter(
                          (vote) => vote.messageId !== message.id,
                        );

                        return [
                          ...votesWithoutCurrent,
                          {
                            chatId,
                            messageId: message.id,
                            isUpvoted: true,
                          },
                        ];
                      },
                      { revalidate: false },
                    );

                    return 'Upvoted Response!';
                  },
                  error: 'Failed to upvote response.',
                });
              }}
            >
              <ThumbUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upvote Response</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-downvote"
              className={cn(itemVariants(), 'pointer-events-auto!')}
              variant="outline"
              disabled={vote && !vote.isUpvoted}
              onClick={async () => {
                const downvote = fetch('/api/vote', {
                  method: 'PATCH',
                  body: JSON.stringify({
                    chatId,
                    messageId: message.id,
                    type: 'down',
                  }),
                });

                toast.promise(downvote, {
                  loading: 'Downvoting Response...',
                  success: () => {
                    mutate<Array<Vote>>(
                      `/api/vote?chatId=${chatId}`,
                      (currentVotes) => {
                        if (!currentVotes) return [];

                        const votesWithoutCurrent = currentVotes.filter(
                          (vote) => vote.messageId !== message.id,
                        );

                        return [
                          ...votesWithoutCurrent,
                          {
                            chatId,
                            messageId: message.id,
                            isUpvoted: false,
                          },
                        ];
                      },
                      { revalidate: false },
                    );

                    return 'Downvoted Response!';
                  },
                  error: 'Failed to downvote response.',
                });
              }}
            >
              <ThumbDownIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Downvote Response</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;

    return true;
  },
);
