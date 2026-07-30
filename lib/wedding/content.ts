export const content = {
  "hero.subtitle": "We're getting married",
  "hero.date": "12 September 2026",
  "hero.rsvp": "RSVP",
  "countdown.title": "Countdown",
  "countdown.until": "Until 12 September 2026",
  "countdown.days": "Days",
  "countdown.hours": "Hours",
  "countdown.minutes": "Minutes",
  "countdown.seconds": "Seconds",
  "welcome.title": "Welcome!",
  "welcome.text":
    "We warmly invite you to celebrate our wedding day with us in the beautiful town of Ronda, Andalusia. We look forward to sharing this unforgettable moment with our most special people.",
  "events.title": "The Venue",
  "events.subtitle": "Where we celebrate",
  "events.date": "12 September 2026",
  "events.openMaps": "Open in Maps",
  "program.title": "Day Programme",
  "program.date": "12 September 2026",
  "program.arrival": "Arrival",
  "program.ceremony": "Ceremony",
  "program.cocktails": "Cocktails",
  "program.dinner": "Dinner",
  "program.cake": "Cutting the Cake",
  "program.finish": "Finish",
  "dress.title": "Dress Code",
  "dress.men": "Men",
  "dress.menDesc": "Dark suit and tie",
  "dress.women": "Women",
  "dress.womenDesc": "Cocktail or formal dress",
  "accommodation.title": "Accommodation",
  "accommodation.subtitle":
    "Finca El Olivar does not offer lodging. Here are some recommended options nearby.",
  "accommodation.recommend":
    'For hotels without direct agreements, please mention "Wedding at Finca El Olivar" to access preferential rates.',
  "info.title": "Come Say Hello...",
  "info.subtitle":
    "These are informal gatherings, so feel free to join us if you're in the area.",
  "transport.title": "Location & Transportation",
  "transport.fullAddress":
    "Finca El Olivar, Camino de los Olivos s/n, 29400 Ronda, Málaga – Spain",
  "transport.byCarDetails": `From Málaga: ~1h 30min via A-357 and A-367
From Seville: ~2h via A-376
From Marbella: ~1h via A-397`,
  "gifts.title": "Gifts",
  "gifts.text":
    "Your presence is our greatest gift. If you wish to give us something, please find our bank account information below:",
  "gifts.account1": "CaixaBank – Damola",
  "gifts.account1details": `IBAN: ES00 0000 0000 0000 0000 0000
BIC/SWIFT: XXXXXXXXXX`,
  "gifts.account2": "Banco Santander – Ayomide",
  "gifts.account2details": `IBAN: ES00 0000 0000 0000 0000 0000
BIC/SWIFT: XXXXXXXXXX`,
  "rsvp.title": "RSVP",
  "rsvp.subtitle": "Let us know if you can make it",
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
  "footer.madeBy": "Made with love by",
} as const;

export type ContentKey = keyof typeof content;

export function t(key: ContentKey): string {
  return content[key];
}
