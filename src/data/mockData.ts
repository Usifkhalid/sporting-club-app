export interface Sport {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  currentMembers: number;
  instructor: string;
  schedule: string;
  price: number;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: "basic" | "premium" | "vip";
  sports: string[];
  status: "active" | "inactive" | "pending";
  avatar: string;
}

export interface Subscription {
  id: string;
  memberId: string;
  memberName: string;
  sportId: string;
  sportName: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
  price: number;
  paymentMethod: string;
  lastPayment: string;
}

export const sportsData: Sport[] = [
  {
    id: "1",
    name: "Tennis",
    description: "Professional tennis coaching for all skill levels",
    image: "/images/tennis.jpg",
    capacity: 20,
    currentMembers: 15,
    instructor: "Coach Sarah Johnson",
    schedule: "Mon, Wed, Fri 6:00 PM - 8:00 PM",
    price: 120,
  },
  {
    id: "2",
    name: "Swimming",
    description: "Swimming lessons and fitness training",
    image: "/images/swimming.jpg",
    capacity: 30,
    currentMembers: 25,
    instructor: "Coach Mike Chen",
    schedule: "Tue, Thu, Sat 7:00 AM - 9:00 AM",
    price: 100,
  },
  {
    id: "3",
    name: "Basketball",
    description: "Basketball training and team practice",
    image: "/images/basketball.jpg",
    capacity: 25,
    currentMembers: 18,
    instructor: "Coach David Williams",
    schedule: "Mon, Wed, Fri 5:00 PM - 7:00 PM",
    price: 90,
  },
  {
    id: "4",
    name: "Yoga",
    description: "Relaxing yoga sessions for mind and body",
    image: "/images/yoga.jpg",
    capacity: 15,
    currentMembers: 12,
    instructor: "Coach Emma Davis",
    schedule: "Tue, Thu, Sun 6:30 PM - 7:30 PM",
    price: 80,
  },
  {
    id: "5",
    name: "Soccer",
    description: "Soccer training and competitive play",
    image: "/images/soccer.jpg",
    capacity: 35,
    currentMembers: 28,
    instructor: "Coach Carlos Rodriguez",
    schedule: "Sat, Sun 9:00 AM - 11:00 AM",
    price: 110,
  },
  {
    id: "6",
    name: "Gym",
    description: "Full access to gym equipment and personal training",
    image: "/images/gym.jpg",
    capacity: 50,
    currentMembers: 42,
    instructor: "Coach Alex Thompson",
    schedule: "Daily 6:00 AM - 10:00 PM",
    price: 150,
  },
];

export const membersData: Member[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    membershipType: "premium",
    sports: ["1", "3"],
    status: "active",
    avatar: "/avatars/john.jpg",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-02-20",
    membershipType: "vip",
    sports: ["1", "2", "4"],
    status: "active",
    avatar: "/avatars/sarah.jpg",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-03-10",
    membershipType: "basic",
    sports: ["5"],
    status: "active",
    avatar: "/avatars/michael.jpg",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-01-05",
    membershipType: "premium",
    sports: ["2", "4", "6"],
    status: "active",
    avatar: "/avatars/emily.jpg",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-04-12",
    membershipType: "basic",
    sports: ["3"],
    status: "inactive",
    avatar: "/avatars/david.jpg",
  },
  {
    id: "6",
    firstName: "Lisa",
    lastName: "Garcia",
    email: "lisa.garcia@email.com",
    phone: "+1 (555) 678-9012",
    joinDate: "2023-05-18",
    membershipType: "vip",
    sports: ["1", "2", "3", "6"],
    status: "active",
    avatar: "/avatars/lisa.jpg",
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez@email.com",
    phone: "+1 (555) 789-0123",
    joinDate: "2023-06-22",
    membershipType: "basic",
    sports: ["5"],
    status: "pending",
    avatar: "/avatars/robert.jpg",
  },
  {
    id: "8",
    firstName: "Jennifer",
    lastName: "Taylor",
    email: "jennifer.taylor@email.com",
    phone: "+1 (555) 890-1234",
    joinDate: "2023-02-08",
    membershipType: "premium",
    sports: ["4", "6"],
    status: "active",
    avatar: "/avatars/jennifer.jpg",
  },
];

export const subscriptionsData: Subscription[] = [
  {
    id: "1",
    memberId: "1",
    memberName: "John Smith",
    sportId: "1",
    sportName: "Tennis",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "active",
    price: 120,
    paymentMethod: "Credit Card",
    lastPayment: "2023-12-15",
  },
  {
    id: "2",
    memberId: "1",
    memberName: "John Smith",
    sportId: "3",
    sportName: "Basketball",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "active",
    price: 90,
    paymentMethod: "Credit Card",
    lastPayment: "2023-12-15",
  },
  {
    id: "3",
    memberId: "2",
    memberName: "Sarah Johnson",
    sportId: "1",
    sportName: "Tennis",
    startDate: "2023-02-20",
    endDate: "2024-02-20",
    status: "active",
    price: 120,
    paymentMethod: "PayPal",
    lastPayment: "2023-12-20",
  },
  {
    id: "4",
    memberId: "2",
    memberName: "Sarah Johnson",
    sportId: "2",
    sportName: "Swimming",
    startDate: "2023-02-20",
    endDate: "2024-02-20",
    status: "active",
    price: 100,
    paymentMethod: "PayPal",
    lastPayment: "2023-12-20",
  },
  {
    id: "5",
    memberId: "2",
    memberName: "Sarah Johnson",
    sportId: "4",
    sportName: "Yoga",
    startDate: "2023-02-20",
    endDate: "2024-02-20",
    status: "active",
    price: 80,
    paymentMethod: "PayPal",
    lastPayment: "2023-12-20",
  },
  {
    id: "6",
    memberId: "3",
    memberName: "Michael Brown",
    sportId: "5",
    sportName: "Soccer",
    startDate: "2023-03-10",
    endDate: "2024-03-10",
    status: "active",
    price: 110,
    paymentMethod: "Bank Transfer",
    lastPayment: "2023-12-10",
  },
  {
    id: "7",
    memberId: "4",
    memberName: "Emily Davis",
    sportId: "2",
    sportName: "Swimming",
    startDate: "2023-01-05",
    endDate: "2024-01-05",
    status: "active",
    price: 100,
    paymentMethod: "Credit Card",
    lastPayment: "2023-12-05",
  },
  {
    id: "8",
    memberId: "4",
    memberName: "Emily Davis",
    sportId: "4",
    sportName: "Yoga",
    startDate: "2023-01-05",
    endDate: "2024-01-05",
    status: "active",
    price: 80,
    paymentMethod: "Credit Card",
    lastPayment: "2023-12-05",
  },
  {
    id: "9",
    memberId: "4",
    memberName: "Emily Davis",
    sportId: "6",
    sportName: "Gym",
    startDate: "2023-01-05",
    endDate: "2024-01-05",
    status: "active",
    price: 150,
    paymentMethod: "Credit Card",
    lastPayment: "2023-12-05",
  },
  {
    id: "10",
    memberId: "5",
    memberName: "David Wilson",
    sportId: "3",
    sportName: "Basketball",
    startDate: "2023-04-12",
    endDate: "2024-04-12",
    status: "expired",
    price: 90,
    paymentMethod: "Credit Card",
    lastPayment: "2023-11-12",
  },
];
