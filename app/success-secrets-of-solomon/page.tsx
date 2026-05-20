import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Success Secrets of Solomon | Biblical Wisdom for Success & Achievement',
  description: 'Explore the success principles of King Solomon from the Book of Proverbs. Wisdom on wealth, leadership, relationships, and purpose — from the most successful man in history.',
  keywords: 'success secrets of solomon, solomon success principles, biblical wisdom for success, proverbs for success, king solomon success, john craddock solomon book',
  openGraph: {
    title: 'Success Secrets of Solomon | Ask Solomon',
    description: 'Solomon was wealthier, wiser, and more accomplished than anyone before or after. Here are the principles he lived by — drawn from the Book of Proverbs.',
    url: 'https://asksolomon.app/success-secrets-of-solomon',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const successPrinciples = [
  {
    number: '01',
    title: 'Wisdom First',
    proverb: 'Proverbs 4:7',
    description: 'Solomon asked God for wisdom above all else — and received it. Then everything else followed. The foundation of his success was not intelligence, ambition, or strategy. It was wisdom from God.',
  },
  {
    number: '02',
    title: 'Firstfruits Principle',
    proverb: 'Proverbs 3:9-10',
    description: 'Honor God with the first of everything — income, time, attention. This is both a spiritual discipline and a financial principle. Solomon called it the path to full barns.',
  },
  {
    number: '03',
    title: 'Diligence Over Brilliance',
    proverb: 'Proverbs 22:29',
    description: 'Seest thou a man diligent in his work? He shall stand before kings. Not the most talented — the most diligent. Consistent, excellent work is what opens the rooms most people want to be in.',
  },
  {
    number: '04',
    title: 'Guard Your Associations',
    proverb: 'Proverbs 13:20',
    description: 'Walk with wise men and become wise. Companion yourself with fools and suffer. Solomon understood that your five closest relationships are the most powerful force shaping your trajectory.',
  },
  {
    number: '05',
    title: 'Guard Your Heart',
    proverb: 'Proverbs 4:23',
    description: 'Keep your heart with all diligence, for out of it are the issues of life. Every area of your life — your business, your family, your health — flows from the condition of your heart.',
  },
  {
    number: '06',
    title: 'The Power of the Tongue',
    proverb: 'Proverbs 18:21',
    description: 'Death and life are in the power of the tongue. What you say — about yourself, to others, about your future — shapes outcomes. Solomon took words seriously as a force, not just a medium.',
  },
  {
    number: '07',
    title: 'Vision Is Non-Negotiable',
    proverb: 'Proverbs 29:18',
    description: 'Where there is no vision, the people perish. Success without direction is just movement. Solomon built with purpose. Vision is what transforms daily diligence into a legacy.',
  },
]

const seoPages = [
  { href: '/proverbs-for-wisdom', label: 'Proverbs for Wisdom', desc: 'The foundation of everything Solomon built' },
  { href: '/proverbs-for-money', label: 'Proverbs for Money', desc: 'Solomon's 5 timeless financial principles' },
  { href: '/proverbs-for-success', label: 'Proverbs for Success', desc: 'What Proverbs says about achieving excellence' },
  { href: '/proverbs-for-wealth-and-prosperity', label: 'Proverbs for Wealth', desc: 'Biblical wisdom on building and keeping wealth' },
  { href: '/proverbs-for-purpose', label: 'Proverbs for Purpose', desc: 'Vision, calling, and direction from Proverbs' },
  { href: '/proverbs-for-friendship', label: 'Proverbs for Friendship', desc: 'Iron sharpens iron — choosing the right relationships' },
  { href: '/proverbs-for-humility', label: 'Proverbs for Humility', desc: 'Before honor is humility' },
  { href: '/proverbs-for-self-control', label: 'Proverbs for Self-Control', desc: 'Ruling your spirit — the greatest conquest' },
  { href: '/proverbs-for-pride', label: 'Proverbs for Pride', desc: 'Pride goes before destruction' },
  { href: '/proverbs-about-laziness', label: 'Proverbs About Laziness', desc: 'Go to the ant, thou sluggard' },
  { href: '/proverbs-for-fear', label: 'Proverbs for Fear', desc: 'The fear of man is a snare — trust God' },
  { href: '/proverbs-for-hope', label: 'Proverbs for Hope', desc: 'Your expectation shall not be cut off' },
]

export default function SuccessSecretsOfSolomonPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-900 to-amber-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300 text-sm font-semibold tracking-widest uppercase mb-4">Biblical Wisdom Hub</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Success Secrets of Solomon
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto mb-8">
            Solomon was the wealthiest, wisest, and most accomplished person in recorded history. He left behind 3,000 proverbs. These are the principles he built his life on.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-100 transition-colors"
          >
            Ask Solomon a Question →
          </Link>
        </div>
      </section>

      {/* Who Was Solomon */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Who Was Solomon — And Why Does His Wisdom Matter Today?</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Solomon became king of Israel around 970 BCE and reigned for forty years. By the end of his reign, he had accumulated wealth that would be estimated today in the trillions of dollars, built one of the ancient world&apos;s most magnificent architectural projects (the Temple in Jerusalem), received dignitaries from nations across the earth, and authored thousands of proverbs and songs.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            What made Solomon different was not his birth. It was a single moment when God appeared to him and said &ldquo;Ask what I shall give thee.&rdquo; Solomon asked for wisdom — and God gave him wisdom, and then also gave him what he had not asked for. That sequence has never stopped being instructive.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            The Book of Proverbs is Solomon&apos;s legacy to you. It is a compressed transmission of everything he learned about how life actually works — about money, work, relationships, speech, character, and God. The success secrets below are drawn directly from that book.
          </p>
        </div>
      </section>

      {/* 7 Principles */}
      <section className="bg-amber-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">7 Success Principles from King Solomon</h2>
          <p className="text-amber-200 text-center mb-10">From the book <em>Success Secrets of Solomon</em> by John Craddock</p>
          <div className="space-y-4">
            {successPrinciples.map((p) => (
              <div key={p.number} className="bg-amber-700 rounded-xl p-6 flex gap-6">
                <div className="text-3xl font-bold text-amber-300 min-w-[3rem]">{p.number}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <span className="text-amber-300 text-sm">— {p.proverb}</span>
                  </div>
                  <p className="text-amber-100 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">Apply These Principles to Your Exact Situation</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ask Solomon is a free app that delivers wisdom from Proverbs based on what you are actually dealing with — a financial decision, a relationship challenge, a question about your direction, or anything else.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-amber-700 transition-colors shadow-lg"
        >
          Ask Solomon a Question →
        </Link>
        <p className="text-gray-400 text-sm mt-4">Free. No sign-up required.</p>
      </section>

      {/* Topic Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Explore Solomon&apos;s Wisdom by Topic</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {seoPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="bg-white border border-amber-200 rounded-xl p-5 hover:bg-amber-50 transition-colors"
              >
                <div className="font-bold text-amber-900 mb-1">{page.label}</div>
                <div className="text-gray-500 text-sm">{page.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
