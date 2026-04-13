import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const VOICE = 'Polly.Joanna-Neural';
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// System prompts per persona — concise phone context
const SYSTEM_PROMPTS: Record<string, string> = {
  STORM: `You are a storm damage intake specialist on a phone call. Be warm, urgent, and concise.
Your job: assess property damage, gather the caller's name, address, and callback number, and tell them a specialist will follow up within the hour.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  HAIL: `You are a hail damage intake specialist on a phone call. Be empathetic and efficient.
Your job: assess hail/weather damage, collect name, address, insurance company if they have one, and callback number.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  HVAC: `You are an HVAC service intake specialist on a phone call. Be friendly and solution-focused.
Your job: understand the heating or cooling issue, determine if it's an emergency, and collect name, address, and callback number.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  CLAIMS: `You are an insurance claims intake specialist on a phone call. Be calm, professional, and thorough.
Your job: understand the type of claim, collect the caller's name, policy number if they have it, address, and callback number.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  LAW: `You are a legal intake specialist on a phone call. Be professional, serious, and reassuring.
Your job: understand the legal matter, collect caller's name, brief description of their situation, and callback number.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  MONEY: `You are a financial services intake specialist on a phone call. Be professional and trustworthy.
Your job: understand the financial need, collect caller's name, their primary concern, and callback number.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  NEED: `You are a friendly AI intake specialist at a professional answering service, on a phone call.
Your job: understand what the caller needs, match them to the right service, and collect their name, address or location, and best callback number.
Services you cover: home repairs, storm damage, HVAC, insurance claims, legal matters, and financial services.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,

  WILKINS: `You are a professional AI receptionist at Wilkins Media, answering the phone.
Your job: greet the caller warmly, find out what they're calling about, and collect their name and best callback number so the right person at Wilkins Media can follow up.
Keep responses under 3 sentences. Speak naturally — this will be spoken aloud.
DO NOT use asterisks, bullet points, formatting, or URLs.`,
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

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 120,
      temperature: 0.6,
    }),
  });

  if (!res.ok) {
    console.error('[Gather] OpenAI error:', res.status, await res.text());
    return "I didn't quite catch that. Could you repeat what you need help with?";
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content?.trim() ?? "Could you say that again? I want to make sure I get this right for you.";
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let speechResult = '';
    let to = '';
    let clientState = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      speechResult = body.SpeechResult ?? body.speechResult ?? '';
      to = body.To ?? body.to ?? '';
      clientState = body.ClientState ?? body.clientState ?? '';
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      speechResult = params.get('SpeechResult') ?? '';
      to = params.get('To') ?? '';
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

    // Add AI response to history (keep last 10 turns to stay within URL limits)
    conversationHistory.push({ role: 'assistant', content: aiResponse });
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    const newClientState = Buffer.from(JSON.stringify(conversationHistory)).toString('base64');

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
  <Gather input="speech" action="${appUrl}/api/voice/gather/" method="POST"
    speechTimeout="3" speechModel="experimental_conversations" language="en-US"
    clientState="${newClientState}">
    <Pause length="1"/>
  </Gather>
  <Say voice="${VOICE}" language="en-US">Are you still there? Take your time.</Say>
  <Redirect method="POST">${appUrl}/api/voice/gather/</Redirect>
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
