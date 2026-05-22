import type { Metadata } from "next";
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: "Proverbs for Relationships | Biblical Wisdom for Friendships and Marriage",
  description: "Solomon had more to say about relationships than almost any other topic. Find biblical wisdom for friendship, marriage, toxic relationships, and choosing the right people from the book of Proverbs.",
  keywords: ["proverbs for relationships", "biblical wisdom friendship", "solomon friendship", "proverbs marriage", "toxic relationships bible", "iron sharpens iron proverbs"],
  openGraph: {
    title: "Proverbs for Relationships",
    description: "Solomon said iron sharpens iron. The people around you are either sharpening you or dulling you. There is no neutral.",
    url: "https://asksolomon.app/proverbs-for-relationships",
    siteName: "Ask Solomon",
    type: "website",
  },
};

export default function ProverbsForRelationshipsPage() {
  return (
    <main style={{ backgroundColor: "#0d1b2a", minHeight: "100vh", color: "#e8e0d0", fontFamily: "Georgia, serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "2.2rem", color: "#c9a227", marginBottom: "16px", lineHeight: "1.3" }}>
            Proverbs for Relationships
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#b0a898", lineHeight: "1.7" }}>
            Solomon had more to say about relationships than almost any other topic. The people closest to you determine more of your future than almost anything else.
          </p>
        </div>

        <div style={{ backgroundColor: "#1a2d42", borderRadius: "12px", padding: "32px", marginBottom: "32px", borderLeft: "4px solid #c9a227" }}>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#c9a227", marginBottom: "16px" }}>
            "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend."
          </p>
          <p style={{ color: "#b0a898", fontSize: "0.9rem" }}>Proverbs 27:17</p>
        </div>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#c9a227", marginBottom: "16px" }}>
            The People Around You Are Shaping You
          </h2>
          <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
            Solomon was direct about this. Every person in your life is either sharpening you or dulling you. The friction is the same. The difference is the direction. A good friend makes life easier. You work less hard to be positive, hopeful, and productive because they are adding to you instead of draining you.
          </p>
          <p style={{ lineHeight: "1.8" }}>
            The wrong friends dull you down to the point where everything takes more effort. You have to fight harder to stay motivated, keep your faith up, and think clearly. Solomon said to choose carefully who you walk with.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#c9a227", marginBottom: "16px" }}>
            What Solomon Looked for in a Friend
          </h2>
          <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
            A true friend, Solomon said, loves at all times and is born for adversity. Not the people who are around when things are easy. The ones who draw closer when things are hard. Convenient friends disappear. Committed friends stay.
          </p>
          <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
            He also said the best counsel comes from the heart, not the head. It has to be drawn out like deep water from a well. Surface-level friendships give surface-level advice. You need people who can go deep with you.
          </p>
          <p style={{ lineHeight: "1.8" }}>
            And he said a true friend will wound you if necessary. Not to hurt you. To help you grow. The wound of a friend is better than the kiss of an enemy. Anyone can tell you what you want to hear. A real friend tells you what you need to hear.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#c9a227", marginBottom: "16px" }}>
            Solomon&apos;s Warning About Toxic Relationships
          </h2>
          <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
            Solomon did not mince words. Do not make friendship with an angry man. Do not go with a furious man. Attitudes are contagious. You will not change them. They will infect you. Their drama will drain your energy, cloud your judgment, and pull you away from your purpose.
          </p>
          <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
            He also warned about gossips. If someone talks to you about everyone else, they will talk to everyone else about you. It is only a matter of time. Loose lips destroy friendships and reputations.
          </p>
          <p style={{ lineHeight: "1.8" }}>
            The wise person is friendly with everyone but friends with the right people. Separate by choice, not by consequence.
          </p>
        </section>

        <div style={{ backgroundColor: "#1a2d42", borderRadius: "12px", padding: "32px", marginBottom: "32px", borderLeft: "4px solid #c9a227" }}>
          <p style={{ fontSize: "1rem", fontStyle: "italic", color: "#c9a227", marginBottom: "16px" }}>
            "A friend loveth at all times, and a brother is born for adversity."
          </p>
          <p style={{ color: "#b0a898", fontSize: "0.9rem" }}>Proverbs 17:17</p>
        </div>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#c9a227", marginBottom: "16px" }}>
            What Solomon Said About Marriage and Partnership
          </h2>
          <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
            Solomon described the qualities of a partner worth finding: trustworthy, hardworking, wise with money, kind to the poor, emotionally strong, and governed by the law of kindness in their speech.
          </p>
          <p style={{ lineHeight: "1.8" }}>
            Attraction starts a relationship. Character is what sustains it. Solomon said beauty is deceptive and favor is fleeting. But a person who fears the Lord and walks with virtue? That person is worth far more than rubies.
          </p>
        </section>

        <div style={{ backgroundColor: "#1a2d42", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.4rem", color: "#c9a227", marginBottom: "16px" }}>
            Ask Solomon About Your Relationships
          </h2>
          <p style={{ lineHeight: "1.8", marginBottom: "24px" }}>
            Whether you are navigating a difficult friendship, figuring out if someone is the right partner, or realizing you are surrounded by the wrong people, bring it to Solomon. He has seen every variation of this.
          </p>
          <a
            href="/?q=I+am+struggling+in+my+relationships+and+I+feel+lonely"
            style={{
              display: "inline-block",
              backgroundColor: "#c9a227",
              color: "#0d1b2a",
              padding: "14px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Ask Solomon About Relationships
          </a>
        </div>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#c9a227", marginBottom: "16px" }}>
            From the Book: Success Secrets of Solomon
          </h2>
          <p style={{ lineHeight: "1.8" }}>
            These insights come from John Craddock&apos;s book <em>Success Secrets of Solomon</em>. The chapters on friendship, choosing the right people, and finding a virtuous partner are among the most practically powerful in the book. Ask Solomon gives you access to this wisdom personalized to your situation.
          </p>
        </section>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "#c9a227",
              border: "2px solid #c9a227",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explore Ask Solomon
          </a>
        </div>

      </div>

      <SevenDaysOptIn topic="Relationships & People" />

    </main>
  );
}
