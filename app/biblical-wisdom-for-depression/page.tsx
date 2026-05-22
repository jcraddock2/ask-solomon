“”—import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Biblical Wisdom for Depression | What the Bible Says About Sadness & Despair',
  description: 'Find biblical wisdom for depression, sadness, and despair. What Proverbs and scripture say about hope, healing, and finding light in dark seasons of life.',
  keywords: 'biblical wisdom for depression, bible verses for depression, proverbs about sadness, what does the bible say about depression, bible hope depression, solomon grief',
  openGraph: {
    title: 'Biblical Wisdom for Depression | Ask Solomon',
    description: 'The Bible does not pretend that sadness and despair are not real. Here is what Proverbs and scripture say about finding hope and healing in dark seasons.',
    url: 'https://asksolomon.app/biblical-wisdom-for-depression',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const depressionVerses = [
  {
    reference: 'Proverbs 12:25',
    verse: 'Heaviness in the heart of man maketh it stoop: but a good word maketh it glad.',
    insight: 'Solomon acknowledges the weight of a heavy heart without shame or dismissal. The Hebrew word for heaviness describes something that bends you down. The remedy he names is a good word — spoken by the right person at the right moment. Isolation deepens heaviness; connection and truth can lift it.'
  },
  {
    reference: 'Proverbs 14:13',
    verse: 'Even in laughter the heart is sorrowful; and the end of that mirth is heaviness.',
    insight: 'Solomon sees what many miss: the person laughing loudest is sometimes carrying the deepest grief. Outward performance does not equal inward peace. This verse is not pessimistic — it is compassionate. It asks you to look beneath the surface in yourself and in others.'
  },
  {
    reference: 'Proverbs 17:22',
    verse: 'A merry heart doeth good like a medicine: but a broken spirit drieth the bones.',
    insight: 'A broken spirit has physical consequences. Solomon saw the connection between inner state and bodily health long before modern medicine confirmed it. The good news: the inverse is also true. Joy is medicine. Tending to inner life is tending to the whole person.'
  },
  {
    reference: 'Proverbs 13:12',
    verse: 'Hope deferred maketh the heart sick: but when the desire cometh, it is a tree of life.',
    insight: 'Many depressions trace back to a specific, long-deferred hope. Something you wanted deeply and waited for — and it did not come. Solomon names this experience and validates it: hope deferred makes the heart sick. The prescription is not to stop hoping but to anchor hope in the right place.'
  },
  {
    reference: 'Proverbs 3:5-6',
    verse: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    insight: 'When you cannot see a way forward — when your own understanding runs out — this is the wisdom. Not a self-help strategy, but a Person. Trust is not naivety; it is a choice to anchor to something more stable than your current emotional state or circumstances.'
  },
  {
    reference: 'Proverbs 18:14',
    verse: 'The spirit of a man will sustain his infirmity; but a wounded spirit who can bear?',
    insight: 'The human spirit is remarkably resilient — it can carry enormous physical hardship. But a wounded spirit is the hardest burden of all. Solomon is saying: attend to the spirit. Physical and circumstantial healing without spiritual healing is incomplete. The inner wound must be addressed.'
  },
]

export default function BiblicalWisdomForDepressionPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-300 text-sm font-semibold tracking-widest uppercase mb-4">Biblical Wisdom</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Biblical Wisdom for Depression
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-8">
            The Bible does not pretend that sadness, despair, and broken-heartedness are not real. Here is what Proverbs says about finding hope and healing in the darkest seasons.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors"
          >
            Ask Solomon About What You Are Feeling →
          </Link>
        </div>
      </section>

      {/* Important Note */}
      <section className="max-w-4xl mx-auto px-4 pt-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-blue-800 text-sm">
            <strong>A note:</strong> If you are experiencing severe depression or thoughts of self-harm, please reach out to a mental health professional or call the 988 Suicide & Crisis Lifeline by dialing <strong>988</strong>. Biblical wisdom is a powerful companion to healing — and sometimes healing also requires professional support. Both can be true.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">What the Bible Actually Says About Sadness and Despair</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Scripture is full of people in darkness. Job lost everything. David wrote psalms from pits of despair. Elijah asked God to let him die. The Bible is not a book for people who have it together — it is a book for people who do not.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Proverbs, written largely by Solomon, does not avoid the reality of heaviness, grief, hope deferred, and broken spirits. In fact, Solomon names these experiences with more precision than most modern vocabulary allows.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Here is what he had to say — and what it means for the dark season you may be in right now.
          </p>
        </div>
      </section>

      {/* Verses */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">6 Biblical Passages on Depression, Grief & Hope</h2>
        <div className="space-y-8">
          {depressionVerses.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <div className="flex items-start gap-4">
                <span className="bg-slate-100 text-slate-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  {item.reference}
                </span>
              </div>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-slate-400">
                “{item.verse}”
              </blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Things to Remember */}
      <section className="bg-slate-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">3 Things Solomon Wants You to Know</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-3">💙</div>
              <h3 className="font-bold text-lg mb-2">Your Grief Is Real</h3>
              <p className="text-slate-300 text-sm">Solomon does not minimize it. He names heaviness, broken spirits, and sorrow — and treats them as genuine burdens that require genuine help, not just positive thinking.</p>
            </div>
            <div className="bg-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-3">🌅</div>
              <h3 className="font-bold text-lg mb-2">Hope Is Not Gone</h3>
              <p className="text-slate-300 text-sm">When the desire comes, it is a tree of life. The fulfilled hope — the answered prayer, the breakthrough — brings life back. Dark seasons are seasons, not permanent states.</p>
            </div>
            <div className="bg-slate-700 rounded-xl p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-lg mb-2">You Were Not Made for Isolation</h3>
              <p className="text-slate-300 text-sm">A good word makes a heavy heart glad. Reach toward people — a trusted friend, a pastor, a counselor. Healing rarely happens alone. Iron sharpens iron, and the right voice can lift what you cannot carry by yourself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
          Tell Solomon What You Are Going Through
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ask Solomon finds wisdom from Proverbs that speaks directly to your situation — whether you are grieving, stuck, hopeless, or just carrying more than you can explain.
        </p>
        <Link
          href="/"
          className="inline-block bg-slate-700 text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-slate-800 transition-colors shadow-lg"
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
            <Link href="/proverbs-for-hope" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Hope</Link>
            <Link href="/proverbs-for-fear" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Fear</Link>
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-friendship" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Friendship</Link>
            <Link href="/proverbs-for-purpose" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Purpose</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Depression & Heaviness" />

    </main>
  )
}
