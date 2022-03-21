import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type AuthResponse = {
  status: boolean;
  error?: any;
};

export type VoidFunction = () => void;

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

type UserItemAccount = {
  id: string;
  name: string;
};

export type UserItem = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  projects?: UserItemAccount[];
};

export type UserItemWithVerify = UserItem & { isVerified?: boolean };
