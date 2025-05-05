import type { Chat } from '@/server/db/schema';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CheckCircleFillIcon,
  GlobeIcon,
  LockIcon,
  MoreHorizontalIcon,
  PencilEditIcon,
  ShareIcon,
  TrashIcon,
} from '@/components/icons';
import { memo, useState } from 'react';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { useChatTitle } from '@/hooks/use-chat-title';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

const PureChatItem = ({
  chat,
  isActive,
  onDelete,
  setOpenMobile,
}: {
  chat: Chat;
  isActive: boolean;
  onDelete: (chatId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) => {
  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId: chat.id,
    initialVisibility: chat.visibility,
  });
  const { title, setTitle } = useChatTitle({
    chatId: chat.id,
    initialTitle: chat.title,
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SidebarMenuItem className="md:-mx-2">
      <SidebarMenuButton
        asChild
        isActive={isActive}
        size="default"
        className={cn('h-fit py-2 px-3', isEditing && '!p-0')}
      >
        {isEditing ? (
          <div>
            <Input
              defaultValue={title}
              className="h-fit p-0 bg-transparent border-none w-full rounded-md !ring-0 !outline-none py-2 px-3"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsEditing(false);
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setTitle(e.currentTarget.value);
                  setIsEditing(false);
                }
              }}
              onBlur={(e) => {
                const newTitle = e.target.value.trim();
                if (newTitle && newTitle !== title) {
                  setTitle(newTitle);
                }
                setIsEditing(false);
              }}
            />
          </div>
        ) : (
          <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
            <span>{title}</span>
          </Link>
        )}
      </SidebarMenuButton>

      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild className={isEditing ? 'hidden' : ''}>
          <SidebarMenuAction
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mr-0.5 !top-2"
            showOnHover={!isActive}
          >
            <MoreHorizontalIcon />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsEditing(true)}
          >
            <PencilEditIcon />
            <span>Rename</span>
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <ShareIcon />
              <span>Share</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer flex-row justify-between"
                  onClick={() => {
                    setVisibilityType('private');
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <LockIcon size={12} />
                    <span>Private</span>
                  </div>
                  {visibilityType === 'private' ? (
                    <CheckCircleFillIcon />
                  ) : null}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex-row justify-between"
                  onClick={() => {
                    setVisibilityType('public');
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <GlobeIcon />
                    <span>Public</span>
                  </div>
                  {visibilityType === 'public' ? <CheckCircleFillIcon /> : null}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500"
            onSelect={() => onDelete(chat.id)}
          >
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
  if (prevProps.isActive !== nextProps.isActive) return false;
  if (prevProps.chat.title !== nextProps.chat.title) return false;
  return true;
});
