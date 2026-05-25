export default function ChallengeStarted() {
  return (
    <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', fontFamily: 'Georgia, serif', backgroundColor: '#ffffff', textAlign: 'center'}}>
      <div style={{maxWidth: '520px'}}>
        <div style={{fontSize: '3rem', marginBottom: '1.5rem'}}>✅</div>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '1rem', lineHeight: '1.3'}}>
          Your 10-Day Wisdom Challenge starts now.
        </h1>
        <p style={{fontSize: '1.1rem', color: '#444', lineHeight: '1.7', marginBottom: '1.5rem'}}>
          Check your inbox. Day 1 is on its way.
        </p>
        <p style={{fontSize: '1rem', color: '#666', lineHeight: '1.7', marginBottom: '2rem'}}>
          Each morning for the next 10 days, you will receive a piece of wisdom from Proverbs — matched to something real you are facing. Not a verse. A conversation.
        </p>
        <a
          href="https://asksolomon.app"
          style={{display: 'inline-block', backgroundColor: '#22c55e', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '6px', fontWeight: '600', fontSize: '1rem', textDecoration: 'none'}}
        >
          Go to Ask Solomon
        </a>
        <p style={{marginTop: '2rem', fontSize: '0.9rem', color: '#999'}}>
          — John
        </p>
      </div>
    </main>
  );
}
