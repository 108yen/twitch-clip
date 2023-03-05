import { atom } from "jotai";
import { Clip, User } from "./types";

export const usersAtom = atom<Array<User>>([]);
export const clipsAtom = atom<Array<Clip>>([]);

export const tabAtom = atom<string>('day');