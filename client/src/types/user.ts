export interface User {
  user: {
    _id: string;
    name: string;
    email: string;
    role: "customer" | "admin";
    avatar?: {
      image_url: string;
      public_id: string;
    };
  };
}
