import PassportJwt from 'passport-jwt';

import config from 'config';

/**
 * Passport JWT Strategy
 */
export default class PassportJwtStrategy {

    /**
     * Passport JWT Strategy name
     */
    static name = 'jwt';

    /**
     * Passport JWT Strategy options
     */
    static options = {
        secretOrKey: config.jwt.AUTH.secret,
        jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    /**
     * Passport JWT Strategy verifier
     */
    static verifier = async (payload, done) => {
        /*
            Don't query for the user in the database here. There will be a middleware that will do just that.
            There may be cases when you don't really want to see if the user exists, only validate it's token.
         */
        done(null, { ...payload, id: payload.sub });
    };

    /**
     * Passport JWT Strategy Instance
     */
    static strategy = new PassportJwt.Strategy(
        PassportJwtStrategy.options,
        PassportJwtStrategy.verifier
    );
}
