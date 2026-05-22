import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs About Laziness | What the Bible Says About Sloth & Diligence',
  description: 'Discover what Proverbs says about laziness, sloth, and the diligent person. Biblical wisdom on work ethic, procrastination, and the ant principle from Solomon.',
  keywords: 'proverbs about laziness, bible verses about laziness, what does the bible say about laziness, proverbs about sloth, biblical work ethic, ant proverb solomon',
  openGraph: {
    title: 'Proverbs About Laziness | Ask Solomon',
    description: 'Solomon had more to say about the lazy person than almost any other character type. Here is what Proverbs teaches about work, diligence, and the cost of sloth.',
    url: 'https://asksolomon.app/proverbs-about-laziness',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const lazinessProverbs = [
  {
    reference: 'Proverbs 6:6-8',
    verse: 'Go to the ant, thou sluggard; consider her ways, and be wise: Which having no guide, overseer, or ruler, Provideth her meat in the summer, and gathereth her food in the harvest.',
    insight: 'The ant does not wait for someone to tell it to work. No boss, no accountability partner, no external motivation — just an internal drive to prepare. Solomon says: go study the ant. This is wisdom you cannot get in a classroom.'
  },
  {
    reference: 'Proverbs 6:9-11',
    verse: 'How long wilt thou sleep, O sluggard? when wilt thou arise out of thy sleep? Yet a little sleep, a little slumber, a little folding of the hands to sleep: So shall thy poverty come as one that travelleth, and thy want as an armed man.',
    insight: 'Poverty is not an event — it is an arrival. The lazy person does not face a single catastrophic failure; they face the quiet accumulation of small neglects until poverty arrives like a soldier who has been marching toward you for years.'
  },
  {
    reference: 'Proverbs 13:4',
    verse: 'The soul of the sluggard desireth, and hath nothing: but the soul of the diligent shall be made fat.',
    insight: 'The lazy person wants the same things as the diligent person — success, security, provision. The difference is not desire. The difference is action. Desire without discipline produces nothing.'
  },
  {
    reference: 'Proverbs 21:25-26',
    verse: 'The desire of the slothful killeth him; for his hands refuse to labour. He coveteth greedily all the day long: but the righteous giveth and spareth not.',
    insight: 'Sloth is not passive — it is destructive. The sluggard wants but will not work. That gap between want and effort is where dreams die. Notice the contrast: the righteous person is so productive they have excess to give.'
  },
  {
    reference: 'Proverbs 18:9',
    verse: 'He also that is slothful in his work is brother to him that is a great waster.',
    insight: 'Laziness and destruction are family. The person who does poor work is not neutral — they are causing damage. Mediocrity costs. The manager who avoids hard conversations, the worker who cuts corners — both are wasting what has been entrusted to them.'
  },
  {
    reference: 'Proverbs 26:13-14',
    verse: 'The slothful man saith, There is a lion in the way; a lion is in the streets. As the door turneth upon his hinges, so doth the slothful upon his bed.',
    insight: 'Notice the excuse: a lion in the street. The sluggard invents obstacles to justify inaction. The excuses are creative, but they are always excuses. Meanwhile, the door swings on its hinges going nowhere — movement without progress.'
  },
  {
    reference: 'Proverbs 10:4-5',
    verse: 'He becometh poor that dealeth with a slack hand: but the hand of the diligent maketh rich. He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame.',
    insight: 'Timing matters. The lazy person does not just fail in general — they fail at the critical moment. Sleeping during harvest is the definition of missing your season. Diligence means showing up especially when the window is open.'
  },
]

export default function ProverbsAboutLazinessPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-800 to-stone-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Proverbs About Laziness
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 max-w-2xl mx-auto mb-8">
            Solomon had sharp words for the sluggard. If you have been putting off what you know you should do, Proverbs has something to say directly to you.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-stone-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors"
          >
            Ask Solomon About Your Situation →
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Why Solomon Wrote So Much About Laziness</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Of all the character types Solomon describes in Proverbs, the <em>sluggard</em> gets some of the most vivid and cutting treatment. Solomon is not harsh without reason — he had watched enough people to know that laziness is one of the most common destroyers of potential.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The lazy person is not evil. They are not malicious. They simply refuse to do what needs to be done. And that refusal — compounded over time — produces poverty, shame, and a life of wanting without receiving.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            The antidote Solomon offers is not willpower — it is wisdom. The wise person understands seasons, sees consequences clearly, and acts accordingly. Here is what Proverbs says.
          </p>
        </div>
      </section>

      {/* Proverbs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">7 Proverbs About Laziness & Diligence</h2>
        <div className="space-y-8">
          {lazinessProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <div className="flex items-start gap-4">
                <span className="bg-stone-100 text-stone-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
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

      {/* The Ant Principle */}
      <section className="bg-amber-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Ant Principle: 3 Lessons for the Diligent</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-amber-700 rounded-xl p-6">
              <div className="text-3xl mb-3">🐜</div>
              <h3 className="font-bold text-lg mb-2">No External Accountability</h3>
              <p className="text-amber-100 text-sm">The ant needs no guide, overseer, or ruler. True diligence is internally driven. Stop waiting for someone to make you do what you already know you should do.</p>
            </div>
            <div className="bg-amber-700 rounded-xl p-6">
              <div className="text-3xl mb-3">☀️</div>
              <h3 className="font-bold text-lg mb-2">Seasonal Awareness</h3>
              <p className="text-amber-100 text-sm">The ant works in summer and gathers in harvest. Every life has seasons of opportunity. The diligent person recognizes them and acts. The sluggard sleeps through them.</p>
            </div>
            <div className="bg-amber-700 rounded-xl p-6">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-bold text-lg mb-2">Future Orientation</h3>
              <p className="text-amber-100 text-sm">The ant gathers before it needs. Diligence is always preparing — not waiting until the crisis hits. The lazy person reacts. The diligent person prepares.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
          Ready to Break the Pattern?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          If procrastination, avoidance, or a lack of motivation is holding you back — Ask Solomon can help you find the specific wisdom from Proverbs that speaks to your situation.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-amber-700 transition-colors shadow-lg"
        >
          Ask Solomon a Question →
        </Link>
        <p className="text-gray-400 text-sm mt-4">Free. No sign-up required.</p>
      </section>

      {/* Related */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-success" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Success</Link>
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-money" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Money</Link>
            <Link href="/proverbs-for-fear" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Fear</Link>
            <Link href="/proverbs-for-self-control" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Self-Control</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Laziness & Procrastination" />

    </main>
  )
}
