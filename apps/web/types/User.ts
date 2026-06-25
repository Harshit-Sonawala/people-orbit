import { SocialLinks, UserRole } from ".";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  company: string;
  location?: string;
  age?: number;
  role: UserRole;
  phone: string;
  bio?: string;
  skills?: string[];
  socialLinks?: SocialLinks;
  profilePic?: string;
  bgImage?: string;
  createdAt: number;
  updatedAt: number;
  isBanned: boolean;
};
