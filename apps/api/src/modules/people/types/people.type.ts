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
  createdOn: Date;
};

export type PaginatedPeople = {
  data: People[];
  meta: {
    total: number;
    limit: number;
    totalPages: number;
    currentPage: number;
  };
};
