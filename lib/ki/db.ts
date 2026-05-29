import Dexie, { Table } from 'dexie';

// Community types
export interface Community {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  creatorId: string;
}

export interface Post {
  id: string;
  communityId: string;
  authorId: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

// Marketplace types
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  imageBase64: string;
  devName: string;
  createdAt: Date;
}

// Social types
export interface ImagePost {
  id: string;
  authorId: string;
  imageBase64: string;
  caption: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

class KIDatabase extends Dexie {
  communities!: Table<Community>;
  posts!: Table<Post>;
  comments!: Table<Comment>;
  services!: Table<Service>;
  imagePosts!: Table<ImagePost>;

  constructor() {
    super('KIDatabase');
    this.version(1).stores({
      communities: 'id, name, createdAt',
      posts: 'id, communityId, createdAt, upvotes',
      comments: 'id, postId, createdAt',
      services: 'id, title, createdAt',
      imagePosts: 'id, createdAt, upvotes',
    });
  }
}

export const db = new KIDatabase();

// Marketplace sync: fetch from public JSON and merge
let marketplaceSyncPromise: Promise<void> | null = null;

export async function syncMarketplace() {
  if (marketplaceSyncPromise) return marketplaceSyncPromise;
  marketplaceSyncPromise = (async () => {
    try {
      const res = await fetch('/ki-market/data.json');
      if (res.ok) {
        const remoteServices: Service[] = await res.json();
        await db.services.bulkPut(remoteServices);
      }
    } catch (err) {
      console.warn('Could not fetch remote marketplace data', err);
    }
  })();
  return marketplaceSyncPromise;
}

export async function uploadService(service: Service) {
  await db.services.add(service);
  // Also send to server for persistence
  try {
    await fetch('/api/ki-marketplace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
  } catch (err) {
    console.warn('Failed to sync service to server', err);
  }
}

// Social feed sync (optional – we keep purely local for now)
