export default class VerifyAccountEmailTemplate {

    static subject = 'Reset password';

    static text = (link) => {
        return `
            Dear user,

            To reset your password, click on this link: ${link}.

            If you did not request any password resets, then ignore this email.

            Thanks,
            The App
        `;
    };
}
