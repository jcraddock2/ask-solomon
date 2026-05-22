“”—import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs for Self-Control | Biblical Wisdom on Discipline & Restraint',
  description: 'What does Proverbs say about self-control, discipline, and taming your impulses? Biblical wisdom on controlling your tongue, temper, and appetites.',
  keywords: 'proverbs for self-control, bible verses about self-control, biblical discipline, proverbs about restraint, controlling your tongue bible, solomon self-control',
  openGraph: {
    title: 'Proverbs for Self-Control | Ask Solomon',
    description: 'Solomon compared a person without self-control to a city with no walls. Here is what Proverbs teaches about discipline, restraint, and the power of self-mastery.',
    url: 'https://asksolomon.app/proverbs-for-self-control',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const selfControlProverbs = [
  {
    reference: 'Proverbs 25:28',
    verse: 'He that hath no rule over his own spirit is like a broken down city without walls.',
    insight: 'In ancient times, a city without walls was defenseless â exposed to any attacker who came along. A person without self-control is the same. Every impulse, every mood, every temptation walks straight in. Self-mastery is not legalism â it is the wall that protects everything you have built.'
  },
  {
    reference: 'Proverbs 16:32',
    verse: 'He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.',
    insight: 'Solomon ranks inner conquest above military conquest. Taking a city is a great achievement. Ruling your own spirit is greater. The person who masters their own reactions, impulses, and emotions holds more real power than the general who wins battles outside himself.'
  },
  {
    reference: 'Proverbs 21:23',
    verse: 'Whoso keepeth his mouth and his tongue keepeth his soul from troubles.',
    insight: 'Most relational, professional, and personal troubles trace back to an unguarded mouth. Solomon is precise: keep your mouth and your tongue â and you keep your soul from a long list of troubles you will never have to deal with. Silence, timing, and word choice are the primary disciplines.'
  },
  {
    reference: 'Proverbs 29:11',
    verse: 'A fool uttereth all his mind: but a wise man keepeth it in till afterwards.',
    insight: 'The fool says everything he thinks. The wise person has the same thoughts â but knows when to speak and when to wait. Self-control over speech is not suppression; it is wisdom applied to timing. What you say second, after reflection, is almost always better than what you would have said first.'
  },
  {
    reference: 'Proverbs 23:1-3',
    verse: 'When thou sittest to eat with a ruler, consider diligently what is before thee: And put a knife to thy throat, if thou be a man given to appetite.',
    insight: 'Solomon gives vivid counsel about appetite â the drive to consume, to indulge, to take more than is needed or wise. Put a knife to your throat is not literal; it means apply extreme restraint to your appetites. Opportunity does not mean you should take everything available to you.'
  },
  {
    reference: 'Proverbs 14:29',
    verse: 'He that is slow to wrath is of great understanding: but he that is hasty of spirit exalteth folly.',
    insight: 'Slowness to anger is a mark of great understanding â not weakness. The hot-headed person does not reveal strength; they reveal folly, and they exalt it. Every angry outburst is a public display of the limits of your self-mastery.'
  },
]

export default function ProverbsForSelfControlPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-b from-orange-900 to-orange-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-orange-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Proverbs for Self-Control</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto mb-8">
            Solomon compared a person without self-control to a city with no walls â completely defenseless. Here is what Proverbs teaches about mastering yourself.
          </p>
          <Link href="/" className="inline-block bg-amber-400 text-orange-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">
            Ask Solomon About Your Struggle â
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
          <p className="text-orange-900 text-lg font-medium text-center">
            &ldquo;He that hath no rule over his own spirit is like a broken down city without walls.&rdquo; â Proverbs 25:28
          </p>
        </div>
        <h2 className="text-3xl font-bold text-amber-900 mb-8">6 Proverbs for Self-Control & Discipline</h2>
        <div className="space-y-8">
          {selfControlProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <span className="bg-orange-100 text-orange-800 font-bold text-sm px-3 py-1 rounded-full">{item.reference}</span>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-orange-400">&ldquo;{item.verse}&rdquo;</blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ruling Your Spirit Is Greater Than Taking a City</h2>
          <p className="text-orange-100 text-lg mb-8">The most important battle is not external â it is internal. Ask Solomon what Proverbs says about the specific area of self-control you are working on.</p>
          <Link href="/" className="inline-block bg-amber-400 text-orange-900 font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">Ask Solomon a Question â</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-pride" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Pride</Link>
            <Link href="/proverbs-for-humility" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Humility</Link>
            <Link href="/proverbs-about-laziness" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs About Laziness</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Self-Control & Discipline" />

    </main>
  )
}
