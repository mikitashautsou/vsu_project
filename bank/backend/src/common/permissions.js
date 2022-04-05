export const requirePermissions = (role, roles) => {
    if (!roles.includes(role)) {
        throw new Error('Access denied')
    }
}