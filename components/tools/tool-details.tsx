'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { CodeBlock } from '../artifact/code/code-block';

interface ToolDetailsProps {
  toolName: string;
  isLoading?: boolean;
  result?: any;
  args?: any;
}

export function ToolDetails({
  toolName,
  isLoading,
  result,
  args,
}: ToolDetailsProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={isLoading ? toolName : undefined}
    >
      <AccordionItem value={toolName} className="border-0">
        <AccordionTrigger className="rounded-md px-4 border border-border bg-card text-card-foreground hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
          <span className="text-sm font-medium text-muted-foreground">
            {isLoading ? 'Calling' : 'Called'} tool: {toolName}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Arguments</h3>
                <CodeBlock
                  node={{ type: 'code', value: JSON.stringify(args, null, 2) }}
                  inline={false}
                  className=""
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
                  className=""
                >
                  {result
                    ? JSON.stringify(result, null, 2)
                    : isLoading
                      ? 'Loading...'
                      : 'No result available'}
                </CodeBlock>
              </div>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
