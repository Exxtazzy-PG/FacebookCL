export const fakeUsers = [
  {
    id: 2,
    name: 'Emma Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=850&h=300&fit=crop',
    bio: 'Actress & Activist',
    location: 'London, UK',
    friends: 892,
    isOnline: true,
    mutualFriends: 23
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=850&h=300&fit=crop',
    bio: 'Photographer & Designer',
    location: 'San Francisco, CA',
    friends: 654,
    isOnline: false,
    mutualFriends: 45
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    avatar: 'https://tse3.mm.bing.net/th/id/OIP.UaLV5wiy0tfLUtSkskEVOQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=850&h=300&fit=crop',
    bio: 'Marketing Manager',
    location: 'Chicago, IL',
    friends: 423,
    isOnline: true,
    mutualFriends: 12
  },
  {
    id: 5,
    name: 'David Martinez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=850&h=300&fit=crop',
    bio: 'Musician & Producer',
    location: 'Los Angeles, CA',
    friends: 1234,
    isOnline: false,
    mutualFriends: 67
  },
  {
    id: 6,
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=850&h=300&fit=crop',
    bio: 'Travel Blogger',
    location: 'Seoul, South Korea',
    friends: 789,
    isOnline: true,
    mutualFriends: 34
  }
];

export const fakePosts = [
  {
    id: 1,
    userId: 2,
    user: fakeUsers[0],
    content: "Just finished an amazing photoshoot! The sunset was absolutely perfect today. 🌅",
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 145,
    comments: 23,
    shares: 12,
    isLiked: false
  },
  {
    id: 2,
    userId: 3,
    user: fakeUsers[1],
    content: "Working on some new design concepts. Love how technology and creativity come together! 💻✨",
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 15,
    shares: 7,
    isLiked: true
  },
  {
    id: 3,
    userId: 4,
    user: fakeUsers[2],
    content: "Team lunch was amazing! Great to catch up with everyone. 🍕",
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&h=400&fit=crop',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 8,
    shares: 3,
    isLiked: false
  },
  {
    id: 4,
    userId: 5,
    user: fakeUsers[3],
    content: "Late night studio session. New track coming soon! 🎵",
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 234,
    comments: 45,
    shares: 28,
    isLiked: true
  },
  {
    id: 5,
    userId: 6,
    user: fakeUsers[4],
    content: "Exploring the beautiful streets of Seoul! This city never ceases to amaze me. 🏙️",
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=500&h=400&fit=crop',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 156,
    comments: 32,
    shares: 19,
    isLiked: false
  }
];

export const fakeStories = [
  {
    id: 1,
    userId: 2,
    user: fakeUsers[0],
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=300&h=500&fit=crop',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    userId: 3,
    user: fakeUsers[1],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=500&fit=crop',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    userId: 4,
    user: fakeUsers[2],
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=500&fit=crop',
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    userId: 5,
    user: fakeUsers[3],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=500&fit=crop',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
  }
];

export const fakeGroups = [
  {
    id: 1,
    name: 'Photography Enthusiasts',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop',
    members: 12450,
    description: 'A community for photography lovers to share tips, tricks, and amazing shots!',
    isJoined: true,
    activity: 'Very active'
  },
  {
    id: 2,
    name: 'Tech Innovators',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
    members: 8920,
    description: 'Discussing the latest in technology and innovation.',
    isJoined: false,
    activity: 'Active'
  },
  {
    id: 3,
    name: 'Travel Adventures',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop',
    members: 15600,
    description: 'Share your travel experiences and discover new destinations!',
    isJoined: true,
    activity: 'Very active'
  }
];

export const fakeProducts = [
  {
    id: 1,
    title: 'MacBook Pro 16"',
    price: 2399,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
    location: 'New York, NY',
    seller: 'Tech Store NYC',
    condition: 'Like New'
  },
  {
    id: 2,
    title: 'Vintage Camera',
    price: 450,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
    location: 'San Francisco, CA',
    seller: 'Photo Gear Co.',
    condition: 'Good'
  },
  {
    id: 3,
    title: 'Designer Chair',
    price: 850,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop',
    location: 'Los Angeles, CA',
    seller: 'Modern Furniture',
    condition: 'Excellent'
  }
];