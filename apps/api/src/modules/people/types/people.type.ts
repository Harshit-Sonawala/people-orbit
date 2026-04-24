export type SocialLinks = {
  linkedIn?: string;
  website?: string;
  github?: string;
};

export type People = {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  designation: string;
  email: string;
  phone: string;
  bio?: string;
  skills?: string[];
  socialLinks: SocialLinks;
  profilePic?: string;
  bgImage?: string;
};

export type PaginatedPeople = {
  data: People[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    currentPage: number;
  };
};
