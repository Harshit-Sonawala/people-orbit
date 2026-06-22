export type UserStats = {
  // Cards data
  totalUsers: number;
  newUsersCount: number;
  uniqueDesignations: number;
  uniqueSkills: number;
  avgAge: number;
  topDesignations: string[];
  topSkills: string[];
  newestUserName: string;

  // Charts data
  skillsFreq: { skill: string; count: number | string }[];
  designationsFreq: { designation: string; count: number | string }[];
  createdAtFreq: { createdAt: string; count: number | string }[];
  ageFreq: { age: number; count: number | string }[];
};
