import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // In a real implementation, fetch from blockchain
  const metadata = {
    name: `AI Agent #${id}`,
    description: "An AI agent born on the vanity.ai blockchain with unique persona and growth potential.",
    image: `https://vanity.ai/images/agent-${id}.png`,
    attributes: [
      {
        trait_type: "Persona",
        value: "Storm" // Would be dynamic
      },
      {
        trait_type: "Experience",
        value: 0
      },
      {
        trait_type: "Birth Date",
        value: new Date().toISOString()
      }
    ]
  };

  return Response.json(metadata);
}