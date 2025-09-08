import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';
import { Chat } from '@/components/chat';
import { getChatById, getMessagesByChatId } from '@/server/db/queries';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import type { DBMessage } from '@/server/db/schema';
import type { Attachment, UIMessage } from 'ai';
import { SidebarIsland } from '@/components/sidebar/sidebar-island';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const user = await currentUser();

  if (chat.visibility === 'private') {
    if (!user || !user.id) {
      return notFound();
    }

    if (user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: '',
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');

  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          id={chat.id}
          initialMessages={convertToUIMessages(messagesFromDb)}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          selectedVisibilityType={chat.visibility}
          isReadonly={user?.id !== chat.userId}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <SidebarIsland
        chatId={id}
        isReadonly={user?.id !== chat.userId}
      />
      <Chat
        id={chat.id}
        initialMessages={convertToUIMessages(messagesFromDb)}
        selectedChatModel={chatModelFromCookie.value}
        selectedVisibilityType={chat.visibility}
        isReadonly={user?.id !== chat.userId}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
