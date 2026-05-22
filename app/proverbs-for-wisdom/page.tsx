import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs About Wisdom | What Proverbs Says About Gaining Wisdom',
  description: 'Discover what the Book of Proverbs says about wisdom. Biblical wisdom for everyday decisions, relationships, and success â drawn from Solomon\'s timeless insights.',
  keywords: 'proverbs about wisdom, biblical wisdom, proverbs for wisdom, what does the bible say about wisdom, wisdom from proverbs, solomon wisdom',
  openGraph: {
    title: 'Proverbs About Wisdom | Ask Solomon',
    description: 'Solomon wrote more about wisdom than any other topic. Discover what the Book of Proverbs says about gaining wisdom and applying it to your life today.',
    url: 'https://asksolomon.app/proverbs-for-wisdom',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const wisdomProverbs = [
  {
    reference: 'Proverbs 4:7',
    verse: 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.',
    insight: 'Solomon places wisdom above wealth, status, and talent. The word "principal" means first â not secondary, not supplemental. If you could pursue only one thing, this is it.'
  },
  {
    reference: 'Proverbs 9:10',
    verse: 'The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding.',
    insight: 'Wisdom does not start with intelligence or education. It starts with reverence â a right relationship with God. Every decision made outside of this foundation is built on sand.'
  },
  {
    reference: 'Proverbs 3:13-14',
    verse: 'Happy is the man that findeth wisdom, and the man that getteth understanding. For the merchandise of it is better than the merchandise of silver, and the gain thereof than fine gold.',
    insight: 'Solomon â the wealthiest man who ever lived â says wisdom is worth more than silver and gold. He was in a unique position to compare the two.'
  },
  {
    reference: 'Proverbs 2:6',
    verse: 'For the Lord giveth wisdom: out of his mouth cometh knowledge and understanding.',
    insight: 'Wisdom is not manufactured by human effort â it is given by God. You can study, observe, and learn, but the source is divine. This is why Solomon asked God for wisdom rather than riches.'
  },
  {
    reference: 'Proverbs 13:10',
    verse: 'Only by pride cometh contention: but with the well advised is wisdom.',
    insight: 'The wise person seeks counsel before acting. Conflict â in marriages, businesses, and nations â nearly always traces back to pride. Wisdom asks questions. Pride already has all the answers.'
  },
  {
    reference: 'Proverbs 3:7',
    verse: 'Be not wise in thine own eyes: fear the Lord, and depart from evil.',
    insight: 'Self-wisdom is a trap. The moment you stop learning, stop asking, and stop deferring to God â you have reached the ceiling of your own limited understanding. Real wisdom stays humble.'
  },
  {
    reference: 'Proverbs 8:11',
    verse: 'For wisdom is better than rubies; and all the things that may be desired are not to be compared to it.',
    insight: 'Solomon personifies wisdom as a voice calling out in the streets. She has been available all along. The question is whether you are listening.'
  },
]

export default function ProverbsForWisdomPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-900 to-amber-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Proverbs About Wisdom
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto mb-8">
            Solomon wrote more about wisdom than any other subject. Before wealth, before relationships, before success â he said: <em>get wisdom.</em>
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-amber-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors"
          >
            Ask Solomon About Your Situation â
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Why Solomon Valued Wisdom Above Everything</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            When God appeared to Solomon and said "Ask what I shall give thee," Solomon did not ask for long life, or riches, or the death of his enemies. He asked for wisdom and knowledge to lead the people well (2 Chronicles 1:10).
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            God was so pleased by this answer that He gave Solomon wisdom â and then also gave him the wealth and honor he had not asked for. The principle: <strong>seek wisdom first, and what you need tends to follow.</strong>
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            The Book of Proverbs is Solomon's gift to you â thousands of years of compressed wisdom about money, relationships, work, leadership, speech, and character. Here are some of the most powerful proverbs on wisdom itself.
          </p>
        </div>
      </section>

      {/* Proverbs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">7 Key Proverbs About Wisdom</h2>
        <div className="space-y-8">
          {wisdomProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <div className="flex items-start gap-4">
                <span className="bg-amber-100 text-amber-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  {item.reference}
                </span>
              </div>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-amber-400">
                “{item.verse}”
              </blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Get Wisdom */}
      <section className="bg-amber-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Actually Get Wisdom</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-amber-700 rounded-xl p-6">
              <div className="text-3xl mb-3">ð</div>
              <h3 className="font-bold text-lg mb-2">Ask God</h3>
              <p className="text-amber-100 text-sm">James 1:5 says if anyone lacks wisdom, ask God â who gives generously without finding fault. It starts with prayer, not study.</p>
            </div>
            <div className="bg-amber-700 rounded-xl p-6">
              <div className="text-3xl mb-3">ð</div>
              <h3 className="font-bold text-lg mb-2">Read Proverbs</h3>
              <p className="text-amber-100 text-sm">Proverbs has 31 chapters â one for each day of the month. Read one chapter per day and in a month you will have walked through Solomon's entire library of wisdom.</p>
            </div>
            <div className="bg-amber-700 rounded-xl p-6">
              <div className="text-3xl mb-3">ð§ </div>
              <h3 className="font-bold text-lg mb-2">Apply It</h3>
              <p className="text-amber-100 text-sm">Knowledge without application remains theory. Wisdom is proved by its results â in your decisions, your relationships, and your outcomes over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
          Apply Solomon's Wisdom to Your Situation Right Now
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ask Solomon is a free tool that delivers biblical wisdom from Proverbs based on exactly what you are facing â fear, money, relationships, work, or anything else.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-amber-700 transition-colors shadow-lg"
        >
          Ask Solomon a Question â
        </Link>
        <p className="text-gray-400 text-sm mt-4">Free. No sign-up required.</p>
      </section>

      {/* Related */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-success" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Success</Link>
            <Link href="/proverbs-for-wealth-and-prosperity" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wealth</Link>
            <Link href="/proverbs-for-money" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Money</Link>
            <Link href="/proverbs-for-fear" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Fear</Link>
            <Link href="/proverbs-for-friendship" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Friendship</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Wisdom & Understanding" />

    </main>
  )
}
