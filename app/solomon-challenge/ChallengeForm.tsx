'use client'
import { useState } from 'react'

export default function ChallengeForm({ buttonText = 'Start the Challenge' }: { buttonText?: string }) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!email) return
        setStatus('loading')
        try {
                const res = await fetch('/api/subscribe', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email, groupId: '188449434786334023' }),
                })
                if (res.ok) { setStatus('success'); setEmail('') }
                else { setStatus('error') }
        } catch { setStatus('error') }
  }

  if (status === 'success') {
        return <div style={{color:'#166534',background:'#dcfce7',border:'1px solid #86efac',borderRadius:12,padding:'16px 24px',fontWeight:600,fontSize:16,textAlign:'center'}}>You are in. Check your inbox for Day 1.</div>
          }

  return (
        <div className="flex flex-col gap-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required className="px-6 py-4 rounded-full text-gray-900 text-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                      <button type="submit" disabled={status === 'loading'} className="bg-amber-400 text-amber-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-amber-300 transition-colors">
                        {status === 'loading' ? 'Sending...' : buttonText}
                      </button>
              </form>
          {status === 'error' && <p style={{color:'#dc2626',fontSize:14,textAlign:'center'}}>Something went wrong. Please try again.</p>}
        </div>
      )
}
