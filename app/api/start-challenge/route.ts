import { NextRequest, NextResponse } from 'next/server';

// GET /api/start-challenge?email=subscriber@example.com
// Called when a subscriber clicks "Start Your 10-Day Wisdom Challenge" in the Welcome email.
// Adds them to the "Solomon Challenge Active" group in MailerLite via subscriber upsert.
// Redirects to /challenge-started success page.

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY || '';
const SOLOMON_CHALLENGE_GROUP_ID = process.env.SOLOMON_CHALLENGE_GROUP_ID || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // If no email or MailerLite did not substitute the tag, go to success page anyway
  if (!email || email === '{$email}') {
    return NextResponse.redirect('https://asksolomon.app/challenge-started');
  }

  try {
    // Use subscriber upsert to add to Solomon Challenge Active group directly
    await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          groups: [SOLOMON_CHALLENGE_GROUP_ID],
        }),
      }
    );
  } catch {
    // Silent fail - redirect to success either way
  }

  return NextResponse.redirect('https://asksolomon.app/challenge-started');
}
