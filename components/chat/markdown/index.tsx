import 'katex/dist/katex.min.css';
import Link from 'next/link';
import React, { memo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlock, CodeBlockGroup, CodeBlockCode } from './code-block';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from 'usehooks-ts';
import { Button } from '../../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { CopyIcon } from '../../icons';
import { toast } from 'sonner';

function extractLanguage(className?: string): string {
  if (!className) return 'plaintext';
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : 'plaintext';
}

const components: Partial<Components> = {
  code: function CodeComponent({ className, children, ...props }) {
    const [_, copyToClipboard] = useCopyToClipboard();
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line;

    if (isInline) {
      return (
        <span
          className={cn(
            'bg-primary-foreground rounded-sm px-1 font-mono text-sm',
            className,
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    const language = extractLanguage(className);

    return (
      <CodeBlock className={className}>
        <CodeBlockGroup className="flex h-9 items-center justify-between px-4">
          <div className="text-muted-foreground py-1 pr-2 font-mono text-xs">
            {language}
          </div>
        </CodeBlockGroup>
        <div className="sticky top-16 lg:top-0">
          <div className="absolute right-0 bottom-0 flex h-9 items-center pr-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="p-1 h-fit text-muted-foreground"
                  variant="ghost"
                  onClick={async () => {
                    if (!children) {
                      toast.error("There's no text to copy!");
                      return;
                    }

                    await copyToClipboard(children as string);
                    toast.success('Copied to clipboard!');
                  }}
                >
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <CodeBlockCode code={children as string} language={language} />
      </CodeBlock>
    );
  },
  pre: ({ children }) => <>{children}</>,
  ol: ({ node, children, ...props }) => {
    return (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ node, children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ node, children, ...props }) => {
    return (
      <ul className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ node, children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ node, children, ...props }) => {
    return (
      <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ node, children, ...props }) => {
    return (
      <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ node, children, ...props }) => {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ node, children, ...props }) => {
    return (
      <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ node, children, ...props }) => {
    return (
      <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ node, children, ...props }) => {
    return (
      <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
        {children}
      </h6>
    );
  },
};

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeKatex];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const processedText = children
    .replace(/\\\[/g, `$$$`)
    .replace(/\\\]/g, `$$$`)
    .replace(/\\\(/g, `$$$`)
    .replace(/\\\)/g, `$$$`);

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {processedText}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
