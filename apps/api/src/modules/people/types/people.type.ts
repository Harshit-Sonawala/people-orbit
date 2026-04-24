export type People = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    designation: string;
    email: string;
    phone: string;
    bio?: string;
    skills?: string[];
    socialLinks: {
        linkedIn?: string;
        website?: string;
        github?: string;
    }
    profilePic: string;
    bgImage: string;
};