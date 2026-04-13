import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const VOICE = 'Polly.Joanna-Neural';
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// System prompts per persona — tight and direct, fewer tokens = faster response
const SYSTEM_PROMPTS: Record<string, string> = {
  STORM: `Phone intake for storm damage. Be brief and direct.
Collect: caller name, property address, type of damage, callback number. Tell them a specialist calls back within the hour.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  HAIL: `Phone intake for hail damage. Be empathetic and efficient.
Collect: name, address, insurance company if they have one, callback number.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  HVAC: `Phone intake for HVAC service. Be friendly and direct.
Collect: name, address, what's wrong with the system, callback number.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  CLAIMS: `Phone intake for insurance claims. Be calm and professional.
Collect: name, type of claim, policy number if they have it, callback number.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  LAW: `Phone intake for legal services. Be professional and reassuring.
Collect: name, brief description of their legal matter, callback number.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  MONEY: `Phone intake for financial services. Be confident and trustworthy.
Collect: name, what financial help they need, callback number.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  NEED: `Phone intake specialist. Be warm and helpful.
Identify what the caller needs, route to the right service, collect name and callback number.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,

  WILKINS: `AI receptionist for Wilkins Media. Be professional and warm.
Find out what they're calling about, collect name and callback number for follow-up.
2 sentences max. Natural speech only. No lists, bullets, asterisks, or URLs.`,
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getPersona(to: string): string {
  const digits = to.replace(/\D/g, '').replace(/^1/, '');
  const personaMap: Record<string, string> = {
    '3216410263': 'STORM', '3216410878': 'STORM', '3215033343': 'STORM',
    '3214352335': 'HAIL',  '3214858237': 'HAIL',  '3215590559': 'HAIL', '3214858333': 'HAIL',
    '8557124246': 'HVAC',  '7866778676': 'HVAC',  '7273878676': 'HVAC',
    '6237778676': 'HVAC',  '4702878676': 'HVAC',
    '8556024246': 'CLAIMS','8886115384': 'CLAIMS',
    '8775709775': 'CLAIMS','8887120268': 'CLAIMS','8886812729': 'CLAIMS',
    '8557062533': 'CLAIMS','8557712886': 'CLAIMS','8886754245': 'CLAIMS',
    '4146766337': 'LAW',   '2623974245': 'LAW',   '4434378657': 'LAW',
    '2134237865': 'LAW',   '8665062265': 'LAW',   '8886532529': 'LAW',
    '8889740529': 'LAW',   '8886762825': 'LAW',
    '8886780645': 'MONEY', '8883442825': 'MONEY', '8884748738': 'MONEY',
    '8885052924': 'MONEY', '8447252460': 'MONEY', '8334452924': 'MONEY',
    '8886430529': 'MONEY', '8886490529': 'MONEY',
    '8448516334': 'WILKINS',
    '8446696333': 'NEED',  '8337604328': 'NEED',
    '8336024822': 'NEED',  '8335222653': 'NEED',  '7702300635': 'NEED',
    '9094887663': 'NEED',  '4782424246': 'NEED',  '8887631529': 'NEED',
    '8888550209': 'NEED',  '5394767663': 'NEED',  '8447561580': 'NEED',
    '9129106333': 'NEED',  '8449854245': 'NEED',  '8449674245': 'NEED',
  };
  return personaMap[digits] ?? 'NEED';
}

async function getAIResponse(speechResult: string, persona: string, conversationHistory: Array<{role: string; content: string}>): Promise<string> {
  if (!OPENAI_KEY) {
    return "I understand. Let me make sure our team follows up with you shortly. Could you share your best callback number?";
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPTS[persona] ?? SYSTEM_PROMPTS['NEED'] },
    ...conversationHistory,
    { role: 'user', content: speechResult },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 60,
        temperature: 0.4,
      }),
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error('[Gather] OpenAI error:', res.status, await res.text());
      return "I didn't quite catch that. Could you repeat what you need help with?";
    }

    const json = await res.json();
    return json.choices?.[0]?.message?.content?.trim() ?? "Could you say that again? I want to make sure I get this right for you.";
  } catch (err: unknown) {
    clearTimeout(timeout);
    const isAbort = err instanceof Error && err.name === 'AbortError';
    console.error('[Gather] OpenAI fetch error:', isAbort ? 'timeout' : err);
    return "One moment — could you share your name and best callback number so we can follow up with you directly?";
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let speechResult = '';
    let to = '';
    let clientState = '';

    const urlTo = request.nextUrl.searchParams.get('To') ?? '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      speechResult = body.SpeechResult ?? body.speechResult ?? '';
      to = body.To ?? body.to ?? urlTo;
      clientState = body.ClientState ?? body.clientState ?? '';
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      speechResult = params.get('SpeechResult') ?? '';
      to = params.get('To') ?? urlTo;
      clientState = params.get('ClientState') ?? '';
    }

    const persona = getPersona(to);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://needai.unykorn.org') || 'https://needai.unykorn.org';

    // Parse conversation history from ClientState (base64 JSON)
    let conversationHistory: Array<{role: string; content: string}> = [];
    try {
      if (clientState) {
        const decoded = Buffer.from(clientState, 'base64').toString('utf8');
        conversationHistory = JSON.parse(decoded);
      }
    } catch { /* fresh conversation */ }

    // Add caller's speech to history
    if (speechResult) {
      conversationHistory.push({ role: 'user', content: speechResult });
    }

    // Get AI response
    const aiResponse = speechResult
      ? await getAIResponse(speechResult, persona, conversationHistory.slice(0, -1))
      : "I didn't catch anything. What can I help you with today?";

    // Add AI response to history (keep last 6 turns to stay within limits)
    conversationHistory.push({ role: 'assistant', content: aiResponse });
    if (conversationHistory.length > 6) {
      conversationHistory = conversationHistory.slice(-6);
    }

    const newClientState = Buffer.from(JSON.stringify(conversationHistory)).toString('base64');
    const safeClientState = escapeXml(newClientState);
    const toEncoded = encodeURIComponent(to);

    // Detect if conversation should end (collected enough info)
    const shouldEnd = aiResponse.toLowerCase().includes('goodbye') ||
                      aiResponse.toLowerCase().includes('have a great') ||
                      aiResponse.toLowerCase().includes('take care') ||
                      conversationHistory.length >= 12;

    const texml = shouldEnd
      ? `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">${escapeXml(aiResponse)}</Say>
  <Hangup/>
</Response>`
      : `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">${escapeXml(aiResponse)}</Say>
  <Gather input="speech" action="${appUrl}/api/voice/gather/?To=${toEncoded}" method="POST"
    speechTimeout="2" speechModel="experimental_conversations" language="en-US"
    clientState="${safeClientState}">
    <Say voice="${VOICE}" language="en-US">Go ahead.</Say>
  </Gather>
  <Redirect method="POST">${appUrl}/api/voice/?To=${toEncoded}</Redirect>
</Response>`;

    return new NextResponse(texml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Gather] Error:', err);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">I'm sorry, I'm having a brief connection issue. Please stay on the line.</Say>
  <Pause length="2"/>
  <Say voice="${VOICE}" language="en-US">Thank you for your patience. A specialist will follow up with you shortly. Goodbye.</Say>
  <Hangup/>
</Response>`;
    return new NextResponse(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
    });
  }
}
