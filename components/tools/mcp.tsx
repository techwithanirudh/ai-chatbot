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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className='border-none'>
        <AccordionTrigger className="hover:no-underline border rounded-md px-4  bg-card text-card-foreground">
          <div className="text-sm font-medium text-muted-foreground">
            Called MCP tool: {toolName}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-4 mt-2 border rounded-md  bg-card text-card-foreground">
            {args ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Arguments</h3>
                <CodeBlock node={{ type: 'code', value: JSON.stringify(args, null, 2) }} inline={false} className="">
                  {JSON.stringify(args, null, 2)}
                </CodeBlock>
                {result ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Result</h3>
                    <CodeBlock node={{ type: 'code', value: JSON.stringify(result, null, 2) }} inline={false} className="">
                      {JSON.stringify(result, null, 2)}
                    </CodeBlock>
                  </div>
                ) : null}
              </div>
            ) : null}
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
