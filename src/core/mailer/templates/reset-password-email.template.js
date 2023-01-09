export default class ResetPasswordEmailTemplate {

    static subject = 'Verify Account';

    static text = (link) => {
        return `
            Dear user,

            To verify your account, click on this link: ${link}.

            If you did not create an account, then ignore this email.

            Thanks,
            The App
        `;
    };
}
