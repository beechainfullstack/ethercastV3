import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { AffirmationComposer } from '@/components/EtherCast/AffirmationComposer';
import { AffirmationList } from '@/components/EtherCast/AffirmationList';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Page.Header className="p-0 bg-black/95">
        <TopBar
          title="EtherCast"
          endAdornment={
            <div className="flex items-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {session?.user.username}
              </p>
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-start gap-6 mb-16 bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
        <section className="mt-2 w-full max-w-md text-left">
          <h1 className="mb-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Minimal on-chain echoes
          </h1>
          <p className="text-sm text-zinc-400">
            Save a hash of what matters. No NFTs, no token — just a public trace of
            intent.
          </p>
        </section>

        <AffirmationComposer />
        <AffirmationList />
      </Page.Main>
    </>
  );
}
