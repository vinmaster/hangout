export interface State {
  data: string;
  flash: Record<string, string> | null;
}

export interface User {
  versionstamp?: string;
  createdAt: number;
  updatedAt: number;

  username: string;
  password: string;
}

export interface Group {
  id?: string;
  createdAt: number;
  updatedAt: number;

  name: string;
  membersCount: number;
  location: string;
  description: string;
  imageUrl: string;
}
