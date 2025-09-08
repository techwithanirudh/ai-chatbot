'use client';

import type { Attachment, UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChatHeader } from '@/components/chat/chat-header';
import type { Vote } from '@/server/db/schema';
import { cn, fetcher, generateUUID } from '@/lib/utils';
import { Artifact } from '../artifact';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import type { VisibilityType } from './visibility-selector';
import { useArtifactSelector } from '@/hooks/use-artifact';
import { toast } from 'sonner';
import { Greeting } from '../greeting';
import { unstable_serialize } from 'swr/infinite';
import { getChatHistoryPaginationKey } from '@/components/sidebar/sidebar-history';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<UIMessage>;
  selectedChatModel: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, selectedChatModel: selectedChatModel },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate(unstable_serialize(getChatHistoryPaginationKey));
    },
    onError: () => {
      toast.error('An error occurred, please try again!');
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex w-full bg-sidebar pt-3 transition-all md:group-has-data-[state=collapsed]/sidebar-wrapper:p-0 h-dvh min-w-0 max-md:p-0">
        <div className="flex flex-col flex-1 min-w-0 md:group-has-data-[state=collapsed]/sidebar-wrapper:border-none bg-background rounded-tl-xl  md:group-has-data-[state=collapsed]/sidebar-wrapper:rounded-none max-md:rounded-none border border-border p-2">
          <ChatHeader
            chatId={id}
            selectedModelId={selectedChatModel}
            selectedVisibilityType={selectedVisibilityType}
            isReadonly={isReadonly}
          />

          <div
            className={cn('flex flex-col flex-1 overflow-y-auto', {
              'items-center justify-end md:justify-center': messages.length === 0,
            })}
          >
            <AnimatePresence initial={true} mode="popLayout">
              {messages.length === 0 ? (
                <Greeting />
              ) : (
                <Messages
                  chatId={id}
                  status={status}
                  votes={votes}
                  messages={messages}
                  setMessages={setMessages}
                  reload={reload}
                  isReadonly={isReadonly}
                  isArtifactVisible={isArtifactVisible}
                />
              )}
            </AnimatePresence>

            <motion.form
              className={cn(
                'flex relative z-50 mx-auto w-full px-4 pb-2 gap-2 md:max-w-3xl',
              )}
              layout="position"
              layoutId="chat-input-container"
              transition={{
                layout: {
                  duration: 0.15,
                  ease: 'easeOut',
                },
              }}
            >
              {!isReadonly && (
                <MultimodalInput
                  chatId={id}
                  input={input}
                  setInput={setInput}
                  handleSubmit={handleSubmit}
                  status={status}
                  stop={stop}
                  attachments={attachments}
                  setAttachments={setAttachments}
                  messages={messages}
                  setMessages={setMessages}
                  append={append}
                  selectedModelId={selectedChatModel}
                />
              )}
            </motion.form>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Chatbot can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
        selectedModelId={selectedChatModel}
      />
    </>
  );
}
