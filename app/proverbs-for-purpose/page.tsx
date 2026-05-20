import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Proverbs for Purpose | Biblical Wisdom on Calling & Direction',
  description: 'What does Proverbs say about purpose, calling, and finding direction? Biblical wisdom on vision, plans, and living intentionally with God as your guide.',
  keywords: 'proverbs for purpose, bible verses about purpose, biblical calling, what does the bible say about purpose, proverbs about vision, finding purpose bible',
  openGraph: {
    title: 'Proverbs for Purpose | Ask Solomon',
    description: 'Solomon said where there is no vision, the people perish. Here is what Proverbs teaches about purpose, calling, and aligning your life with the design God has for you.',
    url: 'https://asksolomon.app/proverbs-for-purpose',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const purposeProverbs = [
  {
    reference: 'Proverbs 29:18',
    verse: 'Where there is no vision, the people perish: but he that keepeth the law, happy is he.',
    insight: 'Vision is not optional. Without it, people do not plateau Ã¢ÂÂ they perish. The word in Hebrew means the people become unrestrained, scattered, without direction. Vision is the organizing force of a purposeful life. The absence of it is not neutral; it is erosive.'
  },
  {
    reference: 'Proverbs 16:3',
    verse: 'Commit thy works unto the Lord, and thy thoughts shall be established.',
    insight: 'Purpose is not found by introspection alone Ã¢ÂÂ it is established through commitment to God. Commit your works. Not your dreams, not your plans Ã¢ÂÂ your actual works, your daily actions. When your hands are committed to God, your thoughts Ã¢ÂÂ your direction, your vision Ã¢ÂÂ become established.'
  },
  {
    reference: 'Proverbs 19:21',
    verse: 'There are many devices in a man\'s heart; nevertheless the counsel of the Lord, that shall stand.',
    insight: 'You have many plans, many ideas, many directions you could go. But only one will stand in the end: the counsel of the Lord. This is not discouraging Ã¢ÂÂ it is liberating. You do not need to find the perfect plan. You need to find the One whose plan stands.'
  },
  {
    reference: 'Proverbs 16:9',
    verse: 'A man\'s heart deviseth his way: but the Lord directeth his steps.',
    insight: 'You plan, God directs. Both are true simultaneously. Solomon does not say stop planning Ã¢ÂÂ he says acknowledge that the actual path is directed by God. Purpose is a collaboration: you bring your whole heart to it, and you hold it with open hands.'
  },
  {
    reference: 'Proverbs 3:5-6',
    verse: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    insight: 'The word "direct" here means to make straight or smooth. God does not just point at a direction from a distance Ã¢ÂÂ He makes the path clear for those who acknowledge Him in all their ways. Purpose is discovered in relationship, not in isolation.'
  },
  {
    reference: 'Proverbs 20:5',
    verse: 'Counsel in the heart of man is like deep water; but a man of understanding will draw it out.',
    insight: 'Purpose is often already in you Ã¢ÂÂ deep, unexamined, not yet articulated. A person of understanding draws it out Ã¢ÂÂ through reflection, through wise counsel, through questions that go beneath the surface. The purpose you are looking for may not be absent; it may be deep.'
  },
]

export default function ProverbsForPurposePage() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-b from-violet-900 to-violet-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-violet-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Proverbs for Purpose</h1>
          <p className="text-xl md:text-2xl text-violet-100 max-w-2xl mx-auto mb-8">
            Solomon said where there is no vision, the people perish. If you are looking for direction, calling, or a sense of what you were made for Ã¢ÂÂ here is what Proverbs says.
          </p>
          <Link href="/" className="inline-block bg-amber-400 text-violet-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">
            Ask Solomon About Your Purpose Ã¢ÂÂ
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-10">
          <p className="text-violet-900 text-lg font-medium text-center">
            &ldquo;Where there is no vision, the people perish.&rdquo; Ã¢ÂÂ Proverbs 29:18
          </p>
        </div>
        <h2 className="text-3xl font-bold text-amber-900 mb-8">6 Proverbs for Purpose & Direction</h2>
        <div className="space-y-8">
          {purposeProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <span className="bg-violet-100 text-violet-800 font-bold text-sm px-3 py-1 rounded-full">{item.reference}</span>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-violet-400">&ldquo;{item.verse}&rdquo;</blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-violet-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Your Purpose Is Not Hidden From God</h2>
          <p className="text-violet-100 text-lg mb-8">Commit your works to Him and your thoughts will be established. Ask Solomon what Proverbs says about the direction you are seeking right now.</p>
          <Link href="/" className="inline-block bg-amber-400 text-violet-900 font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">Ask Solomon a Question Ã¢ÂÂ</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-hope" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Hope</Link>
            <Link href="/proverbs-for-self-control" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Self-Control</Link>
            <Link href="/proverbs-for-success" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Success</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
