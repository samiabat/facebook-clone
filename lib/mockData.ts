export interface SeedUser {
  id: string
  name: string
  email: string
  password: string
  bio: string | null
  profileImage: string | null
  coverImage: string | null
  createdAt: string
}

export interface RawPost {
  id: string
  content: string
  image: string | null
  authorId: string
  createdAt: string
}

export interface RawLike {
  userId: string
  postId: string
}

export interface RawComment {
  id: string
  content: string
  authorId: string
  postId: string
  createdAt: string
}

export interface RawFriendship {
  id: string
  requesterId: string
  addresseeId: string
  status: 'PENDING' | 'ACCEPTED'
  createdAt: string
}

export interface SeedJob {
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract'
  description: string
  requirements: string[]
  salary: string
  postedAt: string
}

export const SEED_USERS: SeedUser[] = [
  {
    id: 'u1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password',
    bio: 'Software engineer and coffee enthusiast ☕',
    profileImage: null,
    coverImage: null,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'u2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password',
    bio: 'Photographer and travel lover 📷',
    profileImage: null,
    coverImage: null,
    createdAt: '2024-01-20T12:00:00Z',
  },
  {
    id: 'u3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    password: 'password',
    bio: 'Food blogger and home cook 🍳',
    profileImage: null,
    coverImage: null,
    createdAt: '2024-02-01T09:00:00Z',
  },
  {
    id: 'u4',
    name: 'David Brown',
    email: 'david@example.com',
    password: 'password',
    bio: 'Fitness trainer and wellness advocate 💪',
    profileImage: null,
    coverImage: null,
    createdAt: '2024-02-10T14:00:00Z',
  },
  {
    id: 'u5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    password: 'password',
    bio: 'Artist and creative dreamer 🎨',
    profileImage: null,
    coverImage: null,
    createdAt: '2024-02-15T11:00:00Z',
  },
  {
    id: 'u6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    password: 'password',
    bio: 'Music producer and vinyl collector 🎵',
    profileImage: null,
    coverImage: null,
    createdAt: '2024-02-20T16:00:00Z',
  },
]

export const SEED_POSTS: RawPost[] = [
  {
    id: 'p1',
    content: 'Just finished my morning run! 🏃‍♀️ 5K in under 25 minutes – new personal best!',
    image: null,
    authorId: 'u1',
    createdAt: '2024-03-01T08:30:00Z',
  },
  {
    id: 'p2',
    content:
      'Captured this amazing sunset last night at the beach 🌅 Sometimes you just have to stop and appreciate the beauty around us.',
    image: null,
    authorId: 'u2',
    createdAt: '2024-03-02T19:00:00Z',
  },
  {
    id: 'p3',
    content:
      'Made homemade pasta from scratch today! 🍝 Nothing beats the taste of fresh pasta. Recipe in the comments!',
    image: null,
    authorId: 'u3',
    createdAt: '2024-03-03T12:00:00Z',
  },
  {
    id: 'p4',
    content: "30-day workout challenge starts today! Who's joining me? Drop a 💪 in the comments if you're in!",
    image: null,
    authorId: 'u4',
    createdAt: '2024-03-04T07:00:00Z',
  },
  {
    id: 'p5',
    content: "Finally finished my latest painting 🎨 This one took 3 weeks but I'm really happy with how it turned out.",
    image: null,
    authorId: 'u5',
    createdAt: '2024-03-05T15:00:00Z',
  },
  {
    id: 'p6',
    content: 'Just dropped a new mixtape! 🎵 Let me know what you think!',
    image: null,
    authorId: 'u6',
    createdAt: '2024-03-06T18:00:00Z',
  },
  {
    id: 'p7',
    content: 'Had the most amazing coffee this morning at the new café downtown ☕ Highly recommend the cortado!',
    image: null,
    authorId: 'u1',
    createdAt: '2024-03-07T09:00:00Z',
  },
  {
    id: 'p8',
    content: 'Road trip weekend! 🚗 Nothing like exploring new places and making memories.',
    image: null,
    authorId: 'u2',
    createdAt: '2024-03-08T10:00:00Z',
  },
  {
    id: 'p9',
    content: "Brunch ideas for the weekend? I'm thinking avocado toast and fresh smoothies 🥑🥤",
    image: null,
    authorId: 'u3',
    createdAt: '2024-03-09T11:00:00Z',
  },
  {
    id: 'p10',
    content: 'Reminder: your only competition is yourself. Keep pushing! 🔥',
    image: null,
    authorId: 'u4',
    createdAt: '2024-03-10T06:30:00Z',
  },
]

export const SEED_LIKES: RawLike[] = [
  { userId: 'u2', postId: 'p1' },
  { userId: 'u3', postId: 'p1' },
  { userId: 'u4', postId: 'p1' },
  { userId: 'u1', postId: 'p2' },
  { userId: 'u5', postId: 'p2' },
  { userId: 'u1', postId: 'p3' },
  { userId: 'u2', postId: 'p3' },
  { userId: 'u1', postId: 'p4' },
  { userId: 'u3', postId: 'p4' },
  { userId: 'u6', postId: 'p4' },
  { userId: 'u1', postId: 'p5' },
  { userId: 'u2', postId: 'p5' },
  { userId: 'u3', postId: 'p5' },
  { userId: 'u1', postId: 'p6' },
  { userId: 'u2', postId: 'p7' },
  { userId: 'u4', postId: 'p8' },
  { userId: 'u1', postId: 'p9' },
  { userId: 'u5', postId: 'p10' },
]

export const SEED_COMMENTS: RawComment[] = [
  { id: 'c1', content: 'Amazing! Keep it up! 🎉', authorId: 'u2', postId: 'p1', createdAt: '2024-03-01T09:00:00Z' },
  {
    id: 'c2',
    content: "You're inspiring me to start running!",
    authorId: 'u3',
    postId: 'p1',
    createdAt: '2024-03-01T09:30:00Z',
  },
  { id: 'c3', content: 'Absolutely stunning photo! 😍', authorId: 'u1', postId: 'p2', createdAt: '2024-03-02T20:00:00Z' },
  {
    id: 'c4',
    content: 'Please share the recipe! 🙏',
    authorId: 'u4',
    postId: 'p3',
    createdAt: '2024-03-03T13:00:00Z',
  },
  {
    id: 'c5',
    content: "I'm in! Let's do this! 💪",
    authorId: 'u1',
    postId: 'p4',
    createdAt: '2024-03-04T08:00:00Z',
  },
  {
    id: 'c6',
    content: 'Me too! Day 1 starting now!',
    authorId: 'u5',
    postId: 'p4',
    createdAt: '2024-03-04T08:30:00Z',
  },
  {
    id: 'c7',
    content: 'This is incredible! What medium did you use?',
    authorId: 'u2',
    postId: 'p5',
    createdAt: '2024-03-05T16:00:00Z',
  },
  {
    id: 'c8',
    content: "I've been listening on repeat! 🔥",
    authorId: 'u3',
    postId: 'p6',
    createdAt: '2024-03-06T19:00:00Z',
  },
]

export const SEED_FRIENDSHIPS: RawFriendship[] = [
  { id: 'f1', requesterId: 'u1', addresseeId: 'u2', status: 'ACCEPTED', createdAt: '2024-01-25T00:00:00Z' },
  { id: 'f2', requesterId: 'u1', addresseeId: 'u3', status: 'ACCEPTED', createdAt: '2024-02-05T00:00:00Z' },
  { id: 'f3', requesterId: 'u4', addresseeId: 'u1', status: 'PENDING', createdAt: '2024-03-10T00:00:00Z' },
]

export const SEED_JOBS: SeedJob[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description:
      'We are looking for a passionate Senior Frontend Developer to join our growing team. You will be building scalable web applications and mentoring junior developers.',
    requirements: [
      '5+ years of React experience',
      'TypeScript proficiency',
      'Experience with Next.js',
      'Strong CSS/Tailwind skills',
    ],
    salary: '$140,000 – $180,000',
    postedAt: '2024-03-08T00:00:00Z',
  },
  {
    id: 'j2',
    title: 'UX/UI Designer',
    company: 'Creative Agency Co.',
    location: 'New York, NY',
    type: 'Full-time',
    description:
      'Join our design team to create beautiful and functional user experiences for world-class clients across various industries.',
    requirements: [
      '3+ years of UX/UI design',
      'Proficiency in Figma',
      'Portfolio of digital products',
      'Understanding of user research',
    ],
    salary: '$90,000 – $120,000',
    postedAt: '2024-03-09T00:00:00Z',
  },
  {
    id: 'j3',
    title: 'Backend Engineer',
    company: 'CloudInc Solutions',
    location: 'Remote',
    type: 'Remote',
    description:
      'Help us scale our cloud infrastructure and build robust backend services that power millions of users worldwide.',
    requirements: ['Node.js or Go experience', 'PostgreSQL and Redis', 'AWS or GCP', 'Microservices architecture'],
    salary: '$120,000 – $160,000',
    postedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'j4',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    type: 'Full-time',
    description:
      'Lead product strategy for our fast-growing startup. You will work closely with engineering, design, and business teams to deliver impactful features.',
    requirements: [
      '3+ years of PM experience',
      'Technical background preferred',
      'Strong analytical skills',
      'Excellent communication',
    ],
    salary: '$110,000 – $140,000',
    postedAt: '2024-03-11T00:00:00Z',
  },
  {
    id: 'j5',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    type: 'Full-time',
    description:
      'Work with cutting-edge machine learning models and large datasets to drive business insights and product decisions.',
    requirements: [
      'Python and R proficiency',
      'ML/AI frameworks (TensorFlow, PyTorch)',
      'Statistical modeling',
      'SQL expertise',
    ],
    salary: '$130,000 – $170,000',
    postedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: 'j6',
    title: 'Mobile Developer (iOS/Android)',
    company: 'AppFactory',
    location: 'Seattle, WA',
    type: 'Full-time',
    description:
      "Build native mobile experiences that delight millions of users. You'll work on both iOS and Android platforms in a collaborative team.",
    requirements: [
      'React Native or native dev',
      'iOS Swift or Android Kotlin',
      'App Store deployment experience',
      '3+ years mobile dev',
    ],
    salary: '$115,000 – $155,000',
    postedAt: '2024-03-13T00:00:00Z',
  },
]
