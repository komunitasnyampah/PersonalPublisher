import { 
  users, categories, posts, comments, tags, postTags,
  type User, type InsertUser, type Category, type InsertCategory,
  type Post, type InsertPost, type Comment, type InsertComment,
  type Tag, type InsertTag, type PostWithDetails, type CommentWithAuthor,
  type UserStats, type CommunityStats
} from "@shared/schema";

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

export const storage = new MemStorage();
