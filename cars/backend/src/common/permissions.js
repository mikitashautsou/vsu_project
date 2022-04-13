export const requirePermissions = (role, roles) => {
  if (!roles.includes(role)) {
    throw new Error("Access denied");
  }
};

export const requirePermissionAtLeast = (role, minimumRole) => {
  if (minimumRole === "admin" && role !== "admin") {
    throw new Error("Access denied");
  } else if (
    minimumRole === "manager" &&
    !["manager", "admin"].includes(role)
  ) {
    throw new Error("Access denied");
  } else if (
    minimumRole === "accountant" &&
    !["manager", "admin", "accountant"].includes(role)
  ) {
    throw new Error("Access denied");
  } else if (
    minimumRole === "policeman" &&
    !["manager", "admin", "policeman"].includes(role)
  ) {
    throw new Error("Access denied");
  }
};


export const hasRoleAtLeast = (role, minimumRole) => {
  if (minimumRole === "admin" && role !== "admin") {
    return false
  } else if (
    minimumRole === "manager" &&
    !["manager", "admin"].includes(role)
  ) {
    return false
  } else if (
    minimumRole === "accountant" &&
    !["manager", "admin", "accountant"].includes(role)
  ) {
    return false
  } else if (
    minimumRole === "policeman" &&
    !["manager", "admin", "policeman"].includes(role)
  ) {
    return false
  }
  return true
};