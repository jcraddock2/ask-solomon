import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Solomon Challenge | 7 Days of Biblical Wisdom',
  description: 'Take the Solomon Challenge: 7 days, 7 wisdom principles from Proverbs applied to your real life. Start your free 7-day email course today.',
  keywords: 'solomon challenge, 7 days of solomon, biblical wisdom challenge, proverbs wisdom course, success secrets of solomon, john craddock',
  openGraph: {
    title: 'The Solomon Challenge | 7 Days of Biblical Wisdom',
    description: 'Solomon asked God for one thing — wisdom. Then everything else followed. Take the 7-day Solomon Challenge and let the same wisdom transform your life.',
    url: 'https://asksolomon.app/solomon-challenge',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const days = [
  { day: 'Day 1', title: 'Solomon\'s Blank Check Moment', preview: 'What would you ask for if God said ask for anything? Solomon\'s answer changed everything.' },
  { day: 'Day 2', title: 'Guard Your Heart', preview: 'Out of the heart flow the issues of life. The most important thing you will manage today is internal.' },
  { day: 'Day 3', title: 'Death and Life in the Tongue', preview: 'Solomon said the tongue holds the power of life and death. Here is how to use it wisely.' },
  { day: 'Day 4', title: 'The Ant Principle', preview: 'The ant needs no boss. No external accountability. Just an internal drive to prepare. What can you learn from it?' },
  { day: 'Day 5', title: 'Solomon\'s 5 Wealth Principles', preview: 'Firstfruits. Diligence. Debt. Generosity. Knowledge. A framework for financial life that still works.' },
  { day: 'Day 6', title: 'Iron Sharpens Iron', preview: 'Your five closest relationships are shaping you. Are they sharpening you or dulling you?' },
  { day: 'Day 7', title: 'Where There Is No Vision', preview: 'Without vision, the people perish. What is the vision for your life? Today you design it.' },
]

export default function SolomonChallengePage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300 text-sm font-semibold tracking-widest uppercase mb-4">Free 7-Day Email Course</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Solomon<br />Challenge
          </h1>
          <p className="text-2xl text-amber-100 max-w-2xl mx-auto mb-4">
            7 days. 7 principles. One question that changes everything.
          </p>
          <p className="text-amber-200 text-lg max-w-xl mx-auto mb-10">
            Solomon asked God for wisdom above all else. Then wealth, honor, and influence followed. Take the challenge and let the same wisdom reshape your life in seven days.
          </p>
          <div className="max-w-md mx-auto">
            <p className="text-amber-200 text-sm mb-4">Sign up with your email to receive Day 1 immediately:</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-4 rounded-full text-gray-900 text-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="bg-amber-400 text-amber-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors w-full">
                Start the Challenge — It\u2019s Free
              </button>
            </div>
            <p className="text-amber-300 text-xs mt-3">No spam. Unsubscribe anytime. One email per day for 7 days.</p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4 text-center">What Happens During the Challenge</h2>
        <p className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto">
          Each day you receive one email with one powerful principle from Proverbs, one reflection question, and one action you can take that day.
        </p>
        <div className="space-y-4">
          {days.map((day, index) => (
            <div key={index} className="bg-white rounded-2xl border border-amber-100 p-6 flex gap-6 shadow-sm">
              <div className="bg-amber-100 text-amber-800 font-bold text-sm px-3 py-2 rounded-xl whitespace-nowrap h-fit">
                {day.day}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{day.title}</h3>
                <p className="text-gray-600">{day.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Solomon */}
      <section className="bg-amber-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Solomon\u2019s Wisdom?</h2>
              <p className="text-amber-100 text-lg leading-relaxed mb-4">
                Solomon was not just wise in theory. He was the most accomplished person in the ancient world \u2014 managing a kingdom, building architectural wonders, conducting trade across continents, and raising the standard of living for an entire nation.
              </p>
              <p className="text-amber-100 text-lg leading-relaxed">
                And he left us 3,000 proverbs. A compressed library of everything he learned about how life actually works. The Solomon Challenge gives you seven of the most important principles he wrote \u2014 in seven days you can apply immediately.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { stat: '3,000+', label: 'Proverbs written by Solomon' },
                { stat: '3,000', label: 'Years of proven wisdom' },
                { stat: '7', label: 'Days to transform your thinking' },
                { stat: '0', label: 'Cost to start' },
              ].map((s) => (
                <div key={s.stat} className="bg-amber-700 rounded-xl p-4 flex items-center gap-4">
                  <div className="text-3xl font-bold text-amber-300">{s.stat}</div>
                  <div className="text-amber-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial style */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-amber-100 rounded-2xl p-10">
          <div className="text-5xl mb-4">📖</div>
          <blockquote className="text-2xl font-medium text-amber-900 italic mb-4">
            “Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.”
          </blockquote>
          <cite className="text-amber-700 font-semibold">Proverbs 4:7 — King Solomon</cite>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-amber-900 text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-amber-100 text-xl mb-10">
            Day 1 arrives in your inbox immediately. No cost. No commitment. Just seven days of wisdom that could reshape how you think, work, and live.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-4 rounded-full text-gray-900 text-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="bg-amber-400 text-amber-900 font-bold px-8 py-4 rounded-full text-xl hover:bg-amber-300 transition-colors w-full">
                Start the 7-Day Solomon Challenge
              </button>
            </div>
            <p className="text-amber-400 text-xs mt-3">Free forever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Or start asking Solomon questions right now:</p>
          <Link href="/" className="inline-block bg-amber-600 text-white font-bold px-8 py-3 rounded-full hover:bg-amber-700 transition-colors">
            Ask Solomon a Free Question
          </Link>
        </div>
      </section>
    </main>
  )
}
