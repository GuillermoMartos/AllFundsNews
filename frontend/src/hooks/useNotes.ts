import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchFreshNews } from "../api/articleApi";
import { externalAPINew } from "../types/article";
import { useAuth } from "../context/AuthContext";
import { LOCAL_STORAGE_USER_ID, LOCAL_STORAGE_USER_TOKEN } from "../constants/client";

export const useArticles = () => {
  const [articles, setArticles] = useState<externalAPINew[]>([]);
  const fixed = [
    {
        "id": "2cce2c3b-5316-4064-a55a-8dd7c23782ec",
        "title": "Drone sightings over US bases prompt British troop deployments",
        "description": "British and American authorities are investigating after several drones were spotted in recent days flying over four U.S. military bases in England. Britain has deployed dozens of troops around the ba...",
        "url": "https://www.voanews.com/a/drone-sightings-over-us-bases-prompt-british-troop-deployments/7880539.html",
        "author": "Henry Ridgwell",
        "image": "https://gdb.voanews.com/12548011-E8DA-4D54-91AE-79EC19F06F2A.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 19:17:27 +0000"
    },
    {
        "id": "816da59e-0d94-4d5e-99c9-34f2a1824c64",
        "title": "Three Americans arrive in Texas following prisoner swap with China",
        "description": "Three American citizens jailed for years in China arrived in the United States late Wednesday as part of a prisoner swap between Washington and Beijing.\n\n\nThe swap, which the White House announced earlier Wednesday, marked a rare diplomatic agreement between the United States and China as U.S. Presi...",
        "url": "https://www.voanews.com/a/three-americans-arrive-in-texas-following-prisoner-swap-with-china-/7880557.html",
        "author": "VOA News",
        "image": "None",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 19:13:35 +0000"
    },
    {
        "id": "01373697-f0a4-417b-8439-1ee158f5ddb8",
        "title": "After Lebanon cease-fire, Israeli families hope for hostage deal",
        "description": "TEL AVIV — When President Joe Biden vowed that the cease-fire between Israel and Hezbollah in Lebanon this week would be followed by a renewed push for a truce in the Gaza Strip, Jonathan Dekel-Chen m...",
        "url": "https://www.washingtonpost.com/world/2024/11/28/israel-hostage-families-lebanon-ceasefire/",
        "author": "Shira Rubin",
        "image": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/JOO45NA5LEZTLH3DDZ3CUPYDCQ.JPG&w=1440",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 19:01:45 +0000"
    },
    {
        "id": "90d885eb-cdbd-4e3e-8e50-7a9242868117",
        "title": "Rare footprints suggest two of our prehistoric ancestors may have met",
        "description": "Around 1.5 million years ago, four walkers traversed the muddy shore of a lake, leaving footprints. If they did not cross paths, they would have missed each other narrowly — probably by hours if not m...",
        "url": "https://www.washingtonpost.com/science/2024/11/28/prehistoric-human-footprint-study-kenya/",
        "author": "Leo Sands",
        "image": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/E3G6GIIR3JO4BDFB3STFJRPZQU.jpg&w=1440",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 19:00:00 +0000"
    },
    {
        "id": "57dd9168-6cdb-4b6f-861a-bead1870977a",
        "title": "Why has France's austerity budget caused a political storm?",
        "description": "Country is at risk of fresh turmoil with its government on the brink amid soaring sovereign borrowing costs",
        "url": "https://www.theguardian.com/business/2024/nov/28/why-france-austerity-budget-political-storm",
        "author": "Richard Partington",
        "image": "https://i.guim.co.uk/img/media/7f72505a9125165da9d43a018a196197e8cb95e8/0_45_2838_1703/master/2838.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=3f66386883479f863ab27ba43b0397aa",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 18:45:55 +0000"
    },
    {
        "id": "c219c909-e67f-4e1b-b282-9981454cad0a",
        "title": "Devon and Cornwall chief constable suspended over work phone claims",
        "description": "The acting chief constable of Devon and Cornwall has been suspended from his £180,000-a-year job over claims he misused his work phone, 18 months after his predecessor was also suspended.\n\nJim Colwell...",
        "url": "https://www.theguardian.com/uk-news/2024/nov/28/devon-and-cornwall-chief-constable-suspended-over-work-phone-claims",
        "author": "Vikram Dodd",
        "image": "https://i.guim.co.uk/img/media/38d40f5952c9109070f9932f9138afa12576bac6/0_0_680_408/master/680.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=6b86284b3254433b7bd57f63efa5f33b",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 18:45:02 +0000"
    },
    {
        "id": "9f2b67b2-4ac3-42fd-9a2e-d7c08d66b80b",
        "title": "‘Sophisticated’ spy ring passed secrets to Russia for three years, UK court told",
        "description": "Court told Bulgarian nationals surveilled targets including a journalist linked to Russian dissident Alexei Navalny",
        "url": "https://www.theguardian.com/uk-news/2024/nov/28/sophisticated-uk-spy-ring-allegedly-passed-secrets-to-russia-for-three-years",
        "author": "Ben Quinn",
        "image": "https://i.guim.co.uk/img/media/bee66028006cc190d82b01c47c9a1bc7eea06d97/7_63_1573_945/master/1573.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=e8623513d6a1e1df652d1c47b155bfef",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 18:36:18 +0000"
    },
    {
        "id": "617eaaac-e485-46be-a5a7-a32b1aa45365",
        "title": "Israel launches airstrike on Hezbollah for first time since ceasefire",
        "description": "The Israeli Defense Force says it attacked a Hezbollah rocket launcher near Saida, the third largest city in Lebanon, on Thursday. Why it matters: …",
        "url": "https://www.axios.com/2024/11/28/israel-hezebollah-lebanon-ceasefire-violation",
        "author": "Barak Ravid",
        "image": "None",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 18:00:00 +0000"
    },
    {
        "id": "389259b6-0975-4754-ad9b-412446e38210",
        "title": "LVMH chief executive testifies in trial of former French spy agency chief",
        "description": "France’s richest man, the LVMH chief Bernard Arnault, has testified in the influence-peddling trial of the former head of France’s domestic intelligence agency, denying any knowledge of an alleged sch...",
        "url": "https://www.theguardian.com/world/2024/nov/28/lvmh-chief-executive-testifies-trial-french-spy-agency-arnault-squarcini",
        "author": "Agence France-Presse",
        "image": "https://i.guim.co.uk/img/media/12e4fe0796f26053614a2866689bde734ee7eaa1/0_69_3663_2198/master/3663.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=4502163c32c32d1967fe92779eeca3b1",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 17:08:02 +0000"
    },
    {
        "id": "12b23437-d0e7-41dc-a9c2-a6a27795bb26",
        "title": "CNBC's Inside India newsletter: The causes and costs of India's brain drain",
        "description": "NEW DELHI, INDIA - NOVEMBER 5: Crowds of People arrives to board the trains at Anand Vihar Railway Station on November 5, 2024 in New Delhi, India. (Photo by Sanchit Khanna/Hindustan Times via Getty I...",
        "url": "https://www.cnbc.com/2024/11/28/cnbcs-inside-india-newsletter-the-causes-and-costs-of-indias-brain-drain.html",
        "author": "Amala Balakrishner",
        "image": "https://image.cnbcfm.com/api/v1/image/108069180-1732783238268-gettyimages-2182499008-20241105_dli-skh-mn_chhathrush-033-a.jpeg?v=1732783265&w=1920&h=1080",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 17:04:45 +0000"
    },
    {
        "id": "21e22a9c-d91e-4192-b357-b1d60d9d861c",
        "title": "Israel and Hezbollah have a ceasefire agreement. Here's what it says",
        "description": "Israel and Hezbollah have a ceasefire agreement. Here's what it says\n\ntoggle caption Hussein Malla/AP\n\nThe ceasefire agreement between Hezbollah and Israel brokered by the United States and France sta...",
        "url": "https://www.npr.org/2024/11/28/g-s1-36146/israel-hezbollah-lebanon-ceasefire-middle-east-crisis",
        "author": "Willem Marx",
        "image": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/8640x4860+0+450/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F1e%2Fb6%2F421147ae4cc39f8e160460dd052e%2Fap24332513354183.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 16:50:32 +0000"
    },
    {
        "id": "b1d6f600-1218-4d3f-b86f-070c0f7b89c7",
        "title": "Nigeria Reels Under 'Cryptic Pregnancy' Scam. All Your Questions Answered",
        "description": "What is Nigeria's cryptic pregnancy scam?\n\nBBC Africa Eye has investigated a disturbing fertility scam in Anambra State, Nigeria where desperate women are shelling hundreds of dollars for this treatme...",
        "url": "https://www.ndtv.com/world-news/nigeria-reels-under-cryptic-pregnancy-scam-all-your-questions-answered-7128174",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2024-11/7l78fe6o_nigeria-pregnancy-scam-istock_625x300_28_November_24.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 16:03:37 +0000"
    },
    {
        "id": "785d10f6-65b9-46fd-94dc-715359c87639",
        "title": "In photos: Macy's Thanksgiving Day Parade",
        "description": "3 Spectators watch in the rain as the Macy's Thanksgiving Day Parade travels down Central Park West, Nov. 28, 2024, in New York....",
        "url": "https://www.voanews.com/a/in-photos-98th-macy-s-thanksgiving-day-parade/7880260.html",
        "author": "VOA",
        "image": "https://gdb.voanews.com/a4cbbf09-7f70-4605-9160-285de0fd900b_cx0_cy5_cw0_w1200_r1.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:48:37 +0000"
    },
    {
        "id": "6905fa52-a177-4f91-8f25-0481eb5422cb",
        "title": "Stowaway flies aboard Delta flight from Paris to New York City - UPI.com",
        "description": "A Boeing 767-400ER, similar to the one pictured, had a stowaway from Paris to New York City. Photo courtesy Delta Airlines\n\nNov. 28 (UPI) -- A woman was taken into custody after the stowaway flew aboa...",
        "url": "https://www.upi.com/Top_News/World-News/2024/11/28/France-stowaway-caught/7701732806581/",
        "author": "Allen Cone",
        "image": "https://cdnph.upi.com/sv/ph/og/i/7701732806581/2024/1/17328081273453/v1.5/Stowaway-flies-aboard-Delta-flight-from-Paris-to-New-York-City.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:41:33 +0000"
    },
    {
        "id": "24d1fd17-1d2b-4e5e-af80-e8a6241d4c27",
        "title": "Trump delivers Thanksgiving message to 'Radical Left Lunatics'",
        "description": "President-elect Trump on Thursday wished a happy Thanksgiving to all Americans, including those he called \"Radical Left Lunatics.\"",
        "url": "https://www.foxnews.com/politics/trump-delivers-thanksgiving-message-radical-left-lunatics",
        "author": "Fox News",
        "image": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/11/1024/512/trump-2.jpg?ve=1&tl=1",
        "language": "en",
        "category": [
            "politics",
            "world"
        ],
        "published": "2024-11-28 15:37:12 +0000"
    },
    {
        "id": "607388e3-49bc-4234-980f-2ea9c73b54f7",
        "title": "Why the Lebanon Cease-Fire Threatens Chance of Middle East Stability",
        "description": "text/html...",
        "url": "https://www.wsj.com/articles/why-the-lebanon-cease-fire-threatens-chance-of-middle-east-stability-ad2a5366",
        "author": "wsj",
        "image": "None",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:35:00 +0000"
    },
    {
        "id": "bbac6762-705f-4a17-bda7-95aecd5f201d",
        "title": "Power to 1 million homes cut in Ukraine after latest 'massive' Russian aerial attack",
        "description": "Russia’s second major aerial attack on Ukraine’s power grid in less than two weeks amplified fears that the Kremlin aims to cripple the country’s power generation capacity before winter.",
        "url": "https://www.pbs.org/newshour/world/power-to-1-million-homes-cut-in-ukraine-after-latest-massive-russian-aerial-attack",
        "author": "Hanna Arhirova",
        "image": "https://d3i6fh83elv35t.cloudfront.net/static/2024/11/2024-11-28T111113Z_684110730_RC2AEBAIBI6Q_RTRMADP_3_UKRAINE-CRISIS-ATTACK-ODESA-1024x720.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:15:33 +0000"
    },
    {
        "id": "fb9307d2-a6d4-442a-80af-2c9a7ace1cdb",
        "title": "Russia rains missiles on Ukraine after Trump names new envoy to conflict",
        "description": "KYIV — Hours after President-elect Donald Trump appointed a new special envoy to tackle a top campaign promise of ending the war between Russia and Ukraine, Russia fired a new barrage of missiles at U...",
        "url": "https://www.washingtonpost.com/world/2024/11/28/ukraine-kellogg-russia-missile-strike/",
        "author": "Isabelle Khurshudyan",
        "image": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MYTD4JLGZ5J5U3UIYTY2RTBBTY.JPG&w=1440",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:08:58 +0000"
    },
    {
        "id": "b3ac0e90-4edc-48c5-9f6e-871a96ff64da",
        "title": "Australia bans world's first social media use by children younger than 16 - UPI.com",
        "description": "Photo by LoboStudioHamburg/Pixabay\n\nNov. 28 (UPI) -- Australia on Thursday passed the world's first ban on social media use by children younger than 16. According to the law, young people will be bloc...",
        "url": "https://www.upi.com/Top_News/World-News/2024/11/28/Australia-social-media-ban-children/3001732802551/",
        "author": "Allen Cone",
        "image": "https://cdnph.upi.com/sv/ph/og/upi_com/3001732802551/2024/1/79c412bc21ecf6e7e14c77a760338550/v1.5/Australia-bans-worlds-first-social-media-use-by-children-younger-than-16.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:05:31 +0000"
    },
    {
        "id": "1c4785e4-a311-4991-bced-81f40621bc71",
        "title": "Missing hiker found alive after 50 days in Canadian wilderness",
        "description": "On Oct. 7, Sam Benastick headed into Redfern-Keily Provincial Park, a remote slice of wilderness deep in the Canadian Rocky Mountains, for 10 days of solo camping, hiking and fishing. The 20-year-old ...",
        "url": "https://www.washingtonpost.com/world/2024/11/28/missing-hiker-found-canada-sam-benastick/",
        "author": "Vivian Ho",
        "image": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/L2G3F2QLNMGQFLUQKLMCLNFLBY.jpg&w=1440",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 15:00:21 +0000"
    },
    {
        "id": "a0e80e3e-87ae-4967-b793-4d0d318e1a1c",
        "title": "Manhattan artist invites Americans to write postcards to US president",
        "description": "Since 2004, artist Sheryl Oring has been giving Americans a chance to speak their truth to the world. Dressed in 1950s attire, she invites the public to speak their mind and records it on her typewriter as part of a project called, “I Wish To Say.” Elena Wolf has the story, narrated by Anna Rice.",
        "url": "https://www.voanews.com/a/manhattan-artist-invites-americans-to-write-postcards-to-us-president/7880132.html",
        "author": "Elena Wolf",
        "image": "https://gdb.voanews.com/6784f57d-beac-480d-a831-a312499e78a9_tv_w1200_r1.jpg",
        "language": "en",
        "category": [
            "politics",
            "world"
        ],
        "published": "2024-11-28 14:47:36 +0000"
    },
    {
        "id": "edd12db0-84aa-4521-9b87-89b2bdb758d1",
        "title": "Russia Strikes Ukraine's Energy Sector as Putin Signals More to Come",
        "description": "Russia attacked Ukrainian energy infrastructure with missiles and drones on Thursday, in what President Vladimir V. Putin said was retaliation for Kyiv’s hitting Russian territory with long-range Amer...",
        "url": "https://www.nytimes.com/2024/11/28/world/europe/russia-missile-attack-ukraine-energy.html",
        "author": "Maria Varenikova",
        "image": "https://static01.nyt.com/images/2024/11/28/multimedia/28ukraine-strikes-1-cmlb/28ukraine-strikes-1-cmlb-facebookJumbo.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:47:16 +0000"
    },
    {
        "id": "c767d93c-b58e-4054-9b90-d24b51f7148f",
        "title": "San Jose State's Opponent Boycotts Game Over Transgender Player. Again.",
        "description": "The San Jose State women's volleyball team received a first-round bye at the Mountain West Conference tournament. Their semifinal opponent forfeited the game....",
        "url": "https://www.nytimes.com/2024/11/28/us/transgender-san-jose-boise-volleyball.html",
        "author": "Juliet Macur",
        "image": "None",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:42:40 +0000"
    },
    {
        "id": "231dde10-bfab-4052-b6ab-b3d70b171ba5",
        "title": "Defying Beijing, Taiwan's President Plans Visit to Hawaii and Guam",
        "description": "text/html...",
        "url": "https://www.wsj.com/articles/defying-beijing-taiwans-president-plans-visit-to-hawaii-and-guam-6f831dbd",
        "author": "wsj",
        "image": "None",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:42:00 +0000"
    },
    {
        "id": "1d58551e-5145-46ba-97a8-615cd91a1ec9",
        "title": "Pakistan charges journalist with terrorism for reporting on protest",
        "description": "Pakistani police on Thursday arrested and charged a prominent journalist investigating claims of casualties during a government crackdown on opposition protesters in the capital, Islamabad, earlier th...",
        "url": "https://www.voanews.com/a/pakistan-charges-journalist-with-terrorism-for-reporting-on-protest/7880155.html",
        "author": "Ayaz Gul",
        "image": "https://gdb.voanews.com/A031B801-E3F2-4176-9FA5-C917F45184A4.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:34:29 +0000"
    },
    {
        "id": "42beeb7b-61b5-47c5-a709-e2f63b779d46",
        "title": "Israel Strikes Hezbollah Facility In Lebanon A Day After Ceasefire Began",
        "description": "The Israeli military on Thursday said it hit a facility in southern Lebanon belonging to Iran-backed militant group Hezbollah, a day after a ceasefire between the group and Israel began.",
        "url": "https://www.ndtv.com/world-news/israel-strikes-hezbollah-facility-in-lebanon-a-day-after-ceasefire-began-7127531",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2024-11/ff5b28po_lebanon_625x300_28_November_24.jpeg?ver-20242611-01",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:32:16 +0000"
    },
    {
        "id": "55d13c5b-c4e5-4ed5-84a3-7b07fdf3813f",
        "title": "Lebanon says 2 hurt as Israeli troops fire after truce with Hezbollah",
        "description": "Lebanon says 2 hurt as Israeli troops fire after truce with Hezbollah\n\ntoggle caption Hussein Malla/AP\n\nAt least two people were wounded by Israeli fire in southern Lebanon on Thursday, according to s...",
        "url": "https://www.npr.org/2024/11/28/g-s1-36140/lebanon-israel-hezbollah-ceasefire-airtstrikes",
        "author": "The Associated Press",
        "image": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/8640x4860+0+450/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fed%2F55%2F67f3acf8407ba96cb7d496537553%2Fap24333514432944.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:32:01 +0000"
    },
    {
        "id": "026304e7-ab8b-4a7c-9c68-8135318f7eb1",
        "title": "K-Pop Band NewJeans Leaves ADOR, Agency Says Contract Still Stands",
        "description": "The announcement by the pop group soon started circulating on social media and NewJeans became one of the top trends on X.",
        "url": "https://www.ndtv.com/feature/k-pop-band-newjeans-leaves-ador-agency-says-contract-still-stands-7127477",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2024-11/e5h4tjt_newjeans-reuters_625x300_28_November_24.jpeg?ver-20242611-01",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:28:48 +0000"
    },
    {
        "id": "9f034bb9-d676-4732-967c-c872ba7b8fab",
        "title": "Australia passes social media ban for children under 16",
        "description": "The platforms will have one year to work out how they could implement the ban before penalties are enforced.",
        "url": "https://www.pbs.org/newshour/world/australia-passes-social-media-ban-for-children-under-16",
        "author": "Rod Mcguirk",
        "image": "https://d3i6fh83elv35t.cloudfront.net/static/2024/06/hands-holding-phone-GettyImages-184060520-1024x683.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:25:31 +0000"
    },
    {
        "id": "603d07c1-df37-4535-b1b2-b013ef105107",
        "title": "For Macy's Thanksgiving Day Parade, Millions Line Sidewalks and Tune In",
        "description": "They stood in inches-deep puddles on street corners, heedless of soaked feet. They huddled under garbage bags turned raincoats, and sodden umbrellas — but everyone was smiling.\n\nThe crowd who turned o...",
        "url": "https://www.nytimes.com/2024/11/28/nyregion/macys-thanksgiving-day-parade.html",
        "author": "Sarah Nir",
        "image": "https://static01.nyt.com/images/2024/11/28/multimedia/28parade1-hzfm/28parade1-hzfm-facebookJumbo.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:20:35 +0000"
    },
    {
        "id": "c50baad9-39bc-45f3-9d66-d1856271bcda",
        "title": "Cryptocurrency investors anticipate boom under Trump",
        "description": "The URL has been copied to your clipboard\n\nThe code has been copied to your clipboard.\n\nCryptocurrency investors have big hopes for the approaching presidency of Donald Trump, who campaigned this year...",
        "url": "https://www.voanews.com/a/cryptocurrency-investors-anticipate-boom-under-trump/7880138.html",
        "author": "Scot Stearns",
        "image": "https://gdb.voanews.com/d3580c20-1db6-44e0-bfa3-a66a41a81f53_tv_w1200_r1.jpg",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:15:18 +0000"
    },
    {
        "id": "13b6afd9-66ab-4985-85b9-a62ddd2970ae",
        "title": "‘People-first’ transport in English towns could be integrated by apps",
        "description": "Louise Haigh plans to focus on poorer areas, healthy methods and ability to ‘tap in and tap out seamlessly’",
        "url": "https://www.theguardian.com/politics/2024/nov/28/people-first-transport-england-towns-integrated-apps-louise-haigh",
        "author": "Peter Walker",
        "image": "https://i.guim.co.uk/img/media/6fcef42f0d44a83b05d4869ca23ef84b18102cb9/0_202_5568_3341/master/5568.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=b2f21fc1f86747def2644f6c264dd2b3",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:12:44 +0000"
    },
    {
        "id": "fe9f8e73-5ce2-46f8-8e71-612b795b2f3f",
        "title": "Australia Passes Landmark Order Banning Social Media For Under-16s",
        "description": "Australian lawmakers passed landmark rules to ban under 16s from social media on Thursday, approving one of the world's toughest crackdowns on popular sites like Facebook, Instagram and X.",
        "url": "https://www.ndtv.com/world-news/australia-passes-landmark-order-banning-social-media-for-under-16s-7127320",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2024-11/qgjpdvdo_social-media-ban-unsplash_625x300_21_November_24.jpg?ver-20242611-01",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:03:04 +0000"
    },
    {
        "id": "c1c87016-6d47-495a-a1c8-16eaa92766ee",
        "title": "Children will get sentences ‘more punitive than necessary’ under new crime law, Queensland LNP admits",
        "description": "Attorney general Deb Frecklington acknowledges bill will likely increase number of children in state watch houses",
        "url": "https://www.theguardian.com/australia-news/2024/nov/29/children-will-get-sentences-more-punitive-than-necessary-under-new-law-queensland-lnp-admits",
        "author": "Andrew Messenger",
        "image": "https://i.guim.co.uk/img/media/fa0851b335c85a79a300b9cf6d2b52fedffbb27c/0_55_4235_2541/master/4235.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=2151278d32b669b63339c07ba14ec4f3",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:00:33 +0000"
    },
    {
        "id": "5c1cc394-26a1-4ed3-b9fd-49f2f744e753",
        "title": "Personal details of financially distressed Australians shared in ‘leads list’ of property development course",
        "description": "Master Wealth Control, trading as DG Institute, breached privacy laws by sharing names and addresses of people in distressed situations, regulator finds",
        "url": "https://www.theguardian.com/australia-news/2024/nov/29/personal-details-of-people-amid-financial-distress-or-divorce-shared-with-property-development-course-in-leads-list-ntwnfb",
        "author": "Cait Kelly",
        "image": "https://i.guim.co.uk/img/media/0995dea459dea0b5a9107c34f8f9b5bfddf46ad3/0_0_5568_3341/master/5568.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=131699611b9de9edd09eaeec65c620df",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 14:00:30 +0000"
    },
    {
        "id": "9b7b9edd-6d56-4f55-bc9e-89a7e0a93964",
        "title": "Lucy Letby inquiry: hospital boss ‘sincerely regrets’ not calling police sooner",
        "description": "Former medical director of Countess of Chester hospital says he is ‘truly sorry’ if he failed bereaved families",
        "url": "https://www.theguardian.com/uk-news/2024/nov/28/lucy-letby-inquiry-hospital-boss-sincerely-regrets-not-calling-police-sooner",
        "author": "Josh Halliday",
        "image": "https://i.guim.co.uk/img/media/483b346e947a5a8c529dd1a022ddd6f779f0bb2f/0_121_5472_3283/master/5472.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=6e6149a00f1fafca3e3a3467277fe178",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:59:48 +0000"
    },
    {
        "id": "19bd4096-726c-4472-b195-b5002cd1fd70",
        "title": "The Russian guide to Trump's Cabinet picks",
        "description": "Keith Kellogg, special envoy for Ukraine and Russia\n\nTrump’s selection of a new envoy to lead negotiations for ending the war in Ukraine has been met with a lukewarm reaction in Moscow.\n\nSergei Markov...",
        "url": "https://www.washingtonpost.com/world/2024/11/28/trump-russia-cabinet-picks/",
        "author": "Mary Ilyushina",
        "image": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/D3T63C2OOHHWZVU37NO66XBGPE_size-normalized.jpg&w=1440",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:50:02 +0000"
    },
    {
        "id": "fb68681f-95fb-4ac7-b1d3-5aa995e9fbcb",
        "title": "Doctor suspected of killing eight patients and setting homes on fire to cover up evidence in Germany",
        "description": "The doctor was originally arrested on suspicion of manslaughter, arson and attempted arson, but prosecutors said they are now treating the cases as murder.",
        "url": "https://news.sky.com/story/doctor-suspected-of-killing-eight-patients-and-setting-homes-on-fire-to-cover-up-evidence-in-germany-13262321",
        "author": "Sky UK Limited",
        "image": "https://e3.365dm.com/24/11/768x432/skynews-german-doctor_6760234.jpg?20241128143617",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:48:00 +0000"
    },
    {
        "id": "01042576-7760-4178-b1f3-41e4b919fe88",
        "title": "Young Gorilla Dies At Canada Zoo After Accidentally Being Crushed By Hydraulic Door",
        "description": "A young gorilla at a Canadian zoo died after a staff member accidentally crushed its head with a hydraulic door.",
        "url": "https://www.ndtv.com/feature/young-gorilla-dies-at-canada-zoo-after-accidentally-being-crushed-by-hydraulic-door-7127177",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2024-11/1fn31ps8_baby-gorilla-_625x300_28_November_24.jpeg?ver-20242611-01",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:45:03 +0000"
    },
    {
        "id": "6d9b678f-e5de-467f-98a3-8de792a70b3c",
        "title": "Ikea opens Oxford Street shop dedicated to its famous blue carrier bag",
        "description": "Pop-up Frakta shop offering blue candy floss and mirrored room opens on site of delayed larger store",
        "url": "https://www.theguardian.com/business/2024/nov/28/ikea-opens-pop-up-shop-oxford-street-frakta-blue-carrier-bag",
        "author": "Sarah Butler",
        "image": "https://i.guim.co.uk/img/media/157657f6dfdc82044b3181b21ec6acc9c60ffbb9/0_106_4000_2400/master/4000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=e0cac515d2d043f09167376aa4798d91",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:40:03 +0000"
    },
    {
        "id": "3257fcd8-c780-498c-885b-11e402a05ba3",
        "title": "Hiker accidentally uncovers 280-million-year-old footprints in Italy",
        "description": "Hikers were responsible for the discovery of what scientists believe to be a prehistoric ecosystem. The first sign of the ecosystem discovered by the hikers were footprints.",
        "url": "https://www.foxnews.com/world/hiker-accidentally-uncovers-280-million-year-old-footprints-italy",
        "author": "Fox News",
        "image": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/11/1024/512/hiker-boots.jpg?ve=1&tl=1",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:37:10 +0000"
    },
    {
        "id": "7dc3c306-4f27-4183-b066-caf63e3dddba",
        "title": "Live Briefing: Lebanon cease-fire holds; Israel warns residents of southern villages not to return",
        "description": "The United States is moving to approve a $680 million arms sale to Israel, according to a person familiar with the proposed sale and a Pentagon official, both of whom spoke on the condition of anonymi...",
        "url": "https://www.washingtonpost.com/world/2024/11/28/israel-war-news-lebanon-ceasefire-hezbollah-gaza/",
        "author": "Louisa Loveluck",
        "image": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/11-28-2024/t_bd22ba8f4c6c4f919608778ed82b9040_name_2GPI5EQN4UWKQGMJ5XTU5G4574.jpg&w=1440",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:34:26 +0000"
    },
    {
        "id": "41a679e4-b41f-4c7e-a25e-ed3690e08c5d",
        "title": "Chelsea’s Reece James facing at least a month out with hamstring injury",
        "description": "Reece James is not expected to play before the end of December after a scan revealed the extent of the Chelsea right-back’s latest hamstring injury",
        "url": "https://www.theguardian.com/football/2024/nov/28/chelseas-reece-james-injury-news",
        "author": "Jacob Steinberg",
        "image": "https://i.guim.co.uk/img/media/f9938a43271f860b9080de38b41b8058a4012e7a/0_377_5736_3443/master/5736.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=2ff936d91e47fba192b7e0c101fe5d97",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:28:56 +0000"
    },
    {
        "id": "cb652614-fbaf-4163-a96a-cf6d3eed0737",
        "title": "Putin mulls striking Kyiv with new hypersonic missile that can reportedly reach US West Coast",
        "description": "Russian President Vladimir Putin says that Ukraine’s \"decision-making centers\" in Kyiv could be targeted next using a new hypersonic missile that could also potentially reach the U.S.",
        "url": "https://www.foxnews.com/world/putin-mulls-striking-kyiv-new-hypersonic-missile-can-reportedly-reach-us-west-coast",
        "author": "Fox News",
        "image": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/11/1024/512/putin-missile.jpg?ve=1&tl=1",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:23:30 +0000"
    },
    {
        "id": "3b515c7f-127c-4439-a73d-7e308e30c6d2",
        "title": "7 US hostages still held by Hamas terrorists as families plead for their release: 'this is urgent'",
        "description": "The parents of the American-Israeli hostages still held by Hamas in Gaza are once again pleading for a sense of 'urgency' to free their children as seats sit empty at their Thanksgiving tables again.",
        "url": "https://www.foxnews.com/world/seven-us-hostages-still-held-hamas-terrorists-families-plea-release-this-urgent",
        "author": "Fox News",
        "image": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/11/1024/512/gettyimages-2162580105.jpg?ve=1&tl=1",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:16:21 +0000"
    },
    {
        "id": "58809c45-efb9-4e6b-be97-d6066b542c04",
        "title": "Indian-Origin Neurosurgeon Fined Over $2 Million For Medicare Fraud In US",
        "description": "A 53-year-old Indian-origin neurosurgeon in the US was fined over USD 2 million for medicare fraud after falsely claiming to perform surgeries to implant electro-acupuncture devices.",
        "url": "https://www.ndtv.com/world-news/indian-origin-neurosurgeon-fined-over-2-million-for-medicare-fraud-in-us-7126947",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2023-02/j3nulf8_medical-student-generic-medicine-generic-doctor-generic_625x300_25_February_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738?ver-20242611-01",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:16:01 +0000"
    },
    {
        "id": "736843e0-3e32-4979-a32c-4a8d56bc16ec",
        "title": "Australia passes world's first social media ban for children under 16",
        "description": "Australia's parliament on Thursday became the first in the world to pass a social media ban for children under 16, multiple outlets reported. Why it …",
        "url": "https://www.axios.com/2024/11/28/australia-social-media-ban-teens-under-16",
        "author": "Ivana Saric",
        "image": "None",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:12:20 +0000"
    },
    {
        "id": "20f777ce-c79b-436b-8085-81cfd4500603",
        "title": "Matildas pay price for sluggish start as Brazil spoil Clare Polkinghorne’s party",
        "description": "Australia fail to send off stalwart in style despite Foord goal as Gutierres scores brace and Gio adds third in 3-1 victory",
        "url": "https://www.theguardian.com/football/2024/nov/29/australia-matildas-vs-brazil-womens-football-friendly-match-report-scores-results-brisbane-clare-polkinghorne",
        "author": "Joey Lynch",
        "image": "https://i.guim.co.uk/img/media/1a20047635ad0d7547b15e89d547a910ab42fad9/0_235_7041_4225/master/7041.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=73e7c022dd70bc2ac4f2bfb9fed88e83",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:04:25 +0000"
    },
    {
        "id": "8f4eec63-b497-4981-a75d-45a1def5e50f",
        "title": "Massive 411-Mile Snowstorm To Hit UK This Week, Warnings Issued",
        "description": "Temperature is likely to fall below zero in Scotland, while in England and Wales, it will hover around 4-5 degree Celsius.",
        "url": "https://www.ndtv.com/world-news/massive-411-mile-snowstorm-to-hit-uk-this-week-warnings-issued-7126846",
        "author": "ndtv",
        "image": "https://c.ndtvimg.com/2024-11/3veads1o_blizzard-generic-unsplash_625x300_28_November_24.jpeg?ver-20242611-01",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 13:02:23 +0000"
    },
    {
        "id": "a560815c-d2ec-48b0-9ec1-580b986ab9db",
        "title": "Iron Maiden, a bamboo car and a lionfish: photos of the day - Thursday",
        "description": "The Guardian’s picture editors select photographs from around the world",
        "url": "https://www.theguardian.com/news/gallery/2024/nov/28/iron-maiden-a-bamboo-car-and-a-lionfish-photos-of-the-day-thursday",
        "author": "Arnel Hecimovic",
        "image": "https://i.guim.co.uk/img/media/a552672c2ecb56cb71a70b8b92d9ccf6a54e5ec1/679_429_3515_2109/master/3515.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=38ccbdc4441d9bff3e3f057a110bd1f8",
        "language": "en",
        "category": [
            "world"
        ],
        "published": "2024-11-28 12:59:56 +0000"
    }
]
  const [loading, setLoading] = useState<boolean>(true);
  const [newArticlesLoading, setNewArticlesLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const {freshNews: initialNews} = location.state || []

  useEffect(() => {
    if (isAuthenticated) {
      setArticles(initialNews);
      setLoading(false);
    }
  }, [initialNews, isAuthenticated]);

  const fetchNewArticles = async () => {
    setNewArticlesLoading(true);
    try {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (userId && token) {
        const freshNews = await fetchFreshNews(userId, token);
        setArticles(freshNews);
      }
    } catch (error) {
      console.error("Error fetching new articles", error);
    } finally {
      setNewArticlesLoading(false);
    }
  };

  const archiveArticle = async (articleId: string) => {
    console.log(articleId)
  };

  const removeArticleFromArchive = async (articleId: string) => {
    console.log(articleId)
  };

  return {
    articles,
    loading,
    newArticlesLoading,
    fetchNewArticles,
    archiveArticle,
    removeArticleFromArchive,fixed
  };
};
