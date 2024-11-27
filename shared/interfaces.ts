export interface State {
  data: string;
  flash: Record<string, string> | null;
}

export interface User {
  versionstamp?: string;

  username: string;
  password: string;

  createdAt: number;
  updatedAt: number;
}
