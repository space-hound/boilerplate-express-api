/**
 * Token Enums
 */
export default class TokenEnums {

    /**
     * Available token types - map
     *
     * @type {{
     * AUTH: "AUTH",
     * REFRESH: "REFRESH",
     * VERIFY_ACCOUNT: "VERIFY_ACCOUNT",
     * RESET_PASSWORD: "RESET_PASSWORD"
     * }}
     */
    static TOKENS = {
        AUTH: 'AUTH',
        REFRESH: 'REFRESH',
        VERIFY_ACCOUNT: 'VERIFY_ACCOUNT',
        RESET_PASSWORD: 'RESET_PASSWORD',
    };

    /**
     * Available token types - array
     *
     * @type {[
     * "AUTH",
     * "REFRESH",
     * "VERIFY_ACCOUNT",
     * "RESET_PASSWORD"
     * ]}
     */
    static TOKENS_ARRAY = Object.values(
        TokenEnums.TOKENS
    );
}
