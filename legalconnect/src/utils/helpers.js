// src/utils/helpers.js
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getInitials = (name) => {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

export const truncate = (str, len = 100) => {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "..." : str;
};

export const SPECIALIZATIONS = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Real Estate",
  "Immigration",
  "Intellectual Property",
  "Personal Injury",
  "Employment Law",
  "Tax Law",
  "Bankruptcy",
];

export const LOCATIONS = [
  "Dar es Salaam",
  "Dodoma",
  "Mwanza",
  "Arusha",
  "Mbeya",
  "Morogoro",
  "Tanga",
  "Kahama",
  "Tabora",
  "Kigoma",
  "Moshi",
  "Musoma",
  "Shinyanga",
  "Songea",
  "Lindi",
  "Mtwara",
  "Iringa",
  "Singida",
  "Bukoba",
  "Zanzibar",
  "Pemba",
  "Babati",
  "Sumbawanga",
  "Mpanda",
  "Kibaha",
  "Bagamoyo",
  "Kilosa",
  "Njombe",
  "Makambako",
  "Geita",
  "Simiyu",
  "Katavi",
  "Rukwa",
  "Ruvuma",
];

export const SEED_LAWYERS = [
  {
    id: "lawyer_1",
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@legalconnect.com",
    role: "lawyer",
    specialization: "Family Law",
    experience: 12,
    hourlyRate: 180,
    location: "New York, NY",
    barNumber: "NY-123456",
    bio: "Dedicated family law attorney with over a decade of experience in divorce, custody, and adoption cases.",
    rating: 4.9,
    reviewCount: 87,
    available: true,
    avatar: null,
  },
  {
    id: "lawyer_2",
    fullName: "James Okonkwo",
    email: "james.okonkwo@legalconnect.com",
    role: "lawyer",
    specialization: "Criminal Law",
    experience: 18,
    hourlyRate: 250,
    location: "Chicago, IL",
    barNumber: "IL-789012",
    bio: "Former prosecutor turned defense attorney. Aggressive representation with an unmatched track record.",
    rating: 4.8,
    reviewCount: 143,
    available: true,
    avatar: null,
  },
  {
    id: "lawyer_3",
    fullName: "Priya Sharma",
    email: "priya.sharma@legalconnect.com",
    role: "lawyer",
    specialization: "Immigration",
    experience: 9,
    hourlyRate: 150,
    location: "San Francisco, CA",
    barNumber: "CA-456789",
    bio: "Compassionate immigration lawyer helping families navigate the complex US immigration system.",
    rating: 4.9,
    reviewCount: 112,
    available: false,
    avatar: null,
  },
  {
    id: "lawyer_4",
    fullName: "Michael Torres",
    email: "michael.torres@legalconnect.com",
    role: "lawyer",
    specialization: "Corporate Law",
    experience: 15,
    hourlyRate: 300,
    location: "Los Angeles, CA",
    barNumber: "CA-234567",
    bio: "Top-tier corporate attorney specializing in M&A, venture capital, and startup legal strategy.",
    rating: 4.7,
    reviewCount: 64,
    available: true,
    avatar: null,
  },
  {
    id: "lawyer_5",
    fullName: "Amina Hassan",
    email: "amina.hassan@legalconnect.com",
    role: "lawyer",
    specialization: "Real Estate",
    experience: 7,
    hourlyRate: 130,
    location: "Dar es Salaam",
    barNumber: "TZ-001234",
    bio: "East Africa's leading property law specialist, guiding clients through complex real estate transactions.",
    rating: 4.8,
    reviewCount: 55,
    available: true,
    avatar: null,
  },
  {
    id: "lawyer_6",
    fullName: "David Chen",
    email: "david.chen@legalconnect.com",
    role: "lawyer",
    specialization: "Intellectual Property",
    experience: 11,
    hourlyRate: 200,
    location: "Boston, MA",
    barNumber: "MA-345678",
    bio: "Patent and trademark attorney protecting innovators and creators across tech and creative industries.",
    rating: 4.6,
    reviewCount: 78,
    available: false,
    avatar: null,
  },
];

export const SEED_TESTIMONIALS = [
  {
    id: 1,
    name: "Rebecca Nguyen",
    role: "Small Business Owner",
    text: "LegalConnect helped me find a corporate lawyer in under 10 minutes. The chat feature made it so easy to explain my situation before the formal consultation. Absolutely worth it.",
    rating: 5,
    lawyerName: "Michael Torres",
  },
  {
    id: 2,
    name: "Carlos Mendez",
    role: "Father of Two",
    text: "Going through a custody battle is emotionally exhausting. Sarah Mitchell was incredibly compassionate and fought hard for my rights. I wouldn't have found her without this platform.",
    rating: 5,
    lawyerName: "Sarah Mitchell",
  },
  {
    id: 3,
    name: "Fatima Al-Rashid",
    role: "International Student",
    text: "My visa situation was a nightmare. Priya broke everything down so clearly and got my status resolved in weeks. I recommend LegalConnect to every international student I meet.",
    rating: 5,
    lawyerName: "Priya Sharma",
  },
];
