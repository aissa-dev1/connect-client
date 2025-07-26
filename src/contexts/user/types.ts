interface UserType {
  id: number;
  email: string;
  username: string;
}

interface MinimalUserType {
  id: number;
  username: string;
}

interface SearchUserType {
  username: string;
}

export type { UserType, MinimalUserType, SearchUserType };
