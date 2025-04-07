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
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          <div className="text-sm font-medium text-muted-foreground">
            Called MCP tool: {toolName}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-4 border rounded-md bg-muted">
            {args ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Arguments</h3>
                <CodeBlock>{JSON.stringify(args, null, 2)}</CodeBlock>
              </div>
            ) : null}
            {result ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Result</h3>
                <CodeBlock>{JSON.stringify(result, null, 2)}</CodeBlock>
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
