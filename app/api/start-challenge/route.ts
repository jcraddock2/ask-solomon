import { NextRequest, NextResponse } from 'next/server';

// GET /api/start-challenge?email=subscriber@example.com
// Called when a subscriber clicks "Start Your 10-Day Wisdom Challenge" in the Welcome email.
// Adds them to the "Solomon Challenge Active" group in MailerLite, which triggers the
// Solomon Challenge 10-day automation. Then redirects to asksolomon.app.

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY || '';
// Group ID for "Solomon Challenge Active" - created May 25, 2026
const SOLOMON_CHALLENGE_GROUP_ID = process.env.SOLOMON_CHALLENGE_GROUP_ID || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.redirect('https://asksolomon.app?challenge=error');
  }

  try {
    // First find the subscriber by email to get their ID
    const searchRes = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!searchRes.ok) {
      // Subscriber not found - redirect anyway (don't expose errors to user)
      return NextResponse.redirect('https://asksolomon.app?challenge=started');
    }

    const subscriber = await searchRes.json();
    const subscriberId = subscriber.data?.id;

    if (!subscriberId) {
      return NextResponse.redirect('https://asksolomon.app?challenge=started');
    }

    // Add subscriber to "Solomon Challenge Active" group
    await fetch(
      `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${SOLOMON_CHALLENGE_GROUP_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    // Redirect to app with success indicator
    return NextResponse.redirect('https://asksolomon.app?challenge=started');

  } catch {
    // On any error, redirect gracefully - don't show errors to user
    return NextResponse.redirect('https://asksolomon.app?challenge=started');
  }
}
