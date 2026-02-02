export type EventItem = {
  id: string;
  title: string;
  time: string;
  location: string;
  spots: number;
  tags: string[];
  dateLabel: string;
};

export const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Morning Yoga in the Park",
    time: "7:00 AM – 8:00 AM",
    location: "Hyde Park, Sydney",
    spots: 10,
    tags: ["Today", "Wellness", "Outdoor"],
    dateLabel: "Today",
  },
  {
    id: "2",
    title: "Tech Networking Meetup",
    time: "6:30 PM – 8:30 PM",
    location: "Startup Hub, Sydney",
    spots: 25,
    tags: ["This Week", "Tech", "Networking"],
    dateLabel: "This Week",
  },
  {
    id: "3",
    title: "Weekend Hiking Trip",
    time: "8:00 AM – 2:00 PM",
    location: "Blue Mountains",
    spots: 15,
    tags: ["Weekend", "Adventure", "Outdoor"],
    dateLabel: "Weekend",
  },
];
