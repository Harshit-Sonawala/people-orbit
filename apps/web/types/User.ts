import { SocialLinks, UserRole } from ".";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  designation: string;
  email: string;
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
