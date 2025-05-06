/**
 * Represents a user in the system
 */
export type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string | null;
  /**
   * User status code as per Meeting BaaS accounts table
   * Status 4 represents a verified user, and is required for legacy services
   */
  status: number;
  phone: string | null;
  companyName: string | null;
  companySize: string | null;
  usagePlanned: string | null;
  botsApiKey: string | null;
  id: number;
};

/**
 * Represents an authenticated user session
 * Contains both session metadata and the associated user information
 */
export type Session = {
  session: {
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: number;
    id: string;
  };
  user: User;
};
