interface RolePermissions {
    [role: string]: {
        canGet: boolean;
        canUpdate: boolean;
        canDelete: boolean;
        canCreate: boolean;
        canBan: boolean;
    };
}

// User have permission to do CRUD and extra things.
const rolesPermissions: RolePermissions = {
    admin: {
        canGet: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canBan: true,
    },
    user: {
        canGet: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canBan: false,
    },
};

export default rolesPermissions;
