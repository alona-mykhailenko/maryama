export const NAV_LINKS = [
  { label: "The Place", href: "/#place" },
  { label: "Rooms", href: "/#rooms" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#footer" },
] as const;

export const RESERVE = {
  button: "Reserve",
  href: "/reserve",
  pageTitle: "Reserve",
} as const;

export const HERO = {
  kicker: "SLOW DOWN. DISCONNECT. BE. REPEAT.",
  title: "Welcome home",
  location: "Imsouane · Morocco",
  slotId: "mry-hero",
  slotSrc: "/images/main.JPG",
  slotAlt: "Maryama — the house at Imsouane",
  slotPlaceholder: "Drop the hero photograph",
} as const;

export const PLACE = {
  label: "01 — The Place",
  heading: "A restored fisherman's house in the mountains of Imsouane.",
  paragraphs: [
    "Maryama is more than a house. It is a piece of our family's heart — built from love, resilience and the quiet belief that even after loss, something beautiful can grow again. In 2024, after our family restaurant was demolished, my father and I started over with a handful of bricks, the hands of his lifelong friend Ibrahim, and a vision only I could see at the time.",
    "The house carries my mother’s name, our way of keeping her presence in everything we have built. Three rooms, a seasonal garden of mint and herbs you are welcome to pick from, and the ocean below. Our wish is simple: that you leave the noise behind, wake to the view, breathe deeper, and remember what it feels like to simply be.",
    "Endings are not always endings. Sometimes they are quiet beginnings. Welcome home.",
  ],
} as const;

export const PLACE_GALLERY = {
  images: [
    {
      id: "mry-place-1",
      src: "/images/view.JPG",
      alt: "Waves rolling into Imsouane bay below the cliffs",
      placeholder: "The bay below the house",
    },
    {
      id: "mry-place-2",
      src: "/images/pizza.JPG",
      alt: "Pizza baking in the wood-fired oven",
      placeholder: "Pizza night",
    },
    {
      id: "mry-place-3",
      src: "/images/view2.JPG",
      alt: "Sunset over the Atlantic from the house",
      placeholder: "Sunset over the water",
    },
  ],
  ratio: 2 / 3,
} as const;

export const ROOMS = {
  label: "02 — Rooms",
  photoPlaceholder: (name: string) => `${name} — room photograph`,
} as const;

export const ROOM_DETAILS = {
  back: "All rooms",
  backHref: "/#rooms",
  label: "The Room",
  guestsLabel: "Guests",
  rateLabel: "Rate",
  checkInLabel: "Check-in",
  checkIn: "From 3:00 PM",
  book: "Book",
  bookHref: (id: number) => `/rooms/${id}/book`,
  reserve: {
    addDates: "Add dates for prices",
    addDate: "Add date",
    chooseDates: "Choose your dates",
    breakdown: (nights: number, price: number) =>
      `${nights === 1 ? "1 night" : `${nights} nights`} × €${price}`,
    reserve: "Reserve",
    changeDates: "Change dates",
    checking: "Checking availability…",
    unavailable: "This room is taken on some of these nights. Try other dates.",
    note: "You won't be charged yet",
    clear: "Clear dates",
    close: "Close",
  },
  photoAlt: (name: string, index: number) => `${name} — photo ${index + 1}`,
} as const;

export const AVAILABILITY = {
  label: "03 — Availability",
  heading: "Choose your dates.",
  note: "Pick a check-in and a check-out day and the number of guests, then check which rooms are free for your stay.",
  checkInLabel: "Check-in",
  checkOutLabel: "Check-out",
  guestsLabel: "Guests",
  stayLabel: "Stay",
  emptyDate: "Select a date",
  emptyStay: "—",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  check: "Check availability",
  loading: "Checking the rooms…",
  error: "We couldn't check availability right now. Please try again, or write to us on WhatsApp.",
  availableTitle: (count: number) =>
    count === 1 ? "1 room free for your stay" : `${count} rooms free for your stay`,
  noneTitle: "No rooms free for these dates",
  noneNote: "Try other dates or fewer guests, or write to us on WhatsApp and we'll help you find a fit.",
  nights: (count: number) => (count === 1 ? "1 night" : `${count} nights`),
  guests: (count: number) => (count === 1 ? "1 guest" : `Up to ${count} guests`),
  perNight: (price: number) => `€${price} / night`,
  total: (price: number) => `€${price} total`,
} as const;

export const BOOKING = {
  pageTitle: (name: string) => `Book ${name}`,
  back: "Back to the room",
  backHref: (id: number) => `/rooms/${id}`,
  label: "Your stay",
  detailsLabel: "Your details",
  nameLabel: "Full name",
  emailLabel: "Email",
  phoneLabel: "Phone (WhatsApp)",
  messageLabel: "Message (optional)",
  messagePlaceholder: "Arrival time, questions, anything we should know",
  totalLabel: "Total",
  guestCount: (count: number) => (count === 1 ? "1 guest" : `${count} guests`),
  changeStay: "Change dates",
  datesRequired: "Choose your check-in and check-out dates",
  submit: "Request booking",
  note: "Nothing is charged now. We'll confirm your stay by email.",
  errors: {
    dates_unavailable: "These dates are no longer free for this room. Please pick others.",
    too_many_guests: "This room doesn't sleep that many guests.",
    invalid_dates: "Please pick a check-in from today and a stay of at most 90 nights.",
    generic: "We couldn't send your request right now. Please try again, or write to us on WhatsApp.",
  },
  successLabel: "Request received",
  successTitle: "Thank you.",
  successNote: (email: string) =>
    `Your booking is pending. We'll check everything and confirm by email at ${email}, usually the same day.`,
  successBack: "Back to the house",
} as const;

export const FAQ = {
  label: "03 — Good to know",
  heading: "Questions, answered.",
  note: "Anything else, write to us on WhatsApp — we answer the same day.",
  items: [
    {
      question: "Check-in and keys",
      answer:
        "Check-in is from 3:00 PM. Our manager meets you at the house, hands over the keys and shows you around. Tell us your arrival time and we will be waiting.",
    },
    {
      question: "Checkout",
      answer:
        "By 11:00 AM. Leave used towels in the bathroom basket, run the dishwasher, take the trash to the bins by the gate and return the keys to Khalid or the agreed spot.",
    },
    {
      question: "House rules",
      answer:
        "No smoking inside or on the balcony. Quiet hours from 10:00 PM to 8:00 AM. Only registered guests stay overnight. Please lock doors and windows when you go out.",
    },
    {
      question: "Kitchen, garden, laundry",
      answer:
        "The kitchen is fully equipped and yours to use, with fresh linens, towels, a washer and a dryer. Pick what you need from the seasonal garden — mint, herbs, vegetables. The village market is a short walk away.",
    },
    {
      question: "Surf and other things to do",
      answer:
        "We surf the longest wave in Africa with our guests, beginner to intermediate. Also surf skate sessions, the Timlaline dunes at sunset, a 40-minute hike down to a hidden beach, a day in Essaouira, and pizza nights at the house. Ask us for dates and prices.",
    },
  ],
} as const;

export const FOOTER = {
  brand: "Maryama",
  tagline: "Boutique house · Three rooms",
  address: {
    label: "Address",
    lines: ["12 Ocean Street", "Imsouane 80000", "Morocco"],
  },
  contact: {
    label: "Contact",
    phone: "+212 600 000 000",
    phoneHref: "tel:+212600000000",
    email: "hello@example.com",
    emailHref: "mailto:hello@example.com",
  },
  follow: {
    label: "Follow",
    socials: [
      {
        label: "Instagram",
        href: "https://instagram.com",
        icon: "instagram" as const,
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/212600000000",
        icon: "whatsapp" as const,
      },
    ],
  },
  copyright: "© 2026 Maryama",
  closingLine: "Slow down. Disconnect. Be. Repeat.",
} as const;
