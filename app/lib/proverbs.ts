// app/lib/proverbs.ts

export type ProverbEntry = {
  ref: string
  text: string
  topics: string[]
  keywords?: string[]
}

export const PROVERBS: ProverbEntry[] = [

{
ref: "Proverbs 1:7",
text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
topics: ["wisdom","knowledge","instruction","fear"],
keywords: ["learning","understanding"]
},

{
ref: "Proverbs 3:5-6",
text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
topics: ["trust","direction","guidance","wisdom"],
keywords: ["path","decision","guidance"]
},

{
ref: "Proverbs 10:4",
text: "Lazy hands make for poverty, but diligent hands bring wealth.",
topics: ["diligence","work","wealth","discipline"],
keywords: ["effort","success","prosperity"]
},

{
ref: "Proverbs 11:25",
text: "A generous person will prosper; whoever refreshes others will be refreshed.",
topics: ["generosity","wealth","prosperity"],
keywords: ["giving","stewardship"]
},

{
ref: "Proverbs 12:15",
text: "The way of fools seems right to them, but the wise listen to advice.",
topics: ["wisdom","counsel","direction"],
keywords: ["advice","guidance"]
},

{
ref: "Proverbs 13:20",
text: "Walk with the wise and become wise, for a companion of fools suffers harm.",
topics: ["wisdom","relationships","influence"],
keywords: ["friends","association"]
},

{
ref: "Proverbs 15:1",
text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
topics: ["speech","anger","relationships"],
keywords: ["communication","temper"]
},

{
ref: "Proverbs 16:3",
text: "Commit to the Lord whatever you do, and he will establish your plans.",
topics: ["planning","success","direction"],
keywords: ["purpose","goals"]
},

{
ref: "Proverbs 16:9",
text: "In their hearts humans plan their course, but the Lord establishes their steps.",
topics: ["direction","guidance","planning"],
keywords: ["purpose","path"]
},

{
ref: "Proverbs 18:10",
text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
topics: ["trust","confidence","protection"],
keywords: ["refuge","strength"]
},

{
ref: "Proverbs 19:20",
text: "Listen to advice and accept discipline, and at the end you will be counted among the wise.",
topics: ["wisdom","discipline","instruction"],
keywords: ["learning","correction"]
},

{
ref: "Proverbs 21:5",
text: "The plans of the diligent lead to profit as surely as haste leads to poverty.",
topics: ["planning","diligence","wealth"],
keywords: ["strategy","effort"]
},

{
ref: "Proverbs 22:6",
text: "Start children off on the way they should go, and even when they are old they will not turn from it.",
topics: ["leadership","training","instruction"],
keywords: ["guidance","discipline"]
},

{
ref: "Proverbs 22:29",
text: "Do you see someone skilled in their work? They will serve before kings.",
topics: ["diligence","excellence","success"],
keywords: ["skill","mastery"]
},

{
ref: "Proverbs 24:16",
text: "For though the righteous fall seven times, they rise again.",
topics: ["perseverance","strength","resilience"],
keywords: ["endurance","persistence"]
}

]


/* ------------------------------
   SEARCH SYNONYM INTELLIGENCE
--------------------------------*/

const SEARCH_SYNONYMS: Record<string,string[]> = {

fear:["fear","anxiety","worry","confidence","courage","trust"],

money:["money","wealth","riches","poverty","prosperity","generosity"],

direction:["direction","guidance","counsel","planning","wisdom"],

discipline:["discipline","instruction","training","correction"],

anger:["anger","wrath","temper","patience","gentle"],

speech:["speech","words","tongue","communication"],

leadership:["leadership","king","justice","counsel","integrity"],

wisdom:["wisdom","knowledge","understanding","instruction"],

success:["success","prosperity","wealth","diligence","planning"],

confidence:["confidence","courage","strength","trust"]

}


/* ------------------------------
   SEARCH ENGINE
--------------------------------*/

export function searchProverbs(query: string) {

const q = query.toLowerCase().trim()

if(!q) return []

const related = SEARCH_SYNONYMS[q] || []

const terms = [q, ...related]

return PROVERBS.filter(p=>{

const text = p.text.toLowerCase()

const topicMatch = p.topics.some(t=>terms.includes(t))

const keywordMatch = (p.keywords||[]).some(k=>terms.includes(k))

const textMatch = terms.some(t=>text.includes(t))

return topicMatch || keywordMatch || textMatch

})

}
