export interface Profile {
  name: string;
  address: string;
}

export interface UserInterface {
  username: string;
  password: string;
  profile?: Profile;
  registerType?: string;
}
