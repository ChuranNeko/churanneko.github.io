export type SupportData = {
  support: {
    name: string;
    avatar?: string;
    date: string;
    amount: string;
  }[];
};

export type LinksData = {
  links: {
    name: string;
    url: string;
    avatar?: string;
    description?: string;
  }[];
};