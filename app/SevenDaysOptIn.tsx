'use client'

import { useState } from 'react'

export default function SevenDaysOptIn({ topic }: { topic?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section style={{
      background: '#0d1b2a',
      padding: '60px 20px',
      textAlign: 'center' as const,
    }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p style={{
          color: '#c9a227',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          marginBottom: 12,
        }}>
          Free Email Course
        </p>
        <h2 style={{
          color: '#fff',
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 12,
          lineHeight: 1.25,
        }}>
          {topic ? topic + ' — 10 Days of Solomon' : '10 Days of Solomon'}        </h2>
        <p style={{
          color: '#a8b8c8',
          fontSize: 16,
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
            10 daily emails. One principle from the wisest man who ever lived, applied to your real life. Free.        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(201,162,39,0.15)',
            border: '1px solid #c9a227',
            borderRadius: 12,
            padding: '20px 24px',
            color: '#c9a227',
            fontWeight: 600,
            fontSize: 16,
          }}>
            You are in. Check your inbox for Day 1.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: '1 1 240px',
                padding: '14px 18px',
                borderRadius: 10,
                border: '1px solid #2a3f55',
                background: '#1a2d40',
                color: '#fff',
                fontSize: 15,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: '#c9a227',
                color: '#0d1b2a',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 24px',
                borderRadius: 10,
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                whiteSpace: 'nowrap' as const,
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Start Day 1 Free'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{ color: '#f87171', marginTop: 12, fontSize: 14 }}>
            Something went wrong. Please try again.
          </p>
        )}

        <p style={{ color: '#4a6a8a', fontSize: 13, marginTop: 16 }}>
          No spam. Unsubscribe anytime. 10 emails total.
        </p>
      </div>
    </section>
  )
}
