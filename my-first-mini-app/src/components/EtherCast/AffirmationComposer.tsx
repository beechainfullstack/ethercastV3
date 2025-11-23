'use client';

import { useState } from 'react';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';

/**
 * EtherCast affirmation composer
 * For now this only simulates sending to chain; later you can wire it to your API/contract.
 */
export const AffirmationComposer = () => {
  const [toHandle, setToHandle] = useState('');
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const onCast = async () => {
    if (!message.trim()) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/ethercast/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toHandle: toHandle || null,
          message: message.trim(),
          tag: tag || null,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to cast');
      }

      setStatus('success');
      setTimeout(() => setStatus('idle'), 1500);
      setMessage('');
    } catch (e) {
      console.error(e);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const disabled = status === 'sending';

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-xl shadow-zinc-900/60">
      <h2 className="mb-2 text-sm font-semibold tracking-wide text-zinc-300">
        Cast an affirmation
      </h2>
      <p className="mb-4 text-xs text-zinc-500">
        Whisper something true into the ledger. A minimal on-chain trace of intent
        &amp; care.
      </p>

      <div className="mb-3 space-y-2">
        <label className="block text-xs uppercase tracking-wide text-zinc-500">
          To (optional handle)
        </label>
        <input
          value={toHandle}
          onChange={(e) => setToHandle(e.target.value)}
          placeholder="@friend, @self, @world"
          className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
        />
      </div>

      <div className="mb-3 space-y-2">
        <label className="block text-xs uppercase tracking-wide text-zinc-500">
          Affirmation
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="May your chains be light and your signal clear."
          className="w-full resize-none rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
        />
      </div>

      <div className="mb-4 space-y-2">
        <label className="block text-xs uppercase tracking-wide text-zinc-500">
          Tag (optional)
        </label>
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="#gratitude, #focus, #returning"
          className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
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
          {status === 'sending' ? 'Casting…' : 'Cast to chain'}
        </Button>

        <span className="text-[10px] text-zinc-600">
          {status === 'success' && 'Echo saved (locally for now).'}
          {status === 'error' && 'Something glitched. Try again.'}
          {status === 'idle' && 'No NFTs. No token. Just a trace.'}
        </span>
      </div>
    </section>
  
