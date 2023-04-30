interface RolePermissions {
    [role: string]: {
        canUpdate: boolean;
        canDelete: boolean;
        canCreate: boolean;
        canBan: boolean;
    };
}

const rolesPermissions: RolePermissions = {
    admin: {
        canUpdate: true,
        canDelete: true,
        canCreate: true,
        canBan: true,
    },
    user: {
        canUpdate: true,
        canDelete: true,
        canCreate: true,
        canBan: false,
    },
};

export default rolesPermissions;
