// Straight-in's own MONTHLY campaign reports (PDFs Olivier uploaded on 2026-11-05).
// They cover the whole month, including the last weeks that arrive after the 1st via the
// weekly links. When a month is listed here, its Network totals, per-account lines and named
// opportunities come from these reports instead of the summed weekly trajectories.
export interface SiMonthlyAccount { no: number; account: string; label: string; sent: number; accepted: number; messages: number; opportunities: number; followups: number; inmails: number; opps: { name: string; title: string; company: string; date: string }[] }
export const SI_MONTHLY: Record<string, SiMonthlyAccount[]> = {
  '2026-10': [
    {
      "no": 229,
      "account": "Alexandre",
      "label": "Alexandre Rouleau",
      "sent": 475,
      "accepted": 109,
      "messages": 109,
      "opportunities": 2,
      "followups": 74,
      "inmails": 75,
      "opps": [
        {
          "name": "Jérôme Laberge",
          "title": "Directeur des ventes",
          "company": "Canac",
          "date": "2026-10-28"
        },
        {
          "name": "Clayton Blakeley",
          "title": "Director of Sales and Operations Ontario",
          "company": "Southern Glazer's Wine & Spirits",
          "date": "2026-10-22"
        }
      ]
    },
    {
      "no": 229,
      "account": "Anne",
      "label": "Anne Bougel",
      "sent": 700,
      "accepted": 252,
      "messages": 252,
      "opportunities": 1,
      "followups": 479,
      "inmails": 163,
      "opps": [
        {
          "name": "Victor Hwangbo",
          "title": "Marketing Programs Specialist",
          "company": "Pharmasave Canada",
          "date": "2026-10-08"
        }
      ]
    },
    {
      "no": 175,
      "account": "Steve",
      "label": "Steve Gauthier",
      "sent": 704,
      "accepted": 231,
      "messages": 231,
      "opportunities": 13,
      "followups": 351,
      "inmails": 90,
      "opps": [
        {
          "name": "Marco Sales",
          "title": "Global Director RE Operations",
          "company": "Hipoges",
          "date": "2026-10-28"
        },
        {
          "name": "Sheila Hie",
          "title": "Head of Banks (Singapore & Thailand)",
          "company": "ANZ",
          "date": "2026-10-23"
        },
        {
          "name": "Julio Castro Zuazo",
          "title": "Managing Director - Head of FX Continental Europe Risk Solutions Group",
          "company": "Santander Corporate & Investment Banking",
          "date": "2026-10-22"
        },
        {
          "name": "Kanika Berry",
          "title": "Managing Director, Head of FX Structuring and Solutions",
          "company": "Citi",
          "date": "2026-10-22"
        },
        {
          "name": "Yoshiharu (Yoshi) Kamo",
          "title": "Chief Financial Officer at Assurant Japan",
          "company": "Assurant",
          "date": "2026-10-22"
        },
        {
          "name": "Matthew Allen",
          "title": "Managing Director, Asia Pacific, Perpetual",
          "company": "Perpetual Limited",
          "date": "2026-10-20"
        },
        {
          "name": "SHILADITYA CHOUDHURI",
          "title": "Managing Director",
          "company": "Indosuez Wealth Management",
          "date": "2026-10-19"
        },
        {
          "name": "Daan Spoelstra",
          "title": "Managing Director",
          "company": "AB Bernstein",
          "date": "2026-10-19"
        },
        {
          "name": "Stephanie D. Miller",
          "title": "Chief Operating Officer",
          "company": "Juniper Square",
          "date": "2026-10-15"
        },
        {
          "name": "Abbas A. Rangwala",
          "title": "Managing Director, Head of M&A",
          "company": "Natixis Corporate & Investment Banking",
          "date": "2026-10-13"
        },
        {
          "name": "Timothy Tan",
          "title": "Associate Director, Cash Service Strategy & Transformation",
          "company": "Standard Chartered",
          "date": "2026-10-08"
        },
        {
          "name": "Erwin Van Geyte",
          "title": "Managing Director",
          "company": "Aon",
          "date": "2026-10-01"
        },
        {
          "name": "Claire-Louise Deanfield",
          "title": "Managing Director",
          "company": "PJT Partners",
          "date": "2026-10-01"
        }
      ]
    },
    {
      "no": 175,
      "account": "Noza",
      "label": "Noza Mutalova",
      "sent": 550,
      "accepted": 152,
      "messages": 152,
      "opportunities": 12,
      "followups": 204,
      "inmails": 68,
      "opps": [
        {
          "name": "Santiago Cuarterola",
          "title": "Director of Business Development - International Markets -",
          "company": "Capital One",
          "date": "2026-10-28"
        },
        {
          "name": "Francesca Mauger",
          "title": "Sales & Relationship Manager",
          "company": "Alter Domus",
          "date": "2026-10-20"
        },
        {
          "name": "Chris Fiscalini",
          "title": "Director | Growth & Strategy",
          "company": "Moody's Analytics",
          "date": "2026-10-20"
        },
        {
          "name": "Anup Singh",
          "title": "Head of Markets Critical Operations Change & SEA Operations",
          "company": "ANZ",
          "date": "2026-10-19"
        },
        {
          "name": "Kaushik Kadayam",
          "title": "Executive Director, Global Transformation",
          "company": "Standard Chartered",
          "date": "2026-10-15"
        },
        {
          "name": "Binayak Dutta",
          "title": "Senior Managing Director and Group Chief Business Operations Officer",
          "company": "FWD Insurance",
          "date": "2026-10-14"
        },
        {
          "name": "Toyokazu Kido",
          "title": "Managing Director, Head of Asia Pacific Market & Liquidity Risk Management",
          "company": "Mizuho",
          "date": "2026-10-13"
        },
        {
          "name": "Abbas A. Rangwala",
          "title": "Managing Director, Head of M&A",
          "company": "Natixis Corporate & Investment Banking",
          "date": "2026-10-13"
        },
        {
          "name": "Hyunmi Park",
          "title": "Global Head of New Business & Underwriting Operations",
          "company": "Chubb Life",
          "date": "2026-10-08"
        },
        {
          "name": "Vineet Mehta",
          "title": "Managing Director",
          "company": "UBS",
          "date": "2026-10-07"
        },
        {
          "name": "Virendra Dhir",
          "title": "Managing Director",
          "company": "Standard Chartered",
          "date": "2026-10-07"
        },
        {
          "name": "Vikram Sinha",
          "title": "Managing Director",
          "company": "Citi",
          "date": "2026-10-02"
        }
      ]
    },
    {
      "no": 200,
      "account": "",
      "label": "Vincent Puard",
      "sent": 654,
      "accepted": 263,
      "messages": 244,
      "opportunities": 10,
      "followups": 526,
      "inmails": 25,
      "opps": [
        {
          "name": "Radia Johnson",
          "title": "Senior Director, Computational Discovery Science",
          "company": "Tempus AI",
          "date": "2026-10-29"
        },
        {
          "name": "Shyam Kannan",
          "title": "Research Associate - Antibody Development",
          "company": "Antibodies Incorporated",
          "date": "2026-10-28"
        },
        {
          "name": "Harold Jerome Coyne III",
          "title": "Principal Scientist - Antibodies",
          "company": "BBI Solutions",
          "date": "2026-10-28"
        },
        {
          "name": "Aynaz Seta",
          "title": "CMC & Development Programs Manager",
          "company": "Starpharma",
          "date": "2026-10-21"
        },
        {
          "name": "Giulio Russo",
          "title": "Associate Director, Early Discovery",
          "company": "Genmab",
          "date": "2026-10-19"
        },
        {
          "name": "Laurence Tessier",
          "title": "Head of Informatics and Antibody Engineering",
          "company": "Immune Biosolutions inc.",
          "date": "2026-10-15"
        },
        {
          "name": "Chloé Reynas",
          "title": "R&D Scientist Recombinant antibodies development",
          "company": "Medix Biochemica",
          "date": "2026-10-09"
        },
        {
          "name": "Mina Daoud",
          "title": "Head of Early Stage Development",
          "company": "UGA Biopharma GmbH",
          "date": "2026-10-07"
        },
        {
          "name": "Yensin Ang",
          "title": "Executive Director, Head of Preclinical Research",
          "company": "Lexeo Therapeutics",
          "date": "2026-10-06"
        },
        {
          "name": "Roy Ehling",
          "title": "Principal Scientist - Biologics Development Lead",
          "company": "Botnar Institute of Immune Engineering – BIIE",
          "date": "2026-10-02"
        }
      ]
    },
    {
      "no": 233,
      "account": "",
      "label": "Dmitri Petratchenko",
      "sent": 632,
      "accepted": 92,
      "messages": 92,
      "opportunities": 1,
      "followups": 227,
      "inmails": 163,
      "opps": [
        {
          "name": "Ali Ashrafzadeh",
          "title": "Vice President Clinical Development",
          "company": "Electra Therapeutics",
          "date": "2026-10-16"
        }
      ]
    },
    {
      "no": 245,
      "account": "",
      "label": "Tunahan Cakir",
      "sent": 757,
      "accepted": 256,
      "messages": 247,
      "opportunities": 6,
      "followups": 492,
      "inmails": 30,
      "opps": [
        {
          "name": "Aamir Ali",
          "title": "Chief Medical Officer",
          "company": "TrilliumBiO",
          "date": "2026-10-27"
        },
        {
          "name": "Madeline Allen",
          "title": "Genetic Counselor Manager",
          "company": "NxGen MDx",
          "date": "2026-10-19"
        },
        {
          "name": "Kristin Rand",
          "title": "Senior Director, Genomics Product",
          "company": "Truveta",
          "date": "2026-10-13"
        },
        {
          "name": "Shawn Walters",
          "title": "Director of Laboratory Services",
          "company": "Golden Valley Memorial Healthcare",
          "date": "2026-10-08"
        },
        {
          "name": "Carrie Cibulskis",
          "title": "Director, Cancer Genomics",
          "company": "Broad Clinical Labs",
          "date": "2026-10-05"
        },
        {
          "name": "Steven Bray",
          "title": "Principal Clinical Geneticist",
          "company": "Fountain Life",
          "date": "2026-10-02"
        }
      ]
    },
    {
      "no": 246,
      "account": "",
      "label": "David Liese",
      "sent": 629,
      "accepted": 305,
      "messages": 295,
      "opportunities": 9,
      "followups": 365,
      "inmails": 65,
      "opps": [
        {
          "name": "Andrew Ratcliffe",
          "title": "Chief Scientific Officer",
          "company": "Domainex",
          "date": "2026-10-28"
        },
        {
          "name": "Reto Muller",
          "title": "Senior Scientist II",
          "company": "Miltenyi Biotec",
          "date": "2026-10-22"
        },
        {
          "name": "Andrew Stewart",
          "title": "Head of Process Development - Director",
          "company": "Invaio",
          "date": "2026-10-20"
        },
        {
          "name": "Fabrice Berrué",
          "title": "Director of Research Development",
          "company": "National Research Council Canada",
          "date": "2026-10-19"
        },
        {
          "name": "Stefan Gajewski",
          "title": "Principal Scientist",
          "company": "Nurix Therapeutics",
          "date": "2026-10-16"
        },
        {
          "name": "Ramzahn Alizadeh",
          "title": "Associate Director, Strategic Operations",
          "company": "Siegfried",
          "date": "2026-10-13"
        },
        {
          "name": "Ivan Kovacik",
          "title": "Principal Scientist",
          "company": "Alnylam Pharmaceuticals",
          "date": "2026-10-06"
        },
        {
          "name": "Curtis Sprouse",
          "title": "Co-Founder",
          "company": "Amplio Pharma BV",
          "date": "2026-10-01"
        },
        {
          "name": "Filippo Cipriani",
          "title": "Senior Scientist at The Jackson Laboratory",
          "company": "JAX-NYSCF Collaborative",
          "date": "2026-10-01"
        }
      ]
    },
    {
      "no": 247,
      "account": "",
      "label": "Charles Gachet-Dieuzeide",
      "sent": 530,
      "accepted": 99,
      "messages": 99,
      "opportunities": 3,
      "followups": 240,
      "inmails": 85,
      "opps": [
        {
          "name": "Steven Davenport",
          "title": "Head of US Production & Partnerships",
          "company": "Fís Éireann/Screen Ireland",
          "date": "2026-10-26"
        },
        {
          "name": "Josh Levine",
          "title": "Head of Production, Vox Creative",
          "company": "Vox Media",
          "date": "2026-10-23"
        },
        {
          "name": "Harry Karidis",
          "title": "Director/Executive Producer",
          "company": "Karidis Productions, Inc.",
          "date": "2026-10-06"
        }
      ]
    },
    {
      "no": 248,
      "account": "",
      "label": "Amos Lee",
      "sent": 626,
      "accepted": 253,
      "messages": 253,
      "opportunities": 8,
      "followups": 438,
      "inmails": 45,
      "opps": [
        {
          "name": "Chinh Duong",
          "title": "Principal Scientist, R&D",
          "company": "Decoy Therapeutics Inc.",
          "date": "2026-10-26"
        },
        {
          "name": "Su Hong",
          "title": "Chief Executive Officer",
          "company": "Psomagen",
          "date": "2026-10-19"
        },
        {
          "name": "Guido Furlotti",
          "title": "Drug Substance Development Science Lead",
          "company": "Angelini Pharma",
          "date": "2026-10-19"
        },
        {
          "name": "Eric T. Dawson",
          "title": "Founder",
          "company": "Phileal",
          "date": "2026-10-15"
        },
        {
          "name": "Joon-Yong Lee",
          "title": "Director of Bioinformatics",
          "company": "PrognomiQ Inc",
          "date": "2026-10-15"
        },
        {
          "name": "Katherine Chacón Vargas",
          "title": "R&D Scientist III",
          "company": "Synbiotic Health",
          "date": "2026-10-14"
        },
        {
          "name": "Panagiotis Mantas",
          "title": "Director of Bioinformatics",
          "company": "Pythia BioSciences",
          "date": "2026-10-06"
        },
        {
          "name": "Clémence Yumie Hurni",
          "title": "Research Scientist - 3D Spatial Biology",
          "company": "Wyss Geneva",
          "date": "2026-10-05"
        }
      ]
    },
    {
      "no": 250,
      "account": "",
      "label": "Amphasys AG",
      "sent": 425,
      "accepted": 55,
      "messages": 55,
      "opportunities": 0,
      "followups": 30,
      "inmails": 57,
      "opps": []
    }
  ],
}
