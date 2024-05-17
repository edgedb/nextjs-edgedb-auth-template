"use server";

import { auth } from "@/edgedb";
const authActions = auth.createServerActions();

export const { signout } = authActions;
