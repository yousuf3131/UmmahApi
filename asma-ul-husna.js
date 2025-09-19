/**
 * 99 Names of Allah (Asma ul Husna)
 * 
 * This module provides the 99 beautiful names of Allah with Arabic text,
 * transliteration, English meanings, and detailed information.
 */

/**
 * The 99 Names of Allah (Asma ul Husna)
 */
const asmaUlHusna = [
    {
        number: 1,
        arabic: 'الرَّحْمٰنُ',
        transliteration: 'Ar-Rahman',
        english: 'The Most Merciful',
        meaning: 'The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.'
    },
    {
        number: 2,
        arabic: 'الرَّحِيمُ',
        transliteration: 'Ar-Raheem',
        english: 'The Most Compassionate',
        meaning: 'The One who has plenty of mercy for the believers.'
    },
    {
        number: 3,
        arabic: 'المَلِكُ',
        transliteration: 'Al-Malik',
        english: 'The King',
        meaning: 'The One with the complete dominion, the One whose dominion is clear from imperfection.'
    },
    {
        number: 4,
        arabic: 'القُدُّوسُ',
        transliteration: 'Al-Quddoos',
        english: 'The Most Holy',
        meaning: 'The One who is pure from any imperfection and clear from children and adversaries.'
    },
    {
        number: 5,
        arabic: 'السَّلاَمُ',
        transliteration: 'As-Salaam',
        english: 'The Source of Peace',
        meaning: 'The One who is free from every imperfection.'
    },
    {
        number: 6,
        arabic: 'المُؤْمِنُ',
        transliteration: 'Al-Mu\'min',
        english: 'The Guardian of Faith',
        meaning: 'The One who witnessed for Himself that no one is God but Him. And He witnessed for His believers that they are truthful in their belief that no one is God but Him.'
    },
    {
        number: 7,
        arabic: 'المُهَيْمِنُ',
        transliteration: 'Al-Muhaymin',
        english: 'The Protector',
        meaning: 'The One who witnesses the saying and deeds of His creatures.'
    },
    {
        number: 8,
        arabic: 'العَزِيزُ',
        transliteration: 'Al-Azeez',
        english: 'The Mighty',
        meaning: 'The strong, the defeater who is not defeated.'
    },
    {
        number: 9,
        arabic: 'الجَبَّارُ',
        transliteration: 'Al-Jabbaar',
        english: 'The Compeller',
        meaning: 'The One that nothing happens in His dominion except that which He willed.'
    },
    {
        number: 10,
        arabic: 'المُتَكَبِّرُ',
        transliteration: 'Al-Mutakabbir',
        english: 'The Supreme',
        meaning: 'The One who is clear from the attributes of the creatures and from resembling them.'
    },
    {
        number: 11,
        arabic: 'الخَالِقُ',
        transliteration: 'Al-Khaaliq',
        english: 'The Creator',
        meaning: 'The One who brings everything from non-existence to existence.'
    },
    {
        number: 12,
        arabic: 'البَارِئُ',
        transliteration: 'Al-Baari\'',
        english: 'The Originator',
        meaning: 'The maker, the creator who has the Power to turn the entities.'
    },
    {
        number: 13,
        arabic: 'المُصَوِّرُ',
        transliteration: 'Al-Musawwir',
        english: 'The Fashioner',
        meaning: 'The One who forms His creatures in different pictures.'
    },
    {
        number: 14,
        arabic: 'الغَفَّارُ',
        transliteration: 'Al-Ghaffaar',
        english: 'The Great Forgiver',
        meaning: 'The One who forgives the sins of His slaves time and time again.'
    },
    {
        number: 15,
        arabic: 'القَهَّارُ',
        transliteration: 'Al-Qahhaar',
        english: 'The Subduer',
        meaning: 'The dominant, the One who has the perfect Power and is not unable over anything.'
    },
    {
        number: 16,
        arabic: 'الوَهَّابُ',
        transliteration: 'Al-Wahhaab',
        english: 'The Bestower',
        meaning: 'The One who is Generous in giving plenty without any return.'
    },
    {
        number: 17,
        arabic: 'الرَّزَّاقُ',
        transliteration: 'Ar-Razzaaq',
        english: 'The Provider',
        meaning: 'The One who provides all the creatures their needs.'
    },
    {
        number: 18,
        arabic: 'الفَتَّاحُ',
        transliteration: 'Al-Fattaah',
        english: 'The Opener',
        meaning: 'The One who opens for His slaves the closed worldly and religious matters.'
    },
    {
        number: 19,
        arabic: 'العَلِيمُ',
        transliteration: 'Al-\'Aleem',
        english: 'The All-Knowing',
        meaning: 'The One nothing is absent from His knowledge.'
    },
    {
        number: 20,
        arabic: 'القَابِضُ',
        transliteration: 'Al-Qaabid',
        english: 'The Constrictor',
        meaning: 'The One who constricts the sustenance by His wisdom.'
    },
    {
        number: 21,
        arabic: 'البَاسِطُ',
        transliteration: 'Al-Baasit',
        english: 'The Expander',
        meaning: 'The One who expands and widens.'
    },
    {
        number: 22,
        arabic: 'الخَافِضُ',
        transliteration: 'Al-Khaafid',
        english: 'The Abaser',
        meaning: 'The One who lowers whoever He willed by His Destruction.'
    },
    {
        number: 23,
        arabic: 'الرَّافِعُ',
        transliteration: 'Ar-Raafi\'',
        english: 'The Exalter',
        meaning: 'The One who raises whoever He willed by His endowment.'
    },
    {
        number: 24,
        arabic: 'المُعِزُّ',
        transliteration: 'Al-Mu\'izz',
        english: 'The Honourer',
        meaning: 'He gives esteem to whoever He willed, hence there is no one to degrade Him.'
    },
    {
        number: 25,
        arabic: 'المُذِلُّ',
        transliteration: 'Al-Mudhil',
        english: 'The Dishonorer',
        meaning: 'The One who degrades whoever he willed, hence there is no one to give him esteem.'
    },
    {
        number: 26,
        arabic: 'السَّمِيعُ',
        transliteration: 'As-Samee\'',
        english: 'The All-Hearing',
        meaning: 'The One who Hears all things that are heard by His Eternal Hearing without an ear, instrument or organ.'
    },
    {
        number: 27,
        arabic: 'البَصِيرُ',
        transliteration: 'Al-Baseer',
        english: 'The All-Seeing',
        meaning: 'The One who Sees all things that are seen by His Eternal Seeing without a pupil or any other instrument.'
    },
    {
        number: 28,
        arabic: 'الحَكَمُ',
        transliteration: 'Al-Hakam',
        english: 'The Judge',
        meaning: 'The One who is the judge, the arbitrator, the One who has the complete authority to decide between the creatures.'
    },
    {
        number: 29,
        arabic: 'العَدْلُ',
        transliteration: 'Al-\'Adl',
        english: 'The Utterly Just',
        meaning: 'The One who is entitled to do what He does.'
    },
    {
        number: 30,
        arabic: 'اللَّطِيفُ',
        transliteration: 'Al-Lateef',
        english: 'The Gentle',
        meaning: 'The One who is kind to His slaves and endows upon them.'
    },
    {
        number: 31,
        arabic: 'الخَبِيرُ',
        transliteration: 'Al-Khabeer',
        english: 'The All-Aware',
        meaning: 'The One who knows the truth of things.'
    },
    {
        number: 32,
        arabic: 'الحَلِيمُ',
        transliteration: 'Al-Haleem',
        english: 'The Forbearing',
        meaning: 'The One who delays the punishment for those who deserve it and then He might forgive them.'
    },
    {
        number: 33,
        arabic: 'العَظِيمُ',
        transliteration: 'Al-\'Azeem',
        english: 'The Magnificent',
        meaning: 'The One deserving the attributes of Exaltment, Glory, Extolement, and complete Majesty.'
    },
    {
        number: 34,
        arabic: 'الغَفُورُ',
        transliteration: 'Al-Ghafoor',
        english: 'The Much-Forgiving',
        meaning: 'The One who forgives a lot.'
    },
    {
        number: 35,
        arabic: 'الشَّكُورُ',
        transliteration: 'Ash-Shakoor',
        english: 'The Appreciative',
        meaning: 'The One who gives a lot of reward for a little obedience.'
    },
    {
        number: 36,
        arabic: 'العَلِيُّ',
        transliteration: 'Al-\'Alee',
        english: 'The Most High',
        meaning: 'The One who is clear from the attributes of the creatures.'
    },
    {
        number: 37,
        arabic: 'الكَبِيرُ',
        transliteration: 'Al-Kabeer',
        english: 'The Most Great',
        meaning: 'The One who is greater than everything in status.'
    },
    {
        number: 38,
        arabic: 'الحَفِيظُ',
        transliteration: 'Al-Hafeez',
        english: 'The Preserver',
        meaning: 'The One who protects whatever and whoever He willed to protect.'
    },
    {
        number: 39,
        arabic: 'المُقِيتُ',
        transliteration: 'Al-Muqeet',
        english: 'The Nourisher',
        meaning: 'The One who has the Power.'
    },
    {
        number: 40,
        arabic: 'الحَسِيبُ',
        transliteration: 'Al-Haseeb',
        english: 'The Reckoner',
        meaning: 'The One who gives the satisfaction.'
    },
    {
        number: 41,
        arabic: 'الجَلِيلُ',
        transliteration: 'Al-Jaleel',
        english: 'The Majestic',
        meaning: 'The One who is attributed with greatness of Power and Glory of status.'
    },
    {
        number: 42,
        arabic: 'الكَرِيمُ',
        transliteration: 'Al-Kareem',
        english: 'The Generous',
        meaning: 'The One who is clear from abjectness.'
    },
    {
        number: 43,
        arabic: 'الرَّقِيبُ',
        transliteration: 'Ar-Raqeeb',
        english: 'The Watchful',
        meaning: 'The One that nothing is absent from Him.'
    },
    {
        number: 44,
        arabic: 'المُجِيبُ',
        transliteration: 'Al-Mujeeb',
        english: 'The Responsive',
        meaning: 'The One who answers the one in need if he asks Him and rescues the yearner if he calls upon Him.'
    },
    {
        number: 45,
        arabic: 'الوَاسِعُ',
        transliteration: 'Al-Waasi\'',
        english: 'The All-Encompassing',
        meaning: 'The Knowledgeable; The One nothing is absent from His knowledge.'
    },
    {
        number: 46,
        arabic: 'الحَكِيمُ',
        transliteration: 'Al-Hakeem',
        english: 'The Wise',
        meaning: 'The One who is correct in His doings.'
    },
    {
        number: 47,
        arabic: 'الوَدُودُ',
        transliteration: 'Al-Wadood',
        english: 'The Loving',
        meaning: 'The One who loves His believing slaves and His believing slaves love Him.'
    },
    {
        number: 48,
        arabic: 'المَجِيدُ',
        transliteration: 'Al-Majeed',
        english: 'The Glorious',
        meaning: 'The One who is with perfect Power, High Status, Compassion, Generosity and Kindness.'
    },
    {
        number: 49,
        arabic: 'البَاعِثُ',
        transliteration: 'Al-Baa\'ith',
        english: 'The Resurrector',
        meaning: 'The One who resurrects His slaves after death for reward and/or punishment.'
    },
    {
        number: 50,
        arabic: 'الشَّهِيدُ',
        transliteration: 'Ash-Shaheed',
        english: 'The Witness',
        meaning: 'The One who nothing is absent from Him.'
    },
    {
        number: 51,
        arabic: 'الحَقُّ',
        transliteration: 'Al-Haqq',
        english: 'The Truth',
        meaning: 'The One who truly exists.'
    },
    {
        number: 52,
        arabic: 'الوَكِيلُ',
        transliteration: 'Al-Wakeel',
        english: 'The Trustee',
        meaning: 'The One who gives the satisfaction and is relied upon.'
    },
    {
        number: 53,
        arabic: 'القَوِيُّ',
        transliteration: 'Al-Qawiyy',
        english: 'The Strong',
        meaning: 'The One with the complete Power.'
    },
    {
        number: 54,
        arabic: 'المَتِينُ',
        transliteration: 'Al-Mateen',
        english: 'The Firm',
        meaning: 'The One with extreme Power which is un-interrupted and He does not get tired.'
    },
    {
        number: 55,
        arabic: 'الوَلِيُّ',
        transliteration: 'Al-Waliyy',
        english: 'The Protecting Friend',
        meaning: 'The One who owns things and manages them.'
    },
    {
        number: 56,
        arabic: 'الحَمِيدُ',
        transliteration: 'Al-Hameed',
        english: 'The Praiseworthy',
        meaning: 'The praised One who deserves to be praised.'
    },
    {
        number: 57,
        arabic: 'المُحْصِي',
        transliteration: 'Al-Muhsee',
        english: 'The Counter',
        meaning: 'The One who the count of things are known to him.'
    },
    {
        number: 58,
        arabic: 'المُبْدِئُ',
        transliteration: 'Al-Mubdi\'',
        english: 'The Originator',
        meaning: 'The One who started the human being. That is, He created him.'
    },
    {
        number: 59,
        arabic: 'المُعِيدُ',
        transliteration: 'Al-Mu\'eed',
        english: 'The Restorer',
        meaning: 'The One who brings back the creatures after death.'
    },
    {
        number: 60,
        arabic: 'المُحْيِي',
        transliteration: 'Al-Muhyee',
        english: 'The Giver of Life',
        meaning: 'The One who took out a living human from semen that does not have a soul.'
    },
    {
        number: 61,
        arabic: 'اَلمُمِيتُ',
        transliteration: 'Al-Mumeet',
        english: 'The Destroyer',
        meaning: 'The One who renders the living dead.'
    },
    {
        number: 62,
        arabic: 'الحَيُّ',
        transliteration: 'Al-Hayy',
        english: 'The Living',
        meaning: 'The One attributed with a life that is neither born nor is it coming to an end.'
    },
    {
        number: 63,
        arabic: 'القَيُّومُ',
        transliteration: 'Al-Qayyoom',
        english: 'The Self-Sustaining',
        meaning: 'The One who remains and does not end.'
    },
    {
        number: 64,
        arabic: 'الوَاجِدُ',
        transliteration: 'Al-Waajid',
        english: 'The Perceiver',
        meaning: 'The Rich who is never poor. Al-Wajd is Richness.'
    },
    {
        number: 65,
        arabic: 'المَاجِدُ',
        transliteration: 'Al-Maajid',
        english: 'The Illustrious',
        meaning: 'The One who is Majid.'
    },
    {
        number: 66,
        arabic: 'الوَاحِدُ',
        transliteration: 'Al-Waahid',
        english: 'The One',
        meaning: 'The One without a partner.'
    },
    {
        number: 67,
        arabic: 'الأَحَد',
        transliteration: 'Al-Ahad',
        english: 'The Unique',
        meaning: 'The One who is unique in His essence and attributes.'
    },
    {
        number: 68,
        arabic: 'الصَّمَدُ',
        transliteration: 'As-Samad',
        english: 'The Eternal',
        meaning: 'The Master who is relied upon in matters and reverted to in ones needs.'
    },
    {
        number: 69,
        arabic: 'القَادِرُ',
        transliteration: 'Al-Qaadir',
        english: 'The Capable',
        meaning: 'The One attributed with Power.'
    },
    {
        number: 70,
        arabic: 'المُقْتَدِرُ',
        transliteration: 'Al-Muqtadir',
        english: 'The Powerful',
        meaning: 'The One with the perfect Power that nothing is withheld from Him.'
    },
    {
        number: 71,
        arabic: 'المُقَدِّمُ',
        transliteration: 'Al-Muqaddim',
        english: 'The Expediter',
        meaning: 'The One who puts things in their right place. He makes ahead what He wills.'
    },
    {
        number: 72,
        arabic: 'المُؤَخِّرُ',
        transliteration: 'Al-Mu\'akhkhir',
        english: 'The Delayer',
        meaning: 'The One who puts things in their right place. He makes behind what He wills.'
    },
    {
        number: 73,
        arabic: 'الأَوَّلُ',
        transliteration: 'Al-Awwal',
        english: 'The First',
        meaning: 'The One whose Existence is without a beginning.'
    },
    {
        number: 74,
        arabic: 'الآخِرُ',
        transliteration: 'Al-Aakhir',
        english: 'The Last',
        meaning: 'The One whose Existence is without an end.'
    },
    {
        number: 75,
        arabic: 'الظَّاهِرُ',
        transliteration: 'Az-Zaahir',
        english: 'The Manifest',
        meaning: 'The One that nothing is above Him and nothing is underneath Him, hence He exists without a place.'
    },
    {
        number: 76,
        arabic: 'البَاطِنُ',
        transliteration: 'Al-Baatin',
        english: 'The Hidden',
        meaning: 'The One that nothing is above Him and nothing is underneath Him, hence He exists without a place.'
    },
    {
        number: 77,
        arabic: 'الوَالِي',
        transliteration: 'Al-Waali',
        english: 'The Governor',
        meaning: 'The One who owns things and manages them.'
    },
    {
        number: 78,
        arabic: 'المُتَعَالِي',
        transliteration: 'Al-Muta\'aali',
        english: 'The Most Exalted',
        meaning: 'The One who is clear from the attributes of the creation.'
    },
    {
        number: 79,
        arabic: 'البَرُّ',
        transliteration: 'Al-Barr',
        english: 'The Source of Goodness',
        meaning: 'The One who is kind to His creatures, who covered them with His sustenance and specified whoever He willed among them by His support, protection, and special mercy.'
    },
    {
        number: 80,
        arabic: 'التَّوَابُ',
        transliteration: 'At-Tawwaab',
        english: 'The Acceptor of Repentance',
        meaning: 'The One who grants repentance to whoever He willed among His creatures and accepts his repentance.'
    },
    {
        number: 81,
        arabic: 'المُنْتَقِمُ',
        transliteration: 'Al-Muntaqim',
        english: 'The Avenger',
        meaning: 'The One who victoriously prevails over His enemies and punishes them for their sins.'
    },
    {
        number: 82,
        arabic: 'العَفُوُّ',
        transliteration: 'Al-\'Afuww',
        english: 'The Pardoner',
        meaning: 'The One with wide forgiveness.'
    },
    {
        number: 83,
        arabic: 'الرَّؤُوفُ',
        transliteration: 'Ar-Ra\'oof',
        english: 'The Compassionate',
        meaning: 'The One with extreme Mercy. The Mercy of Allah is His will to endow upon whoever He willed among His creatures.'
    },
    {
        number: 84,
        arabic: 'مَالِكُ المُلْكِ',
        transliteration: 'Maalik-ul-Mulk',
        english: 'Master of the Kingdom',
        meaning: 'The One who controls the Dominion and gives dominion to whoever He willed.'
    },
    {
        number: 85,
        arabic: 'ذُوالجَلاَلِ وَالإِكْرَامِ',
        transliteration: 'Dhul-Jalaali wal-Ikraam',
        english: 'Lord of Glory and Honour',
        meaning: 'The One who deserves to be Exalted and not denied.'
    },
    {
        number: 86,
        arabic: 'المُقْسِطُ',
        transliteration: 'Al-Muqsit',
        english: 'The Equitable',
        meaning: 'The One who is Just in His judgment.'
    },
    {
        number: 87,
        arabic: 'الجَامِعُ',
        transliteration: 'Al-Jaami\'',
        english: 'The Gatherer',
        meaning: 'The One who gathers the creatures on a day that there is no doubt about, that is the Day of Judgment.'
    },
    {
        number: 88,
        arabic: 'الغَنِيُّ',
        transliteration: 'Al-Ghaniyy',
        english: 'The Rich',
        meaning: 'The One who does not need the creation.'
    },
    {
        number: 89,
        arabic: 'المُغْنِي',
        transliteration: 'Al-Mughni',
        english: 'The Enricher',
        meaning: 'The One who satisfies the necessities of the creatures.'
    },
    {
        number: 90,
        arabic: 'المَانِعُ',
        transliteration: 'Al-Maani\'',
        english: 'The Preventer',
        meaning: 'The Supporter who protects and gives victory to His pious believers.'
    },
    {
        number: 91,
        arabic: 'الضَّارَّ',
        transliteration: 'Ad-Daarr',
        english: 'The Distressor',
        meaning: 'The One who makes harm reach to whoever He willed and benefit to whoever He willed.'
    },
    {
        number: 92,
        arabic: 'النَّافِعُ',
        transliteration: 'An-Naafi\'',
        english: 'The Propitious',
        meaning: 'The One who gives benefit to whoever He willed.'
    },
    {
        number: 93,
        arabic: 'النُّورُ',
        transliteration: 'An-Noor',
        english: 'The Light',
        meaning: 'The One who guides.'
    },
    {
        number: 94,
        arabic: 'الهَادِي',
        transliteration: 'Al-Haadi',
        english: 'The Guide',
        meaning: 'The One whom with His Guidance His believers were guided, and with His Guidance the living beings have been guided to what is beneficial for them and protect them from what is harmful to them.'
    },
    {
        number: 95,
        arabic: 'البَدِيعُ',
        transliteration: 'Al-Badee\'',
        english: 'The Incomparable',
        meaning: 'The One who created the creation and formed it without any preceding example.'
    },
    {
        number: 96,
        arabic: 'البَاقِي',
        transliteration: 'Al-Baaqi',
        english: 'The Everlasting',
        meaning: 'The One that the state of non-existence is impossible for Him.'
    },
    {
        number: 97,
        arabic: 'الوَارِثُ',
        transliteration: 'Al-Waarith',
        english: 'The Inheritor',
        meaning: 'The One whose Existence remains.'
    },
    {
        number: 98,
        arabic: 'الرَّشِيدُ',
        transliteration: 'Ar-Rasheed',
        english: 'The Guide to Right Path',
        meaning: 'The One who guides.'
    },
    {
        number: 99,
        arabic: 'الصَّبُورُ',
        transliteration: 'As-Saboor',
        english: 'The Patient',
        meaning: 'The One who does not quickly punish the sinners.'
    }
];

/**
 * Get all 99 names of Allah
 * @returns {Object} Complete list of Asma ul Husna
 */
function getAllNames() {
    return {
        names: asmaUlHusna,
        total_count: 99,
        arabic_title: 'أسماء الله الحسنى',
        english_title: 'The 99 Beautiful Names of Allah',
        description: 'The 99 names (attributes) of Allah as mentioned in Islamic tradition',
        source: 'Derived from the Quran and authentic Hadith',
        recitation_benefits: 'Reciting and understanding these names brings one closer to Allah and is a means of worship and remembrance (dhikr)',
        hadith: 'Prophet Muhammad (PBUH) said: "Allah has ninety-nine names, one hundred minus one. Whoever memorizes them will enter Paradise." (Bukhari and Muslim)'
    };
}

/**
 * Get a specific name by number
 * @param {number} number - Name number (1-99)
 * @returns {Object} Specific name details or error
 */
function getNameByNumber(number) {
    if (!Number.isInteger(number) || number < 1 || number > 99) {
        throw new Error('Name number must be between 1 and 99');
    }
    
    const name = asmaUlHusna.find(n => n.number === number);
    
    return {
        name: name,
        context: {
            position: `${number} of 99`,
            arabic_title: 'أسماء الله الحسنى',
            english_title: 'The 99 Beautiful Names of Allah'
        }
    };
}

/**
 * Get a random name
 * @returns {Object} Random name from Asma ul Husna
 */
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * asmaUlHusna.length);
    const randomName = asmaUlHusna[randomIndex];
    
    return {
        name: randomName,
        context: {
            randomly_selected: true,
            position: `${randomName.number} of 99`,
            arabic_title: 'أسماء الله الحسنى',
            english_title: 'The 99 Beautiful Names of Allah',
            dhikr_suggestion: `Recite "سُبْحَانَ ${randomName.arabic}" (Subhan ${randomName.arabic}) - Glory be to ${randomName.english}`
        }
    };
}

/**
 * Search names by English meaning or transliteration
 * @param {string} query - Search query
 * @returns {Object} Search results
 */
function searchNames(query) {
    if (!query || typeof query !== 'string') {
        throw new Error('Search query must be a non-empty string');
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results = asmaUlHusna.filter(name => 
        name.english.toLowerCase().includes(searchTerm) ||
        name.transliteration.toLowerCase().includes(searchTerm) ||
        name.meaning.toLowerCase().includes(searchTerm)
    );
    
    return {
        query: query,
        results: results,
        count: results.length,
        message: results.length > 0 ? 
            `Found ${results.length} name(s) matching "${query}"` : 
            `No names found matching "${query}". Try searching for attributes like "merciful", "wise", "creator", etc.`
    };
}

/**
 * Get names for daily recitation (7 groups for 7 days)
 * @param {number} day - Day of week (1-7, where 1 is Monday)
 * @returns {Object} Names for specific day
 */
function getNamesForDay(day) {
    if (!Number.isInteger(day) || day < 1 || day > 7) {
        throw new Error('Day must be between 1 and 7 (1=Monday, 7=Sunday)');
    }
    
    const daysOfWeek = [
        '', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    
    // Divide 99 names into 7 groups (roughly 14 names per day)
    const namesPerDay = Math.ceil(99 / 7);
    const startIndex = (day - 1) * namesPerDay;
    const endIndex = Math.min(startIndex + namesPerDay, 99);
    
    const dailyNames = asmaUlHusna.slice(startIndex, endIndex);
    
    return {
        day_number: day,
        day_name: daysOfWeek[day],
        names: dailyNames,
        count: dailyNames.count,
        suggestion: `Recite these ${dailyNames.length} names today as part of your daily dhikr routine`,
        weekly_completion: `Complete all 99 names by reciting them throughout the week`
    };
}

/**
 * Validate name number parameter
 * @param {any} number - Number to validate
 * @returns {Object} Validation result
 */
function validateNameNumber(number) {
    const num = parseInt(number);
    
    if (isNaN(num) || num < 1 || num > 99) {
        return {
            isValid: false,
            error: 'Name number must be between 1 and 99'
        };
    }
    
    return {
        isValid: true,
        number: num
    };
}

module.exports = {
    getAllNames,
    getNameByNumber,
    getRandomName,
    searchNames,
    getNamesForDay,
    validateNameNumber
};