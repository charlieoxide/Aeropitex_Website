import { type User, type InsertUser, type Contact, type InsertContact, type AdminStats, type InsertAdminStats, type Activity, type InsertActivity } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getAdminStats(): Promise<AdminStats>;
  updateAdminStats(stats: InsertAdminStats): Promise<AdminStats>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  getActivities(): Promise<Activity[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private adminStats: AdminStats;
  private activities: Map<string, Activity>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.activities = new Map();
    
    // Initialize default admin stats
    this.adminStats = {
      id: randomUUID(),
      totalUsers: 1234,
      activeProjects: 56,
      revenue: "$123K",
      growth: "+23%",
      updatedAt: new Date(),
    };

    // Initialize some sample activities
    const sampleActivities = [
      {
        id: randomUUID(),
        message: "New user registration: john.doe@example.com",
        type: "USER",
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      {
        id: randomUUID(),
        message: 'Project "AI Dashboard" completed',
        type: "PROJECT",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        id: randomUUID(),
        message: "Security scan completed - No threats detected",
        type: "SECURITY",
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
    ];

    sampleActivities.forEach(activity => {
      this.activities.set(activity.id, activity);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // Update stats
    this.adminStats.totalUsers = this.users.size;
    
    // Add activity
    await this.createActivity({
      message: `New user registration: ${user.username}`,
      type: "USER",
    });
    
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    
    // Add activity
    await this.createActivity({
      message: `New contact inquiry from ${contact.name}`,
      type: "CONTACT",
    });
    
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAdminStats(): Promise<AdminStats> {
    return this.adminStats;
  }

  async updateAdminStats(stats: InsertAdminStats): Promise<AdminStats> {
    this.adminStats = {
      ...this.adminStats,
      ...stats,
      updatedAt: new Date(),
    };
    return this.adminStats;
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = {
      ...insertActivity,
      id,
      timestamp: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    ).slice(0, 10); // Return only the 10 most recent activities
  }
}

export const storage = new MemStorage();
