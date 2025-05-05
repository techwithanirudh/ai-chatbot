'use client';

import { useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { updateChatTitle } from '@/app/(chat)/actions';
import {
  getChatHistoryPaginationKey,
  type ChatHistory,
} from '@/components/sidebar/sidebar-history';

export function useChatTitle({
  chatId,
  initialTitle,
}: {
  chatId: string;
  initialTitle: string;
}) {
  const { mutate, cache } = useSWRConfig();
  const history: ChatHistory = cache.get('/api/history')?.data;

  const { data: localTitle, mutate: setLocalTitle } = useSWR(
    `${chatId}-title`,
    null,
    {
      fallbackData: initialTitle,
    },
  );

  const title = useMemo(() => {
    if (!history) return localTitle;
    const chat = history.chats.find((chat) => chat.id === chatId);
    if (!chat) return 'New Chat';
    return chat.title;
  }, [history, chatId, localTitle]);

  const setTitle = (updatedTitle: string) => {
    setLocalTitle(updatedTitle);
    mutate(unstable_serialize(getChatHistoryPaginationKey));

    updateChatTitle({
      chatId: chatId,
      title: updatedTitle,
    });
  };

  return { title, setTitle };
}
