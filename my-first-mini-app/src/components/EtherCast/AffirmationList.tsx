import { Fragment } from "react";

export type DisplayAffirmation = {
  id: string;
  text: string;
  txHash?: string;
};

export const AffirmationList = (props: { items: DisplayAffirmation[] }) => {
  const items = props.items;

  if (!items.length) {
    return (
      <p className="mt-6 text-center text-xs text-zinc-600">
        When you cast something, echoes will start to appear here.
      </p>
    );
  }

  return (
    <section className="w-full max-w-md space-y-3">
      {items.map((item, idx) => (
        <Fragment key={item.id}>
          <article className="rounded-2xl border border-zinc-900 bg-gradient-to-b from-zinc-950/80 to-black/80 p-4">
            <p className="text-sm text-zinc-100">{item.text}</p>
            {item.txHash && (
              <a
                href={`https://worldscan.org/tx/${item.txHash}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-[10px] text-zinc-500 underline underline-offset-2"
              >
                View on Worldscan
              </a>
            )}
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
