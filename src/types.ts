export interface CeremonyDetails {
  brideName: string;
  brideParents: string;
  groomName: string;
  groomParents: string;
  ceremonyType: string; // e.g. "Engagement Ceremony"
  monogram: string; // e.g. "A & F" or "D & A"
  eventDate: {
    day: string;
    month: string;
    year: string;
    fullDateString: string;
    time: string;
  };
  venue: {
    name: string;
    address: string;
    cityState: string;
    mapUrl: string;
  };
  welcomeMessage: string;
  invitationNote: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface RSVPRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attendance: 'attending' | 'declined';
  guestCount: number;
  guestNames?: string;
  dietaryPreference: 'Pure Vegetarian' | 'Jain Vegetarian' | 'Vegetarian' | 'Vegan' | 'No Restrictions';
  message: string;
  submittedAt: string;
}
