import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Proverbs About Friendship | Biblical Wisdom on Relationships',
  description: 'What does Proverbs say about friendship, loyalty, and choosing the right relationships? Discover Solomon\'s wisdom on iron sharpening iron and the friend who sticks closer than a brother.',
  keywords: 'proverbs about friendship, bible verses about friendship, biblical wisdom on relationships, iron sharpens iron proverb, proverbs for relationships, solomon friendship',
  openGraph: {
    title: 'Proverbs About Friendship | Ask Solomon',
    description: 'Solomon had profound things to say about who you spend time with. Your relationships determine your direction. Here is the biblical wisdom on choosing the right friendships.',
    url: 'https://asksolomon.app/proverbs-for-friendship',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const friendshipProverbs = [
  {
    reference: 'Proverbs 27:17',
    verse: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.',
    insight: 'The right friendship does not just make you feel good â it makes you better. Iron on iron creates friction, heat, and a sharper edge. If every friendship is frictionless and comfortable, you may be missing the relationships that truly forge you.'
  },
  {
    reference: 'Proverbs 18:24',
    verse: 'A man that hath friends must shew himself friendly: and there is a friend that sticketh closer than a brother.',
    insight: 'True friendship is covenantal â it does not leave when things get difficult. Solomon distinguishes between the many acquaintances and the rare friend who is more loyal than blood. That kind of friendship is worth pursuing â and worth being.'
  },
  {
    reference: 'Proverbs 13:20',
    verse: 'He that walketh with wise men shall be wise: but a companion of fools shall be destroyed.',
    insight: 'Your closest relationships are not neutral. They are directional. Walk with wise people and wisdom transfers. Companion yourself with fools and destruction follows. You cannot spend significant time with people without being shaped by them.'
  },
  {
    reference: 'Proverbs 27:6',
    verse: 'Faithful are the wounds of a friend; but the kisses of an enemy are deceitful.',
    insight: 'The friend who tells you the truth â even when it hurts â is more valuable than the flatterer who tells you what you want to hear. Solomon calls honest correction a wound. Wounds from a trustworthy friend heal. Flattery from an enemy corrupts.'
  },
  {
    reference: 'Proverbs 17:17',
    verse: 'A friend loveth at all times, and a brother is born for adversity.',
    insight: 'Fair-weather friendship is not friendship â it is convenience. Solomon defines true friendship by what it does in hard times. Love at all times. The test of any relationship is what it looks like when things are difficult for you.'
  },
  {
    reference: 'Proverbs 22:24-25',
    verse: 'Make no friendship with an angry man; and with a furious man thou shalt not go: Lest thou learn his ways, and get a snare to thy soul.',
    insight: 'Avoid close friendship with chronically angry people â not because they are beyond help, but because their spirit is contagious. Solomon understood that habitual proximity to certain behaviors leads to adoption of those behaviors. Guard who you align with.'
  },
  {
    reference: 'Proverbs 27:9',
    verse: 'Ointment and perfume rejoice the heart: so doth the sweetness of a man\'s friend by hearty counsel.',
    insight: 'The counsel of a true friend is like a pleasant fragrance â it brings genuine joy. Notice: hearty counsel. Not surface-level advice, but deeply considered wisdom offered in love. This is what friendship is for.'
  },
]

export default function ProverbsForFriendshipPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-indigo-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Proverbs About Friendship
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Solomon said your closest companions determine your direction. Here is his wisdom on choosing, building, and being the kind of friend that changes lives.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-indigo-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors"
          >
            Ask Solomon About Your Relationships â
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Why Your Five Closest Relationships Shape Your Life</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Solomon understood something about human nature that modern psychology has only recently confirmed: the people you spend the most time with shape who you become. Not just your habits and opinions â your character.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Proverbs 13:20 is blunt: walk with wise people and wisdom transfers. Companion yourself with fools and destruction follows. This is not a suggestion â Solomon presents it as observable law.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            The question is not whether your relationships are influencing you. They always are. The question is whether that influence is making you wiser, more excellent, and more aligned with God â or not.
          </p>
        </div>
      </section>

      {/* Proverbs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">7 Proverbs About Friendship & Relationships</h2>
        <div className="space-y-8">
          {friendshipProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <div className="flex items-start gap-4">
                <span className="bg-indigo-100 text-indigo-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  {item.reference}
                </span>
              </div>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-indigo-400">
                &ldquo;{item.verse}&rdquo;
              </blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Friend Types */}
      <section className="bg-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Two Kinds of Relationships Solomon Warned About</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-700 rounded-xl p-6">
              <div className="text-3xl mb-3">â ï¸</div>
              <h3 className="font-bold text-lg mb-2">The Flatterer</h3>
              <p className="text-indigo-100 text-sm">The kisses of an enemy are deceitful. Beware relationships built on empty validation. The person who only tells you what you want to hear is not serving your growth â they are serving themselves.</p>
            </div>
            <div className="bg-indigo-700 rounded-xl p-6">
              <div className="text-3xl mb-3">ð¥</div>
              <h3 className="font-bold text-lg mb-2">The Angry Person</h3>
              <p className="text-indigo-100 text-sm">Make no friendship with an angry man. Anger is contagious. Chronic anger in your close circle reshapes how you see the world, respond to setbacks, and treat people. Guard your inner circle carefully.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
          Navigating a Friendship or Relationship Challenge?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ask Solomon can find the specific wisdom from Proverbs that speaks to your relationship situation â a difficult friendship, a betrayal, a question about who to trust, or how to be a better friend yourself.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-700 text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-indigo-800 transition-colors shadow-lg"
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
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-pride" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Pride</Link>
            <Link href="/proverbs-for-humility" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Humility</Link>
            <Link href="/proverbs-for-fear" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Fear</Link>
            <Link href="/proverbs-for-hope" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Hope</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
