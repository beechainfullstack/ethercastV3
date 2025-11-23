import { Fragment } from 'react';

/**
 * Static list for now; later you can hydrate from your contract or an indexer.
 */
const MOCK_AFFIRMATIONS = [
  {
    id: '1',
    to: '@world',
    tag: '#alignment',
    text: 'May your proofs stay valid and your intentions clear.',
  },
  {
    id: '2',
    to: '@self',
    tag: '#grounding',
    text: 'You are more than your latency and your gas costs.',
  },
];

export const AffirmationList = () => {
  if (!MOCK_AFFIRMATIONS.length) {
    return (
      <p className="mt-6 text-center text-xs text-zinc-600">
        When you cast something, echoes will start to appear here.
      </p>
    );
  }

  return (
    <section className="w-full max-w-md space-y-3">
      {MOCK_AFFIRMATIONS.map((item, idx) => (
        <Fragment key={item.id}>
          <article className="rounded-2xl border border-zinc-900 bg-gradient-to-b from-zinc-950/80 to-black/80 p-4">
            <div className="mb-1 flex items-center justify-between text-[11px] text-zinc-500">
              <span>{item.to}</span>
              <span>{item.tag}</span>
            </div>
            <p className="text-sm text-zinc-100">{item.text}</p>
          </article>
          {idx === 0 && (
            <p className="px-1 text-[10px] uppercase tracking-[0.18em] text-zinc-700">
              Recent echoes
            </p>
          )}
        </Fragment>
      ))}
    </section>
  );
};
