import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return [
    { id: 'b1' },
    { id: 'b2' },
    { id: '1-buddy' },
    { id: '2-buddies' },
    { id: 'premium' },
    { id: 'personal-1' },
    { id: 'personal-2' },
    { id: 'personal-3' },
    { id: 'language-learning-bot' },
    { id: 'mindfulness-coach-bot' }
  ];
}

interface Props {
  params: { id: string };
}

export default function BuddyPage({ params }: Props) {
  const { id } = params;

  return (
    <main className="min-h-screen main-gradient">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border)] p-8">
          <h1 className="text-2xl font-bold text-[var(--text)] mb-2">Buddy: {id}</h1>
          <p className="text-[var(--text-muted)] mb-6">This is a placeholder page for buddy <strong>{id}</strong>. You can replace this with the full buddy UI later.</p>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="px-4">Return Home</Button>
            </Link>
            <Link href="/checkout">
              <Button variant="outline" className="px-4">Go to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
