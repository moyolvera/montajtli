import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type AuthResponse = {
  status: boolean;
  error?: any;
};

export type VoidFunction = () => void;

type TimeType =
  | FirebaseFirestoreTypes.Timestamp
  | FirebaseFirestoreTypes.FieldValue;

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  createdAt: TimeType;
  updatedAt: TimeType;
  permission?: ProjectPermissions;
};

export type UserItemProject = {
  id: string;
  permission: ProjectPermissions;
};

export type UserItem = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: TimeType;
  updatedAt: TimeType;
  projects?: UserItemProject[];
};

export type UserItemWithVerify = UserItem & { isVerified?: boolean };
