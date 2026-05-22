import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'
export const metadata: Metadata = {
  title: 'What Does the Bible Say About Success? | Biblical Success Principles',
  description: 'What does the Bible say about success and prosperity? Biblical framework for success from King Solomon that goes beyond wealth to wisdom, character, and purpose.',
  keywords: 'what does the bible say about success, biblical success, bible verses about success, christian success principles, god and success, proverbs about success',
  openGraph: {
    title: 'What Does the Bible Say About Success? | Ask Solomon',
    description: 'The Bible has a lot to say about success. Here is the biblical framework drawn from the writings of King Solomon.',
    url: 'https://asksolomon.app/what-does-the-bible-say-about-success',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const principles = [
  { n: '1', t: 'Success begins with wisdom, not strategy', v: 'Proverbs 4:7', d: 'Get wisdom first. Wealth, relationships, achievement all follow from that foundation.' },
  { n: '2', t: 'Diligence is the engine', v: 'Proverbs 22:29', d: 'The diligent person stands before kings. Not the most talented but the most consistent and excellent.' },
  { n: '3', t: 'Character determines direction', v: 'Proverbs 11:3', d: 'The integrity of the upright guides them. The crookedness of the treacherous destroys them.' },
  { n: '4', t: 'Relationships are multipliers', v: 'Proverbs 27:17', d: 'Iron sharpens iron. Your closest relationships either accelerate your success or undermine it.' },
  { n: '5', t: 'Humility is the prerequisite', v: 'Proverbs 22:4', d: 'By humility and the fear of the Lord are riches and honor and life.' },
]

export default function WhatDoesBibleSayAboutSuccessPage() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-b from-amber-800 to-amber-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300 text-sm font-semibold tracking-widest uppercase mb-4">Biblical Wisdom</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">What Does the Bible Say About Success?</h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto mb-8">
            The Bible does not avoid the topic of success. It redefines it. Here is what the wisest man who ever lived had to say.
          </p>
          <Link href="/" className="inline-block bg-white text-amber-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-100 transition-colors">
            Ask Solomon About Your Situation
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">The Biblical Framework for Success</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Most definitions of success focus on outcomes: wealth, achievement, recognition. The Book of Proverbs starts somewhere completely different. It starts with wisdom.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Solomon was given an extraordinary choice by God: ask for anything. He asked for wisdom. God gave him wisdom, and then also gave him wealth, honor, and long life. Wisdom first. Everything else followed.
        </p>

        <div className="bg-amber-100 border-l-4 border-amber-500 p-6 my-8 rounded-r-xl">
          <p className="text-amber-900 text-lg font-medium">
            âWisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.â â Proverbs 4:7
          </p>
        </div>

        <h3 className="text-2xl font-bold text-amber-900 mb-6">5 Things the Bible Says About Success</h3>
        <div className="space-y-4">
          {principles.map((p) => (
            <div key={p.n} className="bg-white rounded-xl border border-amber-100 p-6 flex gap-4">
              <div className="text-2xl font-bold text-amber-400 min-w-[2rem]">{p.n}</div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="font-bold text-gray-800">{p.t}</span>
                  <span className="text-amber-600 text-sm">â {p.v}</span>
                </div>
                <p className="text-gray-600 text-sm">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Apply Solomon's Wisdom to Your Situation</h2>
          <p className="text-amber-100 text-lg mb-8">Ask Solomon delivers wisdom from Proverbs based on exactly what you are facing.</p>
          <Link href="/" className="inline-block bg-white text-amber-900 font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-100 transition-colors">Ask Solomon a Question</Link>
          <p className="text-amber-300 text-sm mt-4">Free. No sign-up required.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/success-secrets-of-solomon" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Success Secrets of Solomon</Link>
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-success" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Success</Link>
            <Link href="/proverbs-for-money" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Money</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Biblical Success" />

    </main>
  )
}
