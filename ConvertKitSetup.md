# ConvertKit Setup Guide
## Step-by-Step: Wire Up the 7-Day Solomon Challenge Email Course
**Time required:** 45-60 minutes (one time only)
**Cost:** Free up to 10,000 subscribers
**What this does:** Automatically sends the 7-day course to anyone who signs up at asksolomon.app/solomon-challenge, then follows up with Days 8-10, then moves them to your weekly broadcast forever.

---

## BEFORE YOU START

Have these files open in another tab:
- SevenDaysOfSolomon.md (the 7 emails — Days 1-7)
- FollowUpEmails.md (Days 8-10 + weekly wisdom format)
- This guide

---

## STEP 1: Create Your ConvertKit Account

1. Go to kit.com (ConvertKit's new domain)
2. Click "Start for free"
3. Enter your name, email, and password
4. Verify your email address
5. When asked "What brings you here?" — select "Grow my audience"
6. When asked about your audience size — select whatever applies (starting from 0 is fine)

You are now in your ConvertKit dashboard.

---

## STEP 2: Set Up Your "From" Email

This is the email your subscribers will see you sending from.

1. Click your account name (top right) → Settings
2. Click "Email" in the left sidebar
3. Under "Default Sender Information":
   - From name: Your name (e.g., "John Craddock")
   - From email: your@email.com
   - Reply-to: your@email.com
4. Save settings

---

## STEP 3: Create the Solomon Challenge Sequence

A "Sequence" in ConvertKit is a series of emails sent automatically in order.

1. Click "Sequences" in the top navigation
2. Click "New Sequence"
3. Name it: "The Solomon Challenge — 7 Days"
4. Click "Create Sequence"

You are now in the sequence editor.

---

## STEP 4: Create Email 1 (Day 1)

You will see an empty first email slot.

1. Click on "Email 1" to open it
2. Set the Subject: "The question that changed Solomon\'s life (Day 1 of 7)"
3. Set the Preview text: "God said: ask for anything. Here is what the wisest man in history requested."
4. Click into the email body
5. Click "Source" or switch to plain text mode
6. Copy the FULL Day 1 email body from SevenDaysOfSolomon.md and paste it here
7. Replace [Your name] with your actual name
8. Set the send delay: "Send immediately" (this goes out right when someone signs up)
9. Click "Save"

---

## STEP 5: Add Emails 2-7

1. Click "+ Add Email" below Email 1
2. Repeat the process for each day:
   - Email 2 / Day 2: delay = 1 day after previous
   - Email 3 / Day 3: delay = 1 day after previous
   - Email 4 / Day 4: delay = 1 day after previous
   - Email 5 / Day 5: delay = 1 day after previous
   - Email 6 / Day 6: delay = 1 day after previous
   - Email 7 / Day 7: delay = 1 day after previous

Copy each email body from SevenDaysOfSolomon.md. Replace [Your name] with your name throughout.

When done: click the toggle to set the sequence to "Published" (top right).

---

## STEP 6: Add Days 8-10 (Conversion Emails)

1. Still in the same sequence, click "+ Add Email" after Day 7
2. Add Email 8:
   - Subject: "You have been thinking about it, haven't you?"
   - Preview: "The question Solomon asks everyone who finishes the challenge."
   - Body: Copy Day 8 from FollowUpEmails.md
   - Delay: 1 day after Email 7
3. Add Email 9:
   - Subject: "The problem with free wisdom"
   - Delay: 2 days after Email 8
4. Add Email 10:
   - Subject: "Last thing I will say about this"
   - Delay: 2 days after Email 9

Replace [Your name] and [Pro upgrade link] throughout. The upgrade link should point to: https://asksolomon.app/upgrade (or wherever you sell Pro access)

---

## STEP 7: Create a Form (the Signup Widget)

This is the actual form that appears on your /solomon-challenge page.

1. Click "Landing Pages and Forms" in the top navigation
2. Click "New Form"
3. Select "Inline" form type
4. Name it: "Solomon Challenge Signup"
5. In the form editor:
   - Heading: "Start the 7-Day Solomon Challenge"
   - Subheading: "Free. One email per day. Wisdom from Proverbs that changes how you think and live."
   - Button text: "Start the Challenge"
   - Remove any extra fields except Email (keep it simple — one field = higher conversion)
6. Under "Success" message: "Check your inbox. Day 1 is on its way."
7. Click "Save"

---

## STEP 8: Connect the Form to the Sequence

After creating the form:

1. In the form settings, find "Incentive" or "Automation"
2. Click "Add incentive"
3. OR go to Automations: Automations → New Automation
4. Rule: "Subscribes to a form" → select "Solomon Challenge Signup"
5. Action: "Subscribe to sequence" → select "The Solomon Challenge — 7 Days"
6. Save the automation

Now when someone submits the form, they automatically enter the 7-day sequence.

---

## STEP 9: Get the Form Embed Code

1. In your form editor, click "Publish"
2. Click "Copy embed code" — you will see an HTML snippet
3. Keep this code ready — you will paste it into the /solomon-challenge page

---

## STEP 10: Add the Form to Your Website

The /solomon-challenge page currently has two email input boxes and buttons — but they are not connected to anything.

You need to replace those static input fields with the ConvertKit embed code.

Here is what to do:

**Option A (Easiest): Replace the form content**

1. Open app/solomon-challenge/page.tsx in GitHub
2. Find the two sections that contain:
   ```
   <input type="email" placeholder="Your email address" .../>
   <button>Start the Challenge — It\'s Free</button>
   ```
3. Replace both of those input+button blocks with a div containing the ConvertKit embed:
   ```jsx
   <div dangerouslySetInnerHTML={{ __html: `YOUR_CONVERTKIT_EMBED_CODE_HERE` }} />
   ```
4. Commit the change

**Option B (Cleaner): Use ConvertKit\'s hosted landing page**
Instead of the custom page, point the /solomon-challenge URL to your ConvertKit-hosted landing page. Less custom control but zero code required.

For most people, Option A is better because you keep the branded page.

---

## STEP 11: Set Up the Weekly Wisdom Broadcast

After subscribers finish the 10-day sequence, you want them to receive weekly emails.

1. Click "Broadcasts" in ConvertKit navigation
2. This is where you send one-time or recurring emails to your whole list
3. Every Friday, compose a new broadcast:
   - Subject: [Proverb topic]
   - Body: Use the Weekly Wisdom format from FollowUpEmails.md
   - Recipients: All subscribers (or tag: challenge-complete)
4. Send time: Friday morning, 7-9am your time zone

This takes about 5 minutes per week.

---

## STEP 12: Test Everything

Before you announce:

1. Subscribe to your own form using a test email address
2. Confirm you receive the Day 1 email immediately
3. Check the formatting, links, and your name is correct
4. Verify the call-to-action links in Day 7 and Day 9 work

If everything looks good — you are live.

---

## SETUP SUMMARY

| Step | Action | Time |
|------|--------|------|
| 1 | Create ConvertKit account | 5 min |
| 2 | Set from email | 2 min |
| 3-6 | Build 10-email sequence | 25 min |
| 7-8 | Create form + connect to sequence | 5 min |
| 9-10 | Add form to website | 10 min |
| 11 | Set up weekly broadcast habit | 2 min |
| 12 | Test | 5 min |
| **Total** | | **~54 minutes** |

After this one-time setup:
- Every new subscriber gets 10 days of automated emails
- The 7-day course runs forever with zero effort from you
- Weekly emails take 5 minutes to write and send
- ConvertKit is free until you hit 10,000 subscribers

---

## NEXT AFTER CONVERTKIT

Once the email system is live, the growth loop is:

1. Google finds your 14 SEO pages → readers arrive on the site
2. Readers use the free app → get value → trust builds
3. Readers see the /solomon-challenge link → sign up
4. 7 days of emails → Day 9 offer → Pro upgrade ($29)
5. Weekly emails keep the relationship warm forever

The system runs itself. Your only weekly task is the Friday wisdom email (5 minutes).
