import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PeopleCard from './PeopleCard';

const meta = {
  component: PeopleCard,
} satisfies Meta<typeof PeopleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "People": {
      "id": 0,
      "firstName": "firstName",
      "lastName": "lastName",
      "age": 0,
      "designation": "designation",
      "email": "storybook@example.com",
      "phone": "1234567890",
      "bio": "bio",
      "skills": [
        "skills"
      ],
      "socialLinks": {
        "linkedIn": "linkedIn",
        "website": "website",
        "github": "github"
      },
      "profilePic": "profilePic",
      "bgImage": "#ff4785"
    },

    People: {
      "id": 0,
      "firstName": "Harshit",
      "lastName": "Sonawala",
      "age": 0,
      "designation": "Full Stack Developer",
      "email": "storybook@example.com",
      "phone": "1234567890",
      "bio": "bio",
      "skills": ["skills"],

      "socialLinks": {
        "linkedIn": "linkedIn",
        "website": "website",
        "github": "github"
      },

      "profilePic": "profilePic",
      "bgImage": "#ff4785"
    }
  },
};