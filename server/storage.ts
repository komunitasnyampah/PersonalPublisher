import { 
  users, categories, posts, comments, tags, postTags,
  type User, type InsertUser, type Category, type InsertCategory,
  type Post, type InsertPost, type Comment, type InsertComment,
  type Tag, type InsertTag, type PostWithDetails, type CommentWithAuthor,
  type UserStats, type CommunityStats
} from "@shared/schema";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc, like, and, count, sql } from 'drizzle-orm';

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;
  getTopContributors(limit?: number): Promise<(User & UserStats)[]>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Posts
  getPosts(filters?: { categoryId?: number; search?: string; featured?: boolean; limit?: number; offset?: number }): Promise<PostWithDetails[]>;
  getPost(id: number): Promise<PostWithDetails | undefined>;
  getPostBySlug(slug: string): Promise<PostWithDetails | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: number): Promise<boolean>;
  incrementPostViews(id: number): Promise<void>;
  incrementPostLikes(id: number): Promise<void>;

  // Comments
  getCommentsByPostId(postId: number): Promise<CommentWithAuthor[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: number): Promise<boolean>;

  // Tags
  getTags(): Promise<Tag[]>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  addTagToPost(postId: number, tagId: number): Promise<void>;

  // Stats
  getCommunityStats(): Promise<CommunityStats>;
  getRecentActivity(limit?: number): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private posts: Map<number, Post> = new Map();
  private comments: Map<number, Comment> = new Map();
  private tags: Map<number, Tag> = new Map();
  private postTagsMap: Map<number, number[]> = new Map();
  private userIdCounter = 1;
  private categoryIdCounter = 1;
  private postIdCounter = 1;
  private commentIdCounter = 1;
  private tagIdCounter = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData = [
      { name: "Environment", slug: "environment", color: "green", description: "Environmental conservation and sustainability" },
      { name: "Renewable Energy", slug: "renewable-energy", color: "yellow", description: "Clean energy technologies and innovations" },
      { name: "Economy", slug: "economy", color: "blue", description: "Economic aspects of sustainability" },
      { name: "Decentralized Tech", slug: "decentralized-tech", color: "purple", description: "Blockchain and decentralized technologies" }
    ];

    categoryData.forEach(cat => {
      const category: Category = { id: this.categoryIdCounter++, ...cat };
      this.categories.set(category.id, category);
    });

    // Seed users
    const userData = [
      { username: "sarah_chen", email: "sarah@example.com", avatar: "SC", bio: "Energy policy researcher passionate about renewable energy solutions.", title: "Energy Policy Researcher" },
      { username: "david_johnson", email: "david@example.com", avatar: "DJ", bio: "Economic analyst focusing on sustainable development.", title: "Economic Analyst" },
      { username: "mike_khan", email: "mike@example.com", avatar: "MK", bio: "Blockchain developer building decentralized climate solutions.", title: "Blockchain Developer" },
      { username: "anna_lopez", email: "anna@example.com", avatar: "AL", bio: "Environmental advocate and community organizer.", title: "Environmental Advocate" },
      { username: "rachel_park", email: "rachel@example.com", avatar: "RP", bio: "Smart grid engineer working on energy storage solutions.", title: "Smart Grid Engineer" }
    ];

    userData.forEach(user => {
      const newUser: User = {
        id: this.userIdCounter++,
        ...user,
        postsCount: Math.floor(Math.random() * 25) + 5,
        followersCount: Math.floor(Math.random() * 1500) + 200,
        createdAt: new Date()
      };
      this.users.set(newUser.id, newUser);
    });

    // Seed tags
    const tagData = [
      { name: "Solar", slug: "solar", color: "green" },
      { name: "Blockchain", slug: "blockchain", color: "blue" },
      { name: "Sustainability", slug: "sustainability", color: "amber" },
      { name: "DeFi", slug: "defi", color: "purple" },
      { name: "Wind Energy", slug: "wind-energy", color: "green" },
      { name: "Carbon Credits", slug: "carbon-credits", color: "gray" }
    ];

    tagData.forEach(tag => {
      const newTag: Tag = { id: this.tagIdCounter++, ...tag };
      this.tags.set(newTag.id, newTag);
    });

    // Seed posts
    const postData = [
      {
        title: "The Future of Residential Solar: How Community Solar Gardens Are Changing Everything",
        content: "Community solar initiatives are making renewable energy accessible to everyone...",
        excerpt: "Discover how community solar initiatives are making renewable energy accessible to everyone, regardless of their housing situation or roof conditions.",
        coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        categoryId: 2,
        authorId: 1,
        readTime: 8,
        likes: 124,
        views: 1250,
        featured: true
      },
      {
        title: "Blockchain for Carbon Credits: A Decentralized Approach",
        content: "Blockchain technology is revolutionizing carbon credit tracking...",
        excerpt: "How blockchain technology is revolutionizing carbon credit tracking and creating transparent, verifiable environmental impact.",
        coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
        categoryId: 4,
        authorId: 3,
        readTime: 5,
        likes: 89,
        views: 756
      },
      {
        title: "10 Simple Ways Communities Can Reduce Waste Together",
        content: "Practical strategies for community waste reduction...",
        excerpt: "Practical strategies that neighborhoods and communities can implement to significantly reduce their environmental footprint.",
        coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
        categoryId: 1,
        authorId: 4,
        readTime: 3,
        likes: 156,
        views: 892
      },
      {
        title: "The Economics of Wind Energy: Why It's Becoming Unstoppable",
        content: "Wind energy economics analysis...",
        excerpt: "An analysis of how wind energy has become the cheapest source of electricity in many regions and what this means for the future.",
        coverImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
        categoryId: 3,
        authorId: 2,
        readTime: 7,
        likes: 203,
        views: 1456
      },
      {
        title: "Smart Grids and Energy Storage: The Missing Pieces",
        content: "Understanding smart grid technology...",
        excerpt: "Understanding how smart grid technology and advanced energy storage solutions are enabling the renewable energy transition.",
        coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        categoryId: 2,
        authorId: 5,
        readTime: 6,
        likes: 112,
        views: 634
      },
      {
        title: "Cara Mudah Memulai Kompos di Rumah untuk Pemula",
        content: "Kompos adalah cara mudah mengurangi sampah organik sambil menciptakan pupuk alami...",
        excerpt: "Panduan lengkap memulai kompos di rumah dengan bahan-bahan sederhana yang mudah ditemukan.",
        coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
        categoryId: 1,
        authorId: 4,
        readTime: 4,
        likes: 89,
        views: 567,
        featured: false
      },
      {
        title: "Mengapa Energi Surya Adalah Investasi Terbaik untuk Masa Depan",
        content: "Dengan biaya panel surya yang terus menurun, investasi energi surya menjadi semakin menarik...",
        excerpt: "Analisis investasi energi surya dan dampak positifnya terhadap lingkungan dan keuangan keluarga.",
        coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        categoryId: 2,
        authorId: 1,
        readTime: 7,
        likes: 145,
        views: 892,
        featured: false
      },
      {
        title: "DeFi untuk Pembiayaan Proyek Lingkungan: Peluang dan Tantangan",
        content: "Decentralized Finance membuka peluang baru untuk mendanai proyek-proyek lingkungan...",
        excerpt: "Bagaimana teknologi DeFi dapat membantu membiayai proyek lingkungan dengan cara yang transparan.",
        coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
        categoryId: 4,
        authorId: 3,
        readTime: 8,
        likes: 73,
        views: 445,
        featured: false
      },
      {
        title: "5 Teknologi Hijau yang Akan Mengubah Dunia di 2025",
        content: "Dari teknologi penangkap karbon hingga bioplastik, inilah inovasi yang akan membentuk masa depan...",
        excerpt: "Teknologi hijau terdepan yang siap merevolusi cara kita berinteraksi dengan lingkungan.",
        coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        categoryId: 2,
        authorId: 5,
        readTime: 6,
        likes: 198,
        views: 1123,
        featured: false
      }
    ];

    postData.forEach(post => {
      const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newPost: Post = {
        id: this.postIdCounter++,
        ...post,
        slug,
        published: true,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      };
      this.posts.set(newPost.id, newPost);
      
      // Add tags to posts
      if (newPost.id === 1) { // Solar post
        this.postTagsMap.set(newPost.id, [1, 3]); // Solar, Sustainability
      } else if (newPost.id === 2) { // Blockchain post
        this.postTagsMap.set(newPost.id, [2, 4, 6]); // Blockchain, DeFi, Carbon Credits
      } else if (newPost.id === 3) { // Community waste post
        this.postTagsMap.set(newPost.id, [3]); // Sustainability
      } else if (newPost.id === 4) { // Wind energy post
        this.postTagsMap.set(newPost.id, [5, 3]); // Wind Energy, Sustainability
      } else if (newPost.id === 5) { // Smart grid post
        this.postTagsMap.set(newPost.id, [1, 5]); // Solar, Wind Energy
      }
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.userIdCounter++,
      ...user,
      postsCount: 0,
      followersCount: 0,
      createdAt: new Date()
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) throw new Error("User not found");
    
    const updated = { ...existing, ...user };
    this.users.set(id, updated);
    return updated;
  }

  async getTopContributors(limit = 10): Promise<(User & UserStats)[]> {
    const usersArray = Array.from(this.users.values());
    return usersArray
      .sort((a, b) => b.postsCount - a.postsCount)
      .slice(0, limit)
      .map((user, index) => ({
        ...user,
        totalPosts: user.postsCount,
        totalLikes: Array.from(this.posts.values())
          .filter(post => post.authorId === user.id)
          .reduce((sum, post) => sum + post.likes, 0),
        totalViews: Array.from(this.posts.values())
          .filter(post => post.authorId === user.id)
          .reduce((sum, post) => sum + post.views, 0),
        rank: index + 1
      }));
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = {
      id: this.categoryIdCounter++,
      ...category
    };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  // Posts
  async getPosts(filters?: { categoryId?: number; search?: string; featured?: boolean; limit?: number; offset?: number }): Promise<PostWithDetails[]> {
    let postsArray = Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters?.categoryId) {
      postsArray = postsArray.filter(post => post.categoryId === filters.categoryId);
    }

    if (filters?.featured !== undefined) {
      postsArray = postsArray.filter(post => post.featured === filters.featured);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      postsArray = postsArray.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.offset) {
      postsArray = postsArray.slice(filters.offset);
    }

    if (filters?.limit) {
      postsArray = postsArray.slice(0, filters.limit);
    }

    return postsArray.map(post => this.enrichPostWithDetails(post));
  }

  async getPost(id: number): Promise<PostWithDetails | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    return this.enrichPostWithDetails(post);
  }

  async getPostBySlug(slug: string): Promise<PostWithDetails | undefined> {
    const post = Array.from(this.posts.values()).find(p => p.slug === slug);
    if (!post) return undefined;
    return this.enrichPostWithDetails(post);
  }

  private enrichPostWithDetails(post: Post): PostWithDetails {
    const author = this.users.get(post.authorId!) || this.users.values().next().value;
    const category = this.categories.get(post.categoryId!) || this.categories.values().next().value;
    const tagIds = this.postTagsMap.get(post.id) || [];
    const tags = tagIds.map(id => this.tags.get(id)).filter(Boolean) as Tag[];
    const commentsCount = Array.from(this.comments.values()).filter(c => c.postId === post.id).length;

    return {
      ...post,
      author,
      category,
      tags,
      commentsCount
    };
  }

  async createPost(post: InsertPost): Promise<Post> {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newPost: Post = {
      id: this.postIdCounter++,
      ...post,
      slug,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.posts.set(newPost.id, newPost);

    // Update author's post count
    if (post.authorId) {
      const author = this.users.get(post.authorId);
      if (author) {
        author.postsCount++;
        this.users.set(author.id, author);
      }
    }

    return newPost;
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post> {
    const existing = this.posts.get(id);
    if (!existing) throw new Error("Post not found");
    
    const updated = { ...existing, ...post, updatedAt: new Date() };
    this.posts.set(id, updated);
    return updated;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  async incrementPostViews(id: number): Promise<void> {
    const post = this.posts.get(id);
    if (post) {
      post.views++;
      this.posts.set(id, post);
    }
  }

  async incrementPostLikes(id: number): Promise<void> {
    const post = this.posts.get(id);
    if (post) {
      post.likes++;
      this.posts.set(id, post);
    }
  }

  // Comments
  async getCommentsByPostId(postId: number): Promise<CommentWithAuthor[]> {
    const comments = Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return comments.map(comment => ({
      ...comment,
      author: this.users.get(comment.authorId!) || this.users.values().next().value
    }));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = {
      id: this.commentIdCounter++,
      ...comment,
      likes: 0,
      createdAt: new Date()
    };
    this.comments.set(newComment.id, newComment);
    return newComment;
  }

  async deleteComment(id: number): Promise<boolean> {
    return this.comments.delete(id);
  }

  // Tags
  async getTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(tag => tag.slug === slug);
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const newTag: Tag = {
      id: this.tagIdCounter++,
      ...tag
    };
    this.tags.set(newTag.id, newTag);
    return newTag;
  }

  async addTagToPost(postId: number, tagId: number): Promise<void> {
    const existing = this.postTagsMap.get(postId) || [];
    if (!existing.includes(tagId)) {
      this.postTagsMap.set(postId, [...existing, tagId]);
    }
  }

  // Stats
  async getCommunityStats(): Promise<CommunityStats> {
    const totalMembers = this.users.size;
    const activeMembers = Math.floor(totalMembers * 0.7); // 70% active
    const totalPosts = this.posts.size;
    const monthlyPosts = Math.floor(totalPosts * 0.3); // 30% from this month
    
    return {
      activeMembers,
      monthlyPosts,
      co2Saved: "1.2k tons",
      totalPosts,
      totalMembers
    };
  }

  async getRecentActivity(limit = 10): Promise<any[]> {
    const activities = [];
    
    // Recent posts
    const recentPosts = Array.from(this.posts.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

    recentPosts.forEach(post => {
      const author = this.users.get(post.authorId!);
      if (author) {
        activities.push({
          type: "post",
          user: author.username,
          action: "published a new post",
          target: post.title,
          timestamp: post.createdAt
        });
      }
    });

    // Recent comments
    const recentComments = Array.from(this.comments.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

    recentComments.forEach(comment => {
      const author = this.users.get(comment.authorId!);
      const post = this.posts.get(comment.postId!);
      if (author && post) {
        activities.push({
          type: "comment",
          user: author.username,
          action: "commented on",
          target: post.title,
          timestamp: comment.createdAt
        });
      }
    });

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}

// Supabase Storage Implementation
class SupabaseStorage implements IStorage {
  private db;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql);
  }

  // Initialize database with sample data
  async init() {
    // Seed categories
    const categoryData = [
      { name: "Environment", slug: "environment", color: "#16a34a", description: "Environmental conservation and sustainability topics" },
      { name: "Energy", slug: "energy", color: "#0ea5e9", description: "Renewable energy and clean technology" },
      { name: "Economy", slug: "economy", color: "#f59e0b", description: "Sustainable economic practices and green business" },
      { name: "Technology", slug: "technology", color: "#8b5cf6", description: "Decentralized and green technology innovations" }
    ];

    try {
      for (const cat of categoryData) {
        await this.db.insert(categories).values(cat).onConflictDoNothing();
      }

      // Seed users
      const userData = [
        { username: "sarah_chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786", bio: "Environmental scientist passionate about climate change", title: "Climate Researcher", postsCount: 5, followersCount: 1240 },
        { username: "david_johnson", email: "david@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", bio: "Renewable energy engineer", title: "Solar Engineer", postsCount: 3, followersCount: 892 },
        { username: "mike_khan", email: "mike@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", bio: "Blockchain developer focusing on environmental applications", title: "DeFi Developer", postsCount: 2, followersCount: 567 },
        { username: "anna_lee", email: "anna@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", bio: "Community organizer for environmental initiatives", title: "Community Leader", postsCount: 4, followersCount: 1580 },
        { username: "carlos_mendez", email: "carlos@example.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", bio: "Green technology entrepreneur", title: "Startup Founder", postsCount: 6, followersCount: 2100 }
      ];

      for (const user of userData) {
        await this.db.insert(users).values(user).onConflictDoNothing();
      }

      // Seed tags
      const tagData = [
        { name: "Solar", slug: "solar", color: "#f59e0b" },
        { name: "Blockchain", slug: "blockchain", color: "#8b5cf6" },
        { name: "Sustainability", slug: "sustainability", color: "#16a34a" },
        { name: "DeFi", slug: "defi", color: "#6366f1" },
        { name: "Wind Energy", slug: "wind-energy", color: "#0ea5e9" },
        { name: "Carbon Credits", slug: "carbon-credits", color: "#10b981" }
      ];

      for (const tag of tagData) {
        await this.db.insert(tags).values(tag).onConflictDoNothing();
      }

      // Seed posts
      const postData = [
        {
          title: "Revolusi Panel Surya: Bagaimana Teknologi Baru Mengubah Energi Terbarukan",
          content: "Panel surya generasi terbaru dengan efisiensi hingga 45% mulai merevolusi industri energi terbarukan di Indonesia...",
          excerpt: "Teknologi panel surya terbaru dengan efisiensi tinggi membuka peluang besar untuk transisi energi di Indonesia.",
          coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
          categoryId: 2,
          authorId: 1,
          readTime: 5,
          likes: 234,
          views: 1420,
          featured: true
        },
        {
          title: "Blockchain untuk Kredit Karbon: Transparansi dalam Perdagangan Emisi",
          content: "Teknologi blockchain memberikan transparansi yang belum pernah ada sebelumnya dalam perdagangan kredit karbon...",
          excerpt: "Menggunakan blockchain untuk menciptakan sistem perdagangan kredit karbon yang transparan dan dapat diaudit.",
          coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
          categoryId: 4,
          authorId: 3,
          readTime: 7,
          likes: 189,
          views: 956,
          featured: true
        },
        {
          title: "Komunitas Pengolahan Sampah: Mengubah Limbah Jadi Berkah",
          content: "Inisiatif komunitas lokal berhasil mengubah cara pengelolaan sampah dengan teknologi biogas sederhana...",
          excerpt: "Bagaimana komunitas lokal menggunakan teknologi sederhana untuk mengolah sampah organik menjadi energi.",
          coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
          categoryId: 1,
          authorId: 4,
          readTime: 4,
          likes: 156,
          views: 823,
          featured: false
        },
        {
          title: "Energi Angin Lepas Pantai: Masa Depan Indonesia",
          content: "Potensi energi angin lepas pantai Indonesia mencapai 60 GW, namun baru 0.1% yang dimanfaatkan...",
          excerpt: "Eksplorasi potensi besar energi angin lepas pantai Indonesia dan tantangan pengembangannya.",
          coverImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
          categoryId: 2,
          authorId: 2,
          readTime: 6,
          likes: 201,
          views: 1134,
          featured: false
        },
        {
          title: "Smart Grid dan Penyimpanan Energi: Menuju Sistem Energi Terdesentralisasi",
          content: "Kombinasi smart grid dan teknologi penyimpanan energi memungkinkan transisi menuju sistem energi yang sepenuhnya terbarukan...",
          excerpt: "Understanding how smart grid technology and advanced energy storage solutions are enabling the renewable energy transition.",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          categoryId: 2,
          authorId: 5,
          readTime: 6,
          likes: 112,
          views: 634,
          featured: false
        }
      ];

      for (const post of postData) {
        await this.db.insert(posts).values(post).onConflictDoNothing();
      }

      console.log("✅ Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User> {
    const result = await this.db.update(users).set(user).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getTopContributors(limit = 10): Promise<(User & UserStats)[]> {
    const result = await this.db.select().from(users).orderBy(desc(users.postsCount)).limit(limit);
    
    return result.map((user, index) => ({
      ...user,
      totalPosts: user.postsCount || 0,
      totalLikes: 0,
      totalViews: 0,
      rank: index + 1
    }));
  }

  async getCategories(): Promise<Category[]> {
    return await this.db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(category).returning();
    return result[0];
  }

  async getPosts(filters?: { categoryId?: number; search?: string; featured?: boolean; limit?: number; offset?: number }): Promise<PostWithDetails[]> {
    let query = this.db
      .select({
        post: posts,
        author: users,
        category: categories
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.published, true));

    if (filters?.categoryId) {
      query = query.where(eq(posts.categoryId, filters.categoryId));
    }
    
    if (filters?.featured !== undefined) {
      query = query.where(eq(posts.featured, filters.featured));
    }

    query = query.orderBy(desc(posts.createdAt));

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    const results = await query;
    
    return results.map(result => ({
      ...result.post,
      author: result.author!,
      category: result.category!,
      tags: [],
      commentsCount: 0
    }));
  }

  async getPost(id: number): Promise<PostWithDetails | undefined> {
    const result = await this.db
      .select({
        post: posts,
        author: users,
        category: categories
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.id, id));

    if (!result[0]) return undefined;

    return {
      ...result[0].post,
      author: result[0].author!,
      category: result[0].category!,
      tags: [],
      commentsCount: 0
    };
  }

  async getPostBySlug(slug: string): Promise<PostWithDetails | undefined> {
    const result = await this.db
      .select({
        post: posts,
        author: users,
        category: categories
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.slug, slug));

    if (!result[0]) return undefined;

    return {
      ...result[0].post,
      author: result[0].author!,
      category: result[0].category!,
      tags: [],
      commentsCount: 0
    };
  }

  async createPost(post: InsertPost): Promise<Post> {
    const result = await this.db.insert(posts).values(post).returning();
    return result[0];
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post> {
    const result = await this.db.update(posts).set(post).where(eq(posts.id, id)).returning();
    return result[0];
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await this.db.delete(posts).where(eq(posts.id, id));
    return result.count > 0;
  }

  async incrementPostViews(id: number): Promise<void> {
    await this.db.update(posts).set({ views: sql`${posts.views} + 1` }).where(eq(posts.id, id));
  }

  async incrementPostLikes(id: number): Promise<void> {
    await this.db.update(posts).set({ likes: sql`${posts.likes} + 1` }).where(eq(posts.id, id));
  }

  async getCommentsByPostId(postId: number): Promise<CommentWithAuthor[]> {
    return [];
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const result = await this.db.insert(comments).values(comment).returning();
    return result[0];
  }

  async deleteComment(id: number): Promise<boolean> {
    const result = await this.db.delete(comments).where(eq(comments.id, id));
    return result.count > 0;
  }

  async getTags(): Promise<Tag[]> {
    return await this.db.select().from(tags);
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    const result = await this.db.select().from(tags).where(eq(tags.slug, slug));
    return result[0];
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const result = await this.db.insert(tags).values(tag).returning();
    return result[0];
  }

  async addTagToPost(postId: number, tagId: number): Promise<void> {
    await this.db.insert(postTags).values({ postId, tagId }).onConflictDoNothing();
  }

  async getCommunityStats(): Promise<CommunityStats> {
    const [userCount] = await this.db.select({ count: count() }).from(users);
    const [postCount] = await this.db.select({ count: count() }).from(posts);
    
    return {
      activeMembers: Math.min(userCount.count || 0, 50),
      monthlyPosts: Math.min(postCount.count || 0, 25),
      co2Saved: "1,240 kg",
      totalPosts: postCount.count || 0,
      totalMembers: userCount.count || 0
    };
  }

  async getRecentActivity(limit = 10): Promise<any[]> {
    const recentPosts = await this.db
      .select({
        post: posts,
        author: users
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit);

    return recentPosts.map(({ post, author }) => ({
      type: "post",
      user: author?.username || "Unknown",
      action: "published a new post",
      target: post.title,
      timestamp: post.createdAt?.toISOString() || new Date().toISOString()
    }));
  }
}

// Create instance based on environment - using MemStorage until valid Supabase URL is provided
export const storage = new MemStorage(); // process.env.DATABASE_URL ? new SupabaseStorage() : new MemStorage();
