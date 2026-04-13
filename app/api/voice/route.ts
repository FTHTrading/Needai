import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Persona greetings — short, snappy, faster TTS playback
const PERSONA_GREETINGS: Record<string, string> = {
  STORM:   "Storm Damage Response, this is your AI specialist. What happened and where?",
  HAIL:    "Hail Damage Assistance, how can I help you today?",
  HVAC:    "HVAC Emergency line, what's going on with your system?",
  CLAIMS:  "Insurance Claims, this is your AI specialist. What can I help you with?",
  LAW:     "Legal Services, how can I help you today?",
  MONEY:   "Financial Services, how can I help you today?",
  WILKINS: "Wilkins Media, how can I help you today?",
  NEED:    "Thank you for calling. How can I help you today?",
};

// Telnyx TeXML — best available neural voice, very human-sounding, zero TTS latency
const VOICE = 'Polly.Joanna-Neural';

function buildTexml(persona: string, to: string): string {
  const greeting = PERSONA_GREETINGS[persona] ?? PERSONA_GREETINGS['NEED'];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://needai.unykorn.org') || 'https://needai.unykorn.org';

  const toEncoded = encodeURIComponent(to);
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" action="${appUrl}/api/voice/gather/?To=${toEncoded}" method="POST"
    speechTimeout="2" speechModel="experimental_conversations" language="en-US"
    hints="yes,no,claim,damage,HVAC,attorney,billing,insurance,emergency,help">
    <Say voice="${VOICE}" language="en-US">${escapeXml(greeting)}</Say>
  </Gather>
  <Redirect method="POST">${appUrl}/api/voice/?To=${toEncoded}</Redirect>
</Response>`;
}

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
  // Import inline to avoid edge runtime issues
  const personaMap: Record<string, string> = {
    // Storm/Hail
    '3216410263': 'STORM', '3216410878': 'STORM', '3215033343': 'STORM',
    '3214352335': 'HAIL',  '3214858237': 'HAIL',  '3215590559': 'HAIL', '3214858333': 'HAIL',
    // HVAC
    '8557124246': 'HVAC',  '7866778676': 'HVAC',  '7273878676': 'HVAC',
    '6237778676': 'HVAC',  '4702878676': 'HVAC',
    // Claims/Insurance
    '8556024246': 'CLAIMS','8886115384': 'CLAIMS',
    '8775709775': 'CLAIMS','8887120268': 'CLAIMS','8886812729': 'CLAIMS',
    '8557062533': 'CLAIMS','8557712886': 'CLAIMS','8886754245': 'CLAIMS',
    // Legal
    '4146766337': 'LAW',   '2623974245': 'LAW',   '4434378657': 'LAW',
    '2134237865': 'LAW',   '8665062265': 'LAW',   '8886532529': 'LAW',
    '8889740529': 'LAW',   '8886762825': 'LAW',
    // Financial
    '8886780645': 'MONEY', '8883442825': 'MONEY', '8884748738': 'MONEY',
    '8885052924': 'MONEY', '8447252460': 'MONEY', '8334452924': 'MONEY',
    '8886430529': 'MONEY', '8886490529': 'MONEY',
    // Wilkins Media
    '8448516334': 'WILKINS',
    // NEED / Universal
    '8446696333': 'NEED',  '8337604328': 'NEED',
    '8336024822': 'NEED',  '8335222653': 'NEED',  '7702300635': 'NEED',
    '9094887663': 'NEED',  '4782424246': 'NEED',  '8887631529': 'NEED',
    '8888550209': 'NEED',  '5394767663': 'NEED',  '8447561580': 'NEED',
    '9129106333': 'NEED',  '8449854245': 'NEED',  '8449674245': 'NEED',
  };
  return personaMap[digits] ?? 'NEED';
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let to = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      to = body.To ?? body.to ?? '';
    } else {
      // application/x-www-form-urlencoded (standard TeXML callback)
      const text = await request.text();
      const params = new URLSearchParams(text);
      to = params.get('To') ?? params.get('to') ?? '';
    }

    // Also handle query param for redirects
    if (!to) {
      to = request.nextUrl.searchParams.get('To') ?? '';
    }

    const persona = getPersona(to);
    const texml = buildTexml(persona, to);

    return new NextResponse(texml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Voice] Error:', err);
    // Fallback TeXML so call doesn't just go silent
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">Thank you for calling. Please hold while we connect you.</Say>
  <Pause length="2"/>
  <Say voice="${VOICE}" language="en-US">We are experiencing a brief technical issue. Please call back in a moment.</Say>
  <Hangup/>
</Response>`;
    return new NextResponse(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
    });
  }
}

// Allow GET for quick browser testing
export async function GET(request: NextRequest) {
  const to = request.nextUrl.searchParams.get('To') ?? '+18448516334';
  const persona = getPersona(to);
  const texml = buildTexml(persona, to);
  return new NextResponse(texml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  });
}
