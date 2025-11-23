import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { EtherCastFeed } from '@/components/EtherCast/Feed';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Page.Header className="p-0 bg-black border-b border-zinc-900">
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
      <Page.Main className="flex flex-col items-center justify-start gap-6 mb-16 bg-black text-zinc-100">
        <section className="mt-2 w-full max-w-md text-left">
          <h1 className="mb-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Invoke Beauty Upon Us  
          </h1>
          <p className="text-sm text-zinc-400">
            Inscribe your affirmation to manifest in reality.
          </p>
        </section>

        <EtherCastFeed />
      </Page.Main>
    </>
  );
}
