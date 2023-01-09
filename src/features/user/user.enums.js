/**
 * User Enums
 */
export default class UserEnums {

    /**
     * Available user roles - map
     *
     * @type {{
     * USER: "USER",
     * ADMIN: "ADMIN",
     * }}
     */
    static ROLES = {
        USER: 'USER',
        ADMIN: 'ADMIN',
    };

    /**
     * Available user roles - array
     *
     * @type {[
     * "USER",
     * "ADMIN",
     * ]}
     */
    static ROLES_ARRAY = Object.keys(
        UserEnums.ROLES
    );

    /**
     * Available user rights - map
     *
     * @type {{
     * GET_USERS: "GET_USERS",
     * MANAGE_USERS: "MANAGE_USERS",
     * }}
     */
    static RIGHTS = {
        GET_USERS: 'GET_USERS',
        MANAGE_USERS: 'MANAGE_USERS'
    };

    /**
     * Available user rights - array
     *
     * @type {[
     * "GET_USERS",
     * "MANAGE_USERS",
     * ]}
     */
    static RIGHTS_ARRAY = Object.keys(
        UserEnums.RIGHTS
    );

    /**
     * An association between user roles and rights.
     *
     * @type {{
     * USER: [],
     * ADMIN: [
     * "GET_USERS",
     * "MANAGE_USERS"
     * ],
     * }}
     */
    static ROLE_RIGHTS = {
        [UserEnums.ROLES.USER]: [],
        [UserEnums.ROLES.ADMIN]: [
            UserEnums.RIGHTS.GET_USERS,
            UserEnums.RIGHTS.MANAGE_USERS,
        ]
    };
}
