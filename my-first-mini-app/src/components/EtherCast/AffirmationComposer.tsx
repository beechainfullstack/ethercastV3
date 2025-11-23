"use client";

import { useState } from 'react';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';

/**
 * EtherCast affirmation composer
 * Wired to /api/ethercast/cast to send the hash of an affirmation on-chain.
 */
export type AffirmationCast = {
  text: string;
  txHash?: string;
};

export const AffirmationComposer = (props: {
  onCastSuccess?: (cast: AffirmationCast) => void;
}) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const onCast = async () => {
    if (!message.trim()) return;
    setStatus('sending');

    try {
      // Cast the affirmation on-chain via backend
      const res = await fetch('/api/ethercast/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { txHash?: string; error?: string }
        | null;

      if (!res.ok) {
        console.error('Cast failed:', res.status, data);
        throw new Error(data?.error || 'Failed to cast');
      }

      if (data?.txHash) {
        setLastTxHash(data.txHash);
      }

      setStatus('success');
      setTimeout(() => setStatus('idle'), 1500);
      setMessage("");

      props.onCastSuccess?.({ text: message.trim(), txHash: data?.txHash });
    } catch (e) {
      console.error(e);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const disabled = status === "sending";

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-xl shadow-zinc-900/60">
      <h2 className="mb-2 text-sm font-semibold tracking-wide text-zinc-300">
        Cast Your Affirmation
      </h2>
      <p className="mb-4 text-xs text-zinc-500">
        Confess truth upon the infinite machine.
      </p>

      <div className="mb-3 space-y-2">
        <label className="block text-xs uppercase tracking-wide text-zinc-500">
          Affirmation
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Inscribe your intents..."
          className="w-full resize-none rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          size="lg"
          variant="primary"
          className="flex-1 bg-zinc-100 text-black hover:bg-white"
          onClick={onCast}
          disabled={disabled || !message.trim()}
        >
          {status === 'sending' ? 'Casting…' : 'Cast to World'}
        </Button>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] text-zinc-600">
            {status === 'success' && 'Affirmation saved (locally for now).'}
            {status === 'error' && 'Something glitched. Try again.'}
            {status === 'idle' && 'Awaiting your beautiful input...'}
          </span>
          {lastTxHash && (
            <a
              href={`https://worldscan.org/tx/${lastTxHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-zinc-500 underline underline-offset-2"
            >
              View on Worldscan
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
