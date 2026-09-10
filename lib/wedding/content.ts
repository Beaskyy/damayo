export const content = {
  "hero.subtitle": "We're getting married",
  "hero.date": "5 December 2026",
  "hero.rsvp": "RSVP",
  "countdown.title": "Countdown",
  "countdown.until": "Until 5 December 2026",
  "countdown.days": "Days",
  "countdown.hours": "Hours",
  "countdown.minutes": "Minutes",
  "countdown.seconds": "Seconds",
  "welcome.title": "Welcome!",
  "welcome.text":
    "We sincerely invite you to join us as we celebrate the beginning of our forever with family and friends in love, laughter, and gratitude.\n\nOur journey began with faith, friendship, and a shared dream, and we are so grateful to celebrate this new chapter surrounded by the people who have shaped our story.",
  "events.title": "The Venue",
  "events.subtitle": "Where we celebrate",
  "events.date": "Saturday, 5th December 2026",
  "events.openMaps": "Open in Maps",
  "program.title": "Day Programme",
  "program.date": "Saturday, 5th December 2026",
  "program.arrival": "Arrival",
  "program.ceremony": "Ceremony",
  "program.cocktails": "Cocktails",
  "program.dinner": "Dinner",
  "program.cake": "Cutting the Cake",
  "program.finish": "Finish",
  "dress.title": "Colours of the Day",
  "dress.men": "White, Purple & Olive Green",
  "dress.menDesc": "Please dress in the wedding colours of the day.",
  "dress.women": "RSVP",
  "dress.womenDesc":
    "ADESINA ADAMS 8102516399 | OYEYINKA OYINDAMOLA 8076240495",
  "accommodation.title": "Accomodation & Travel",
  "accommodation.subtitle":
    "We look forward to celebrating with you. Please plan your journey in advance for a smooth arrival.",
  "accommodation.recommend":
    "Kindly note the event details and arrival time for both the church service and the engagement ceremony.",
  "info.title": "Event Details",
  "info.subtitle":
    "Join us for a meaningful celebration filled with faith, joy, and family. We would be honoured to celebrate this special day with you and share in the beginning of our forever.",
  "transport.title": "Location & Transportation",
  "transport.fullAddress":
    "Hidden Manna Ministry, 1 Manna Arena Way, Behind Ilesha Garage, off New Express Road, Ilesha, Osogbo",
  "transport.byCarDetails": `Church Service
Date: Saturday, 5th December, 2026
Venue: Hidden Manna Ministry
Address: 1 Manna Arena Way, Behind Ilesha Garage, off New Express Road, Ilesha, Osogbo
Time: 8:00 AM

Engagement
Date: Saturday, 5th December, 2026
Venue: Osamdo House, Km 4, Gbongan-Ibadan Road, Osogbo
Time: 11:00 AM | Reception follows immediately

Please plan to arrive 15-20 minutes early. Parking is available on site and rideshare drop-off is recommended for convenience.`,
  "gifts.title": "Gifts",
  "gifts.text":
    "Your presence is our greatest gift. If you wish to give us something, we will be grateful for your generosity.\n\nIf you would like to contribute financially, the details below are provided for your convenience.",
  "gifts.account1": "ADESINA ADAMS – Gift Support",
  "gifts.account1details": `Account Name: ADESINA ADAMS
Account Number: 8102516399
Bank: OPAY`,
  "gifts.account2": "OYEYINKA OYINDAMOLA – Gift Support",
  "gifts.account2details": `Account Name: OYEYINKA OYINDAMOLA
Account Number: 8076240495
Bank: OPAY`,
  "rsvp.title": "RSVP",
  "rsvp.subtitle": "Please let us know if you can celebrate with us. We would love to see you there.",
  "rsvp.attend": "Will you be attending? *",
  "rsvp.yes": "Yes, I'll be there",
  "rsvp.no": "Unfortunately, I can't make it",
  "rsvp.fullName": "Full name *",
  "rsvp.enterName": "Enter your name",
  "rsvp.howMany": "How many guests?",
  "rsvp.person1": "Person 1 (Main contact)",
  "rsvp.personN": "Person",
  "rsvp.name": "Full name",
  "rsvp.email": "Email address",
  "rsvp.dietary": "Dietary requirements",
  "rsvp.dietaryPlaceholder": "e.g. vegetarian, allergies, etc.",
  "rsvp.childrenQuestion": "Will any children be attending?",
  "rsvp.childrenCount": "How many children?",
  "rsvp.childrenYes": "Yes",
  "rsvp.childrenNo": "No",
  "rsvp.message": "Message for the couple",
  "rsvp.messagePlaceholder": "Is there anything you'd like to tell us?",
  "rsvp.sending": "Sending...",
  "rsvp.send": "Send RSVP",
  "rsvp.error": "Could not send your response. Please try again.",
  "confirm.thankYou": "Thank You",
  "confirm.cantMake":
    "We're sorry you can't make it. We'll be thinking of you on our special day.",
  "confirm.thankResponse": "Thank you for your response!",
  "confirm.excited": "We're so excited to celebrate with you.",
  "confirm.thankPart": "Thank you for being part of our story.",
  "confirm.lookForward": "We look forward to seeing you on:",
  "confirm.addCalendar": "Add to Calendar",
  "confirm.plansChange":
    "If your plans change and you can no longer attend, please let us know as soon as possible.",
} as const;

export type ContentKey = keyof typeof content;

export function t(key: ContentKey): string {
  return content[key];
}
