import { experimental_createMCPClient as createMCPClient } from 'ai';
import * as meetingBaas from '@/server/meetingbaas';

// Keep track of active clients
type MCPClientType = Awaited<ReturnType<typeof createMCPClient>>;
let publicClient: MCPClientType | null = null;
let privateClient: MCPClientType | null = null;

export async function getMCPTools() {
  const baasSession = await meetingBaas.auth();
  if (!baasSession?.jwt || !baasSession?.apiKey) {
    console.error('Failed to get auth credentials - missing JWT or API key');
    return {
      publicTools: {},
      privateTools: {},
      allTools: {}
    };
  }

  let publicTools = {};
  let privateTools = {};
  
  try {
    // Create or reuse private client - uses JWT token
    if (!privateClient) {
      privateClient = await createMCPClient({
        transport: {
          type: 'sse',
          url: 'https://mcp-private.meetingbaas.com/sse',
          headers: {
            'Cookie': `jwt=${baasSession.jwt}`,
          },
        },
        onUncaughtError: (error) => {
          console.error('Private MCP Client error:', error);
          // Reset client on error so it can be recreated
          privateClient = null;
        },
      });
    }

    if (privateClient) {
      privateTools = await privateClient.tools();
    }
  } catch (error) {
    console.error('Failed to connect to private MCP endpoint:', error);
    privateClient = null;
  }

  try {
    // Create or reuse public client - uses API key
    if (!publicClient) {
      publicClient = await createMCPClient({
        transport: {
          type: 'sse',
          url: 'https://mcp.meetingbaas.com/sse',
          headers: {
            'x-meeting-baas-api-key': baasSession.apiKey,
          },
        },
        onUncaughtError: (error) => {
          console.error('Public MCP Client error:', error);
          // Reset client on error so it can be recreated
          publicClient = null;
        },
      });
    }

    if (publicClient) {
      publicTools = await publicClient.tools();
    }
  } catch (error) {
    console.error('Failed to connect to public MCP endpoint:', error);
    publicClient = null;
  }

  return {
    publicTools,
    privateTools,
    allTools: { ...publicTools, ...privateTools }
  };
}

// Only use this when you really need to close the clients (e.g., during cleanup)
export async function closeMCPClients() {
  if (publicClient) {
    await publicClient.close();
    publicClient = null;
  }
  if (privateClient) {
    await privateClient.close();
    privateClient = null;
  }
}