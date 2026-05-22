import type { Metadata } from 'next'
import Link from 'next/link'
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: 'Proverbs About Pride | What the Bible Says About Pride & Humility',
  description: 'Discover what Proverbs says about pride â why it comes before destruction and how to walk in humility. Biblical wisdom on pride, arrogance, and a haughty spirit.',
  keywords: 'proverbs about pride, pride comes before a fall bible, proverbs about arrogance, what does the bible say about pride, humble yourself bible, proverbs for humility',
  openGraph: {
    title: 'Proverbs About Pride | Ask Solomon',
    description: 'Pride is the silent destroyer of relationships, leadership, and destiny. Here is what Solomon â the wisest man who ever lived â had to say about it.',
    url: 'https://asksolomon.app/proverbs-for-pride',
    siteName: 'Ask Solomon',
    type: 'article',
  },
}

const prideProverbs = [
  {
    reference: 'Proverbs 16:18',
    verse: 'Pride goeth before destruction, and an haughty spirit before a fall.',
    insight: 'This is the most quoted verse on pride for good reason â it is the most clearly observable. Solomon did not offer a moral opinion; he described a pattern he had watched play out repeatedly. Pride does not just precede failure occasionally. It is a reliable precursor. The haughty spirit before a fall is a sequence, not an exception.'
  },
  {
    reference: 'Proverbs 11:2',
    verse: 'When pride cometh, then cometh shame: but with the lowly is wisdom.',
    insight: 'Pride and shame are linked. The proud person believes they are above correction, above failure, above needing others. And then the shame comes â often publicly. Meanwhile, the lowly person (not the defeated, but the humble) walks in wisdom. Wisdom and humility travel together.'
  },
  {
    reference: 'Proverbs 13:10',
    verse: 'Only by pride cometh contention: but with the well advised is wisdom.',
    insight: 'Almost every relational conflict can be traced back to pride â someone unwilling to listen, to be wrong, to defer. Solomon says contention comes only from pride. This is a diagnostic: if there is persistent conflict in a relationship or organization, look for the pride.'
  },
  {
    reference: 'Proverbs 29:23',
    verse: 'A man\'s pride shall bring him low: but honour shall uphold the humble in spirit.',
    insight: 'The proud person strives for honor and loses it. The humble person does not strive for honor â and receives it. Solomon describes a paradox that Jesus would later amplify: whoever exalts himself will be humbled; whoever humbles himself will be exalted. This is not just theology; it is the observable pattern of how life works.'
  },
  {
    reference: 'Proverbs 6:16-17',
    verse: 'These six things doth the Lord hate: yea, seven are an abomination unto him: A proud look...',
    insight: 'A proud look tops God\'s list of what He finds detestable. Not murder, not theft â a proud look. This tells us something about how seriously God views pride. It is not a minor personality flaw. It is a posture of the heart that displaces God from His proper position.'
  },
  {
    reference: 'Proverbs 15:33',
    verse: 'The fear of the Lord is the instruction of wisdom; and before honour is humility.',
    insight: 'Humility is not optional for anyone who wants wisdom or honor. It is the prerequisite. Before honor â not after, not alongside. The sequence matters: first humility, then honor. Every shortcut around humility bypasses the very thing that makes honor meaningful and stable.'
  },
]

export default function ProverbsForPridePage() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-b from-red-900 to-red-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-300 text-sm font-semibold tracking-widest uppercase mb-4">Book of Proverbs</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Proverbs About Pride</h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto mb-8">
            Solomon called pride the source of conflict, the precursor to destruction, and the posture God opposes most. Here is why â and what wisdom looks like instead.
          </p>
          <Link href="/" className="inline-block bg-amber-400 text-red-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">
            Ask Solomon About Your Situation â
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-amber-100 border border-amber-300 rounded-xl p-6 mb-10">
          <p className="text-amber-900 text-lg font-medium text-center">
            &ldquo;Pride goeth before destruction, and an haughty spirit before a fall.&rdquo; â Proverbs 16:18
          </p>
        </div>
        <h2 className="text-3xl font-bold text-amber-900 mb-8">6 Proverbs About Pride & Humility</h2>
        <div className="space-y-8">
          {prideProverbs.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
              <span className="bg-red-100 text-red-800 font-bold text-sm px-3 py-1 rounded-full">{item.reference}</span>
              <blockquote className="text-xl text-gray-800 italic font-medium my-4 pl-4 border-l-4 border-red-400">&ldquo;{item.verse}&rdquo;</blockquote>
              <p className="text-gray-600 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-red-800 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Pride Is the One Thing God Opposes</h2>
          <p className="text-red-100 text-lg mb-8">James 4:6 says God resists the proud but gives grace to the humble. If you want God&apos;s grace flowing through your life â Solomon&apos;s path starts with humility. Ask Solomon what Proverbs says about your specific situation.</p>
          <Link href="/" className="inline-block bg-amber-400 text-red-900 font-bold px-10 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">Ask Solomon a Question â</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">More Biblical Wisdom</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/proverbs-for-humility" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Humility</Link>
            <Link href="/proverbs-for-friendship" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Friendship</Link>
            <Link href="/proverbs-for-wisdom" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Wisdom</Link>
            <Link href="/proverbs-for-self-control" className="bg-white border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors">Proverbs for Self-Control</Link>
          </div>
        </div>
      </section>

      <SevenDaysOptIn topic="Pride & Humility" />

    </main>
  )
}
