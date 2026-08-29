/* ==========================================================================
   PLACES — the markers on the Deccan map.
   Narratives adapted from J. D. B. Gribble, "A History of the Deccan"
   (Vol. I, 1896; Vol. II, 1924).
   Coordinates are pixel positions inside the 900 × 760 map viewBox.
   ========================================================================== */

const PLACES = [
  {
    id: "daulatabad",
    n: 1,
    x: 208, y: 160, labelDy: -17,
    name: "Daulatabad",
    alt: "Deogiri — the Hill of the Gods",
    era: "Yadava capital · seized 1294 · imperial capital 1327",
    img: "images/daulatabad.jpg",
    story: [
      "Before any Mussulman army had crossed the Vindhyas, Deogiri was the seat of one of the two great Hindu kingdoms of the Deccan — a rich city beneath a cone-shaped fortress rock 640 feet high, ringed by walls, bastions and moats, and 'supposed to be impregnable.' In 1294 Ala-ud-din, nephew of the Sultan of Delhi, marched south in secret, defeated Rajah Ram Deo, and carried away a treasure so vast that 'nothing had ever been seen like it before' — gold with which he bought himself the throne of Delhi over his murdered uncle's body.",
      "The fatal treasure drew the Delhi armies back again and again. Deogiri was taken outright in 1308, and in 1318 the rebel Harpal Deo was flayed alive, his skin hung over the gates: from that day the Hill of the Gods ceased to be the residence of a Hindu king.",
      "Its strangest hour came in 1327, when the half-mad emperor Muhammad Tughluk resolved to move his entire capital here from Delhi, renaming the rock Daulatabad — the Abode of Fortune. The whole population of Delhi was ordered south; thousands perished on the road, and 'all around Deogiri, which is an infidel land, there sprung up graveyards of Mussulmans.' Among the emigrants was a field-labourer named Hassan, who would die a king.",
      "The fortress passed to the Bahmani sultans, then to the Nizam Shahis of Ahmednagar, whose last defenders yielded it to the Mughals in 1633. The chronicler could only marvel at it: the rock scarped so smooth from base to water-line 'that a snake or an ant would ascend it with difficulty,' its only entrance a dark tortuous tunnel cut through the living stone, sealed at need by an iron brazier of fire."
    ],
    quote: {
      text: "Deogiri was exceedingly rich in gold and silver, jewels and pearls, and other valuables. The people of that country had never heard of the Mussulmans; no Mussulman king or prince had penetrated so far.",
      cite: "Zia-ud-din Barni, quoted in Gribble, Vol. I"
    }
  },
  {
    id: "warangal",
    n: 2,
    x: 581, y: 336,
    name: "Warangal",
    alt: "Capital of the Kakatiyas of Telingana",
    era: "Kakatiya capital · sacked 1310 & 1323",
    img: "images/warangal.jpg",
    story: [
      "Warangal ruled Telingana — 'probably all the Telugu-speaking districts of Hyderabad and Madras' — from behind a double ring of walls, the outer of mud more than seven miles round, the inner of stone. Its kings devoted themselves to agriculture: the remains of immense irrigation tanks and channels still testify to a teeming, prosperous countryside, and people said that in Telingana there were gold and diamond mines.",
      "That wealth was its undoing. In 1309 Malik Kafur besieged the city for Ala-ud-din, felling the sacred groves to build a wooden wall around his army. When the outer rampart fell, Rajah Pratapa Rudra Deva sued for peace and surrendered his whole treasure. Kafur marched away 'with a thousand camels groaning under the weight of the treasure.'",
      "The city rose again, and fell again. In 1323 Ulugh Khan — the future Muhammad Tughluk — took it after an obstinate siege; the Rajah and his family were sent to Delhi and the very name of Warangal was changed to Sultanpur. Refugees of its army fled south-west, and among them rode two brothers, Bukka and Hari Hara, who would found Vijayanagar.",
      "Warangal was finally stormed by Ahmed Shah Bahmani in 1424, its 'buried treasures of ages' carried off, and it never was a royal city again. What remains are four exquisitely carved gateways at the heart of the fort, and at Hanamkonda near by the Thousand-Pillar Temple — 'one of the most perfect specimens of Chalukyan architecture in Southern India,' its black granite polished like marble."
    ],
    quote: {
      text: "Every cursed tree which was in that capital of idolatry was cut down to the roots... so that a wooden fortress was drawn round the army, of such stability that if fire had rained from heaven, their camp would have been unscathed.",
      cite: "Amir Khusru, Tarikh-i-Alai — on the siege of 1309"
    }
  },
  {
    id: "gulbarga",
    n: 3,
    x: 355, y: 392,
    name: "Gulbarga",
    alt: "First throne of the Bahmani sultans",
    era: "Bahmani capital 1347–1432",
    img: "images/gulbarga.jpg",
    story: [
      "The Bahmani kingdom was born of a prophecy. Hassan, a Delhi field-labourer, struck buried gold with his plough and honestly carried it to his master, the Brahmin astrologer Gangu — who cast the young man's horoscope, found a crown foretold in it, and asked only that Hassan take his name and one day make him minister of finance. In 1347, when the Deccan rose against Muhammad Tughluk's tyranny, that same Hassan Gangu was raised to the throne as Sultan Ala-ud-din Hassan Kangoh Bahmani, and Gulbarga became the capital of the Deccan's first independent Mahomedan kingdom.",
      "He kept his promise: Gangu was given the treasury, said to be the first Brahmin ever to serve a Mahomedan prince — the beginning of a Deccani custom, followed for two centuries, of trusting Hindus with revenue and finance. Asked how he had won a kingdom without armies or treasure, the old sultan answered: 'By affability to friends and enemies, and by showing liberality to all to the utmost of my power.'",
      "Under his successors Gulbarga blazed with dangerous splendour. A royal wedding here was celebrated for an entire year, with engines in the streets casting 'showers of confectionery among the crowd.' In the fort still stands the great mosque, unique in India, modelled — it is said — on the mosque of Cordova, its whole vast court roofed over. Near by is the shrine of the saint Gisu Daraz, visited by thousands of pilgrims to this day.",
      "Five sultans reigned here in twenty-four years, four of them assassinated; the poet Hafiz of Shiraz was invited to this court, turned back by a storm at sea, and sent an ode instead — for which he was paid a thousand pieces of gold. In 1432 Ahmed Shah, struck by the healthier air and abundant water of Bidar, carried the capital away, and Gulbarga's century of glory closed."
    ],
    quote: {
      text: "Many like me have viewed the fountain, but they are gone, and their eyes closed for ever. I conquered the world by policy and valour, but could not overcome the grave.",
      cite: "Verses of Jamshid, recited to the dying Sultan Ala-ud-din Hassan, 1358"
    }
  },
  {
    id: "bidar",
    n: 4,
    x: 405, y: 338, labelDy: -17,
    name: "Bidar",
    alt: "Ahmedabad Bidar — city of the later Bahmanis",
    era: "Bahmani capital 1432 · Barid Shahi 1492–1609",
    img: "images/bidar.jpg",
    story: [
      "'Soon, as if by magic, rose one of the most splendid cities of India or of the world.' Ahmed Shah Bahmani chose the old Hindu town of Bidar for its healthy heights and abundant water, and the new capital's great mosque was 'for centuries unequalled for simple grandeur and solemnity.' The Russian merchant Athanasius Nikitin, who came here in 1470, found a noble city, its king attended by an army of three hundred thousand men and elephants clad in bright steel armour, scythes bound to their trunks.",
      "Bidar's most famous building is a tomb of learning: the great madrasa of Mahmud Gawan, the incorruptible Persian minister who served the Bahmanis for decades, gave away his wealth to the poor in disguise, and lived on plain white cloth while empires passed through his hands. In 1481 his enemies forged a treasonable letter over his stolen seal; the drunken Sultan Muhammad ordered him cut down on the spot. 'The death of an old man like me is of little moment to myself,' said the minister, 'but to you it will prove the ruin of an empire.' He was right — the historians date 'the ruin of the Deccan' from that sword-stroke.",
      "After Mahmud Gawan's murder the kingdom crumbled. The governors of Bijapur, Ahmednagar, Berar and Golconda each declared independence, while at Bidar the Turkish minister Kasim Barid kept the last Bahmani sultans as puppets — a dynasty of king-makers who finally took the throne themselves, until Bidar was absorbed by Bijapur in 1609.",
      "The city gave its name to bidri ware — vases and hookahs of blackened alloy inlaid with silver and gold — and its crumbling walls still carry the tombs of the Bahmani kings, one inscribed with the couplet: 'Should my heart ache, my remedy is this: a cup of wine, and then I sup of bliss.'"
    ],
    quote: {
      text: "This beard has grown white in the auspicious service of the father, and it will be honourable should it be dyed with my blood by the fortunes of the son; there is no evading the decrees of fate.",
      cite: "Mahmud Gawan, going to his death, 1481"
    }
  },
  {
    id: "hampi",
    n: 5,
    x: 326, y: 560,
    name: "Vijayanagar",
    alt: "Hampi — the City of Victory",
    era: "Hindu empire 1336–1565",
    img: "images/hampi.jpg",
    story: [
      "When Warangal fell, two brothers of its broken army — Bukka and Hari Hara — fled south to the gorge of the Tungabhadra. Guided, tradition says, by the sage Vidyaranya, the 'Forest of Learning,' they founded a city among the granite boulders in 1336 and called it first Vidyanagar, the City of Learning, then Vijayanagar, the City of Victory. For two hundred and fifty years it stood as the bulwark of Hindu India — 'the warden of the Hindu marches' — against which the wave of invasion broke.",
      "The travellers who saw it could scarcely believe it. Abdur Razzak, the Persian ambassador of 1443, counted seven circles of fortification, markets of jewels and fresh flowers, streams flowing 'along polished and level stone channels,' a mint with chambers full of molten gold. Every subject, 'even the workers in market places, wore jewels and gilt ornaments in their ears, round their necks, arms, wrists, and fingers.' Under Krishna Deva Raya (1509–1530) the empire ran from sea to sea and from the Krishna to Cape Comorin.",
      "Its end came in a single day. Enraged by the arrogance of the aged regent Rama Rajah, the four sultanates — Bijapur, Ahmednagar, Golconda and Bidar — buried their feuds in a holy league, and on the plain of Talikota in January 1565 the allied armies met the Hindu host. Rama Rajah, directing the battle from a jewelled throne heaped round with money for rewarding his soldiers, was captured when his litter fell, and beheaded on the spot; his head raised on a spear broke his army, and the river 'was dyed red with their blood.'",
      "The conquerors spent five months plundering the city — one diamond that fell to Bijapur was 'as large as an ordinary egg' — and razed what they could not carry. Two years later a Venetian traveller found the houses standing but inhabited by tigers. To-day the ruins of Hampi — the Vittala temple with its stone car, the elephant stables, the eating-slabs of the old bazaar still lying where they were last used — are all that remain of the largest and richest Hindu city of Southern India."
    ],
    quote: {
      text: "The city is such that the pupil of the eye has never seen a place like it, and the ear of intelligence has never been informed that there existed anything to equal it in the world.",
      cite: "Abdur Razzak, Persian ambassador to Vijayanagar, 1443"
    }
  },
  {
    id: "bijapur",
    n: 6,
    x: 263, y: 434,
    name: "Bijapur",
    alt: "City of the Adil Shahi kings",
    era: "Adil Shahi sultanate 1489–1686",
    img: "images/gol-gumbaz.jpg",
    story: [
      "The founder of Bijapur was a prince in disguise. Yusuf Adil Shah was — so the romance runs — a son of the Ottoman Sultan Murad, saved from the bow-string as a boy when his mother bought a slave who resembled him to die in his place. Smuggled to Persia and then to India, he rose in the Bahmani service, and in 1489 declared his independence at Bijapur, the 'City of Victory,' first and greatest of the five kingdoms carved from the Bahmani wreck.",
      "For two hundred years the Adil Shahs made their capital one of the wonders of India. The Mughal envoy Asad Beg described a bazaar four miles long, its shops shaded by green trees and tiered with jewelled daggers, china, crystal and 'whole streets of wine and beauty'; it was here that he first met tobacco, and carried a jewelled pipe of it back to the court of Akbar. Ali Adil Shah raised the great city walls after Talikota; Ibrahim II — poet, musician, friend of Hindus — built the exquisite Ibrahim Rauza; and over all rose the Gol Gumbaz, tomb of Sultan Mahmud, its dome greater in span than the Pantheon's, a landmark visible for twenty-five miles.",
      "The dynasty's later years were a long duel with two rising powers: the Mahratta Shivaji — whose tiger-claws killed the Bijapur general Afzul Khan at Pratapgad in 1659 — and the emperor Aurangzeb, who coveted the last independent kingdoms of the Deccan.",
      "In 1686 Aurangzeb came in person. Famine did what his guns could not, and on the 15th of October the starving garrison capitulated. The young sultan Sikandar was led before the emperor in silver chains, amid 'the passionate tears of the nobles and the wailing cries of thousands,' and Bijapur — its treasury looted, its palaces silenced — sank into a provincial ruin whose splendid tombs still crowd the horizon."
    ],
    quote: {
      text: "In one street were a thousand bands of people drinking, and dancers, lovers, and pleasure-seekers assembled... Perhaps no place in the wide world could present a more wonderful spectacle to the eye of the traveller.",
      cite: "Asad Beg, envoy of Akbar, on the Bijapur bazaar, c. 1604"
    }
  },
  {
    id: "golconda",
    n: 7,
    x: 466, y: 378,
    name: "Golconda",
    alt: "Fortress of the Qutb Shahi kings",
    era: "Qutb Shahi sultanate 1512–1687",
    img: "images/golconda.jpg",
    story: [
      "Golconda passed to the Mahomedans by treaty in 1364, sold — with a jewelled throne thrown in — for a promise of perpetual peace. When the Bahmani kingdom broke apart, its Persian governor Sultan Quli Qutb-ul-Mulk made the hill fortress the seat of a new dynasty (1512), whose gloomy granite walls, washed by the lake at their foot, would one day baffle the whole army of Aurangzeb.",
      "The name of Golconda became a proverb for riches, though — as Gribble is careful to note — 'there never was a diamond mine at Golconda': the stones came from the mines of Kurnool, Cuddapah and the Krishna, and were only sold in the fortress market. Here the adventurer Mir Jumla, an oil-merchant's son from Ispahan, rose to command armies, farm diamond mines, and finally to betray his king to the Mughals, carrying to Delhi as his passport a stone believed to be the Koh-i-nur.",
      "The Qutb Shahs were tolerant princes: Hindu ministers ran the state, and the kingdom, wrote Ferishta, became 'like Egypt, the mart of the whole world.' Their fourth king left the fortress to build a new city of gardens on the Musi — Bhagnagar, the future Hyderabad.",
      "The end came in 1687. Abul Hasan, the last king, withstood Aurangzeb's siege for eight months; a mine was exploded, assaults were hurled back, and one night an escalade was foiled by the barking of a dog, which the king rewarded with a golden collar. Golconda fell at last only by treachery, a gate opened for gold. While his nobles fled, Abul Hasan waited on his throne, ordered breakfast served as the conquerors entered, and rode out with dignity to lifelong captivity in Daulatabad. His general Abdur Razzak Lari, who had torn up Aurangzeb's bribes before his men, charged alone into the victorious army and survived seventy wounds — refusing, even then, to serve the conqueror while his own master lived a prisoner."
    ],
    quote: {
      text: "If Abul Hasan had possessed only one more servant devoted like Abdur Razzak, it would have taken much longer time to subdue the fortress.",
      cite: "The Emperor Aurangzeb, after the fall of Golconda, 1687"
    }
  },
  {
    id: "hyderabad",
    n: 8,
    x: 515, y: 420, labelDx: 12,
    name: "Hyderabad",
    alt: "Bhagnagar — city of the Char Minar",
    era: "Founded c. 1591 · Asaf Jahi capital from 1763",
    img: "images/charminar.jpg",
    story: [
      "Toward the close of the sixteenth century Muhammad Quli Qutb Shah came down from the grim fortress of Golconda and founded a pleasure-city on the south bank of the Musi, naming it Bhagnagar after his beloved Bhagmati; only later did it take the name Hyderabad. At the meeting of its four great streets he raised the Char Minar, the four minarets, and near it the vast Mecca Masjid — almost the only architectural pretensions, Gribble notes, of a city that was above all 'a centre of mercantile enterprise,' where merchants and dealers flocked from all parts of the world to the diamond market.",
      "The city was sacked in the catastrophe of 1687, when the king fled to Golconda and the mob and then the Mughal army plundered palaces worth four millions sterling. For thirty years it lay a province of Delhi, until Asaf Jah, viceroy of the Deccan, shook off the dying empire; his son Nizam Ali Khan fixed the Asaf Jahi court permanently at Hyderabad in 1763.",
      "Around that court the modern city grew: the Chowmahalla palace of the Nizams; the mansions of the great Paigah nobles; across the river, the British Residency built by Kirkpatrick, who scandalised and charmed two empires by marrying a great-niece of the minister's household. Under the long ministry of Sir Salar Jung (1853–1883) the medieval city was dragged into the modern age — farmed-out revenues abolished, courts, police, schools, railways and hospitals created — so that a Resident could write that the Hyderabad of 1860 stood to the old city 'as the England of the present day is to the England of the Stuarts.'",
      "Through it all Hyderabad remained what its founder made it: the largest court of Mahomedan India, a city of Arabs, Rohillas, Persians, Mahrattas and Telugus, where — in the words Gribble borrowed for its people — Hindu and Mussulman lived in a closer intimacy 'than existed anywhere else in India.'"
    ],
    quote: {
      text: "In the seventeenth century Hyderabad was a centre of mercantile enterprise, and merchants and dealers flocked there from all parts of the world — one of the special attractions being the market for diamonds held in the fort of Golconda, five miles distant.",
      cite: "Gribble, Vol. I"
    }
  },
  {
    id: "ahmednagar",
    n: 9,
    x: 184, y: 244,
    name: "Ahmednagar",
    alt: "City of the Nizam Shahi kings — and of Chand Bibi",
    era: "Nizam Shahi sultanate 1490–1636",
    img: "images/chand-bibi.jpg",
    story: [
      "Ahmednagar was founded in 1494 by Ahmed Nizam Shah — son of a Brahmin captive raised at the Bahmani court — on the field of a midnight victory, and within two years it was said to rival 'in splendour Bagdad and Cairo.' His dynasty, the Nizam Shahis, held the western Deccan for a century and a half of restless war with Bijapur, Vijayanagar and at last the Mughals.",
      "Its immortal figure is a queen. Chand Bibi, daughter of Ahmednagar and widowed queen of Bijapur, ruled both kingdoms in turn as regent, rode to battle beside her husband, and in 1595 stood in the breach of Ahmednagar's wall — 'clad in armour, a veil thrown over her face, a drawn sword in her hand' — against the whole Mughal army of Prince Murad. The mine-shattered wall was repaired in a night under her eye, the assaults were beaten off, and the prince withdrew, saluting her as Chand Sultana. Five years later, as a second Mughal army closed in, her own mutinous soldiery, poisoned by a lie that she meant to betray them, broke into the palace and cut her down. Within days Ahmednagar fell.",
      "Yet the kingdom lived on for a generation in the person of Malik Ambar, an Abyssinian slave become general, statesman and king-maker. From his new city of Kirki he kept the puppet Nizam Shahs on their throne, perfected the guerrilla warfare the Mahrattas would inherit, and settled the land revenue so justly that his system endured into the nineteenth century. Emperor Jahangir, who could never catch him, filled his memoirs with curses on 'the black-faced,' 'the cursed fellow' — and when Ambar died in 1626, full of years and honour, the imperial chronicler conceded: 'History records no other instance of an Abyssinian slave arriving at such eminence.'",
      "After Ambar's death the end came quickly: Daulatabad fell in 1633, the last boy-king was sent to Gwalior, and the Nizam Shahi dominions sank into the Mughal empire — the first of the Deccan kingdoms to go."
    ],
    quote: {
      text: "Few in England know that the contemporary of our Queen Elizabeth in the Deccan was a woman of equal ability, of equal political talent... who, among all the women of India, stands out as a jewel without flaw and beyond price.",
      cite: "Colonel Meadows Taylor, on Chand Bibi"
    }
  },
  {
    id: "aurangabad",
    n: 10,
    x: 252, y: 196, labelDx: 14,
    name: "Aurangabad",
    alt: "Kirki — city of Malik Ambar and of Aurangzeb",
    era: "Founded 1610 · first Asaf Jahi capital",
    img: "images/ellora.jpg",
    story: [
      "The city began as Kirki, built by Malik Ambar as the capital of his resurrected Nizam Shahi state — a city 'which had taken twenty years to build' when the Mughals burned it in 1621. It rose again, and when the young prince Aurangzeb came south as viceroy of the Deccan he made it his seat and gave it his name: Aurangabad.",
      "Here the future emperor passed his strange early years — including twelve months in which he renounced the world and lived as an ascetic in a rock cell — within sight of the ancient cave-temples of Ellora and Ajanta, whose sculptured halls Gribble counts among the proofs of how advanced the old Hindu Deccan had been. And here, at the end of it all, Aurangzeb came home: after fifty years of empire and a quarter-century of fruitless war against the Mahrattas, he died in camp in 1707, and was buried in a plain open grave at Roza (Khuldabad), a few miles from the city.",
      "His dying letters were carried from this country: 'I came a stranger into this world, and a stranger I depart... My valuable time has been passed vainly. I have committed numerous crimes, and know not with what punishment I may be seized.'",
      "Under Asaf Jah, Aurangabad became the first capital of the new Hyderabad state and the mustering-ground of its wars; the French general Bussy wintered his battalions in its fort, and near by, at Assaye in 1803, Arthur Wellesley — the future Duke of Wellington, then commanding the Nizam's subsidiary force — broke the Mahratta armies in the battle he considered the hardest-fought of his life."
    ],
    quote: {
      text: "I came a stranger into this world, and a stranger I depart. I know nothing of myself, what I am, and for what I am destined. The instant which passed in power has left only sorrow behind it.",
      cite: "Aurangzeb's last letter, written in the Deccan, 1707"
    }
  }
];
