/* ==========================================================================
   PLACES — ten cities of the Deccan.

   Narrative core adapted from J. D. B. Gribble, "A History of the Deccan"
   (Vol. I, 1896; Vol. II, 1924), expanded with modern scholarship, epigraphy
   and archaeology. Where the chronicles and the historians disagree, the
   disagreement is shown rather than hidden — see the "In depth" boxes.

   x / y are pixel positions inside the 900 × 760 Deccan map viewBox.
   Each place carries its own cityMap: a schematic plan, 900 × 520, with
   numbered sites you can open for a photograph and a paragraph.
   ========================================================================== */

const PLACES = [

/* ====================================================================== 1 */
{
  id: "daulatabad",
  n: 1,
  x: 208, y: 160, labelDy: -17,
  name: "Daulatabad",
  alt: "Devagiri — the Hill of the Gods",
  era: "Yadava capital c.1187 · raided 1296 · imperial capital 1327",
  img: "images/daulatabad.jpg",

  glance: [
    ["Founded", "c. 1187, by Bhillama V of the Yadavas"],
    ["The rock", "A basalt cone rising about 200 m"],
    ["The scarp", "50 m of vertical rock, cut away by hand"],
    ["Taken by assault", "Never — only by hunger, terms or treachery"],
    ["Renamed", "Qutbabad 1317, then Daulatabad 1327"],
    ["Distance from Delhi", "About 1,100 km — 'forty days' journey'"]
  ],

  intro: "Everything in this history begins on this rock. It was the richest city of the pre-Islamic Deccan, the prize that financed a coup in Delhi, the capital that a sultan tried to move a thousand kilometres to reach — and the barracks whose mutinous officers founded the Deccan's first independent Muslim kingdom. It changed hands at least eight times in five centuries and was never once carried by storm.",

  chapters: [
    {
      h: "A hill made into a weapon",
      p: [
        "The Yadavas of Devagiri did not build their fortress so much as subtract it. They cut away the lower slopes of a conical basalt hill until roughly fifty metres of it stood sheer, unclimbable and unminable, and then hewed the moat out of the same living rock. Three concentric enclosures — Ambarkot outside, Mahakot in the middle, Kalakot the citadel — wrapped the approaches in bastions, false doors, spiked gates and crooked walls.",
        "The famous defence is the <em>Andheri</em>, the dark passage: a rock-cut tunnel that is the only way to the summit, curving through blind turns and false branches in total darkness. Midway up the stair there is a grating in the roof. Above it the garrison kept a hearth. Heat and smoke could be funnelled down onto men climbing blind, and the tunnel could be shut like a valve.",
        "Ibn Battuta, who saw the place in 1342, described the citadel as reachable only by a leather ladder that was drawn up at nightfall."
      ],
      boxes: [
        {
          kind: "know", title: "The crocodiles in the moat",
          body: [
            "Every guidebook says the rock-cut moat was stocked with crocodiles. Every careful source says it in the passive voice — 'crocodiles were said to have been kept' — which is a historian's way of declining to vouch for something.",
            "Treat it as lore. The moat, the scarp, the brazier grating and the blind tunnel are all documented and all still there; the fortress did not need reptiles to be terrifying."
          ]
        }
      ]
    },
    {
      h: "1296: the raid that bought a throne",
      p: [
        "Ala-ud-din Khalji, governor of Kara, left on 26 February 1296 with about eight thousand horse, put out that he was marching on Chanderi, crossed the Vindhyas — which no northern army had done — and appeared before a city whose army was away. Raja Ramachandra bought him off. Ferishta's schedule of the indemnity runs to 600 <em>mann</em> of gold, 1,000 of silver, 7 of pearls, 2 of precious stones and 4,000 pieces of silk, plus the revenues of a province.",
        "The detail Gribble savours is the one about the granary: during the second siege the defenders discovered that what they had stored as grain was salt.",
        "The treasure never reached Delhi. Ala-ud-din carried it to Kara, spent it on soldiers, then invited his uncle and father-in-law Sultan Jalal-ud-din to come and congratulate him. The old man came unarmed in a small boat, was embraced on the riverbank, and was beheaded there. Barani records that portions of the Devagiri hoard were still in the Delhi treasury two reigns later."
      ]
    },
    {
      h: "1327: the march of a city",
      p: [
        "Muhammad bin Tughluq's decision was not the madness the chroniclers made of it. Delhi lay exposed to Mongol raids and hundreds of miles from the empire's richest provinces; Devagiri lay near the centre of his dominions on the most defensible rock in India. He renamed it Daulatabad — the abode of fortune — and ordered the capital moved.",
        "He also built for it: a broad road with shade trees planted on both sides and halting stations set at intervals along the whole 1,100 km. It was not enough. Barani, who loathed him, wrote that the order fell on the entire population and that not a dog or cat was left in Delhi. Ibn Battuta was told of a blind man dragged the whole way, of whom only a leg arrived, and of a cripple flung there by catapult. The poet Isami — who wrote for the Bahmanis, the state the migration eventually produced — recorded that his own grandfather was dragged from the city by royal servants and died on the road at Tilpat.",
        "By 1335 the project was finished. Revolt in Ma'bar and Bengal, plague in the army, a token copper currency that private households simply forged, and a doubled land tax falling in a famine year had exhausted the state. The sultan let those who wished return to a wrecked Delhi, and many died going back.",
        "But the migration did not reverse. Scholars, soldiers, Sufis, masons, poets and administrators stayed in the south. That residue is the raw material of everything after: the Bahmani sultanate, the five kingdoms that succeeded it, the Chishti shrines of Khuldabad, and the language — Dakhni — that grew out of Delhi speech meeting Marathi, Kannada and Telugu."
      ],
      boxes: [
        {
          kind: "deep", title: "Was it as brutal as the chronicles say?",
          body: [
            "Barani wrote after the sultan's death, for his successor, and hated him; Ibn Battuta arrived seven years later and reports much of the horror at second hand; Isami had a personal grief and a rival patron. All three are witnesses and all three are interested parties.",
            "Against the emptied-city picture: Sanskrit inscriptions of 1327–28 attest to a functioning, prosperous Delhi at exactly the moment it was supposedly deserted. The order most likely targeted the court and its dependants — nobles, ulema, officials, craftsmen — that is, the political class, which is also why the political consequences were so vast.",
            "No source of any date gives a death toll for either march. Any number you see quoted has been invented somewhere along the way."
          ]
        },
        {
          kind: "numbers", title: "How the fortress actually changed hands",
          table: [
            ["1296", "Alauddin Khalji — surprise, a salt granary, negotiated tribute"],
            ["1308", "Malik Kafur — overwhelming force, submission"],
            ["1317", "Mubarak Shah — reoccupied, renamed Qutbabad"],
            ["1327", "Muhammad bin Tughluq — peaceful transfer; made capital"],
            ["1347", "The Centurions — internal mutiny"],
            ["1499", "Ahmadnagar — the garrison handed over the keys"],
            ["1633", "The Mughals — two mines, a breached bastion… and the keys"],
            ["1760", "The Marathas — capture; later held by the Nizams"]
          ]
        }
      ]
    },
    {
      h: "1347: the Centurions crown a king",
      p: [
        "The <em>amiran-i sadah</em> — the 'Centurions', commanders of a hundred horse — were the nobility Delhi had deported here and then abandoned. When Muhammad bin Tughluq ordered them north under escort and his governor of Malwa executed some eighty of them at Dhar, the rest rose, plundered the treasury and elected their own sultan.",
        "They first raised the Afghan officer Ismail Mukh. He proved unequal to the fighting and did something almost unheard of in this history: he abdicated voluntarily, in favour of the abler man. On 3 August 1347 Zafar Khan was enthroned as Ala-ud-din Bahman Shah, and the capital went to Gulbarga.",
        "Eleven years earlier, in the vacuum the same collapse had opened south of the Tungabhadra, two brothers had founded Vijayanagara. The two great powers of the next two centuries were born of one imperial failure, and spent those centuries fighting each other."
      ]
    }
  ],

  boxes: [
    {
      kind: "legend", title: "The tunnels that go on forever",
      body: [
        "Local tradition runs a secret passage from the fort to Ellora, thirty kilometres away, and populates the Andheri with ghosts and djinn.",
        "The passage is unsupported. The ghosts need no explanation beyond the tunnel itself, which is genuinely pitch dark, genuinely full of bats, and was designed by people who wanted you to lose your nerve in it."
      ]
    }
  ],

  quote: {
    text: "Deogiri was exceedingly rich in gold and silver, jewels and pearls, and other valuables. The people of that country had never heard of the Mussulmans; no Mussulman king or prince had penetrated so far.",
    cite: "Zia-ud-din Barani, quoted in Gribble, Vol. I"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "Almost everything here lies on one north-west axis out of Aurangabad: the fort at 16 km, Khuldabad at 24, Ellora at 30. Ajanta is the outlier, a hundred kilometres north.",
    features:
      '<path class="cm-feature" d="M120 300 C260 250 380 210 520 150 C610 112 700 90 800 78" stroke-dasharray="5 7"/>' +
      '<text class="cm-label" x="300" y="330">THE ROAD NORTH-WEST</text>' +
      '<circle class="cm-feature" cx="470" cy="200" r="70"/>' +
      '<circle class="cm-feature" cx="470" cy="200" r="48"/>' +
      '<circle class="cm-feature" cx="470" cy="200" r="26"/>' +
      '<text class="cm-label" x="470" y="112" text-anchor="middle">THE THREE ENCLOSURES</text>' +
      '<rect class="cm-feature" x="60" y="352" width="230" height="120"/>' +
      '<text class="cm-label" x="175" y="344" text-anchor="middle">AURANGABAD CITY</text>',
    sites: [
      { x: 470, y: 200, name: "The citadel", date: "c. 1187, Yadava", img: "images/daulatabad.jpg",
        blurb: "The Kalakot summit, reached only through the Andheri. The rock below it was cut away to leave fifty metres of sheer basalt — a wall that could not be scaled, mined or breached." },
      { x: 424, y: 236, labelDx: -34, name: "The Andheri", date: "Yadava, rock-cut",
        blurb: "The dark passage: one curving tunnel of blind turns and false branches, with an iron grating overhead where the garrison lit its fire. The only route to the top." },
      { x: 522, y: 232, labelDx: 30, name: "Chand Minar", date: "1445 (disputed)", img: "images/chand-minar.jpg",
        blurb: "A victory tower of 63 m and four storeys, holding 24 chambers, with a small mosque at its foot faced in Persian blue tile. Built to celebrate a Bahmani victory over Vijayanagara — and, recent scholarship notes, built by a slave." },
      { x: 470, y: 262, labelDy: 24, name: "Chini Mahal", date: "prison under the Mughals",
        blurb: "Abul Hasan Tana Shah, last sultan of Golconda, held out for eight months in 1687 and then spent twelve years here. He died in this building in 1699." },
      { x: 418, y: 176, labelDy: -16, name: "Jami Masjid", date: "1318 · temple since 1948",
        blurb: "A Khalji mosque standing on 106 pillars plainly taken from a Jain temple. In 1948 it was converted into the Bharat Mata temple — a contested site with two complete histories inside one building." },
      { x: 300, y: 150, name: "Khuldabad", date: "khanqah from c. 1327", img: "images/aurangzeb-tomb.jpg",
        blurb: "The Chishti saint Burhanuddin Gharib came south with the 1327 migration and founded the Deccan's first Sufi institution here. Aurangzeb chose to be buried in its precinct." },
      { x: 196, y: 118, name: "Ellora", date: "6th–10th c.", img: "images/kailasa-temple.png",
        blurb: "Thirty-four caves, Buddhist, Hindu and Jain side by side. The Kailasa temple was cut downward out of one hillside, removing an estimated 200,000 tonnes of rock to leave a free-standing building behind." },
      { x: 128, y: 96, labelDx: 8, name: "Grishneshwar", date: "16th c. rebuild", img: "images/grishneshwar.jpg",
        blurb: "The smallest and the last of the twelve Jyotirlingas, beside Ellora; rebuilt by Maloji Bhosale and given its present form by Ahilyabai Holkar." },
      { x: 726, y: 88, name: "Ajanta", date: "2nd c. BCE – 6th c. CE", img: "images/ajanta.jpg",
        blurb: "Thirty caves in a horseshoe gorge, holding the largest surviving body of early Indian painting — abandoned, forgotten and swallowed by jungle until a British hunting party stumbled on them in 1819." },
      { x: 150, y: 410, name: "Bibi ka Maqbara", date: "1668–69", img: "images/bibi-ka-maqbara.jpg",
        blurb: "The 'Taj of the Deccan', raised by Prince Azam Shah for his mother Dilras Banu Begum and designed by Ata-ullah, son of the Taj Mahal's architect — at a fraction of the budget, and it shows." },
      { x: 232, y: 434, labelDx: 22, name: "Panchakki", date: "c. 1695", img: "images/panchakki.jpg",
        blurb: "A water mill driven by a siphoned underground channel from the hills, built beside the dargah of Baba Shah Musafir — the same hydraulic thinking as Malik Ambar's aqueduct, put to work grinding grain for pilgrims." }
    ]
  }
},

/* ====================================================================== 2 */
{
  id: "warangal",
  n: 2,
  x: 581, y: 336,
  name: "Warangal",
  alt: "Orugallu — the one stone",
  era: "Kakatiya capital · besieged 1310 · annexed 1323",
  img: "images/warangal.jpg",

  glance: [
    ["Dynasty", "The Kakatiyas, c. 1163 – 1323"],
    ["Outer wall", "Earthen, over seven miles round, 70 bastions"],
    ["Irrigation tanks", "Roughly 5,000 across Telangana"],
    ["A reigning queen", "Rudrama Devi, r. c. 1263–1289"],
    ["Renamed", "Sultanpur, 1323"],
    ["World Heritage", "Ramappa temple, inscribed 2021"]
  ],

  intro: "The Kakatiyas built a stone city inside an earthen one, dammed an entire plateau that had no perennial river, produced one of medieval India's very few reigning queens, and controlled the only diamond country then known to the world. When Delhi came for them, it came for the diamonds.",

  chapters: [
    {
      h: "A kingdom made of water",
      p: [
        "Telangana is a dry upland. The Kakatiyas made it rich by building tank after tank — some five thousand of them — and chaining them so that the overflow of one fed the next, an artificial hydrology laid over a whole landscape. Pakhal, Laknavaram and the Ramappa tank still hold water eight centuries later.",
        "King Ganapati went further and abolished every trade duty except a single fixed levy, which brought merchants and shipping to the Godavari–Krishna coast. Gribble, surveying the ruins in the 1890s, took the tanks as his proof that the pre-conquest Deccan was no wilderness: its rulers, he wrote, 'devoted great attention to the improvement of agriculture'.",
        "At the centre stood Orugallu, 'one stone': an outer mud rampart more than seven miles round with seventy bastions, each under its own commander, and inside it a circular stone fort with its own ditch. Of the stone city, four carved gateways survive in an empty field, holding up nothing. They are now the emblem of the state of Telangana."
      ]
    },
    {
      h: "Rudrama Devi",
      p: [
        "Ganapati had no son. His daughter succeeded him, took the male name Rudradeva, ruled in male dress, beat off Yadava invasions and held the kingdom for a quarter of a century. Marco Polo, on the Coromandel coast at the end of her reign, wrote admiringly of a queen who governed with justice and equity.",
        "Her grandson Prataparudra inherited a wealthy, well-defended and entirely unprepared kingdom, at the moment the armies of Delhi discovered the Deccan."
      ]
    },
    {
      h: "1310: the wooden fortress",
      p: [
        "Malik Kafur reached Hanamkonda hill on 19 January 1310 and assigned each division of ten thousand a sector of the perimeter. The moat was filled with mud and stone; siege engines broke the outer doors; the outer fort fell on 16 February.",
        "Amir Khusrau, who wrote the campaign up in verse, describes the stockade Kafur built around his own camp out of the city's sacred groves — trees cut down 'notwithstanding their groans', into a wall so solid that if fire had rained from heaven the camp would have been unscathed. Of the city's own defences he wrote that the mud wall was so strong a steel spear could not pierce it, and the inner stone wall so smooth an ant could not climb it.",
        "The inner fort was never taken. Prataparudra negotiated, sending out a golden statue of himself with a chain around its neck to signify unconditional surrender, and with it his treasure: a hundred elephants, seven thousand horses, and one stone the chroniclers called unrivalled in the world."
      ],
      boxes: [
        {
          kind: "deep", title: "Was that stone the Koh-i-Nur?",
          body: [
            "The identification is made by Khafi Khan — writing in the eighteenth century, four hundred years after the event. The contemporary sources say only that there was a gem without equal.",
            "The claim is plausible in the sense that the Krishna valley was the world's only diamond source at the time, so any spectacular Indian stone of that era probably did come from these mines. It is not evidence that this particular stone is that particular diamond.",
            "The loot figures are equally slippery: the same campaign is reported as a hundred elephants with seven thousand horses in one place and with twenty thousand in another."
          ]
        }
      ]
    },
    {
      h: "1323, and what the refugees carried south",
      p: [
        "A first Tughluq siege collapsed when a false rumour of the sultan's death reached the camp and the army mutinied. Ulugh Khan — the future Muhammad bin Tughluq — came back within four months with reinforcements and took the city. Prataparudra was sent north and probably took his own life on the road near the Narmada. Warangal was annexed and its name changed to Sultanpur.",
        "The dispersal mattered more than the conquest. Within thirteen years the Telugu chiefs had taken the city back: Prolaya Nayaka raised the revolt from Rekapalle, and his successor Kapaya Nayaka drove the Tughluq governor out in 1336 — supported, in the same years, by the Hoysala Veera Ballala III.",
        "Others rode south-west to the gorge of the Tungabhadra. In the traditional account two of them were the brothers Harihara and Bukka, and 1336 is also the foundation date of Vijayanagara."
      ],
      boxes: [
        {
          kind: "deep", title: "The Vilasa grant — the conquest from the other side",
          body: [
            "Almost everything we read about these campaigns comes from Persian chronicles written for the victors. The Vilasa copper-plate grant of Prolaya Nayaka, issued in 1330, is the Telugu country describing what had happened to it.",
            "It records that Brahmanas were forced to abandon their religious practices, that images were overturned and broken, that the endowed lands of the learned were confiscated, and that cultivators were stripped of the fruits of their labour until their families were ruined.",
            "It is a partisan document too — it is a charter justifying a revolt. But it is the closest thing we have to testimony from the invaded."
          ]
        }
      ]
    }
  ],

  boxes: [
    {
      kind: "legend", title: "The bricks that float",
      body: [
        "Ramappa temple, thirty-five miles from Warangal, is said to be built of bricks so light they float on water, and to have survived eight centuries of earthquakes because of it.",
        "Unusually, the legend is roughly true. The tower's bricks are extremely porous and of very low density, and samples have been found that do float. The foundation is genuine engineering as well: a 'sandbox' raft of packed sand that damps seismic shock — base isolation, six centuries early.",
        "It is also the only temple in India named after its sculptor rather than its god or its king."
      ]
    }
  ],

  quote: {
    text: "Every cursed tree which was in that capital of idolatry was cut down to the roots… so that a wooden fortress was drawn round the army, of such stability that if fire had rained from heaven, their camp would have been unscathed.",
    cite: "Amir Khusrau, Khazain-ul-Futuh — on the siege of 1310"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "Two concentric rings — an earthen rampart seven miles round and a stone fort inside it — with Hanamkonda to the north-west and the great temples scattered east across the tank country.",
    features:
      '<circle class="cm-feature" cx="450" cy="270" r="185" stroke-dasharray="6 8"/>' +
      '<circle class="cm-feature" cx="450" cy="270" r="105"/>' +
      '<circle class="cm-feature" cx="450" cy="270" r="62"/>' +
      '<text class="cm-label" x="450" y="70" text-anchor="middle">THE OUTER EARTHEN RAMPART</text>' +
      '<ellipse class="cm-water" cx="760" cy="200" rx="72" ry="40"/>' +
      '<text class="cm-label" x="760" y="152" text-anchor="middle">THE TANK COUNTRY</text>' +
      '<ellipse class="cm-water" cx="700" cy="386" rx="50" ry="28"/>',
    sites: [
      { x: 450, y: 270, name: "Kala Thoranam", date: "13th c.", img: "images/kakatiya-thoranam.jpg",
        blurb: "Four carved gateways at the dead centre of the stone fort, still standing in an empty field. Everything they once framed is gone; they are now the emblem of Telangana." },
      { x: 392, y: 232, labelDx: -30, name: "The stone fort", date: "13th c.", img: "images/warangal.jpg",
        blurb: "A circular enceinte with its own ditch inside the earthen city — the part Malik Kafur never took. Prataparudra negotiated rather than let it be stormed." },
      { x: 512, y: 316, labelDx: 24, name: "Swayambhu temple", date: "13th c.",
        blurb: "The great Shiva temple at the fort's heart, wrecked after the conquest. Its carved members were reused across the site, which is why fragments of it turn up everywhere." },
      { x: 286, y: 152, name: "Thousand Pillars", date: "1163", img: "images/thousand-pillar.jpg",
        blurb: "Rudradeva's star-shaped triple shrine at Hanamkonda, in black basalt polished until it reads as marble, with a monolithic Nandi in the forecourt. Gribble called it one of the most perfect specimens of Chalukyan work in southern India." },
      { x: 356, y: 116, labelDx: 18, name: "Hanamkonda hill", date: "the siege of 1310",
        blurb: "Malik Kafur took position on this hill on 19 January 1310 and divided the perimeter among his divisions. The sacred groves below it became the timber of his stockade." },
      { x: 560, y: 176, name: "Bhadrakali temple", date: "6th c., rebuilt", img: "images/bhadrakali-temple.jpg",
        blurb: "An older shrine on a rock between Warangal and Hanamkonda, beside its own lake — one of the few sacred sites here with continuous life through the conquest." },
      { x: 762, y: 200, labelDy: -14, name: "Pakhal lake", date: "13th c.", img: "images/pakhal-lake.jpg",
        blurb: "One of the great Kakatiya tanks, built by chaining reservoirs so that each overflow fed the next. It still irrigates, eight hundred years after the dynasty that dug it ended." },
      { x: 704, y: 388, labelDy: 24, name: "Ramappa temple", date: "1213", img: "images/ramappa.jpg",
        blurb: "Named for its sculptor, built on a sandbox foundation with bricks light enough to float, and carved with bracket figures that are the finest sculpture the Deccan produced. UNESCO World Heritage since 2021." },
      { x: 236, y: 400, name: "Bhadrachalam", date: "17th c. rebuild", img: "images/bhadrachalam.jpg",
        blurb: "Far to the south-east on the Godavari: the temple that Kancherla Gopanna rebuilt with state revenue while serving as a Qutb Shahi tahsildar, and went to prison in Golconda for." }
    ]
  }
},

/* ====================================================================== 3 */
{
  id: "gulbarga",
  n: 3,
  x: 355, y: 392,
  name: "Gulbarga",
  alt: "Ahsanabad — first throne of the Bahmanis",
  era: "Bahmani capital 1347 – 1432",
  img: "images/gulbarga.jpg",

  glance: [
    ["Founded as capital", "3 August 1347"],
    ["Founder", "Ala-ud-din Hasan Bahman Shah"],
    ["The fort", "57 acres, 3 km round, moat 9 m wide"],
    ["Guns on the walls", "26 — the largest about 8 m long"],
    ["The Jama Masjid", "The only great mosque in India with no open court"],
    ["Capital moved to Bidar", "1432"]
  ],

  intro: "The Deccan's first independent Muslim kingdom was founded here by a man who, in the story his own court told, began life behind a plough. Gulbarga gave the Bahmanis their fort, their strange roofed mosque, their artillery and their saint — and, within a century, lost the capital to a hill with better water.",

  chapters: [
    {
      h: "The ploughman and the astrologer",
      p: [
        "Ferishta tells it beautifully. Hasan was a labourer in Delhi working land for a Brahmin astrologer named Gangu. His plough struck a buried pot of old gold coins, and he carried the whole of it untouched to his master.",
        "Gangu reported the honesty to the sultan, who made Hasan an officer of a hundred horse, and then cast the young man's horoscope and read a crown in it. He asked for two things: that Hasan take his name, and that when the crown came he be made minister of finance. Hasan agreed, became Hasan Gangu, and kept both promises — the beginning, Gribble notes, of a Deccani custom followed for two centuries of trusting Hindus with revenue and finance.",
        "Asked in old age how he had won a kingdom with neither treasure nor army, the sultan answered: by affability to friends and enemies, and by liberality to all, to the utmost of his power."
      ],
      boxes: [
        {
          kind: "deep", title: "…and the version the historians prefer",
          body: [
            "The dynasty's name points somewhere else entirely. 'Bahman' is the Persian hero Bahman son of Isfandiyar, of the <em>Shahnama</em>, and the Bahmanis claimed descent from him — a standard Persianate royal genealogy for a new dynasty needing legitimacy against Delhi.",
            "Ferishta wrote some 250 years after the events, and the tale has the shape of court romance: honesty rewarded, prophecy fulfilled, a Hindu astrologer legitimising a Muslim king. Several historians read it as a founding myth designed to bind a new sultanate to its overwhelmingly Hindu population.",
            "The near-contemporary sources cannot agree either. Isami, writing in 1350 under the founder's own patronage, places him at Ghazni; Barani says only that he was born in very humble circumstances and was a field labourer for thirty years — the ploughman, without any of the Gangu apparatus. Afghan, Turkic, Persian and Brahmin-convert origins have all been argued. Nothing is settled."
          ]
        }
      ]
    },
    {
      h: "Guns, and a war begun over a song",
      p: [
        "Muhammad Shah I organised what his father improvised: ministries, provincial governors, a standing army — and artillery, worked by Turkish and European gunners. The Bahmanis had cannon in the Deccan roughly a century before the Mughals brought them to the north, and it is the single largest reason a smaller army kept beating a larger one.",
        "He took Golconda from Warangal by treaty in 1364, along with a turquoise-blue throne of ebony plated with gold that every Bahmani king afterwards added a jewel to. At its inauguration, flushed with wine, he rewarded three hundred singers from Delhi with a draft drawn on the treasury of Vijayanagara. His minister quietly did not send it. The sultan insisted next morning that he had given the order not in intoxication but in serious design.",
        "The Raya paraded the messenger through his capital on an ass, and the war ran for years. Ferishta's arithmetic — five hundred thousand dead across these campaigns, a countryside that 'did not recover for several ages' — is chronicle rhetoric, not a count. What is remarkable is how it ended: the sultan, told by his own musicians that killing the unarmed violated Islamic precept, swore never to do it again, and both sides put it into the treaty. From that time, Ferishta wrote, it became the general custom in the Deccan to spare prisoners."
      ],
      boxes: [
        {
          kind: "know", title: "The Raichur Doab — why they never stopped",
          body: [
            "Nearly every Bahmani–Vijayanagara war was fought over the same ground: the tongue of land between the Krishna and the Tungabhadra, with the fortresses of Raichur and Mudgal in it.",
            "It was fertile, it commanded the approaches to both kingdoms, and it lay astride the diamond country. It changed hands so often across two centuries that Gribble simply calls it a debatable land."
          ]
        }
      ]
    },
    {
      h: "Firoz Shah, the saint, and the ode that came instead of the poet",
      p: [
        "Firoz Shah Bahmani was the most cultivated of the line: astronomer, calligrapher, builder of an observatory near Daulatabad, and — by Ferishta's account — able to speak with each woman of his household in her own language, Arabic, Persian, Turkish, Kannada, Marathi or Telugu. He took three days a week away from court to lecture on geometry. He sent ships each year from Goa and Chaul with orders to bring back not only goods but talent.",
        "He invited Hafiz of Shiraz. The poet embarked, met heavy weather in the Gulf, decided the game was not worth the candle, and sent an ode instead. Firoz judged that setting out counted, and paid him a thousand gold pieces for it.",
        "He was undone by a saint. Khwaja Bandanawaz Gisu Daraz, a Chishti of Delhi who fled Timur's sack and settled here in 1400 at nearly eighty, became the most influential religious figure in the Deccan — and backed the sultan's brother Ahmad for the succession. Firoz had Ahmad blinded; Ahmad's faction rose; Firoz was deposed in 1422 and died within days of the saint himself."
      ]
    },
    {
      h: "1432: the capital leaves",
      p: [
        "Ahmad Shah Wali, marching back from a campaign, halted at the old town of Bidar, liked its height, its air and above all its water, and moved the kingdom there. The new capital was finished in 1431–32 and the court left Gulbarga for good.",
        "What stayed was the saint. The dargah of Gisu Daraz still draws several hundred thousand pilgrims at its annual urs, Hindu as well as Muslim — one of very few institutions in this entire history with continuous life from the fifteenth century to now."
      ]
    }
  ],

  boxes: [
    {
      kind: "deep", title: "The mosque with no sky — and the Córdoba question",
      body: [
        "Gulbarga's Jama Masjid of 1367 is unique among the great mosques of India: it has no open courtyard at all. The entire <em>sahn</em> is roofed — one large dome over the mihrab bay, four at the corners, and some sixty-three small domes carried on around 250 arches, with wide low piers open on three sides.",
        "Guidebooks routinely say it was modelled on the great mosque of Córdoba, sometimes by a Córdoba-trained architect. That stronger claim does not survive scrutiny: there is no documented link, and the roofed hypostyle solution is far better explained by the Deccan monsoon and by Tughluq and Persian precedent.",
        "What specialists do say is that its mihrab ranks among the finest in the Islamic world — and that Córdoba is the comparison that comes to mind. Somewhere between the two statements, a fact turned into a legend."
      ]
    }
  ],

  quote: {
    text: "By affability to friends and enemies, and by showing liberality to all to the utmost of my power.",
    cite: "Ala-ud-din Hasan Bahman Shah, asked how he had won a kingdom"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "A double-walled fort on the west of the old town, with the tombs strung out east and the saint's dargah to the north-east — and Firoz Shah's abandoned pleasure-capital thirty kilometres south, off the edge of this plan.",
    features:
      '<ellipse class="cm-feature" cx="290" cy="270" rx="160" ry="128"/>' +
      '<ellipse class="cm-feature" cx="290" cy="270" rx="136" ry="106" stroke-dasharray="4 6"/>' +
      '<text class="cm-label" x="290" y="122" text-anchor="middle">THE FORT AND ITS MOAT</text>' +
      '<path class="cm-feature" d="M450 262 L820 240" stroke-dasharray="5 7"/>' +
      '<rect class="cm-feature" x="470" y="150" width="360" height="250" stroke-dasharray="3 8"/>' +
      '<text class="cm-label" x="650" y="424" text-anchor="middle">THE OLD CITY</text>',
    sites: [
      { x: 290, y: 270, name: "Gulbarga Fort", date: "1347 onward", img: "images/gulbarga-fort.jpg",
        blurb: "Fifty-seven acres inside a double wall and a moat nine metres wide, with fifteen towers and twenty-six guns — the largest of them a welded-bar cannon some eight metres long." },
      { x: 300, y: 320, labelDy: 24, name: "Jama Masjid", date: "1367", img: "images/jama-masjid-gulbarga.jpg",
        blurb: "The mosque with no courtyard: sixty-three small domes and 250 arches roofing the entire prayer space. Attributed to a Persian architect, Rafi of Qazvin, and on the UNESCO tentative list." },
      { x: 236, y: 222, labelDx: -28, name: "The citadel", date: "15th c.",
        blurb: "The inner works, with the great gun mounted on the rampart and the palace ranges behind — the seat of the Deccan's first independent Muslim state for eighty-five years." },
      { x: 560, y: 176, name: "Dargah of Gisu Daraz", date: "from 1422", img: "images/gisu-daraz-dargah.jpg",
        blurb: "The tomb of the Chishti saint who came south at nearly eighty, wrote in Persian, Arabic and early Dakhni, unmade one sultan and made another. Its urs still draws hundreds of thousands." },
      { x: 690, y: 240, name: "Haft Gumbaz", date: "14th–15th c.", img: "images/haft-gumbaz.jpg",
        blurb: "Seven tombs in a row east of the fort, four of them royal. Firoz Shah's is the largest and the finest — double-chambered, and the last word of Gulbarga's century." },
      { x: 466, y: 366, labelDy: 24, name: "Shah Bazaar Masjid", date: "14th c.",
        blurb: "The Friday mosque outside the walls, on the market street — where the city's ordinary religious life happened, as opposed to the court's." },
      { x: 620, y: 386, name: "Langar ki Masjid", date: "15th c.",
        blurb: "A Sufi hospice-mosque south-east of the fort, fully domed inside: the free kitchen and the prayer hall built as one institution." },
      { x: 128, y: 372, labelDx: 14, name: "Chor Gumbad", date: "15th c.", img: "images/chor-gumbad.jpg",
        blurb: "A single vast anonymous dome on a bare hillock west of the fort, famous for its echo and for the fact that nobody knows for certain who is buried in it." },
      { x: 700, y: 466, labelDy: -14, name: "Firuzabad", date: "1399",
        blurb: "Thirty kilometres south on the Bhima — Firoz Shah's planned pleasure-capital, its walls and Jami Masjid still standing in open country, its grid still legible from the air." }
    ]
  }
},

/* ====================================================================== 4 */
{
  id: "bidar",
  n: 4,
  x: 405, y: 338, labelDy: -17,
  name: "Bidar",
  alt: "Muhammadabad — the plateau capital",
  era: "Bahmani capital 1432 – 1518 · Barid Shahi to 1619",
  img: "images/bidar.jpg",

  glance: [
    ["Became capital", "1432, under Ahmad Shah Wali"],
    ["On the plateau at", "About 670 m"],
    ["Fort walls", "About 2.5 km, 37 bastions, 7 gates"],
    ["The moat", "Triple — cut into solid laterite"],
    ["The karez", "About 2 km of tunnel; flowing again since 2017"],
    ["Annexed by Bijapur", "1619"]
  ],

  intro: "Bidar is where the Bahmani sultanate was most itself: Persian tile on Deccan laterite, a college with three thousand manuscripts, water brought miles underground, and a minister so incorruptible that his enemies had to forge his signature to kill him. It is also where the sultanate came apart.",

  chapters: [
    {
      h: "A fort cut out of the ground",
      p: [
        "Ahmad Shah's builders had laterite to work with, and they used it as the Yadavas had used basalt: not by piling stone on stone but by removing it. Bidar's defence on the south and south-west is a triple moat hewn into the living rock, with causeways of untouched laterite left standing between the channels.",
        "Above it run about two and a half kilometres of wall, thirty-seven bastions built for the welded-bar cannon of the period, and seven gates including the domed Gumbad Darwaza and the Sharza Darwaza with its lions. Inside are more than thirty buildings: the Solah Khamba mosque of 1423–24, its façade of nineteen uniform arches making it the oldest large mosque in southern India; the Takht Mahal, where the turquoise throne stood; the Diwan-i-Aam; and, beneath the palace, the Hazar Kothari — an underground hall with a tunnel running towards the outer wall, the royal way out.",
        "The most beautiful room is later. The Rangin Mahal, remodelled by Ali Barid Shah in the sixteenth century, sets mother-of-pearl flowers into jet-black basalt, under carved teak ceilings and coloured tile — the Deccan's most concentrated piece of interior decoration."
      ]
    },
    {
      h: "Water from under the rock",
      p: [
        "The plateau has no river. Bidar solved it with the <em>karez</em> — the Persian qanat: gently graded tunnels driven through water-bearing laterite from a mother well far outside the town, ventilated and cleaned through vertical shafts sunk at intervals along the line, delivering water into the city entirely by gravity.",
        "The Naubad line runs about two kilometres with twenty-one recorded shafts; a parallel line at Aliabad has twenty-nine wells at fifty-metre spacing. They were derelict for decades. Between 2016 and 2018 the Naubad karez was cleared and restored for roughly fifty thousand dollars — and in the drought of 2017 it flowed again.",
        "This is the same technology, arriving with the same Persian émigrés, that Malik Ambar would later use to water Aurangabad and the Adil Shahis to water Bijapur. Follow the water and you can trace the migration."
      ]
    },
    {
      h: "Mahmud Gawan",
      p: [
        "He came from Gawan in Gilan on the Caspian, of a family of ministers, exiled by faction; studied at Cairo and Damascus; traded horses across Anatolia, Iran and Egypt; declined offices in Khurasan and Iraq; and landed at Dabhol in 1453 as a merchant, aged forty-two. He was given a command of a thousand horse, and within five years was chief minister.",
        "He reformed the state against its own nobility: he split the four provinces into eight and deliberately alternated Deccani and foreign-born governors; he had land measured and assessed at fixed rates; he paid troops in cash from the treasury against a registered muster roll instead of through their governors; and he stripped each governor of all but one fort. Every one of these took power from the men who eventually killed him.",
        "He took Goa from Vijayanagara in February 1472, opening the sultanate's best window on the Indian Ocean and cutting the piracy that preyed on Hajj pilgrims. Returning in triumph, he distributed his jewels and property to scholars and Sayyids, kept only his horses, elephants and his library, and afterwards walked the city in disguise on Fridays handing out coins, telling the poor they came from the sultan.",
        "The same year he finished his madrasa."
      ],
      boxes: [
        {
          kind: "numbers", title: "The madrasa, and what became of it",
          table: [
            ["Founded / completed", "1460 / 1472"],
            ["Footprint", "About 62 × 55 m, three storeys around a court"],
            ["Halls", "Three great lecture halls, each roughly 8 × 16 m"],
            ["Library", "About 3,000 manuscripts"],
            ["Minarets", "Two, over 30 m — one still stands"],
            ["Façade", "Persian glazed tile in green, yellow and white"],
            ["Ruined", "1695–96 — a powder store inside it was struck by lightning"]
          ]
        },
        {
          kind: "know", title: "Deccanis and Afaqis — the crack in the state",
          body: [
            "The Bahmani nobility split over who counted as a native. On one side the <em>Deccanis</em>, Deccan-born Muslims, largely Sunni, allied with the Habshis — the African military households. On the other the <em>Afaqis</em>, 'men of the horizon': Persians, Turks and Arabs who kept arriving by sea, often Shia, recruited for cavalry expertise and Persian administration, and promoted fast.",
            "They quarrelled over land assignments, cavalry commands and access to the king, and the sectarian difference sharpened all of it. In 1446 Deccani nobles and their Habshi troops invited the Afaqis to a banquet at Chakan fort and massacred them — the figures given run to 1,200 Sayyids and a thousand others.",
            "Mahmud Gawan's eight-province reform was an attempt to engineer parity between the two. His murder proved it had failed."
          ]
        }
      ]
    },
    {
      h: "1481: a blank page with a seal on it",
      p: [
        "His enemies could not defeat him, so they forged him. An Abyssinian slave who had charge of the minister's seals was made drunk and induced to stamp a blank sheet. Above the seal they wrote a letter to the Raja of Orissa inviting an invasion and promising to join it.",
        "Sultan Muhammad Shah III, drunk himself, read it and sent for the old man. Warned, and offered ten thousand horse to escape with, Mahmud Gawan refused: this beard, he said, had grown white in the service of the father, and it would be honourable if it were dyed with his blood by the fortunes of the son.",
        "Shown the letter, he said the seal was his and the letter was not. The sultan rose and had him killed on the spot. His last words to the king were a prophecy — that the death of an old man was of little moment to himself, but to the king it would prove the ruin of an empire. He was seventy. His estate was found to contain a prayer mat, his books, and a few coins.",
        "The sultan learned the truth, drank himself into fits in which he cried that Mahmud Gawan was tearing him to pieces, and died within the year, aged twenty-eight."
      ],
      boxes: [
        {
          kind: "deep", title: "The chronogram — and a caution",
          body: [
            "Ferishta gives a chronogram for the sultan's death: a phrase whose letters, added up in the abjad system, yield the year. The value AH 886 is well attested.",
            "The phrase itself is usually rendered in English as <em>the ruin of the Deccan</em>. That wording circulates widely in the secondary literature without a verifiable primary citation, so it belongs to tradition rather than to the record — which is a pity, because as prophecy it was exact.",
            "Within eleven years of the murder the sultanate had fragmented into five kingdoms."
          ]
        }
      ]
    }
  ],

  boxes: [
    {
      kind: "know", title: "Bidriware — the craft named after the city",
      body: [
        "Bidar's other export is a metal. A zinc-copper alloy — the working ratio usually given as sixteen parts zinc to one of copper — is cast, filed smooth, darkened so the design can be drawn on it, chiselled, and inlaid with hammered pure silver.",
        "The last step is the strange one. The piece is boiled in a paste of soil taken from inside Bidar fort with ammonium chloride. That earth, sheltered from sun and rain for six centuries, is exceptionally high in nitrates; it turns the alloy permanently matt black while leaving the silver brilliant. Craftsmen test a patch of soil by tasting it, and insist no other earth works as well — which is half metallurgy and half guild boundary.",
        "Tradition credits its introduction to an Iranian craftsman invited by Ahmad Shah Wali. It holds a Geographical Indication tag, and the trade is in steep decline."
      ]
    },
    {
      kind: "legend", title: "The tunnels and the treasure",
      body: [
        "Bidar believes passages run from the fort to the tombs at Ashtur, to the Chaubara in the middle of town, and even to Gulbarga, with Bahmani treasure at the end of them.",
        "The substrate is real and impressive: the Hazar Kothari's underground hall and escape tunnel, the Mandu Darwaza sallyport, and dozens of kilometres of karez running under the town. When a place is genuinely honeycombed, the legends write themselves."
      ]
    }
  ],

  quote: {
    text: "I am old and do not mind my death… I thank God that He gave me an opportunity to lay down my life in the cause of the dynasty.",
    cite: "Mahmud Gawan, 5 April 1481"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "The fort holds the north-west lip of the plateau; the walled town runs south-east of it with the Chaubara at its crossroads; the royal dead lie out at Ashtur to the east and the Barid Shahis to the west.",
    features:
      '<path class="cm-feature" d="M120 300 L120 150 L420 120 L470 250 L330 380 L150 360 Z"/>' +
      '<path class="cm-feature" d="M150 320 L150 175 L400 150" stroke-dasharray="4 5"/>' +
      '<text class="cm-label" x="260" y="104" text-anchor="middle">THE FORT ON THE ESCARPMENT</text>' +
      '<path class="cm-feature" d="M330 380 L600 430 L700 330 L470 250" stroke-dasharray="6 8"/>' +
      '<text class="cm-label" x="530" y="460" text-anchor="middle">THE WALLED TOWN</text>' +
      '<path class="cm-feature" d="M110 250 C60 260 50 300 90 330" stroke-dasharray="2 4"/>',
    sites: [
      { x: 250, y: 220, name: "Bidar Fort", date: "1429–32", img: "images/bidar.jpg",
        blurb: "Thirty-seven bastions on two and a half kilometres of wall, behind a triple moat cut into solid laterite with causeways of untouched rock left standing between the channels." },
      { x: 316, y: 268, labelDx: 22, name: "Rangin Mahal", date: "remodelled 1542–80", img: "images/rangin-mahal.jpg",
        blurb: "Mother-of-pearl flowers set into jet-black basalt, under carved teak ceilings and coloured tile. The most concentrated piece of interior decoration in the Deccan." },
      { x: 200, y: 268, labelDx: -30, name: "Solah Khamba Masjid", date: "1423–24", img: "images/solah-khamba.jpg",
        blurb: "Nineteen uniform arches across the façade of the oldest large mosque in southern India — built before the capital had even formally moved here." },
      { x: 268, y: 172, labelDy: -14, name: "Takht Mahal", date: "15th c.",
        blurb: "The throne hall, where the turquoise-blue throne of ebony and gold stood — the one taken from Warangal in 1364, to which every Bahmani sultan added a jewel." },
      { x: 380, y: 322, name: "Gawan's madrasa", date: "1460–72", img: "images/mahmud-gawan-madrasa.jpg",
        blurb: "Three storeys of Timurid blue tile around a court, with three thousand manuscripts and free lodging for students. A powder store inside it was struck by lightning in 1696 and took away half the building." },
      { x: 500, y: 356, labelDy: 24, name: "Chaubara", date: "early 15th c.", img: "images/chaubara.jpg",
        blurb: "A cylindrical watchtower twenty-two metres high with eighty winding steps, standing at the crossing of the old town's two main streets — the exact centre of Bidar." },
      { x: 728, y: 254, name: "Bahmani tombs, Ashtur", date: "1436–1535", img: "images/bahmani-tombs.jpg",
        blurb: "Twelve great domes in an open field, eight of them sultans'. Ahmad Shah Wali's is the only Bahmani interior with its painting intact — gold, lapis and vermilion, with Kufic bands, said to be by Persian painters." },
      { x: 800, y: 320, labelDx: -10, name: "Chaukhandi", date: "mid-15th c.",
        blurb: "The octagonal tomb of Khalilullah, the sultan's spiritual master, on a rise a kilometre west of Ashtur — the saint placed between the king and his ancestors." },
      { x: 96, y: 402, labelDx: 26, name: "Barid Shahi tombs", date: "16th c.",
        blurb: "Ali Barid Shah's tomb has no walls at all: a twenty-five-metre dome floating on four open arches at the centre of a formal charbagh — the earliest fully realised garden tomb in the Deccan." },
      { x: 92, y: 348, labelDx: 26, labelDy: 24, name: "Naubad karez", date: "15th c.",
        blurb: "Two kilometres of gently graded tunnel with twenty-one shafts, bringing water through the laterite by gravity alone. Restored between 2016 and 2018, and flowing again in the 2017 drought." }
    ]
  }
},

/* ====================================================================== 5 */
{
  id: "hampi",
  n: 5,
  x: 326, y: 560,
  name: "Vijayanagara",
  alt: "Hampi — the city of victory",
  era: "Founded 1336 · sacked 1565 · never reoccupied",
  img: "images/hampi.jpg",

  glance: [
    ["Founded", "18 April 1336, by Harihara and Bukka"],
    ["Metropolitan area", "About 650 km²; urban core about 25 km²"],
    ["Population at peak", "Commonly 500,000; estimates run 250,000 – 1 million"],
    ["World ranking c. 1500", "Probably second only to Beijing"],
    ["Fortification rings", "Seven, by Abdur Razzaq's count"],
    ["Surviving monuments", "About 1,600 across 4,187 hectares"]
  ],

  intro: "For two centuries this was, by the reckoning of everyone who saw it, one of the largest and richest cities on earth — a granite metropolis in a boulder gorge, with jewels sold openly in the street, seven rings of walls, and an empire behind it running from the Krishna to Cape Comorin. It was destroyed in an afternoon and never lived in again.",

  chapters: [
    {
      h: "1336: the hare that turned",
      p: [
        "The founding story says the brothers Harihara and Bukka were hunting on the south bank of the Tungabhadra when their hounds put up a hare — and the hare turned and drove the dogs off. The sage Vidyaranya read it as a sign that the ground itself gave courage to the weak: build here, and no enemy will take your capital.",
        "The site is a natural fortress of granite hills and river, on ground already sacred as the Kishkindha of the <em>Ramayana</em>, where Rama met Hanuman and Sugriva. Inscriptions from the eleventh century onward call it so. The river's older name is Pampa, and the goddess Pampa's marriage to Shiva as Virupaksha on Hemakuta hill is the founding sacred myth of the place — still celebrated annually, in a temple that has never once fallen out of worship.",
        "The city was called first Vidyanagara, the city of learning, and then Vijayanagara, the city of victory. It was founded facing north, against the Sultanate, and for two and a half centuries it absorbed the shock of every invasion from the plateau."
      ],
      boxes: [
        {
          kind: "deep", title: "Who were the brothers? — a fight that is still running",
          body: [
            "One school makes them Telugu officers of Kakatiya Warangal (or of Kampili), captured when the Tughluqs took the city, taken to Delhi, converted to Islam, sent back south as governors — and then reconverted by Vidyaranya and declaring independence.",
            "The other makes them Kannada warriors in Hoysala or Kampili service, already at home on the Tungabhadra, with the early inscriptions showing them as loyal Hoysala feudatories into the 1340s. The widow of Ballala III is recorded as taking part in Harihara's coronation — continuity, not rupture.",
            "The capture-and-conversion story appears only in the Persian chronicles, has no epigraphic corroboration, and may postdate the events by as much as two hundred years — which would make it a foundation myth deriving Vijayanagara's authority from the Sultanate it fought. Vidyaranya has a worse problem: he became head of Sringeri around 1380, four decades after 1336, so he cannot have done what tradition says he did.",
            "What is not in dispute: the empire was founded in the 1330s, on ground the Tughluqs had just cleared by destroying the Kampili kingdom, by men who had been inside the Sultanate's system — which is exactly why they knew how to fight it."
          ]
        }
      ]
    },
    {
      h: "What the travellers saw",
      p: [
        "Abdur Razzaq Samarqandi arrived in April 1443 as ambassador of the Timurid Shah Rukh and gave up in the first paragraph: the pupil of the eye, he wrote, has never seen a place like it. He counted seven concentric lines of fortification, with fields and gardens between the outer rings and a solid mass of markets from the third ring inward. He described bazaars always stocked with fresh flowers, craftsmen quartered by trade, streams running in cut stone channels, a mint whose chambers held masses of molten gold, and a police office of twelve thousand men.",
        "What struck him hardest was ordinary wealth: even market workers wore jewels and gilt in their ears, on their necks, arms, wrists and fingers. And the jewellers, he noted, sold pearls, rubies, emeralds and diamonds publicly in the open bazaar.",
        "Domingo Paes, a Portuguese horse trader, walked the city about 1520 and thought it as large as Rome and very beautiful to look at, with groves and orchards inside the walls, water running through the middle of it, and a hundred thousand houses. It was, he wrote, the best-provided city in the world."
      ],
      boxes: [
        {
          kind: "numbers", title: "What the visitors counted",
          table: [
            ["Nicolo de' Conti, c. 1420", "Circuit of 60 miles; 90,000 men fit to bear arms"],
            ["Abdur Razzaq, 1443", "Seven walls; bazaars long and broad, always in flower"],
            ["Duarte Barbosa, c. 1514", "900 elephants, 20,000 horses; free trade for every faith"],
            ["Domingo Paes, c. 1520", "100,000 houses; 'as large as Rome'"],
            ["Fernão Nunes, 1535–37", "13,000 horses of Ormuz bought every year"],
            ["Archaeology", "Urban core c. 25 km²; metropolitan region c. 650 km²"]
          ]
        },
        {
          kind: "deep", title: "How much of that should we believe?",
          body: [
            "Medieval travel figures are elastic. Conti's sixty-mile circuit is not a measurement, it is astonishment written down.",
            "But survey has been kinder to these accounts than usual. The Vijayanagara Research Project and the Archaeological Survey have traced multiple defensive circuits, sixty reservoir embankments in the intensive survey area alone, aqueducts, cisterns, roads thirty to sixty metres wide, and an urban core of roughly twenty-five square kilometres inside a metropolitan region of six hundred and fifty.",
            "The wealth is corroborated too, from a hostile source: the sultanates' own accounts of what they carried away in 1565."
          ]
        }
      ]
    },
    {
      h: "Krishnadevaraya",
      p: [
        "Under him the empire reached its greatest extent, from the Krishna to Cape Comorin and sea to sea. He broke the Bijapur army at Raichur in 1520, subdued Orissa and took a Gajapati princess in marriage, and handled the newly arrived Portuguese as suppliers rather than as a threat — buying their Arabian horses at extraordinary prices, because the Deccan could not breed cavalry mounts and both sides had to import them.",
        "He was also a Telugu poet, and kept eight of them at court — the <em>ashtadiggajas</em>, the elephants of the eight directions. His own <em>Amuktamalyada</em> is a devotional poem and a manual of statecraft at once: tax lightly, protect merchants, dig tanks and canals, lease land cheaply to the poor, and you will get both wealth and religious merit.",
        "The oddest fact about his reign is the silence around it. Gribble notes that the Muslim historians, otherwise obsessive about Vijayanagara, barely mention him and never by name — though inscriptions and Portuguese accounts show him ruling the whole south for twenty years. He visited Tirumala seven times and left 229 inscriptions there."
      ],
      boxes: [
        {
          kind: "numbers", title: "The money",
          table: [
            ["The gold coin", "The <i>varaha</i> or pagoda, 3.4 g — Vishnu's boar"],
            ["Why that weight", "Matched to the Venetian sequin and ducat, for foreign trade"],
            ["Small change", "1 varaha = 16 silver <i>tara</i>; 1 tara = 3 copper <i>jital</i>"],
            ["Assay", "Mints kept touchstones; coin was accepted only after testing"],
            ["Horses", "About 13,000 a year through Portuguese Goa"],
            ["Ports", "Roughly 300, on both coasts; goods reaching Venice"]
          ]
        }
      ]
    },
    {
      h: "1565: an afternoon at Talikota",
      p: [
        "For twenty years the aged regent Rama Raya had played the sultanates against one another, backing Ahmadnagar against Bijapur and then reversing, hiring their soldiers and humiliating their envoys. In 1565 Bijapur, Ahmadnagar, Golconda and Bidar did the one thing he had assumed they could not: they allied, sealing it with marriages between their houses.",
        "The armies met on 23 January 1565 between the villages of Rakshasi and Tangadi, near Talikota on the Krishna — the battle is named after a town it was not fought at. Rama Raya, past eighty, directed it from a jewelled litter with heaps of coin beside him to reward his men. His litter went down; he was captured and beheaded on the field; his head was raised on a spear, and the army dissolved on sight of it.",
        "The city was not defended. The sultans' armies stayed months — five or six by the usual reckoning — and carried off what they could. Two years later the Venetian Cesare Federici found the houses standing and the streets empty but for wild animals.",
        "And the victory destroyed the victors' own security. The one power that had forced them to cooperate was gone. Within twenty-five years the Mughals were at their northern gate."
      ],
      boxes: [
        {
          kind: "deep", title: "Treachery, or artillery?",
          body: [
            "The traditional explanation is defection: two Muslim commanders in Vijayanagara's service, the Gilani brothers, changing sides at the critical moment. Federici, writing two years later, reports it as fact; some modern scholars accept it, others read it as a rationalisation invented after a shattering defeat.",
            "The now-dominant explanation is technological. The sultanates handled gunpowder artillery as an integrated arm; Vijayanagara had not absorbed it. Rama Raya commanding from a litter in the middle of the line made him both conspicuous and slow.",
            "Casualty figures — the familiar hundred thousand — are chronicle arithmetic. Even the length of the battle is disputed, with accounts ranging from hours to days. What is certain is that the empire's field army ceased to exist."
          ]
        },
        {
          kind: "deep", title: "Why it was never rebuilt — and what was actually destroyed",
          body: [
            "Tirumala Deva Raya founded a new line and moved the capital to Penukonda, then further south, facing succession disputes and Telugu Nayaka houses with no interest in a revived central authority. Royal patronage of the site simply stopped.",
            "Modern survey suggests the destruction was concentrated: heavy in the Royal Centre — the sites of sovereignty — and far lighter in the sacred and outlying zones. The sultans burned the seat of the state rather than the whole city. But without the state there was no reason for anyone to stay, and the site emptied.",
            "It is also worth saying plainly that the older framing of Talikota as a Hindu-versus-Muslim civilisational catastrophe has been rejected by most current historians: Vijayanagara employed Muslim troops and borrowed Deccani courtly architecture wholesale, the sultanates fought each other as readily as they fought it, and the causes were political and technological."
          ]
        }
      ]
    },
    {
      h: "How it came back",
      p: [
        "Colin Mackenzie, later the first Surveyor General of India, reached the abandoned ruins in 1799–1800, collected manuscripts, commissioned watercolours and made the first map. Alexander Greenlaw photographed the site in 1856 — sixty calotypes that remain the best record of its mid-nineteenth-century state. Robert Sewell's <em>A Forgotten Empire</em> of 1900 translated Paes and Nunes and made the place internationally famous.",
        "From 1980 the Vijayanagara Research Project under John Fritz and George Michell did something different: surface archaeology, systematically drawing, photographing and mapping the standing city rather than digging it. The Archaeological Survey excavated the Royal Enclosure and the great stepped tank beside the Mahanavami platform.",
        "It became a World Heritage Site in 1986, and spent 1999 to 2006 on the endangered list because of road and bridge construction."
      ]
    }
  ],

  boxes: [
    {
      kind: "know", title: "Kishkindha — reading the landscape as scripture",
      body: [
        "The whole gorge is mapped onto the <em>Ramayana</em>. Anjanadri hill across the river is Hanuman's birthplace; Rishyamukha is where Sugriva sheltered from his brother Vali; a cave nearby is shown as the place Sugriva kept the jewels Sita dropped as she was carried away. Matanga and Malyavanta hills complete the circuit.",
        "This is not decoration added later. Inscriptions call the site Kishkindha from 1059 onward — nearly three centuries before the city was founded. The empire chose a place that was already a story."
      ]
    }
  ],

  quote: {
    text: "The city of Bidjanagar is such that the pupil of the eye has never seen a place like it, and the ear of intelligence has never been informed that there existed anything to equal it in the world.",
    cite: "Abdur Razzaq Samarqandi, ambassador of Shah Rukh, 1443"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "The Tungabhadra runs along the north. The Sacred Centre lies on the river bank around Virupaksha; the Royal Centre, with its palaces and platforms, sits two to three kilometres south-east, connected by colonnaded bazaar streets.",
    features:
      '<path class="cm-river" d="M40 128 C180 88 300 150 430 118 C560 86 690 132 860 96"/>' +
      '<text class="cm-label" x="120" y="112">TUNGABHADRA</text>' +
      '<path class="cm-feature" d="M150 210 L470 210" stroke-dasharray="4 4"/>' +
      '<path class="cm-feature" d="M520 176 L700 176" stroke-dasharray="4 4"/>' +
      '<path class="cm-feature" d="M470 210 C520 280 560 340 600 380" stroke-dasharray="6 8"/>' +
      '<ellipse class="cm-feature" cx="640" cy="400" rx="180" ry="98"/>' +
      '<text class="cm-label" x="640" y="288" text-anchor="middle">THE ROYAL CENTRE</text>' +
      '<text class="cm-label" x="240" y="180" text-anchor="middle">THE SACRED CENTRE</text>',
    sites: [
      { x: 150, y: 210, name: "Virupaksha temple", date: "11th c., extended 1509", img: "images/virupaksha.jpg",
        blurb: "The anchor of the whole site and the only temple here never to have fallen out of worship — its fifty-metre gopura rebuilt by Krishnadevaraya, its goddess Pampa older than the empire by centuries." },
      { x: 330, y: 210, labelDy: 24, name: "Hampi bazaar", date: "15th–16th c.", img: "images/hampi-bazaar.jpg",
        blurb: "Seven hundred and fifty metres of colonnaded street running due east from the temple, ending at a monolithic Nandi. Abdur Razzaq found it stocked with fresh flowers every day of the year." },
      { x: 216, y: 268, labelDx: -20, name: "Hemakuta hill", date: "pre-imperial", img: "images/hemakuta.jpg",
        blurb: "A low granite dome south of Virupaksha carrying more than thirty small shrines with stepped pyramidal roofs — most of them older than the empire, from the Kampili period the Tughluqs destroyed." },
      { x: 300, y: 340, name: "Ugra Narasimha", date: "1528", img: "images/ugra-narasimha.jpg",
        blurb: "Six and a half metres of Vishnu's man-lion seated on the coils of Adishesha under a seven-hooded canopy, carved from one boulder. The Lakshmi who sat on his knee has broken away; her hand is still on his back." },
      { x: 250, y: 396, labelDx: -12, name: "Krishna temple", date: "1515", img: "images/krishna-temple-hampi.jpg",
        blurb: "Built by Krishnadevaraya to mark the taking of Udayagiri, with its own bazaar street and ceremonial plaza in front of it. The image it was built for is now in a museum in Chennai." },
      { x: 520, y: 176, labelDy: -14, name: "Achyutaraya temple", date: "1534", img: "images/achyutaraya.jpg",
        blurb: "A north-facing Vishnu temple with a hundred-column hall, set in the saddle between two hills — and in front of it the Courtesans' Street, five hundred metres long and fifty wide." },
      { x: 700, y: 176, name: "Vittala temple", date: "15th–16th c.", img: "images/vittala.jpg",
        blurb: "The high point of the style: a kilometre of colonnaded market outside, and inside, piers ringed with slender colonnettes that ring at different pitches when struck." },
      { x: 806, y: 242, labelDx: -26, labelDy: 24, name: "The stone chariot", date: "16th c.",
        blurb: "A shrine to Garuda cut as a processional car, its wheels carved to turn. It is on the fifty-rupee note, and it is the single most reproduced image in Indian archaeology." },
      { x: 600, y: 380, name: "Hazara Rama temple", date: "early 15th c.", img: "images/hazara-rama.jpg",
        blurb: "The royal family's private chapel. Its outer walls carry processional friezes of elephants, horses, soldiers and dancers — the Mahanavami parade in stone — and its inner walls a continuous Ramayana." },
      { x: 660, y: 432, labelDy: 24, name: "Mahanavami Dibba", date: "early 16th c.", img: "images/mahanavami-dibba.jpg",
        blurb: "Three ascending granite stages some eight metres high, the highest point of the Royal Enclosure, carved with marching elephants, camels, musicians and dancers. The king watched the nine-day state festival from a wooden pavilion on top, which burned in 1565." },
      { x: 542, y: 452, labelDy: 24, name: "Lotus Mahal", date: "16th c.", img: "images/lotus-mahal.jpg",
        blurb: "A two-storey pavilion on a Hindu mandala plan wrapped in Islamic cusped arches and vaults. Nobody knows what it was for — and its very existence is the argument against reading this empire as a wall against Islam." },
      { x: 790, y: 452, labelDy: 24, name: "Elephant stables", date: "16th c.", img: "images/elephant-stables.jpg",
        blurb: "Eleven domed chambers in a row, alternating fluted and plain domes, the central one most ornate. Barbosa counted nine hundred elephants in the city; these housed the state's ceremonial ones." },
      { x: 822, y: 352, labelDx: -18, name: "Queen's Bath", date: "16th c.",
        blurb: "Thirty metres square, with a sunken pool fifteen metres across and nearly two deep, ringed by an arcaded Indo-Islamic verandah and once fed by aqueduct — probably a public bath rather than a royal one." }
    ]
  }
},

/* ====================================================================== 6 */
{
  id: "bijapur",
  n: 6,
  x: 263, y: 434,
  name: "Bijapur",
  alt: "Vijayapura — the Adil Shahi capital",
  era: "Independent 1490 · fell to Aurangzeb 1686",
  img: "images/bijapur.jpg",

  glance: [
    ["Independent", "1490, under Yusuf Adil Shah"],
    ["City walls", "About 10 km, 96 bastions, 50 ft high"],
    ["Population under Ibrahim II", "Around one million"],
    ["Gol Gumbaz dome", "44 m across — floor larger than the Pantheon's"],
    ["The great gun", "Malik-e-Maidan, 55 tons, cast 1549"],
    ["Fell", "12 September 1686, to starvation"]
  ],

  intro: "Bijapur built the largest dome in India, wrote love songs to Saraswati under a Muslim sultan, ran its water through underground tunnels in a rain-shadow desert, and mounted a fifty-five-ton bronze gun with a lion swallowing an elephant at the muzzle. Then it starved.",

  chapters: [
    {
      h: "The sultan who may have been an Ottoman prince",
      p: [
        "Yusuf Adil Shah seized Bijapur in 1481 in the chaos after Mahmud Gawan's murder and declared independence in 1490. His origins are one of the great unresolved stories of Indian history.",
        "The dynasty's own account, transmitted by Ferishta — who wrote at this court: he was a son of the Ottoman Sultan Murad II. When his brother Mehmed took the throne and ordered the customary strangling of rivals, his mother bought a slave boy of the same age, handed him to the executioners, and smuggled the seven-year-old prince to Persia. He was educated at Ardabil and Sava, sailed for India at sixteen, and entered Bahmani service.",
        "In 1502–03 he did something no other Indian ruler had done: he had the first Shia call to prayer in India sounded, and the names of the Twelve Imams put into the khutba. His restraint about it is more striking than the act — my faith for myself and your faith for yourselves — and though it provoked a brief war against him, he reverted the public rite rather than fight over doctrine. The state's official sect changed at least four times over the next century."
      ],
      boxes: [
        {
          kind: "deep", title: "Prince or slave?",
          body: [
            "Ottoman sources know nothing of a surviving son of Murad II sold into slavery, and modern historians generally consider the descent unfounded. The likelier reconstructions make Yusuf a Georgian slave bought by Mahmud Gawan, a Persian, or an Aq Qoyunlu Turkoman.",
            "In this world that is not a lesser origin so much as a different one. The Deccan sultanates were repeatedly founded by men who arrived as slaves or converts: Ahmadnagar's founder was the son of a captured Brahmin, Malik Ambar was an Ethiopian sold as a child, and the Bahmanis' own founder was, in legend, a ploughman.",
            "What the claim tells you is what a Deccan sultan wanted to be — Persianate, royal, and connected to the great Islamic world beyond India."
          ]
        }
      ]
    },
    {
      h: "Ibrahim II, teacher of the world",
      p: [
        "Ibrahim Adil Shah II styled himself <em>Jagadguru</em> — world-teacher — which is an extraordinary title for a Muslim sovereign, and meant it. His <em>Kitab-i Nauras</em>, the book of nine rasas, is fifty-nine songs and seventeen couplets in Dakhni: hymns to Saraswati and Ganesha stand beside praise of the Prophet and of the Sufi saint Gisu Daraz. He wrote about his favourite elephant Atish Khan and his tambura, which he named Moti Khan.",
        "He signed himself, in one line, as the tanpura-player who became learned by the grace of god, living in the city of Vidyanagari — a Muslim king using a Sanskrit name for his own capital.",
        "He founded a whole township, Nauraspur, to give physical form to the idea of a musical city. It was left unfinished and later wrecked. And under him Bijapur's population is estimated at around a million, its court a meritocracy of Persians, Africans and Europeans — the setting for the Deccani school of painting, which fused Turkish, Persian and Indian sources into something with no equivalent in the Mughal north."
      ],
      boxes: [
        {
          kind: "know", title: "Nujum al-Ulum — the strangest book in the Deccan",
          body: [
            "Completed at Bijapur on 17 August 1570 under Ali Adil Shah I and now in the Chester Beatty Library, the 'Stars of the Sciences' carries some 876 miniatures.",
            "Its subjects run from angels, planets and the degrees of the zodiac to Sufi talismans, magical spells, horoscopes, weapons — and Hindu goddesses, drawn as tall slender women in South Indian dress.",
            "It is the earliest landmark of the Deccani painting style, and its astronomical imagery may derive from Ottoman Turkish models, which fits a court that claimed an Ottoman prince as its founder."
          ]
        }
      ]
    },
    {
      h: "The dome that should not stand",
      p: [
        "Muhammad Adil Shah's tomb is a single cube 47.5 m on a side carrying a dome about 44 m across, enclosing roughly 1,700 m² of unobstructed floor — a larger covered space than the Pantheon's.",
        "The engineering is the interest. The dome is not carried on piers or a conventional drum. Eight arches spring from the walls and intersect each other, and the mass of masonry they throw inward acts as a counterweight against the dome's outward thrust. The builders solved the problem by making the building's own weight the bracket. The system is essentially unknown outside Bijapur.",
        "Around the base of the dome runs the Whispering Gallery, where a low sound carries clean around the circumference. No architect is named anywhere in the contemporary record."
      ],
      boxes: [
        {
          kind: "numbers", title: "Gol Gumbaz",
          table: [
            ["Begun / completed", "c. 1626 / 1656"],
            ["Dome, external", "About 44 m across"],
            ["Total height", "60.5 m"],
            ["The cube", "47.5 m on each side"],
            ["Floor enclosed", "About 1,700 m², with nothing holding up the middle"],
            ["Structure", "Eight intersecting arches acting as counterweights"],
            ["Corner towers", "Four, of seven storeys each"]
          ]
        },
        {
          kind: "deep", title: "Eleven echoes?",
          body: [
            "Guidebooks and heritage sites agree that a whisper carries some thirty-seven to forty metres across the gallery and that a clap returns up to eleven times over about six seconds.",
            "The numbers are not in the technical literature, and visitors in practice usually count about seven clear repetitions. The effect is entirely real; the arithmetic around it is folklore.",
            "The same caution applies to the local claim that the Ibrahim Rauza inspired the Taj Mahal. The chronology allows it — the Rauza was completed in 1626–27, the Taj begun in 1632 — but nothing evidences it."
          ]
        }
      ]
    },
    {
      h: "Water in a rain shadow",
      p: [
        "Bijapur sits in semi-arid country, and the Adil Shahis built the most sophisticated urban hydraulics in the sixteenth-century Deccan to solve it: Persian-derived <em>karez</em> tunnels tapping groundwater and running it into the city by gravity, a dam at Torvi collecting rainwater, the Begum Talab reservoir two miles south, and terracotta pipes carrying its water nearly five kilometres in.",
        "Pressure through the network was managed by masonry water towers called <em>ganj</em>, one of which still carries its dated Persian inscription. And where the water arrived, they built stepwells worth looking at: the Taj Bawadi of 1620, fifty-two feet deep, with octagonal towers beside it holding rooms where travellers slept."
      ]
    },
    {
      h: "The tiger claws, and the end",
      p: [
        "In 1659 Bijapur sent Afzal Khan to finish the young Maratha chief Shivaji. He came with something like twelve thousand horse, ten thousand foot, elephants and eighty guns. Shivaji drew him into the Sahyadri hills below Pratapgad and agreed terms: both unarmed, one attendant each.",
        "What happened in the embrace depends entirely on which chronicle you read. The Marathi accounts say Afzal Khan struck first with a concealed dagger, and that Shivaji — in hidden mail — disembowelled him with the <em>wagh nakh</em>, hooked blades worn across the knuckles. The Persian accounts say it was a straightforward assassination under flag of parley. There is no neutral witness. Shivaji built his enemy a tomb at the foot of the fort, and it is still there, and still contested.",
        "Twenty-six years later Aurangzeb came. Prince Azam Shah invested the city in April 1685 with some fifty thousand men; the walls, the moat and Malik-e-Maidan held; Sambhaji's Marathas cut the Mughal supply lines. Aurangzeb arrived himself in July 1686 with reinforcements bringing the total near a hundred thousand.",
        "There was no storm. There was hunger. Bijapur capitulated on 12 September 1686, and Sikandar Adil Shah was brought before the emperor in silver chains. Famine and then cholera followed; a census in 1690 found the population halved. The last sultan died at Daulatabad in 1700."
      ]
    }
  ],

  boxes: [
    {
      kind: "legend", title: "The tomb whose shadow was too ambitious",
      body: [
        "Bara Kaman — 'twelve arches' — was begun by Ali Adil Shah II in 1672 and got two of them up. Bijapur tells two stories about why.",
        "One: work was stopped because the finished building's shadow would have fallen across the Gol Gumbaz. Two: the sultan was killed by his own father, who would not allow his tomb to be eclipsed.",
        "The second is impossible — Muhammad Adil Shah died in 1656, sixteen years before the building was started. Both are folklore. What is real is the site itself: two enormous arches standing over open graves, the most affecting ruin in the city precisely because it never got finished."
      ]
    },
    {
      kind: "know", title: "Malik-e-Maidan, Lord of the Battlefield",
      body: [
        "Cast in bell metal in 1549 by the Turkish founder Muhammad bin Husain Rumi — and cast for Ahmadnagar, not for Bijapur, which took it as a prize.",
        "It weighs about fifty-five tons, is 4.45 m long, and has a muzzle bore of 700 mm cast as a lion's head with its jaws open around an elephant: the standard Deccani emblem of one sultanate devouring another. It carries three inscriptions — two from the casting, and a third that Aurangzeb added after 1686.",
        "Local lore says the barrel stays cool in full sun and that the gunners plugged their ears and dived into a water tank before firing. It was still killing Mughals on the siege lines in 1685."
      ]
    }
  ],

  quote: {
    text: "Ibrahim the tanpurawala became learned due to grace of god, living in the city of Vidyanagari.",
    cite: "Ibrahim Adil Shah II, Kitab-i Nauras"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "An oval of walls about ten kilometres round with ninety-six bastions, an inner citadel at the centre, and the two great tombs facing each other across the whole city — Gol Gumbaz outside the east wall, Ibrahim Rauza outside the west.",
    features:
      '<ellipse class="cm-feature" cx="450" cy="270" rx="300" ry="180"/>' +
      '<ellipse class="cm-feature" cx="450" cy="270" rx="286" ry="167" stroke-dasharray="3 6"/>' +
      '<ellipse class="cm-feature" cx="440" cy="272" rx="96" ry="72"/>' +
      '<text class="cm-label" x="450" y="72" text-anchor="middle">THE CITY WALL · 96 BASTIONS</text>' +
      '<text class="cm-label" x="440" y="200" text-anchor="middle">THE CITADEL</text>' +
      '<ellipse class="cm-water" cx="470" cy="486" rx="66" ry="20"/>',
    sites: [
      { x: 786, y: 262, labelDx: -30, name: "Gol Gumbaz", date: "1626–1656", img: "images/gol-gumbaz.jpg",
        blurb: "The largest single chamber in the world when it was finished, roofed by a dome forty-four metres across that is held up by eight arches leaning against each other. Whisper at the gallery and the dome answers." },
      { x: 118, y: 270, labelDx: 30, name: "Ibrahim Rauza", date: "completed 1626–27", img: "images/ibrahim-rauza.jpg",
        blurb: "A tomb and a mosque facing each other on one plinth, commissioned by Taj Sultana for her husband. Carved jali screens like textile, and a stone lotus hanging from a stone chain, each cut from a single block." },
      { x: 556, y: 348, labelDy: 24, name: "Jama Masjid", date: "begun 1576", img: "images/jama-masjid-bijapur.jpg",
        blurb: "Never finished — the twin minarets stop at the buttresses. Its gilded mihrab is compared to Córdoba's, and Aurangzeb had the floor ruled into 2,250 rectangles, one for each worshipper." },
      { x: 412, y: 258, labelDx: -22, name: "Gagan Mahal", date: "c. 1561", img: "images/gagan-mahal.jpg",
        blurb: "The Sky Palace: a durbar hall whose central arch spans over sixty feet, now open to the weather. Traditionally the room where Sikandar Adil Shah was brought before Aurangzeb in silver chains." },
      { x: 470, y: 300, labelDy: 22, name: "Sat Manzil", date: "mid-17th c.",
        blurb: "The stump of Muhammad Adil Shah's seven-storey pleasure tower inside the citadel — the vertical counterpart to his horizontal masterpiece across town." },
      { x: 596, y: 240, labelDy: -14, name: "Asar Mahal", date: "1646", img: "images/asar-mahal.jpg",
        blurb: "Built as a hall of justice and turned into a reliquary when two hairs from the Prophet's beard were installed in it, with a water tank in front and painted panels inside." },
      { x: 476, y: 176, labelDy: -14, name: "Bara Kaman", date: "begun 1672", img: "images/bara-kaman.jpg",
        blurb: "Two arches of a planned twelve, standing over open graves. The most affecting thing in Bijapur, and the only one that owes its power entirely to being unfinished." },
      { x: 168, y: 356, name: "Malik-e-Maidan", date: "gun cast 1549", img: "images/malik-e-maidan.jpg",
        blurb: "Fifty-five tons of bell metal on the western wall, its muzzle a lion swallowing an elephant. Cast for Ahmadnagar, captured by Bijapur, inscribed by Aurangzeb." },
      { x: 202, y: 190, labelDx: 22, name: "Upli Buruj", date: "16th c.",
        blurb: "A round watchtower twenty-four metres high, climbed by steps that spiral up the outside of it, with two heavy guns on the platform at the top." },
      { x: 760, y: 380, name: "Taj Bawadi", date: "1620",
        blurb: "The largest stepwell of the sultanate, fifty-two feet deep, built by Ibrahim II for his wife — with octagonal towers alongside holding rooms where travellers could sleep." },
      { x: 470, y: 486, labelDy: 22, name: "Begum Talab", date: "1651",
        blurb: "The reservoir two miles south that fed the city through nearly five kilometres of terracotta pipe, its pressure regulated by masonry water towers along the line." },
      { x: 156, y: 122, labelDx: 24, name: "Nauraspur", date: "c. 1599",
        blurb: "Ibrahim II's township of music, founded to give the <i>Kitab-i Nauras</i> somewhere to live. Left unfinished, sacked in the Mughal incursions, and now a field with a palace temple in it." }
    ]
  }
},

/* ====================================================================== 7 */
{
  id: "golconda",
  n: 7,
  x: 466, y: 378,
  name: "Golconda",
  alt: "Golla konda — the shepherd's hill",
  era: "Qutb Shahi seat from c. 1501 · fell 1687",
  img: "images/golconda.jpg",

  glance: [
    ["The hill", "A granite mass about 120 m above a flat plain"],
    ["Inner wall", "About 5 km round; outer wall about 10 km"],
    ["Bastions / gates", "87 semicircular bastions; 8 gateways"],
    ["Diamonds", "The world's only fine source for some 2,000 years"],
    ["Crown's cut", "2% of sales — and every stone above 10 carats"],
    ["Fell", "21 September 1687, after eight months"]
  ],

  intro: "For two thousand years, until Brazil, every fine diamond in the world came from this region — the Koh-i-Nur, the Hope, the Regent, the Orlov, the Darya-i-Nur. Golconda was the fort that sat on the trade. It took the Mughals eight months, a hundred siege guns, three mines of 37,000 pounds each and finally a bribe to get inside it.",

  chapters: [
    {
      h: "The Turkoman who came in from Hamadan",
      p: [
        "Sultan Quli was born near Hamadan in western Persia, of the Qara Qoyunlu — the Black Sheep Turkomans, who had ruled much of Persia and Iraq until their rivals the Aq Qoyunlu, the White Sheep, destroyed them and killed almost all the men of the clan. His family were on the losing side of that catastrophe.",
        "He reached Delhi at the start of the sixteenth century with his uncle Allah-Quli, moved south to Bidar, took service with the Bahmani sultan, and rose fast — winning the title Qutb-ul-Mulk, pillar of the state, and the government of Telangana with the fortress of Golconda, from around 1501. As the Bahmani state dissolved around him he simply kept governing; he stopped reading the Bahmani khutba, and the formal break is usually dated 1518.",
        "He rebuilt the Kakatiya mud fort into a granite citadel and ruled from it for the better part of half a century, before being murdered at prayer in the mosque on his own son's orders."
      ],
      boxes: [
        {
          kind: "deep", title: "Three things about him that are disputed",
          list: [
            "<b>His title.</b> 'Sultan Quli' means <i>servant of the sultan</i>. Historians point out that he never proclaimed kingship at all — the royal style Qutb Shah was taken by his successors, and the word 'Sultan' in his name has been misread as a title for centuries.",
            "<b>His age.</b> The Deccan tradition has him cut down at over ninety, sometimes ninety-nine. Current reference works give his birth as 1485, which would make him fifty-seven. The two cannot both be right, and nothing reconciles them.",
            "<b>His murderer.</b> Ferishta and the <i>Tawarikh-i-Qutb Shahi</i> both name his son Jamsheed. Both were compiled later, under the descendants of Jamsheed's younger brother Ibrahim, who had every reason to blacken him. Even the date is given as either 2 or 4 September 1543."
          ]
        },
        {
          kind: "legend", title: "The shepherd's hill",
          body: [
            "The name is explained by a story: a shepherd boy grazing on the rocky hill found an idol there; word reached the Kakatiya king; a mud fort was raised around the sacred spot. <em>Golla konda</em> — shepherd's hill.",
            "Whatever the truth of the boy, the geology is why the fort exists. The hill is a single granite mass rising about a hundred and twenty metres over flat country, visible for miles and defensible from every side. The first three Qutb Shahs spent about sixty-two years wrapping it in granite."
          ]
        }
      ]
    },
    {
      h: "How the fort worked",
      p: [
        "About five kilometres of granite inner fortification, an outer wall of roughly ten, eighty-seven semicircular bastions, eight gateways and four drawbridges. The Fateh Darwaza on the south-east is studded with iron elephant-spikes; the Bala Hisar gate on the east carries carved lions and griffins — Kakatiya iconography absorbed intact into an Islamic fort.",
        "The celebrated trick is acoustic: a hand-clap under the dome at Fateh Darwaza carries to the Bala Hisar pavilion at the summit, almost a kilometre away and a hundred and twenty metres up. It is repeated by every source and studied rigorously by none, but it works.",
        "The real marvel is water. Rain and reservoir water was caught in rock-cut cisterns, moved through earthenware pipes set into the masonry, and lifted by a chain of Persian wheels from the lower tanks into overhead ones — then distributed downhill by gravity to palaces, roof gardens and fountains at the top of the hill. Tradition says a concealed line drew from Durgam Cheruvu, the 'secret lake' ten kilometres away, chosen because it was nearly unreachable and therefore hard to poison. The water pits doubled as mirrors and as evaporative cooling in summer."
      ]
    },
    {
      h: "The diamonds",
      p: [
        "Until Brazil in the 1720s, India was effectively the world's only source of fine diamonds, and the Krishna valley was India's. The historic output of the Golconda field is estimated at around ten million carats — about two tonnes — from some twenty-three working mines.",
        "The greatest was Kollur, on the south bank of the Krishna some two hundred kilometres south-east of the fort: alluvial workings a kilometre and a half long, discovered around 1619 and exhausted by about 1830. William Methwold in 1621 found twenty to thirty thousand people there; at peak the workings held sixty thousand men, women and children, in a settlement of perhaps a hundred thousand. Unshored pit walls collapsed after heavy rain and killed dozens at a time, and many workers were paid in food rather than money.",
        "The state's cut was simple and devastating: two per cent of all sales, and every stone above ten carats reserved to the crown. That single rule converted a vast labour-intensive industry directly into royal treasure, and it is why 'Golconda' became a synonym in English for an inexhaustible source of wealth.",
        "Jean-Baptiste Tavernier, a French gem merchant, made six voyages to India between 1631 and 1668 and left the densest surviving account of the mines and the court gems. He saw the Great Mogul diamond in Aurangzeb's treasury in 1665 and thought it like half of a pigeon's egg. He bought a blue stone of 112 carats that he described as a beautiful violet, and sold it to Louis XIV; recut as the French Blue, stolen in 1792 and recut again, it is now the Hope Diamond."
      ],
      boxes: [
        {
          kind: "numbers", title: "Stones from these mines",
          table: [
            ["Koh-i-Nur", "Now 105.6 ct — cut down from 186, itself from 793"],
            ["Hope", "45.52 ct, Smithsonian — once Tavernier's violet stone"],
            ["Regent / Pitt", "Found at Kollur c. 1698–1701; the Louvre"],
            ["Orlov", "Kremlin Armoury"],
            ["Darya-i-Nur, Noor-ol-Ain", "Iranian crown jewels"],
            ["Princie, 34.65 ct pink", "Once the Nizams'; sold 2013 for US$39.3 m"],
            ["Lost", "The Florentine, the Akbar Shah, the Great Mogul — and the Nizam Diamond, missing from Hyderabad after 1948"]
          ]
        },
        {
          kind: "know", title: "The rest of the economy",
          body: [
            "Diamonds are the story, but land tax was the base revenue, and Masulipatnam on the Coromandel coast was the kingdom's ocean gate — for stones and, more steadily, for painted cotton.",
            "Methwold reported traders tripling their investment selling Masulipatnam cloth at Bantam and doubling it at Siam. The kingdom's financial peak was the 1620s and 1630s.",
            "By Abul Hasan's time one tradition claimed a treasury of fifty crores and five lakhs of <i>hons</i>, which is chronicle hyperbole — but the figures the Mughals actually recorded carrying away in 1687 are large enough to make the point."
          ]
        }
      ]
    },
    {
      h: "1687: eight months, and an opened gate",
      p: [
        "Aurangzeb's demands included territory, a lump sum, and the dismissal of Golconda's Brahmin ministers Madanna and Akkanna — whom the kingdom's own nobles then assassinated in March 1686, which did not save it.",
        "The siege ran from 28 January to 21 September 1687. The Mughals brought around fifty thousand infantry, a comparable cavalry and about a hundred siege guns, including one throwing a 33-kilogram shot. Three mines were driven under the walls, each packed with thirty-seven thousand pounds of powder; the first two backfired, each killing more than a thousand Mughal soldiers. Golconda's counter-battery fire killed one of the emperor's veteran commanders.",
        "None of it worked. What worked was money: on 21 September a Golconda noble opened a postern. The sources cannot agree whether he was Abdullah Khan Panni or Sarandaz Khan.",
        "Abul Hasan Tana Shah met the end better than anyone else in this history. He went into his harem to take leave, came out, sat on his throne, ordered breakfast served as the imperial troops entered, greeted their commander courteously, and rode out to lifelong imprisonment at Daulatabad, where he died in 1699."
      ],
      boxes: [
        {
          kind: "know", title: "Abdur Razzak Lari — the loyalty Aurangzeb admired",
          body: [
            "Golconda's general refused every Mughal offer, tearing up the emperor's letter in front of his men, and when the gate was opened he charged alone into the victorious army.",
            "He was found next morning under a coconut tree with something like seventy wounds and one eye destroyed. Aurangzeb sent his own surgeons and, by report, said that if Abul Hasan had had one more servant like him the fortress would have taken far longer.",
            "Offered rank and pardon on recovery, he refused while his master lived a prisoner: no one who had eaten Abul Hasan's salt, he said, could serve the man who had destroyed him. He took service only a year later."
          ]
        },
        {
          kind: "legend", title: "The dog on the wall",
          body: [
            "Hyderabad says that one night's escalade failed because a dog began barking on the rampart and woke the garrison, and that the dog was afterwards kept on a gold chain.",
            "It is told everywhere locally and appears in none of the standard sources. Enjoy it accordingly."
          ]
        }
      ]
    }
  ],

  boxes: [
    {
      kind: "legend", title: "The tunnel to the Charminar",
      body: [
        "The most persistent legend in Hyderabad is a secret passage running the eleven kilometres from Golconda to the Charminar, patrolled by mounted soldiers, built as a royal escape route.",
        "The Archaeological Survey excavated in 2019 and the trail died within a short distance. The historian Mohammed Safiullah puts it plainly: this is plateau country, and a tunnel of that length is not buildable here.",
        "Old chambers and cellars keep turning up, which keeps the story alive. A related treasure hunt near the state secretariat in 2012, chasing rumoured jewels worth twenty thousand crore in a tunnel under a school, found nothing."
      ]
    }
  ],

  quote: {
    text: "The jewellers sell publicly in the bazaars pearls, rubies, emeralds and diamonds.",
    cite: "Abdur Razzaq, of a Deccan bazaar — a sentence only this region could produce"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "The granite hill with its ring of walls, the necropolis in its garden a kilometre north-west outside the Banjara gate, and the diamond country far to the south-east — off this plan, two hundred kilometres away on the Krishna.",
    features:
      '<ellipse class="cm-feature" cx="420" cy="280" rx="250" ry="170"/>' +
      '<ellipse class="cm-feature" cx="420" cy="280" rx="160" ry="112"/>' +
      '<ellipse class="cm-feature" cx="420" cy="270" rx="72" ry="52"/>' +
      '<text class="cm-label" x="420" y="86" text-anchor="middle">THE OUTER WALL · 87 BASTIONS</text>' +
      '<path class="cm-feature" d="M560 400 C660 420 720 430 830 424" stroke-dasharray="5 7"/>' +
      '<text class="cm-label" x="740" y="452">TO THE CITY, 11 KM</text>',
    sites: [
      { x: 420, y: 270, name: "Bala Hisar", date: "16th c.", img: "images/golconda.jpg",
        blurb: "The summit pavilion, a hundred and twenty metres up — the acoustic terminus of the clap at the Fateh gate, and the highest point of the kingdom's authority." },
      { x: 542, y: 358, labelDx: 20, name: "Fateh Darwaza", date: "16th c.", img: "images/fateh-darwaza.jpg",
        blurb: "The Victory Gate on the south-east, studded with iron spikes at elephant-head height. Clap under its dome and the sound reaches the summit almost a kilometre away." },
      { x: 300, y: 340, labelDx: -24, name: "Bala Hisar Darwaza", date: "16th c.",
        blurb: "The main eastern entrance, its arch carved with lions and griffins — Kakatiya iconography left standing inside a Qutb Shahi fort." },
      { x: 384, y: 214, labelDy: -14, name: "Jama Masjid", date: "1518",
        blurb: "Sultan Quli's mosque on the ascent — by tradition the place where he was cut down at prayer in 1543, on the orders of his own son." },
      { x: 466, y: 216, labelDx: 24, labelDy: -14, name: "The durbar halls", date: "16th–17th c.",
        blurb: "Where the diamond trade was regulated: two per cent of every sale to the crown, and every stone over ten carats surrendered to it." },
      { x: 356, y: 300, labelDx: -18, name: "The water system", date: "16th c.",
        blurb: "Rock-cut cisterns, clay pipes set into the masonry, and a chain of Persian wheels lifting water to overhead tanks — which is how there were fountains and roof gardens on top of a bare granite hill." },
      { x: 190, y: 176, name: "Qutb Shahi tombs", date: "1543–1672", img: "images/qutb-shahi-tombs.jpg",
        blurb: "Seven royal domes on black basalt in a walled garden of the dead, outside the Banjara gate. They were once faced in blue and green tile; a few pieces remain." },
      { x: 104, y: 258, labelDx: 22, labelDy: 22, name: "The mortuary bath", date: "16th c.",
        blurb: "Inside the necropolis: the hammam where the kings were washed before burial, called one of the finest surviving specimens of its kind anywhere." },
      { x: 292, y: 258, labelDy: 22, name: "Hayat Bakshi Begum's mosque", date: "1666", img: "images/hayat-bakshi-mosque.jpg",
        blurb: "Fifteen cupolas and twin minarets, built for the dynasty's great dowager — daughter, wife and mother of sultans, and effectively its regent." },
      { x: 640, y: 172, name: "Taramati Baradari", date: "17th c.", img: "images/taramati-baradari.jpg",
        blurb: "A twelve-arched pavilion on a hillock west of the city. Legend says the courtesan Taramati sang here and Abdullah Qutb Shah heard her two kilometres away at the fort; she is at least genuinely buried in the royal necropolis." },
      { x: 748, y: 268, labelDx: -14, name: "Purana Pul", date: "1578", img: "images/purana-pul.jpg",
        blurb: "Twenty-two granite arches across the Musi, six hundred feet long — the first bridge, built before the new city existed, and in 1908 the only one left standing." }
    ]
  }
},

/* ====================================================================== 8 */
{
  id: "hyderabad",
  n: 8,
  x: 515, y: 420, labelDx: 12,
  name: "Hyderabad",
  alt: "The city on the Musi",
  era: "Founded 1591 · Asaf Jahi capital 1763 – 1948",
  img: "images/charminar.jpg",

  glance: [
    ["Founded", "1591, by Muhammad Quli Qutb Shah"],
    ["The Charminar", "56 m tall; minarets 48.7 m; about 14,000 tonnes"],
    ["Asaf Jahi capital from", "1763, under Nizam Ali Khan"],
    ["The state in 1941", "214,187 km²; 16.3 million people"],
    ["The flood of 1908", "17 inches of rain; c. 15,000 dead"],
    ["Ended", "17 September 1948"]
  ],

  intro: "A planned city laid out on a grid on the south bank of a small river, because the fortress had run out of water. Four centuries later it was the capital of the largest princely state in India, ruled by a man on the cover of TIME as the richest in the world, with its own currency, its own railway, its own army and its own airline.",

  chapters: [
    {
      h: "1591: the city on the river",
      p: [
        "Golconda was full. Water was short on the granite and epidemic disease swept the crowded fort periodically. In 1591 Muhammad Quli Qutb Shah, fifth of his line, laid out a new city five miles east on the south bank of the Musi — a planned gridiron with a great ceremonial crossing at its heart, designed with his minister Mir Momin Astarabadi.",
        "At the crossing he raised the Charminar: four arches and four minarets of 48.7 m, on a square base of 20 m, with a mosque of forty-five prayer spaces on the top floor and a cistern and fountain below. North of it went the Char Kaman, four gateways on the cardinal axes with the Gulzar Houz fountain at their crossing; nearby the Badshahi Ashurkhana, whose tilework was finished in 1611; and eventually the enormous Mecca Masjid, begun 1614 and not completed until 1694 — seventy-seven years, and by then under Aurangzeb.",
        "The founder was a poet as well as a planner. He wrote in Persian, Telugu and Dakhni, and his collected verse runs past eighteen hundred pages — one of the earliest substantial <em>divans</em> in the language that became Urdu. His ghazals are still sung at Hyderabadi weddings. His prayer at the foundation was: make my city full of people, as you keep the river full of fish."
      ],
      boxes: [
        {
          kind: "legend", title: "Bhagmati, and the name of the city",
          body: [
            "Everyone in Hyderabad knows the story: the young prince rode nightly across the Musi to the village of Chichlam to see a dancer named Bhagmati — the Purana Pul of 1578 built for those crossings — and when he became king he built the city for her and called it Bhagnagar, renaming it Hyderabad after she took the title Hyder Mahal.",
            "Scholars split three ways. Some hold she never existed: there are no manuscripts, miniatures, inscriptions, coins or graves of the period attributable to her, and a favourite queen would have had a grand tomb, which does not exist. Others accept her but derive Bhagnagar from <em>bhag</em> or <em>bhagya</em> — garden, or good fortune. Others tell it as it is told.",
            "The rival explanation of the present name is simply pious: <em>Haydar</em> is a title of Ali, making Hyderabad the lion's city. Both stories are still told, often in the same breath."
          ]
        },
        {
          kind: "deep", title: "Why the Charminar?",
          body: [
            "The Archaeological Survey states that it is widely accepted the monument commemorates the end of a plague — that the sultan prayed for deliverance and built where he prayed.",
            "The competing reading makes it the ceremonial centrepiece of a planned city, marking the crossing of its two principal axes. A third ties it to the turn of the Islamic millennium, 1000 AH.",
            "All three may be true at once. It would not be the only monument in this history that was town planning and prayer in the same act. A minaret was struck by lightning in 1670 and repaired for about 58,000 rupees; the clock faces went up in 1889."
          ]
        }
      ]
    },
    {
      h: "The Mughal century, and the man who walked away",
      p: [
        "After 1687 Golconda became a Mughal province, and Aurangzeb spent the next twenty years chasing Marathas across a countryside his own armies had wrecked. He died at Ahmadnagar in 1707 and was buried at Khuldabad in an open grave, roofless by his own instruction, paid for out of money he had earned copying the Quran.",
        "Delhi then devoured eight emperors in seventeen years, with king-makers raising and blinding and strangling them in turn. Through all of it Chin Qilich Khan, Nizam-ul-Mulk, viceroy of the Deccan, refused to play. He took the office of Vizier when it was pressed on him, found it unworkable, and left for the south.",
        "In 1724 the court sent an army to remove him. He destroyed it at Shakar Kheda and made himself master of the Deccan, and Delhi — having no alternative — sent him the title Asaf Jah and its congratulations. His grandson Nizam Ali Khan moved the capital from Aurangabad to Hyderabad in 1763, which is why this city is a capital and not a Qutb Shahi relic."
      ],
      boxes: [
        {
          kind: "know", title: "What he said to Nadir Shah",
          body: [
            "In 1739 the Persian conqueror Nadir Shah sacked Delhi and ordered a massacre in its streets. Asaf Jah is reported to have gone to him and said: you have taken thousands of lives; if you wish to continue, bring the dead back to life and kill them again.",
            "The massacre was stopped. His judgement about his own neighbours was equally unsentimental — the ruler of the Deccan who wants safety and prosperity, he wrote, must have peace with the Marathas, who are the landholders of this region."
          ]
        }
      ]
    },
    {
      h: "The Europeans, and the price of an army",
      p: [
        "Asaf Jah's death in 1748 opened a succession war that the French and English turned into their own contest. The Marquis de Bussy commanded a French corps of a few hundred Europeans and some thousands of trained sepoys and beat Maratha armies many times its size — and was paid in land, the Northern Circars, four hundred and seventy miles of coast. When he was recalled the Nizam wept in open durbar and called him the guardian angel of his fortune.",
        "What Bussy demonstrated was the <em>subsidiary force</em>: a small, permanently paid, European-officered army stationed inside an Indian state, funded by that state's own revenue and answerable to a foreign power. Dupleix invented it; the British perfected it; Hyderabad is where it was proved.",
        "Michel Raymond, a Gascon, later built the Nizam a European-drilled army of some fourteen thousand men with its own foundry and powder mills, and was loved enough that Hindus and Muslims called him Musa Ram and Moosa Rahim. To Lord Wellesley, in a year when Bonaparte was in Egypt, this was intolerable. Raymond died in March 1798; under the treaty of September the corps was dissolved, and on 22 October British battalions surrounded the lines and the sepoys laid down their arms without a shot. Hyderabad became the first Indian state to accept a fully defined subsidiary alliance.",
        "Its troops then marched with the British to Seringapatam in 1799, and stood beside Arthur Wellesley at Assaye in 1803 — nine and a half thousand men against perhaps fifty thousand, which Wellington called, long after Waterloo, the bloodiest action for the numbers he ever saw."
      ],
      boxes: [
        {
          kind: "numbers", title: "Berar: the arithmetic of a grievance",
          table: [
            ["Contingent cost", "About ₹40 lakh a year — roughly a third of state revenue"],
            ["What the treaty required", "15,000 troops <i>in war</i> — not a standing force in peace"],
            ["Cost once the British ran it", "About ₹24 lakh, with no loss of efficiency"],
            ["Cantonment excise withheld", "About ₹1 lakh a year, for 41 years"],
            ["Assigned as security", "1853, under an ultimatum from Dalhousie"],
            ["Leased in perpetuity", "5 November 1902, at 25 lakh a year"],
            ["Returned", "Never"]
          ]
        },
        {
          kind: "deep", title: "Gribble's own campaign",
          body: [
            "The author of the history this site is built on spent a decade on the Berar question. His articles in <em>The Pioneer</em> and the <em>Nineteenth Century</em> put it before the British public and led eventually to a debate in Parliament.",
            "His case was that the debt Berar had been taken to secure was largely fictitious: the British had for forty years pocketed the excise revenue of the Secunderabad and Jalna cantonments, money later admitted to be the Nizam's, which over that period roughly equalled the sum claimed. The Resident of the day, Colonel Davidson, wrote that if the two governments' accounts had been dealt with impartially, 'we had no just claim on the Nizam'.",
            "Volume II of Gribble's history breaks off unfinished in the middle of that argument. He died before he could complete the chapter."
          ]
        }
      ]
    },
    {
      h: "Salar Jung",
      p: [
        "He became minister at twenty-four and held the office thirty years. He inherited a state with no district courts, no police force, and a revenue system in which talukas were auctioned to contractors who lived in the capital and sent deputies to squeeze the districts — deputies replaced so often that a new one was said to ride facing his horse's tail, to see who was coming to displace him. Villages had emptied and land had gone out of cultivation.",
        "His first and greatest reform was to abolish revenue farming outright and settle the land directly with the cultivator at a fixed assessment. Then he built the machinery: five subahs and seventeen districts, a treasury, a police force, courts and magistrates in the mofussil, customs and salt services, schools in every taluka, a medical school, a central mint replacing the district ones, the railway from Wadi. Revenue roughly trebled in thirty years and deserted villages were reoccupied.",
        "He also held Hyderabad in 1857 — the year the saying went round British India that if the Nizam goes, all goes. Placards appeared on the city walls; a crowd raised the green standard at the Mecca Masjid and moved on the Residency, and was met with grapeshot from the ramparts and the minister's Arab troops at the gates. In 1860 the British cancelled the debt and returned Raichur, the Doab and Shorapur. They kept Berar.",
        "He died of cholera in a single night in February 1883, at fifty-four, after a day spent hosting a visiting Grand Duke. The Nizam broke down in open durbar; Arabs and Rohillas walked weeping in the procession; the crowd stripped his grave of its flowers to keep something of him."
      ]
    },
    {
      h: "28 September 1908: the flood",
      p: [
        "Seventeen inches of rain fell in about thirty-six hours. The first warning came at two in the morning when water topped the Purana Pul; a cloudburst followed at six. The Musi — normally a modest stream — rose through the old city in the dark. Three of the bridges were washed away; more than eighty thousand houses went; a quarter of the population was made homeless; the toll is usually given as around fifteen thousand.",
        "A tamarind tree in the grounds of what is now Osmania General Hospital held about a hundred and fifty people in its branches for more than twelve hours. Among them was the Urdu poet Amjad Hyderabadi, who lost his entire family that night and afterwards wrote <em>Qayamat-e-Soghra</em>, the lesser apocalypse. A plaque at the tree reads: this tree saved 150 lives.",
        "What makes 1908 a turning point rather than only a disaster is the response. The Nizam brought in the engineer M. Visvesvaraya, whose report concluded that the city's safety had to come from storage above it. Out of that came Osman Sagar in 1920 and Himayat Sagar in 1927 — reservoirs that both controlled the river and supplied the city's drinking water for generations — and the City Improvement Board that shaped modern Hyderabad."
      ]
    },
    {
      h: "The richest man in the world",
      p: [
        "Mir Osman Ali Khan, seventh and last Nizam, appeared on the cover of TIME in February 1937 as the richest man on earth. The Jacob diamond — 184.75 carats, roughly twice the Koh-i-Nur — was found in the toe of his father's slipper and used, the story goes, as a paperweight. Contemporary estimates put his fortune around two billion dollars, something like two per cent of American GDP at the time.",
        "The frugality alongside it became legend: unironed cotton, socks he knitted himself, a tin plate, the cheapest local cigarettes, guests offered a single biscuit with their tea. He also gave Elizabeth II a diamond tiara and a three-hundred-diamond necklace as a wedding present in 1947, which she wore for the rest of her life.",
        "What he spent on is still standing. Osmania University — founded by firman in 1917 and teaching from 1918 as the first Indian university to teach in an Indian language, with a translation bureau created to produce the textbooks that did not yet exist — with its Arts College modelled on the mosque-college of Sultan Hassan in Cairo. The High Court, the Osmania General Hospital, the City College and Kachiguda station by Vincent Esch; the State Central Library; Moazzam Jahi Market; the Nizamia Observatory; Jubilee Hall. Esch called his idiom 'purist classic with a refined suggestion of Indian character in the beautiful carved brackets'.",
        "And the state itself: its own currency, its own stamps, its own railway, its own army, its own airline. Up to eleven per cent of the budget went on education. His donations crossed every line — a million rupees to Banaras Hindu University, half a million to Aligarh, restoration money for the Ramappa temple, an annual grant to the Golden Temple, funds for Al-Aqsa."
      ]
    },
    {
      h: "1948",
      p: [
        "Hyderabad did not accede at Partition. It signed a Standstill Agreement, sought to remain independent, and its politics slid out of the Nizam's hands: the Razakar militia under Qasim Razvi — perhaps two hundred thousand irregulars, only about a quarter with modern firearms — terrorised the countryside, while a communist-led peasant revolt burned through Telangana against the landlords.",
        "The Indian Army moved on 13 September 1948. Thirty-five thousand troops crossed at four in the morning against a state force of twenty-two thousand of whom about six thousand were fully trained and equipped. It lasted five days. On the 17th the Nizam announced a ceasefire and went on radio to accept accession; the armoured column entered Hyderabad the next afternoon. Indian losses were fewer than ten killed.",
        "The violence that followed was far worse than the operation. The Government of India appointed a committee under Pandit Sunderlal to investigate the communal killings across the districts. Its own conservative estimate was twenty-seven to forty thousand dead, while recording that responsible observers put the figure at two hundred thousand or higher. It found that troops disarmed Muslim villagers while Hindus often kept their weapons, and that in several places armed forces brought Muslim men out of villages and killed them in cold blood. The report was suppressed and became public only around fifty years later. Patel disowned its conclusions.",
        "The Nizam served as Rajpramukh until the states were reorganised in 1956. When he died in 1967 the funeral drew an estimated million people. With his accession, the last living fragment of the world in this history — the Deccan as a sovereign country, in a line running back through the Asaf Jahs and the Qutb Shahs and the Bahmanis to the man crowned at Daulatabad in 1347 — came to an end."
      ],
      boxes: [
        {
          kind: "deep", title: "The numbers that are still argued about",
          list: [
            "<b>1948 civilian deaths:</b> 27,000–40,000 by the Sunderlal committee's own conservative estimate; 200,000 or higher according to the 'responsible observers' the same report cites. It remains one of the least-taught episodes in modern Indian history.",
            "<b>The 1908 flood:</b> about 15,000 is standard, but a figure of 50,000 appears in some of the same sources.",
            "<b>The last Nizam's wealth:</b> about US$2 billion contemporary — against press figures of $230 billion, which are inflation-adjusted guesswork.",
            "<b>The Nizam's jewels:</b> bought by the Government of India in 1995 for ₹218 crore, a figure often misreported as ₹71 crore. They include nearly 2,000 carats of emeralds, over 40,000 chows of pearls, and the Jacob diamond."
          ]
        }
      ]
    }
  ],

  boxes: [
    {
      kind: "know", title: "Why a landlocked city is the City of Pearls",
      body: [
        "No oyster has ever been within four hundred kilometres of Hyderabad. What the city does is the rest of the trade: sorting, drilling, stringing and polishing, on stones brought by Arab routes from Bahrain and Basra, under Qutb Shahi and then Asaf Jahi patronage — a business over four centuries old.",
        "The village of Chandanpet outside the city is given over almost entirely to pearl drilling. The last Nizam's own collection was heavy in Basra pearls.",
        "The same logic runs through the city's other imports. Haleem arrived with the Hadhrami Arab soldiers the Nizams recruited from Yemen, who settled at Barkas; it started as the Arabic <em>harees</em> and acquired lentils, fried onions and garam masala on the way. It now holds a GI tag with a defined meat-to-wheat ratio."
      ]
    },
    {
      kind: "legend", title: "The Nizam who cured snakebite",
      body: [
        "The sixth Nizam, Mahbub Ali Khan, was believed to hold spiritual power against snakebite, and issued orders that any member of the public who was bitten could approach him directly.",
        "He was routinely woken in the night to treat them. Whatever one makes of the cure, the standing order is documented — which makes this the rare legend with an administrative record attached."
      ]
    }
  ],

  quote: {
    text: "Make my city full of people, like you keep the river full of fish.",
    cite: "Muhammad Quli Qutb Shah, at the founding of Hyderabad, 1591"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "The Musi runs west to east across the middle. The Qutb Shahi city is south of it around the Charminar; the Asaf Jahi palaces spread south and west; and the great public buildings of the last Nizam line the north bank at Afzalgunj.",
    features:
      '<path class="cm-river" d="M20 250 C160 230 300 268 450 254 C600 240 740 272 880 250"/>' +
      '<text class="cm-label" x="60" y="236">THE MUSI</text>' +
      '<path class="cm-feature" d="M450 300 L450 470" stroke-dasharray="4 6"/>' +
      '<path class="cm-feature" d="M300 330 L640 330" stroke-dasharray="4 6"/>' +
      '<text class="cm-label" x="640" y="360">THE GRID OF 1591</text>' +
      '<ellipse class="cm-water" cx="620" cy="96" rx="86" ry="34"/>' +
      '<text class="cm-label" x="620" y="52" text-anchor="middle">HUSSAIN SAGAR</text>',
    sites: [
      { x: 450, y: 330, name: "Charminar", date: "1589–1591", img: "images/charminar.jpg",
        blurb: "Four arches and four minarets of 48.7 m at the crossing of the new city's two main axes, with a mosque on the top floor. Fourteen thousand tonnes of granite, limestone and pulverised marble, on foundations at least thirty feet deep." },
      { x: 390, y: 372, labelDx: -22, name: "Mecca Masjid", date: "1614–1694", img: "images/mecca-masjid.jpg",
        blurb: "Seventy-seven years in the building and finished under Aurangzeb: ten thousand worshippers under fifteen arches, its central arch made of bricks fired from earth brought from Mecca. The Asaf Jahi tombs line its courtyard." },
      { x: 450, y: 288, labelDy: -14, name: "Char Kaman", date: "c. 1592", img: "images/char-kaman.jpg",
        blurb: "Four ceremonial arches on the cardinal axes north of the Charminar, with the Gulzar Houz fountain at their crossing — the formal approach to the royal quarter." },
      { x: 540, y: 300, labelDx: 22, name: "Badshahi Ashurkhana", date: "1592; tiles 1611", img: "images/badshahi-ashurkhana.jpg",
        blurb: "The royal Shia mourning hall, and the best Persian tile mosaic in the city — completed under Abdullah Qutb Shah two decades after the building itself." },
      { x: 336, y: 296, labelDx: -20, labelDy: -12, name: "Laad Bazaar", date: "16th c.", img: "images/laad-bazaar.jpg",
        blurb: "The lacquer-and-glass bangle lane running west off the Charminar, and still doing exactly what it was laid out to do four hundred years ago." },
      { x: 386, y: 424, labelDy: 24, name: "Chowmahalla Palace", date: "1750–1880s", img: "images/chowmahalla.jpg",
        blurb: "Four palaces around formal courts, nineteen Belgian crystal chandeliers in the durbar hall, and a clock in the tower that has been ticking since 1750, wound weekly by one family of horologists." },
      { x: 520, y: 424, labelDy: 24, name: "Purani Haveli", date: "refurbished 1777", img: "images/purani-haveli.jpg",
        blurb: "Holds the longest wardrobe in the world: 240 feet on two levels, 124 almirahs, served by a hand-cranked wooden lift." },
      { x: 620, y: 470, name: "Paigah Tombs", date: "from 1787", img: "images/paigah-tombs.jpg",
        blurb: "Marble smothered in polished stucco jali — screens perforated as family trees, mixing Rajasthani, Mughal and Persian geometry. The Paigahs were the only nobles allowed their own army, courts and palaces." },
      { x: 300, y: 470, labelDx: 16, name: "Falaknuma Palace", date: "1884–1893", img: "images/falaknuma.jpg",
        blurb: "Built in the shape of a scorpion, two stings spread as wings, in Italian marble on a hill. Its dining hall seats a hundred and one. The sixth Nizam visited in 1897 and simply stayed; its owner had to give it to him." },
      { x: 356, y: 200, labelDy: -14, name: "Salar Jung Museum", date: "opened 1951", img: "images/salar-jung-museum.jpg",
        blurb: "One man's collection, claimed as the largest in the world: the Veiled Rebecca, whose marble veil reads as translucent; a double statue of Mephistopheles and Margaretta carved from one block, one figure on each side of a mirror; and a musical clock whose small figure still strikes the hour to a crowd." },
      { x: 452, y: 186, labelDy: -14, name: "High Court", date: "1915–1919", img: "images/hyderabad-high-court.jpg",
        blurb: "Vincent Esch's finest: local pink granite with carved red sandstone panels, on the north bank at Afzalgunj, for about twenty lakh rupees." },
      { x: 556, y: 216, labelDy: 24, name: "Osmania Hospital", date: "1918–1921", img: "images/osmania-hospital.jpg",
        blurb: "Facing the High Court across the river. In its grounds stands the tamarind tree that held a hundred and fifty people through the night of the 1908 flood." },
      { x: 660, y: 186, labelDy: -14, name: "State Central Library", date: "1932–1936", img: "images/state-central-library.jpg",
        blurb: "Begun as the Asafia Library in 1891 from one nobleman's collection, and given this building for the Nizam's silver jubilee." },
      { x: 806, y: 122, labelDy: -16, name: "Osmania University", date: "firman 1917",
        blurb: "The first Indian university to teach in an Indian language. Its Arts College, on sixteen hundred acres at Amberpet, is modelled on the mosque-college of Sultan Hassan in Cairo." },
      { x: 232, y: 196, labelDy: -14, name: "British Residency", date: "1803–1806", img: "images/british-residency.jpg",
        blurb: "A Palladian villa by a Madras Engineers lieutenant, near-contemporary with the White House and strikingly like it. Behind it stood the Rang Mahal, where Khair-un-Nissa lived — the Hyderabad marriage that scandalised Calcutta. It is a women's college now." },
      { x: 150, y: 300, labelDx: 24, name: "Purana Pul", date: "1578", img: "images/purana-pul.jpg",
        blurb: "Twenty-two arches, six hundred feet long, fifty-four feet above the bed. Built before the city it leads to, and the only bridge left standing in September 1908." },
      { x: 62, y: 232, labelDx: 30, labelDy: -14, name: "Osman Sagar", date: "1920", img: "images/osman-sagar.jpg",
        blurb: "The answer to 1908: a dam ten miles upstream, built on Visvesvaraya's advice so that the city's safety would come from storage above it. Himayat Sagar followed on the tributary in 1927, and between them they supplied Hyderabad's drinking water for generations." },
      { x: 700, y: 300, labelDy: 24, name: "Kachiguda station", date: "1914", img: "images/kachiguda-station.jpg",
        blurb: "Vincent Esch's first Hyderabad commission and the first building here built entirely of concrete — domes and chajjas in a material that had never carried them before." }
    ]
  }
},

/* ====================================================================== 9 */
{
  id: "ahmednagar",
  n: 9,
  x: 184, y: 244,
  name: "Ahmadnagar",
  alt: "The Nizam Shahi capital",
  era: "Independent 28 May 1490 · annexed 1636",
  img: "images/ahmednagar-fort.jpg",

  glance: [
    ["Independence declared", "28 May 1490"],
    ["City founded", "1494"],
    ["The fort", "Oval, 1.7 km round, 24 bastions"],
    ["The ditch", "18 ft wide, holding 9 ft of water"],
    ["Held out under a queen", "1595, against the Mughals"],
    ["Ended", "1636 — the last sultan imprisoned at Gwalior"]
  ],

  intro: "The most Deccani of the sultanates: founded by the son of a captured Brahmin, defended in a breach by a queen in armour, and kept alive for a quarter-century after its own capital fell by an Ethiopian who had been sold as a child.",

  chapters: [
    {
      h: "A Brahmin's son takes a throne",
      p: [
        "Malik Hasan Bahri was born Tima Bhat, a Brahmin of Pathri in Marathwada, taken captive by Bahmani forces around 1422 and converted. He rose to command Bahmani armies, won the title Nizam-ul-Mulk, was central to the faction that engineered Mahmud Gawan's judicial murder in 1481, became prime minister and effective ruler — and was killed by one of his own nobles at Bidar in 1486.",
        "His son Malik Ahmad beat the royal army in the field and declared independence on 28 May 1490, ruling first from Junnar and founding the city of Ahmadnagar in 1494.",
        "The descent matters. The Nizam Shahis were structurally the Deccani power, drawing on Marathi-speaking military service families — the Bhosales among them — where Bijapur oscillated between local and foreign-born factions. Everything that later becomes Maratha statecraft has roots in this court."
      ]
    },
    {
      h: "Chand Bibi in the breach",
      p: [
        "She was a daughter of Ahmadnagar, queen of Bijapur by marriage, and regent of both kingdoms in turn — one of the very few figures respected across the whole quarrelsome Deccan. She was multilingual, a musician and a painter, and she spent ten years holding Bijapur together for a nephew-by-marriage through vicious factional fighting before returning home.",
        "In November 1595 a Mughal army under Prince Murad invested Ahmadnagar and drove five mines under the walls. The starving garrison dug out two of them before they could fire. When a breach was blown, most of the officers prepared to run. Chand Bibi came to the breach in armour with a drawn sword, her veil wound round her waist as a sash, and held it — and the wall was rebuilt behind her while she stood there. The assaults failed; the Mughals withdrew, saluting her as Chand Sultana. She bought the peace on 23 February 1596 by ceding Berar.",
        "Five years later a second army came. Her own mutinous soldiery, told by a traitor that she meant to sell the city, broke into the palace and killed her. Ahmadnagar fell on 18 August 1600 — the first of the five kingdoms to go."
      ],
      boxes: [
        {
          kind: "know", title: "A monument misnamed",
          body: [
            "The handsome three-storey octagonal building on a hilltop thirteen kilometres out that everyone calls Chand Bibi ka Mahal has nothing whatever to do with her. It is the tomb of Salabat Khan II, a minister of this court, with his own and his wife's graves in an octagonal basement under twenty-three metres of building.",
            "The misattribution is old and immovable — a good demonstration of how a strong enough legend simply annexes the nearest impressive ruin. Chand Bibi's own burial place is not securely identified.",
            "The overnight rebuilding of the breach, likewise, is universally repeated and hard to confirm in a scholarly source. The stand in the breach itself is not in doubt."
          ]
        },
        {
          kind: "deep", title: "Meadows Taylor's verdict",
          body: [
            "Colonel Meadows Taylor, the nineteenth-century soldier-novelist who knew the Deccan better than almost any Englishman, put her beside Elizabeth I — an exact contemporary — and thought the comparison flattered neither.",
            "Few in England know, he wrote, that the contemporary of our Queen Elizabeth in the Deccan was a woman of equal ability and equal political talent, who among all the women of India stands out as a jewel without flaw and beyond price."
          ]
        }
      ]
    },
    {
      h: "Malik Ambar",
      p: [
        "He was born in Harar in Ethiopia in 1548 and named Chapu. Sold as a child, trafficked through Yemen to Baghdad, he was bought by a merchant who educated him, converted him and renamed him Ambar; brought to the Deccan, he was bought again by the Habshi peshwa of Ahmadnagar and freed on his master's death.",
        "After the capital fell in 1600 he simply did not accept that the kingdom had. He found a Nizam Shahi prince, put him on a throne, and ran the state himself for twenty-six years. By 1610 his army was ten thousand Habshis and forty thousand Deccanis — the Deccani component overwhelmingly Marathi light cavalry.",
        "He beat the Mughals by refusing to meet them. His horse cut supply lines, emptied the country ahead of imperial armies and struck at the rear — <em>bargi-giri</em>, the mode that Shivaji's generation inherited whole, including the families who learned it in his service.",
        "He was as good an administrator as a general. His revenue settlement — land surveyed, classified by fertility, assessed in cash at fixed rates, with lighter assessment on newly reclaimed land — was modelled on Todar Mal's work for Akbar and outlived the sultanate by two centuries. He founded Khadki, later Aurangabad, and built its water supply.",
        "Jahangir could not defeat him and could not stop writing about him: the black-faced, the cursed fellow, the ill-starred. He had his court artist paint an allegory of himself shooting an arrow through Malik Ambar's severed head mounted on a spear, with an owl perched on it — a picture of a wish, not an event. Ambar died in his bed in May 1626, and the state he had held together collapsed within a decade."
      ],
      boxes: [
        {
          kind: "know", title: "The Habshis of the Deccan",
          body: [
            "Malik Ambar was not a freak of fortune but the peak of a system. East African men — Habshis, Sidis — were brought into the Deccan sultanates as military slaves and, being outsiders with no local kin networks and therefore no local loyalties, were trusted with commands, fortresses and household troops.",
            "Several rose extraordinarily high: ministers, admirals and kingmakers. On the Konkan coast the Sidis of Janjira held an island fortress that neither the Marathas nor the Mughals ever took.",
            "Their descendants remain in Karnataka, Gujarat and Maharashtra today."
          ]
        }
      ]
    },
    {
      h: "The end, and a strange afterlife",
      p: [
        "After Ambar the state came apart. Shahaji Bhosale — Shivaji's father — backed by Bijapur, extracted a boy prince from Mughal custody and enthroned him at Pemgad in 1633, ruling as regent: the last flicker of Nizam Shahi legitimacy, and a rehearsal of the Maratha state to come. Bijapur made its own peace with the Mughals in 1636 and abandoned the cause. The last Nizam Shah was imprisoned for life at Gwalior.",
        "The fort had a long second life. Aurangzeb died just outside it in 1707. Arthur Wellesley stormed it in 1803. And between 1942 and 1945 its inner buildings held Nehru, Maulana Azad, Vallabhbhai Patel and nine other Congress leaders for nearly three years — Nehru wrote <em>The Discovery of India</em> inside these walls."
      ]
    }
  ],

  boxes: [
    {
      kind: "legend", title: "Seventy domes and forty mosques",
      body: [
        "Murtaza Nizam Shah I is said to have retired to the water-palace of Farah Bagh to play chess with a singer from Delhi whom he titled Fateh Shah, and to have built him his own pavilion in the garden.",
        "Tradition holds that between the city and Farah Bagh there once stood seventy domes and forty mosques, holding the tombs of royal favourites. Enough of them survive along that road to make the claim feel less like exaggeration than like an inventory."
      ]
    }
  ],

  quote: {
    text: "Few in England know that the contemporary of our Queen Elizabeth in the Deccan was a woman of equal ability, of equal political talent… who, among all the women of India, stands out as a jewel without flaw and beyond price.",
    cite: "Colonel Meadows Taylor, on Chand Bibi"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "The fort sits east of the town in its flooded ditch; the royal gardens and the necropolis of favourites run south; and the tomb everyone miscalls Chand Bibi's stands on a hill thirteen kilometres out.",
    features:
      '<ellipse class="cm-feature" cx="520" cy="250" rx="150" ry="118"/>' +
      '<ellipse class="cm-feature" cx="520" cy="250" rx="132" ry="100" stroke-dasharray="3 5"/>' +
      '<text class="cm-label" x="520" y="104" text-anchor="middle">THE FORT AND ITS WATER DITCH</text>' +
      '<rect class="cm-feature" x="150" y="180" width="220" height="160" stroke-dasharray="4 7"/>' +
      '<text class="cm-label" x="260" y="168" text-anchor="middle">THE OLD TOWN</text>' +
      '<path class="cm-feature" d="M300 350 C340 420 400 450 470 460" stroke-dasharray="5 7"/>',
    sites: [
      { x: 520, y: 250, name: "Ahmadnagar Fort", date: "stone 1559–63", img: "images/ahmednagar-fort.jpg",
        blurb: "An oval of twenty-four bastions, 1.7 km round, walls rising thirty feet from the bottom of a ditch that held nine feet of water. Four years in the building, and it took the Mughals two campaigns and a murder to get in." },
      { x: 466, y: 296, labelDx: -22, name: "Chand Bibi's breach", date: "1595",
        blurb: "Where five Mughal mines were driven under the wall, two were dug out by the garrison, and a queen in armour with her veil wound round her waist stood in the gap that the rest blew open." },
      { x: 574, y: 300, labelDx: 24, name: "Kille Ark", date: "16th c., reused",
        blurb: "The inner palace block. The last Nizam Shah was held here; so, four centuries later, were Nehru, Azad and Patel for nearly three years — <i>The Discovery of India</i> was written inside it." },
      { x: 250, y: 240, name: "Bagh Rauza", date: "early 16th c.",
        blurb: "A black stone dome over the founder Ahmad Nizam Shah, with gold Quranic script glittering in the dark interior — the dynasty's first monument and its most restrained." },
      { x: 322, y: 306, labelDy: 24, name: "Damdi Masjid", date: "16th c.", img: "images/damdi-masjid.jpg",
        blurb: "A tiny mosque that is nothing but carving, whose patron is disputed between a court noble and Chand Bibi herself. Small enough to miss and worth more than most of what surrounds it." },
      { x: 470, y: 462, labelDy: 24, name: "Farah Bagh", date: "c. 1576–83", img: "images/farah-bagh.jpg",
        blurb: "An octagonal pleasure palace in the middle of a lake that has since vanished, where a sultan retired to play chess with a singer he titled Fateh Shah." },
      { x: 380, y: 420, labelDx: -26, name: "The tombs of favourites", date: "16th c.",
        blurb: "Seventy domes and forty mosques, by tradition, strung along the road between the city and Farah Bagh — a necropolis of courtiers rather than kings." },
      { x: 800, y: 152, labelDx: -12, name: "Tomb of Salabat Khan II", date: "late 16th c.", img: "images/salabat-khan-tomb.jpg",
        blurb: "Three octagonal storeys, twenty-three metres high, on a bare hilltop thirteen kilometres out. Universally called Chand Bibi's palace, and neither her palace nor her tomb." },
      { x: 764, y: 400, name: "Malik Ambar", date: "d. 13 May 1626", img: "images/malik-ambar.jpg",
        blurb: "The Ethiopian who was sold as a child, freed on his master's death, and then held this kingdom together for twenty-six years after its capital had fallen. He is buried at Khuldabad, off to the north-west near Aurangabad — the city he founded — rather than at the capital he refused to let die." }
    ]
  }
},

/* ===================================================================== 10 */
{
  id: "aurangabad",
  n: 10,
  x: 252, y: 196, labelDx: 14,
  name: "Aurangabad",
  alt: "Khadki — Malik Ambar's city",
  era: "Founded c. 1610 · Mughal Deccan capital · Asaf Jahi seat to 1763",
  img: "images/bibi-ka-maqbara.jpg",

  glance: [
    ["Founded as Khadki", "c. 1610, by Malik Ambar"],
    ["The aqueduct", "Begun 1612; 7 ft deep, 140 manholes"],
    ["It supplied the city for", "321 years"],
    ["Renamed", "Aurangabad, under Aurangzeb"],
    ["Asaf Jahi capital until", "1763, when the court moved to Hyderabad"],
    ["World Heritage nearby", "Ajanta and Ellora, both inscribed 1983"]
  ],

  intro: "A city founded by a freed Ethiopian slave, watered by a Persian aqueduct he designed against his own minister's advice, renamed after the emperor who spent twenty years failing to conquer the region from it — and standing within thirty kilometres of two of the greatest sites of ancient Indian art.",

  chapters: [
    {
      h: "Khadki, and the water under the hills",
      p: [
        "Malik Ambar made the village of Khadki his headquarters and planned it properly: streets, palaces, a defensive wall and, first of all, water. From 1612 he designed the <em>Nehr-e-Ambari</em>, exploiting subterranean water in the mountain valleys north of the city — a gravity system of channels and tunnels, the main line about seven feet deep with a hundred and forty manholes for access and cleaning.",
        "His wazir Mullah Mohammad dismissed the design as imaginary and preposterous. The first phase was finished in fifteen months at half the projected cost. The system supplied the city for three hundred and twenty-one years and at its height served a population of the order of seven hundred thousand.",
        "This is the same Persian hydraulic tradition as Bidar's karez and Bijapur's tunnels, arriving with the same migration and put to work by a man who had arrived as cargo."
      ]
    },
    {
      h: "The Mughal capital of a war that could not be won",
      p: [
        "Aurangzeb, viceroy of the Deccan as a prince and emperor from 1658, expanded and renamed the city, and made it the base for the campaign that consumed the last twenty-six years of his life. Having destroyed Bijapur and Golconda in 1686 and 1687, he discovered that he had also destroyed the buffer that kept the Marathas in check, and spent the rest of his reign besieging hill fort after hill fort while Maratha horse emptied the country behind him.",
        "The costs compounded in three directions at once. The treasury drained into a war that sieges could not win; the north was left to govern itself; and the Deccan — the richest region in India when he arrived — was reduced to a country that could not feed his own camp. Historians have called it the ulcer that destroyed the Mughal empire. He also, in effect, gave the Marathas their curriculum: twenty years of campaigning against a mobile enemy taught them how to fight an empire.",
        "He died at Ahmadnagar in February 1707, near ninety. His last letters are the strangest documents in this history: I came a stranger into this world, and a stranger I depart; my valuable time has been passed vainly; I have committed numerous crimes, and know not with what punishment I may be seized.",
        "He was buried at Khuldabad, twenty-four kilometres away, in an open grave paid for out of money he had earned copying the Quran — a red-stone platform less than three yards long with a cavity of bare earth in the middle, so that herbs grow on it. Curzon later added the marble screen."
      ],
      boxes: [
        {
          kind: "know", title: "Bibi ka Maqbara — the Taj at a tenth of the price",
          body: [
            "Prince Azam Shah built it between 1668 and 1669 for his mother Dilras Banu Begum, and had it designed by Ata-ullah, son of the Taj Mahal's architect. The recorded cost is ₹6,68,203 and seven annas — against something on the order of thirty-two lakh for the Taj.",
            "The economy shows: marble only on the lower portions and the dome, plaster above, and proportions that read as slightly too tall for their base. It is nonetheless the largest Mughal building in the Deccan, and in the right light entirely convincing.",
            "It is a useful monument to stand in front of, because it is the exact moment the imperial idiom arrives here — and the exact measure of how much less money there was to build it with."
          ]
        }
      ]
    },
    {
      h: "The caves",
      p: [
        "Thirty kilometres north-west, the Deccan's first golden age left its record in rock. At Ellora, thirty-four caves — Buddhist, Hindu and Jain, cut side by side into the same escarpment over four centuries, which is itself the most eloquent fact about them.",
        "The masterpiece is the Kailasa temple, begun under the Rashtrakuta king Krishna I in the eighth century. It is not built; it is excavated. Masons began at the hilltop and cut downward and inward, removing an estimated 150,000 to 200,000 tonnes of rock to leave a free-standing multi-storey temple with gateway, courtyard, elephants and flagstaffs, still attached to the mother rock at its base. There is no possibility of correction in such a technique. Every cut is final.",
        "A hundred kilometres north, Ajanta's thirty caves hold the largest surviving body of early Indian painting — preserved precisely because the site was abandoned to the jungle for something over a thousand years, and found again only in 1819 by a British hunting party. The officer who led it scratched his name onto a pillar of Cave 10, where it can still be read, which is why the rediscovery can be dated.",
        "Gribble used these caves as his standing proof that the pre-Islamic Deccan was no wilderness. They are the answer to every chronicle that describes this country as empty before its conquerors arrived."
      ]
    }
  ],

  boxes: [
    {
      kind: "numbers", title: "Kailasa, by the numbers",
      table: [
        ["Patron", "Krishna I of the Rashtrakutas, 8th century"],
        ["Method", "Cut downward from the hilltop — not a single joined block"],
        ["Rock removed", "Estimated 150,000–200,000 tonnes"],
        ["Courtyard", "Roughly 82 × 46 m; the shrine rises about 30 m"],
        ["Ellora", "34 caves — Buddhist, Hindu and Jain together"],
        ["Ajanta", "About 30 caves; painted 2nd c. BCE – 5th c. CE"],
        ["Rediscovered", "Ajanta, 1819, by a tiger-hunting party"]
      ]
    }
  ],

  quote: {
    text: "I came a stranger into this world, and a stranger I depart… My valuable time has been passed vainly. I have committed numerous crimes, and know not with what punishment I may be seized.",
    cite: "Aurangzeb, last letters, 1707"
  },

  cityMap: {
    w: 900, h: 520,
    caption: "The city sits at the bottom right; everything else runs north-west along one road — the fort at sixteen kilometres, Khuldabad at twenty-four, Ellora at thirty. Ajanta lies a hundred kilometres due north.",
    features:
      '<path class="cm-feature" d="M700 420 C560 380 440 320 320 240 C250 192 190 160 130 140" stroke-dasharray="5 7"/>' +
      '<text class="cm-label" x="430" y="330">THE NORTH-WEST ROAD</text>' +
      '<rect class="cm-feature" x="600" y="360" width="250" height="130"/>' +
      '<text class="cm-label" x="725" y="350" text-anchor="middle">AURANGABAD</text>' +
      '<path class="cm-feature" d="M120 200 C90 240 100 290 140 320" stroke-dasharray="2 5"/>' +
      '<text class="cm-label" x="120" y="350" text-anchor="middle">THE AQUEDUCT</text>',
    sites: [
      { x: 706, y: 412, labelDy: 22, name: "Khadki / the old city", date: "c. 1610",
        blurb: "Malik Ambar laid it out with streets, palaces, a wall and a water supply, in that order of priority. Aurangzeb expanded it and gave it his own name." },
      { x: 648, y: 372, labelDy: -16, name: "Bibi ka Maqbara", date: "1668–69", img: "images/bibi-ka-maqbara.jpg",
        blurb: "The Taj of the Deccan, built by a prince for his mother at a fraction of the original's budget — marble below, plaster above, and the largest Mughal building south of the Vindhyas." },
      { x: 790, y: 462, labelDy: 24, name: "Panchakki", date: "c. 1695", img: "images/panchakki.jpg",
        blurb: "A water mill driven by a siphoned underground channel from the hills, grinding grain for pilgrims at the dargah of Baba Shah Musafir — Ambar's hydraulics turned to charity." },
      { x: 130, y: 258, labelDx: 26, name: "Nehr-e-Ambari", date: "from 1612",
        blurb: "Seven feet deep with a hundred and forty manholes, dismissed by the wazir as preposterous, finished in fifteen months at half cost, and still supplying the city three centuries later." },
      { x: 470, y: 268, name: "Daulatabad Fort", date: "c. 1187", img: "images/daulatabad.jpg",
        blurb: "Sixteen kilometres out: the basalt cone whose lower slopes were sheared into fifty metres of vertical rock. Every ruler in this history wanted it; none of them stormed it." },
      { x: 424, y: 224, labelDy: -14, name: "Chand Minar", date: "1445", img: "images/chand-minar.jpg",
        blurb: "Sixty-three metres of victory tower inside the fort, faced with Persian blue tile — raised over a Bahmani win against Vijayanagara, by a builder who was a slave." },
      { x: 300, y: 190, name: "Khuldabad", date: "khanqah c. 1327", img: "images/aurangzeb-tomb.jpg",
        blurb: "The Chishti settlement founded by saints who came south in the 1327 migration — and the ground Aurangzeb chose, with an open grave, no dome, and herbs growing on the earth." },
      { x: 196, y: 152, name: "Ellora", date: "6th–10th c.", img: "images/kailasa-temple.png",
        blurb: "Thirty-four caves cut side by side by Buddhists, Hindus and Jains. The Kailasa temple was excavated downward from the hilltop — two hundred thousand tonnes removed to leave a building standing." },
      { x: 120, y: 106, labelDy: -16, name: "Grishneshwar", date: "16th c. rebuild", img: "images/grishneshwar.jpg",
        blurb: "The last and smallest of the twelve Jyotirlingas, beside Ellora — rebuilt by Shivaji's grandfather and given its present form by Ahilyabai Holkar." },
      { x: 640, y: 96, name: "Ajanta", date: "2nd c. BCE – 6th c. CE", img: "images/ajanta.jpg",
        blurb: "A hundred kilometres north in a horseshoe gorge: thirty caves holding the largest surviving body of early Indian painting, saved by a thousand years of being forgotten." }
    ]
  }
}

];
