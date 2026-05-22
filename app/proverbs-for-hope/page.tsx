import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs for Hope | Bible Verses About Hope & Expectation',
  description: 'Find hope in the words of Proverbs. Biblical wisdom about hope, expectation, and trusting God with your future — from the writings of King Solomon.',
  keywords: 'proverbs for hope, bible verses about hope, biblical hope, proverbs about hope, what does the bible say about hope, solomon hope verses',
  openGraph: {
    title: 'Proverbs for Hope | Ask Solomon',
    description: 'When hope feels distant, Proverbs speaks directly to the heart. Here is what Solomon wrote about hope, expectation, and trusting God with your future.',
    url: 'https://asksolomon.app/proverbs-for-hope',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const hopeProverbs = [
  {
    reference: 'Proverbs 13:12',
    verse: 'Hope deferred maketh the heart sick: but when the desire cometh, it is a tree of life.',
    insight: 'Solomon validates what so many feel — the weight of waiting. Hope deferred is a specific kind of pain. But notice the second half: when the desire comes, it is a tree of life. The wait does not disqualify the outcome. Trees of life are worth waiting for.'
  },
  {
    reference: 'Proverbs 23:18',
    verse: 'For surely there is an end; and thine expectation shall not be cut off.',
    insight: 'This is one of the most direct promises in Proverbs: your expectation — your hope, your trust in God — will not be cut off. Surely. Not probably. Not maybe. Solomon writes with certainty about the future of those who hold fast to hope in God.'
  },
  {
    reference: 'Proverbs 24:14',
    verse: 'So shall the knowledge of wisdom be unto thy soul: when thou hast found it, then there shall be a reward, and thy expectation shall not be cut off.',
    insight: 'Wisdom and hope are connected. The person who walks in wisdom has an expectation — a future worth hoping for. The fear that hope will be disappointed is addressed directly: your expectation shall not be cut off.'
  },
  {
    reference: 'Proverbs 3:5-6',
    verse: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    insight: 'Hope that is anchored to God is not wishful thinking — it is the most stable foundation available. Your own understanding will fail you. God\'s direction will not. Placing your hope here is not passive; it is the wisest decision you can make.'
  },
  {
    reference: 'Proverbs 11:7',
    verse: 'When a wicked man dieth, his expectation shall perish: and the hope of unjust men perisheth.',
    insight: 'Solomon shows the contrast: the hope of those who trust God endures. The hope of those who trust only in themselves, their schemes, or their wealth — that hope perishes. The anchor of your hope determines whether it will hold.'
  },
  {
    reference: 'Proverbs 10:28',
    verse: 'The hope of the righteous shall be gladness: but the expectation of the wicked shall perish.',
    insight: 'Righteousness — living in alignment with God — does not just produce moral outcomes. It produces gladness. Hope fulfilled becomes joy. Solomon presents a clear trajectory: right living, rooted in God, leads to a hope that actually delivers.'
  },
]

export default function ProverbsForHopePage() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Proverbs for Hope</h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto mb-8">
            When hope feels distant, Solomon speaks directly to that ache. Here is what Proverbs says about expectation, waiting, and why your hope in God will not be cut off.
          </p>
          <Link href="/" className="inline-block bg-amber-400 text-teal-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">
            Ask Solomon What You Are Hoping For â
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-8">6 Proverbs for Hope & Expectation</h2>
        <div className="space-y-8">
          {hopeProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <span className="bg-teal-100 text-teal-800 font-bold text-sm px-3 py-1 rounded-full">{item.reference}</span>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-teal-400">“{item.verse}”</blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-teal-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Your Expectation Shall Not Be Cut Off</h2>
          <p className="text-teal-100 text-lg mb-8">That is not a motivational slogan — it is Solomon's direct promise to those who anchor their hope in God. Ask Solomon what Proverbs says about your specific situation.</p>
          <Link href="/" className="inline-block bg-amber-400 text-teal-900 font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">Ask Solomon a Question â</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/biblical-wisdom-for-depression" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Biblical Wisdom for Depression</Link>
            <Link href="/proverbs-for-fear" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Fear</Link>
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-purpose" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Purpose</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Hope & Encouragement" />

    </main>
  )
}
