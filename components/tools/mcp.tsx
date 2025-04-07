'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CodeBlock } from '../artifact/code/code-block';

interface MCPDetailsProps {
  toolName: string;
  isReadonly: boolean;
  result?: any;
  args?: any;
}

export function MCPDetails({
  toolName,
  isReadonly,
  result,
  args,
}: MCPDetailsProps) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={toolName}>
      <AccordionItem value={toolName} className='border-none'>
        <AccordionTrigger className="hover:no-underline border rounded-md px-4  bg-card text-card-foreground">
          <div className="text-sm font-medium text-muted-foreground">
            Called MCP tool: {toolName}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-4 mt-2 border rounded-md  bg-card text-card-foreground">
            <div>
              <h3 className="text-lg font-semibold mb-2">Arguments</h3>
              <CodeBlock node={{ type: 'code', value: JSON.stringify(args, null, 2) }} inline={false} className="">
                {args ? JSON.stringify(args, null, 2) : 'Loading...'}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Result</h3>
              <CodeBlock node={{ type: 'code', value: JSON.stringify(result, null, 2) }} inline={false} className="">
                {result ? JSON.stringify(result, null, 2) : 'Loading...'}
              </CodeBlock>
            </div>

            {isReadonly ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Loading...</h3>
              </div>
            ) : null}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
