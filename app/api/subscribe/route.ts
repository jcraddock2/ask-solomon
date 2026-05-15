import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // Add subscriber and assign to Ask Solomon Subscribers group
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        email,
        groups: ['187558192643835097'],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('MailerLite error:', err);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Subscribe route error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
