import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs About Money | What the Bible Says About Finances',
  description: 'Discover what Proverbs says about money, wealth, debt, generosity, and financial wisdom. Biblical principles for managing money from King Solomon.',
  keywords: 'proverbs about money, bible verses about money, what does the bible say about money, biblical financial wisdom, proverbs for finances, solomon money',
  openGraph: {
    title: 'Proverbs About Money | Ask Solomon',
    description: 'Solomon was the wealthiest man in history. Here is what he taught about money, debt, generosity, and financial wisdom from the Book of Proverbs.',
    url: 'https://asksolomon.app/proverbs-for-money',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const moneyProverbs = [
  {
    reference: 'Proverbs 22:7',
    verse: 'The rich ruleth over the poor, and the borrower is servant to the lender.',
    insight: 'Debt is not just a financial condition — it is a relational one. The moment you borrow, you shift power to someone else. Solomon saw this clearly 3,000 years ago. Avoid debt like slavery, because it is.'
  },
  {
    reference: 'Proverbs 3:9-10',
    verse: 'Honour the Lord with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty.',
    insight: 'The firstfruits principle: give the first portion to God before you pay bills, before you save, before you spend. It is a faith declaration that God is the source — not your job, not the market.'
  },
  {
    reference: 'Proverbs 13:11',
    verse: 'Wealth gotten by vanity shall be diminished: but he that gathereth by labour shall increase.',
    insight: 'Get-rich-quick destroys wealth. Patient, consistent labor builds it. This is not motivational — it is observable law. Solomon had watched enough people to know that rapid wealth rarely sticks.'
  },
  {
    reference: 'Proverbs 21:5',
    verse: 'The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.',
    insight: 'Planning plus diligence produces abundance. Impatience produces poverty. The same action performed with thought and consistency yields very different results than the same action performed frantically.'
  },
  {
    reference: 'Proverbs 11:24-25',
    verse: 'There is that scattereth, and yet increaseth; and there is that withholdeth more than is meet, but it tendeth to poverty. The liberal soul shall be made fat: and he that watereth shall be watered also himself.',
    insight: 'Generosity is an economic principle, not just a moral one. The one who gives freely increases. The miser who hoards tends toward poverty. Solomon is describing a spiritual law woven into the fabric of financial life.'
  },
  {
    reference: 'Proverbs 23:4-5',
    verse: 'Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.',
    insight: 'Do not make wealth the goal — it is unstable and can disappear overnight. Build wisdom, character, and the habits that produce wealth. The fruit is more reliable than chasing the fruit directly.'
  },
  {
    reference: 'Proverbs 28:20',
    verse: 'A faithful man shall abound with blessings: but he that maketh haste to be rich shall not be innocent.',
    insight: 'Faithfulness — doing the right thing over a long time — is the path to abundance. The shortcut mentality is not just unwise financially; Solomon says it is a moral compromise.'
  },
]

export default function ProverbsForMoneyPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Proverbs About Money
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto mb-8">
            Solomon was the wealthiest man who ever lived. He had more to say about money than almost any other topic — and it is not what most people expect.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-400 text-green-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors"
          >
            Ask Solomon About Your Finances →
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">What Made Solomon&apos;s Financial Wisdom Different</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Solomon did not become wealthy by accident. He received wisdom from God, and that wisdom expressed itself in every area of life — including how he managed resources, built enterprises, and understood the principles that govern wealth.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Most financial advice today is tactical: budget this, invest that, cut expenses here. Solomon&apos;s wisdom goes deeper. He addresses the <strong>character and mindset</strong> that determine whether wealth is built, kept, or destroyed.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Here are seven of Solomon&apos;s most powerful money principles — still as relevant today as when they were written 3,000 years ago.
          </p>
        </div>
      </section>

      {/* Proverbs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">7 Proverbs About Money & Wealth</h2>
        <div className="space-y-8">
          {moneyProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <div className="flex items-start gap-4">
                <span className="bg-green-100 text-green-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  {item.reference}
                </span>
              </div>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-green-400">
                &ldquo;{item.verse}&rdquo;
              </blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Principles */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Solomon&apos;s 5 Wealth Principles</h2>
          <p className="text-green-200 text-center mb-10">From the book <em>Success Secrets of Solomon</em> by John Craddock</p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { num: '1', title: 'Firstfruits', desc: 'Honor God with the first portion of all income' },
              { num: '2', title: 'Diligence', desc: 'Consistent daily labor compounds into abundance' },
              { num: '3', title: 'Avoid Debt', desc: 'Debt enslaves — live within your means' },
              { num: '4', title: 'Generosity', desc: 'Give freely — the generous soul is made fat' },
              { num: '5', title: 'Knowledge', desc: 'Desire without knowledge leads to ruin — learn first' },
            ].map((p) => (
              <div key={p.num} className="bg-green-700 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-300 mb-1">{p.num}</div>
                <div className="font-bold text-sm mb-2">{p.title}</div>
                <p className="text-green-100 text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
          Apply Biblical Financial Wisdom to Your Situation
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you are dealing with debt, struggling with generosity, or trying to make a major financial decision — Ask Solomon delivers wisdom from Proverbs tailored to your situation.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-700 text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-green-800 transition-colors shadow-lg"
        >
          Ask Solomon About Money →
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
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-fear" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Fear</Link>
            <Link href="/proverbs-about-laziness" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs About Laziness</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Money & Wealth" />

    </main>
  )
}
