export type UserRole = "admin" | "hr" | "employee" | "candidate";

type StoredUser = {
  name?: string;
  email?: string;
  role?: UserRole;
};

const HR_ROLES: UserRole[] = ["admin", "hr", "employee"];

export const getDashboardPath = (role?: string | null) => {
  return role === "candidate" ? "/candidate" : "/";
};

export const isHrRole = (role?: string | null) => {
  return HR_ROLES.includes(role as UserRole);
};

export const isCandidateRole = (role?: string | null) => {
  return role === "candidate";
};

export const getStoredUserRole = () => {
  const storedRole = localStorage.getItem("userRole") as UserRole | null;

  if (storedRole) {
    return storedRole;
  }

  const token = localStorage.getItem("accessToken");
  const tokenRole = token ? getRoleFromToken(token) : undefined;

  if (tokenRole) {
    localStorage.setItem("userRole", tokenRole);
  }

  return tokenRole ?? null;
};

export const storeAuthUser = (user?: StoredUser) => {
  if (!user) return;

  if (user.name) {
    localStorage.setItem("userName", user.name);
  }

  if (user.email) {
    localStorage.setItem("userEmail", user.email);
  }

  if (user.role) {
    localStorage.setItem("userRole", user.role);
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
};

export const getRoleFromToken = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;

    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded.role as UserRole | undefined;
  } catch {
    return undefined;
  }
};
