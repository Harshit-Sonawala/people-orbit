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
  skillsFreq: { skill: string; count: number }[];
  designationsFreq: { designation: string; count: number }[];
  createdAtFreq: { createdAt: string; count: number }[];
  ageFreq: { age: string; count: number }[];
};
