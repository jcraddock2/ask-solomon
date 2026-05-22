import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs for Humility | What the Bible Says About Being Humble',
  description: 'Discover what Proverbs says about humility â the path to wisdom, honor, and divine favor. Biblical wisdom on lowliness, teachability, and walking humbly with God.',
  keywords: 'proverbs for humility, bible verses about humility, what does the bible say about humility, humble yourself bible, proverbs about being humble, solomon humility',
  openGraph: {
    title: 'Proverbs for Humility | Ask Solomon',
    description: 'Solomon said before honor is humility. Here is what Proverbs teaches about the posture that unlocks wisdom, favor, and blessing.',
    url: 'https://asksolomon.app/proverbs-for-humility',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const humilityProverbs = [
  {
    reference: 'Proverbs 22:4',
    verse: 'By humility and the fear of the Lord are riches, and honour, and life.',
    insight: 'Solomon does not present humility as a consolation prize for those who cannot compete. He presents it as the path to the things most people want Ã¢ÂÂ riches, honor, and life. Not through striving and self-promotion, but through humility and reverence for God.'
  },
  {
    reference: 'Proverbs 15:33',
    verse: 'The fear of the Lord is the instruction of wisdom; and before honour is humility.',
    insight: 'Humility is not what you have after you receive honor. It is what you bring before. The sequence is fixed: humility first, then honor. Every attempt to reverse this order Ã¢ÂÂ seeking honor before cultivating humility Ã¢ÂÂ produces instability at best and destruction at worst.'
  },
  {
    reference: 'Proverbs 11:2',
    verse: 'When pride cometh, then cometh shame: but with the lowly is wisdom.',
    insight: 'Wisdom lives with the lowly Ã¢ÂÂ not the impressive, not the credentialed, not the confident. The lowly person is teachable, correctable, and open. These are the conditions in which wisdom can take root and grow. Pride closes the very doors that wisdom needs to enter.'
  },
  {
    reference: 'Proverbs 18:12',
    verse: 'Before destruction the heart of man is haughty, and before honour is humility.',
    insight: 'This is the same principle from two angles: haughtiness precedes destruction, humility precedes honor. Solomon repeats this pattern because he had seen it enough times to call it law. It is not random Ã¢ÂÂ it is reliable.'
  },
  {
    reference: 'Proverbs 29:23',
    verse: 'A man\'s pride shall bring him low: but honour shall uphold the humble in spirit.',
    insight: 'The proud person reaches for elevation and finds themselves lowered. The humble person does not strive Ã¢ÂÂ and finds themselves upheld. Honor sustains the humble person in a way that self-promotion never can. What God puts you in, only God needs to keep you in.'
  },
  {
    reference: 'Proverbs 12:15',
    verse: 'The way of a fool is right in his own eyes: but he that hearkeneth unto counsel is wise.',
    insight: 'Humility is not primarily about self-deprecation Ã¢ÂÂ it is about teachability. The humble person listens to counsel. The proud person is always right in their own eyes and therefore has nothing to learn. Wisdom requires the posture of a student, not an expert.'
  },
]

export default function ProverbsForHumilityPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Proverbs for Humility</h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto mb-8">
            Solomon said before honor is humility Ã¢ÂÂ not after. Here is what Proverbs teaches about the posture that opens doors to wisdom, favor, and God&apos;s blessing.
          </p>
          <Link href="/" className="inline-block bg-amber-400 text-emerald-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">
            Ask Solomon About Your Situation Ã¢ÂÂ
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
          <p className="text-emerald-900 text-lg font-medium text-center">
            &ldquo;By humility and the fear of the Lord are riches, and honour, and life.&rdquo; Ã¢ÂÂ Proverbs 22:4
          </p>
        </div>
        <h2 className="text-3xl font-bold text-amber-900 mb-8">6 Proverbs for Humility & Teachability</h2>
        <div className="space-y-8">
          {humilityProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <span className="bg-emerald-100 text-emerald-800 font-bold text-sm px-3 py-1 rounded-full">{item.reference}</span>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-emerald-400">&ldquo;{item.verse}&rdquo;</blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Humble Person Has Nothing to Lose</h2>
          <p className="text-emerald-100 text-lg mb-8">What God puts you in, only God needs to keep you in. Ask Solomon what Proverbs says about walking in humility in your specific situation.</p>
          <Link href="/" className="inline-block bg-amber-400 text-emerald-900 font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">Ask Solomon a Question Ã¢ÂÂ</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-pride" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Pride</Link>
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-self-control" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Self-Control</Link>
            <Link href="/proverbs-for-friendship" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Friendship</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Humility & Pride" />

    </main>
  )
}
