import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route.js";

export function auth() {
  return getServerSession(authOptions);
}
