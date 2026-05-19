import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@/components/Heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    variant: "lg",
    children: "Heading Large (h1)",
  },
};

export const Medium: Story = {
  args: {
    variant: "md",
    children: "Heading Medium (h2)",
  },
};

export const Small: Story = {
  args: {
    variant: "sm",
    children: "Heading Small (h3)",
  },
};

export const CustomTag: Story = {
  args: {
    variant: "lg",
    as: "h3",
    children: "Large style as h3 tag",
  },
};
