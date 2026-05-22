import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs for Fear & Anxiety | Bible Verses About Fear',
  description: 'Find biblical wisdom from Proverbs for fear, anxiety, and uncertainty. What Solomon taught about overcoming fear with trust, courage, and the fear of God.',
  keywords: 'proverbs for fear, bible verses about fear, proverbs about anxiety, biblical wisdom for fear, what does the bible say about fear, overcome fear bible',
  openGraph: {
    title: 'Proverbs for Fear & Anxiety | Ask Solomon',
    description: 'Solomon understood fear deeply — both the fear that cripples and the fear that liberates. Here is what Proverbs teaches about navigating fear with wisdom and faith.',
    url: 'https://asksolomon.app/proverbs-for-fear',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const fearProverbs = [
  {
    reference: 'Proverbs 29:25',
    verse: 'The fear of man bringeth a snare: but whoso putteth his trust in the Lord shall be safe.',
    insight: 'Fear of man — what people think, what people might do, what people will say — is a trap. It constrains your obedience, distorts your decisions, and puts your security in the hands of people who cannot ultimately protect you. Trust in God is the only stable foundation.'
  },
  {
    reference: 'Proverbs 3:5-6',
    verse: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    insight: 'Anxiety typically emerges when we rely on our own understanding and find it insufficient. Solomon says: stop leaning on your own analysis. Acknowledge God in every decision — and He will make the path clear. This is not passivity; it is properly placed confidence.'
  },
  {
    reference: 'Proverbs 14:26-27',
    verse: 'In the fear of the Lord is strong confidence: and his children shall have a place of refuge. The fear of the Lord is a fountain of life, to depart from the snares of death.',
    insight: 'There is a fear that destroys — the fear of circumstances, people, and outcomes. And there is a fear that liberates — the reverence of God. When you are properly in awe of God, the things that used to terrify you shrink to their actual size.'
  },
  {
    reference: 'Proverbs 1:33',
    verse: 'But whoso hearkeneth unto me shall dwell safely, and shall be quiet from fear of evil.',
    insight: 'Wisdom promises something remarkable: quiet from fear of evil. Not absence of danger — but freedom from fear of it. The person who hearkens to wisdom is not naive; they are secured by something larger than circumstances.'
  },
  {
    reference: 'Proverbs 3:25-26',
    verse: 'Be not afraid of sudden fear, neither of the desolation of the wicked, when it cometh. For the Lord shall be thy confidence, and shall keep thy foot from being taken.',
    insight: 'Sudden fear — unexpected bad news, a crisis that appears without warning — can devastate people who have no anchor. Solomon promises: God is your confidence, not your circumstances. He keeps your foot from being taken even in the sudden storm.'
  },
  {
    reference: 'Proverbs 12:25',
    verse: 'Heaviness in the heart of man maketh it stoop: but a good word maketh it glad.',
    insight: 'Anxiety weighs the heart down. Solomon acknowledges it — he does not pretend fear is not real. But he also identifies the remedy: a good word. Sometimes what you need most when fear presses in is one well-placed voice speaking truth over you.'
  },
]

export default function ProverbsForFearPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Proverbs for Fear & Anxiety
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
            Solomon understood that fear is one of the great obstacles to wisdom. Here is what he taught about navigating fear, anxiety, and uncertainty with God as your anchor.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-blue-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors"
          >
            Ask Solomon About What You Are Facing →
          </Link>
        </div>
      </section>

      {/* Two Types of Fear */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Solomon's Two-Type Theory of Fear</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Proverbs does not tell you to be fearless. It tells you to fear the <em>right thing</em>. Solomon distinguishes between two kinds of fear throughout Proverbs:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-3">❌ Fear of Man</h3>
              <p className="text-red-700">Fear of what people think, what might happen, what you might lose — this fear is a snare. It enslaves, paralyzes, and puts your security in the wrong place.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-3">✅ Fear of God</h3>
              <p className="text-green-700">Reverence for God — the beginning of wisdom. This fear paradoxically produces confidence, safety, and freedom from the very fears that used to dominate your life.</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            The cure for the fear that cripples is not positive thinking — it is a proper encounter with the fear that liberates. When you stand in awe of God, lesser fears shrink.
          </p>
        </div>
      </section>

      {/* Proverbs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">6 Proverbs for Fear & Anxiety</h2>
        <div className="space-y-8">
          {fearProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <div className="flex items-start gap-4">
                <span className="bg-blue-100 text-blue-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  {item.reference}
                </span>
              </div>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-blue-400">
                “{item.verse}”
              </blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 text-white py-16 px-4">
      {/* 7 Days Email Opt-In */}
      <SevenDaysOptIn topic="Fear & Anxiety" />

      
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tell Solomon What You Are Afraid Of
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ask Solomon is a free tool that finds the specific wisdom from Proverbs that speaks to your fear — whether it is a major decision, a relationship, a financial situation, or an uncertain future.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-blue-900 font-bold px-10 py-5 rounded-full text-xl hover:bg-amber-300 transition-colors shadow-lg"
          >
            Ask Solomon a Question →
          </Link>
          <p className="text-blue-300 text-sm mt-4">Free. No sign-up required.</p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-hope" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Hope</Link>
            <Link href="/biblical-wisdom-for-depression" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Biblical Wisdom for Depression</Link>
            <Link href="/proverbs-for-money" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Money</Link>
            <Link href="/proverbs-for-friendship" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Friendship</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
