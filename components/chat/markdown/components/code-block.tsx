import { CodeBlock, CodeBlockGroup, CodeBlockCode } from '../../../code-block';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from 'usehooks-ts';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';
import { toast } from 'sonner';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function extractLanguage(className?: string): string {
  if (!className) return 'plaintext';
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : 'plaintext';
}

interface CodeComponentProps {
  node?: any;
  className?: string;
  children?: React.ReactNode;
}

export function CodeComponent({
  node,
  className,
  children,
  ...props
}: CodeComponentProps) {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const isInline =
    !node?.position?.start.line ||
    node?.position?.start.line === node?.position?.end.line;

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

  const handleCopy = () => {
    copyToClipboard(children as string);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeBlock className={cn('overflow-auto max-w-2xl', className)}>
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
                size="icon"
                className="p-1 w-fit h-fit text-muted-foreground rounded-md relative"
                variant="ghost"
                onClick={handleCopy}
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
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <CodeBlockCode
        className="overflow-auto max-w-2xl"
        code={children as string}
        language={language}
      />
    </CodeBlock>
  );
}
