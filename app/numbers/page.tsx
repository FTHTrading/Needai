import Link from 'next/link';
import Navigation from '../../components/Navigation';
import { NUMBER_TO_PERSONA } from '../../lib/routing/engine';
import {
  CANONICAL_PERSONAS,
  formatTenDigitNumber,
  loadCanonicalNotes,
  PERSONA_INFO,
  type Persona
} from '../../lib/routing/canonical-numbers';

export default function Numbers() {
  const notesByNumber = loadCanonicalNotes();

  const allNumbers = Object.entries(NUMBER_TO_PERSONA)
    .map(([digits, persona]) => ({
      digits,
      display: formatTenDigitNumber(digits),
      persona: persona as Persona,
      note: notesByNumber[digits]?.note
    }))
    .sort((a, b) => a.display.localeCompare(b.display));

  const numbersByPersona = new Map<Persona, typeof allNumbers>();
  for (const persona of CANONICAL_PERSONAS) numbersByPersona.set(persona, []);
  for (const number of allNumbers) numbersByPersona.get(number.persona)?.push(number);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Routing Directory</h1>
        <p className="text-xl text-gray-700 mb-8">
          Canonical phone number inventory mapped to AI personas.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{allNumbers.length}</div>
            <div className="text-sm text-gray-600">Total Numbers</div>
          </div>
          {CANONICAL_PERSONAS.map((persona) => (
            <div key={persona} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{numbersByPersona.get(persona)?.length ?? 0}</div>
              <div className="text-sm text-gray-600">{PERSONA_INFO[persona].title}</div>
            </div>
          ))}
        </div>

        {CANONICAL_PERSONAS.map((persona) => {
          const info = PERSONA_INFO[persona];
          const numbers = numbersByPersona.get(persona) ?? [];

          return (
            <section key={persona} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <span className="mr-2">{info.emoji}</span> {info.title}
              </h2>
              <p className="text-gray-700 mb-4">{info.blurb}</p>

              <div className="space-y-2">
                {numbers.map((n) => (
                  <div key={n.digits} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                    <div>
                      <div className="font-semibold text-gray-900">
                        <Link href={`/number/${n.display}`} className="text-blue-600 hover:underline">
                          {n.display}
                        </Link>
                      </div>
                      {n.note ? <div className="text-gray-600">{n.note}</div> : null}
                    </div>
                    <div className="text-gray-700 text-sm">{persona}</div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

