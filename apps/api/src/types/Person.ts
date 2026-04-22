export type Person = {
    id: number;
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    phone: string;
    profilePic: string;
    bgImage: string;
    bio?: string;
    skills?: string[];
    socialLinks: {
        linkedIn?: string;
        website?: string;
        github?: string;
    }
};