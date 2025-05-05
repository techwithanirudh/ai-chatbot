export type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string | null;
  status: number;
  phone: string | null;
  companyName: string | null;
  companySize: string | null;
  usagePlanned: string | null;
  botsApiKey: string | null;
  id: number;
};

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
