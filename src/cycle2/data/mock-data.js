/**
 * Mock Data for Indigenous Art Atlas - Cycle 2 Frontend Prototype
 * This data simulates what will come from the database in Cycle 3
 */

const mockArtEntries = [
    {
        id: 1,
        title: "Ancient Cave Paintings of Kakadu",
        description: "These millennia-old rock art paintings in Kakadu National Park depict ancestral stories and dreamtime beings. The ochre paintings show intricate details of hunting scenes, spiritual figures, and the connection between land and sky. These artworks are among the oldest continuous artistic traditions in the world, dating back over 20,000 years.",
        artType: "Cave Art",
        artTypeId: 1,
        period: "Ancient",
        periodId: 1,
        condition: "Good condition with some fading due to natural weathering. Protected site with restricted access.",
        artistName: "Unknown (Traditional Owners)",
        latitude: -12.6524,
        longitude: 132.7599,
        locationDescription: "Kakadu National Park, Northern Territory",
        isSensitive: true,
        showExactLocation: false,
        images: [
            "images/mock/kakadu-1.jpg",
            "images/mock/kakadu-2.jpg",
            "images/mock/kakadu-3.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Dr. Sarah Mitchell",
        submitterId: 2,
        submissionDate: "2024-09-15",
        status: "approved",
        views: 342
    },
    {
        id: 2,
        title: "Gumatj Clan Creation Stories Mural",
        description: "A vibrant contemporary mural created by the Yirrkala community depicting Gumatj Clan creation stories. The mural combines traditional patterns with modern techniques, showing the connection between ancestral knowledge and contemporary expression. Created as part of a youth engagement program to pass cultural knowledge to the next generation.",
        artType: "Mural",
        artTypeId: 2,
        period: "Contemporary",
        periodId: 4,
        condition: "Excellent - recently completed in 2024",
        artistName: "Uncle Tommy Williams and Youth Art Group",
        latitude: -12.2543,
        longitude: 136.8895,
        locationDescription: "Yirrkala Community Center, Arnhem Land, Northern Territory",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/yirrkala-mural-1.jpg",
            "images/mock/yirrkala-mural-2.jpg",
            "images/mock/yirrkala-mural-3.jpg",
            "images/mock/yirrkala-mural-4.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Uncle Tommy Williams",
        submitterId: 3,
        submissionDate: "2024-10-05",
        status: "approved",
        views: 128
    },
    {
        id: 3,
        title: "Sydney Harbour Bridge Indigenous Artwork",
        description: "Large-scale public art installation on Sydney Harbour Bridge celebrating indigenous culture and reconciliation. Features vibrant colors and traditional dot painting techniques visible from across the harbor. This commissioned piece represents the ongoing journey of recognition and respect.",
        artType: "Installation",
        artTypeId: 5,
        period: "Contemporary",
        periodId: 4,
        condition: "Excellent - maintained by City of Sydney",
        artistName: "Various Artists Collective",
        latitude: -33.8523,
        longitude: 151.2108,
        locationDescription: "Sydney Harbour Bridge, Sydney, NSW",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/sydney-bridge-1.jpg",
            "images/mock/sydney-bridge-2.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Emma Chen",
        submitterId: 4,
        submissionDate: "2024-09-28",
        status: "approved",
        views: 567
    },
    {
        id: 4,
        title: "Uluru Rock Carvings",
        description: "Sacred petroglyphs at the base of Uluru, these carvings tell stories that have been passed down through countless generations. The exact location and detailed imagery are protected out of respect for Anangu traditional owners and the sacred nature of this site.",
        artType: "Rock Art",
        artTypeId: 2,
        period: "Ancient",
        periodId: 1,
        condition: "Protected site - condition monitoring ongoing",
        artistName: "Anangu Traditional Owners",
        latitude: -25.3444,
        longitude: 131.0369,
        locationDescription: "Uluru-Kata Tjuta National Park, Northern Territory (General Area)",
        isSensitive: true,
        showExactLocation: false,
        images: [
            "images/mock/uluru-general.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Dr. Sarah Mitchell",
        submitterId: 2,
        submissionDate: "2024-08-20",
        status: "approved",
        views: 892
    },
    {
        id: 5,
        title: "Bark Painting - Saltwater Country",
        description: "Traditional bark painting depicting the saltwater country of North East Arnhem Land. The painting shows fish, turtles, and ancestral beings in traditional cross-hatching technique. Created using natural ochres on stringybark, this piece represents the ongoing tradition of bark painting among Yolngu people.",
        artType: "Gallery Piece",
        artTypeId: 6,
        period: "Modern",
        periodId: 3,
        condition: "Excellent - professionally preserved and displayed",
        artistName: "Artist name withheld (Estate permission pending)",
        latitude: -37.8136,
        longitude: 144.9631,
        locationDescription: "National Gallery of Victoria, Melbourne, VIC",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/bark-painting-1.jpg",
            "images/mock/bark-painting-2.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Emma Chen",
        submitterId: 4,
        submissionDate: "2024-09-10",
        status: "approved",
        views: 234
    },
    {
        id: 6,
        title: "Grampians National Park Rock Shelters",
        description: "Ancient rock art shelters in the Grampians featuring hand stencils and ochre paintings. These artworks are evidence of tens of thousands of years of continuous occupation by the Jardwadjali and Djab Wurrung peoples. Public viewing areas allow respectful observation while protecting the art.",
        artType: "Cave Art",
        artTypeId: 1,
        period: "Ancient",
        periodId: 1,
        condition: "Good - protected by Parks Victoria with public access",
        artistName: "Jardwadjali and Djab Wurrung Traditional Owners",
        latitude: -37.1497,
        longitude: 142.5053,
        locationDescription: "Grampians National Park (Gariwerd), Victoria",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/grampians-1.jpg",
            "images/mock/grampians-2.jpg",
            "images/mock/grampians-3.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Dr. Sarah Mitchell",
        submitterId: 2,
        submissionDate: "2024-07-15",
        status: "approved",
        views: 445
    },
    {
        id: 7,
        title: "Contemporary Sculpture - Meeting Place",
        description: "A striking bronze sculpture representing the traditional meeting place concept. The intertwined figures symbolize the coming together of communities, sharing knowledge and stories. Located in a public square, this artwork serves as a daily reminder of indigenous culture in urban spaces.",
        artType: "Sculpture",
        artTypeId: 4,
        period: "Contemporary",
        periodId: 4,
        condition: "Excellent - public artwork maintained by Brisbane City Council",
        artistName: "Renowned Contemporary Artist (Name available upon request)",
        latitude: -27.4698,
        longitude: 153.0251,
        locationDescription: "South Bank, Brisbane, QLD",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/brisbane-sculpture-1.jpg",
            "images/mock/brisbane-sculpture-2.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Emma Chen",
        submitterId: 4,
        submissionDate: "2024-08-05",
        status: "approved",
        views: 189
    },
    {
        id: 8,
        title: "Fremantle Prison Murals",
        description: "Powerful murals created by indigenous artists during the colonial period, now preserved as part of the prison's historical record. These artworks tell stories of resistance, resilience, and cultural survival. The murals provide important historical context about the impact of colonization.",
        artType: "Mural",
        artTypeId: 2,
        period: "Colonial Era",
        periodId: 2,
        condition: "Fair - preserved as historical artifact, some deterioration",
        artistName: "Historical Artists - Names being researched",
        latitude: -32.0569,
        longitude: 115.7439,
        locationDescription: "Fremantle Prison, Fremantle, WA",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/fremantle-1.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Dr. Sarah Mitchell",
        submitterId: 2,
        submissionDate: "2024-06-22",
        status: "approved",
        views: 312
    },
    {
        id: 9,
        title: "Flinders Ranges Petroglyphs",
        description: "Ancient rock engravings in the Flinders Ranges showing animals, hunting tools, and symbolic patterns. These petroglyphs are part of the cultural heritage of the Adnyamathanha people and demonstrate sophisticated artistic techniques developed over thousands of years.",
        artType: "Rock Art",
        artTypeId: 2,
        period: "Ancient",
        periodId: 1,
        condition: "Good - protected site with guided tours available",
        artistName: "Adnyamathanha Traditional Owners",
        latitude: -31.5477,
        longitude: 138.6256,
        locationDescription: "Flinders Ranges, South Australia",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/flinders-1.jpg",
            "images/mock/flinders-2.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Dr. Sarah Mitchell",
        submitterId: 2,
        submissionDate: "2024-05-30",
        status: "approved",
        views: 276
    },
    {
        id: 10,
        title: "NAIDOC Week Community Installation",
        description: "Temporary public art installation created for NAIDOC Week celebrations. Features contributions from multiple indigenous artists and community members, creating a collaborative expression of culture, pride, and unity. The installation includes interactive elements where visitors can learn about local indigenous languages.",
        artType: "Installation",
        artTypeId: 5,
        period: "Contemporary",
        periodId: 4,
        condition: "Temporary installation - photographed for permanent record",
        artistName: "Community Collective",
        latitude: -35.2809,
        longitude: 149.1300,
        locationDescription: "Canberra City Center, ACT",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/canberra-installation-1.jpg",
            "images/mock/canberra-installation-2.jpg",
            "images/mock/canberra-installation-3.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Emma Chen",
        submitterId: 4,
        submissionDate: "2024-07-08",
        status: "approved",
        views: 198
    },
    {
        id: 11,
        title: "Tasmania Aboriginal Shell Necklaces Display",
        description: "Historical shell necklaces created by Tasmanian Aboriginal women, now preserved in museum collection. These intricate necklaces demonstrate sophisticated craftsmanship and were important items of cultural exchange. Each necklace carries stories of the women who made them and the country they came from.",
        artType: "Gallery Piece",
        artTypeId: 6,
        period: "Colonial Era",
        periodId: 2,
        condition: "Excellent - professionally conserved in climate-controlled environment",
        artistName: "Tasmanian Aboriginal Women (Historical)",
        latitude: -42.8821,
        longitude: 147.3272,
        locationDescription: "Tasmanian Museum and Art Gallery, Hobart, TAS",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/shell-necklaces-1.jpg",
            "images/mock/shell-necklaces-2.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Dr. Sarah Mitchell",
        submitterId: 2,
        submissionDate: "2024-04-18",
        status: "approved",
        views: 156
    },
    {
        id: 12,
        title: "Adelaide Botanic Garden Indigenous Plants Sculpture Trail",
        description: "A sculpture trail through the Adelaide Botanic Garden featuring works that celebrate indigenous plant knowledge and connection to country. Each sculpture is paired with information about traditional plant uses, creating an educational journey through art and culture.",
        artType: "Sculpture",
        artTypeId: 4,
        period: "Contemporary",
        periodId: 4,
        condition: "Excellent - outdoor sculptures maintained by botanic garden",
        artistName: "Multiple Artists",
        latitude: -34.9196,
        longitude: 138.6075,
        locationDescription: "Adelaide Botanic Garden, Adelaide, SA",
        isSensitive: false,
        showExactLocation: true,
        images: [
            "images/mock/adelaide-sculpture-1.jpg",
            "images/mock/adelaide-sculpture-2.jpg",
            "images/mock/adelaide-sculpture-3.jpg"
        ],
        primaryImageIndex: 0,
        submittedBy: "Emma Chen",
        submitterId: 4,
        submissionDate: "2024-09-01",
        status: "approved",
        views: 223
    }
];

// Art types for filtering
const artTypes = [
    { id: 1, name: "Cave Art", description: "Ancient rock paintings and engravings found in caves" },
    { id: 2, name: "Rock Art", description: "Petroglyphs and rock carvings on outdoor rock surfaces" },
    { id: 3, name: "Mural", description: "Large-scale wall paintings on buildings or public spaces" },
    { id: 4, name: "Sculpture", description: "Three-dimensional artworks in various materials" },
    { id: 5, name: "Installation", description: "Site-specific contemporary art installations" },
    { id: 6, name: "Gallery Piece", description: "Works displayed in galleries and museums" }
];

// Art periods for filtering
const artPeriods = [
    { id: 1, name: "Ancient", description: "Pre-colonial era (before 1788)" },
    { id: 2, name: "Colonial Era", description: "During colonization period (1788-1900)" },
    { id: 3, name: "Modern", description: "20th century (1901-2000)" },
    { id: 4, name: "Contemporary", description: "21st century (2001-present)" }
];

// Mock users for attribution
const mockUsers = [
    {
        id: 1,
        username: "admin",
        role: "admin",
        displayName: "Site Administrator"
    },
    {
        id: 2,
        username: "sarah_mitchell",
        role: "general",
        displayName: "Dr. Sarah Mitchell",
        bio: "Academic researcher specializing in Indigenous Australian art and cultural heritage."
    },
    {
        id: 3,
        username: "tommy_williams",
        role: "artist",
        displayName: "Uncle Tommy Williams",
        bio: "Yolngu Elder and traditional artist from Arnhem Land, dedicated to sharing appropriate cultural knowledge."
    },
    {
        id: 4,
        username: "emma_chen",
        role: "general",
        displayName: "Emma Chen",
        bio: "Graphic designer and art enthusiast passionate about indigenous art and culture."
    }
];

// Get functions for easy data access
function getArtEntryById(id) {
    return mockArtEntries.find(entry => entry.id === parseInt(id));
}

function getAllApprovedArt() {
    return mockArtEntries.filter(entry => entry.status === 'approved');
}

function getArtByType(typeId) {
    return mockArtEntries.filter(entry => entry.artTypeId === parseInt(typeId) && entry.status === 'approved');
}

function getArtByPeriod(periodId) {
    return mockArtEntries.filter(entry => entry.periodId === parseInt(periodId) && entry.status === 'approved');
}

function searchArt(keyword) {
    keyword = keyword.toLowerCase();
    return mockArtEntries.filter(entry =>
        entry.status === 'approved' && (
            entry.title.toLowerCase().includes(keyword) ||
            entry.description.toLowerCase().includes(keyword) ||
            entry.artistName.toLowerCase().includes(keyword) ||
            entry.locationDescription.toLowerCase().includes(keyword)
        )
    );
}

function getRecentArt(count = 6) {
    return mockArtEntries
        .filter(entry => entry.status === 'approved')
        .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
        .slice(0, count);
}

function getUserById(id) {
    return mockUsers.find(user => user.id === parseInt(id));
}
