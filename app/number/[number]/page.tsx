import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../../components/Navigation';
import { NUMBER_TO_PERSONA } from '../../../lib/routing/engine';
import {
  formatTenDigitNumber,
  loadCanonicalNotes,
  PERSONA_INFO,
  type Persona
} from '../../../lib/routing/canonical-numbers';

type Params = { number: string };

export function generateStaticParams(): Params[] {
  return Object.keys(NUMBER_TO_PERSONA).map((digits) => ({
    number: formatTenDigitNumber(digits)
  }));
}

export default async function NumberPage({ params }: { params: Params | Promise<Params> }) {
  const resolvedParams = await Promise.resolve(params);
  const digits = resolvedParams.number?.replace(/\D/g, '');
  if (!/^\d{10}$/.test(digits)) notFound();

  const persona = (NUMBER_TO_PERSONA as Record<string, string>)[digits] as Persona | undefined;
  if (!persona) notFound();

  const notesByNumber = loadCanonicalNotes();
  const display = formatTenDigitNumber(digits);
  const note = notesByNumber[digits]?.note;
  const info = PERSONA_INFO[persona];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-6">
          <Link href="/numbers" className="text-blue-600 hover:underline">
            ← Back to directory
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8 border">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">Canonical number</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{display}</h1>
              {note ? <div className="text-gray-600">{note}</div> : null}
            </div>
            <div className="text-right">
              <div className="text-2xl">{info.emoji}</div>
              <div className="text-sm text-gray-500">Persona</div>
              <div className="font-semibold text-gray-900">{persona}</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">System</h2>
              <p className="text-gray-700">
                Calls to this number are routed via <code>NUMBER_TO_PERSONA</code> and handled by the <strong>{info.title}</strong> AI behavior.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Behavior</h2>
              <p className="text-gray-700">{info.blurb}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
