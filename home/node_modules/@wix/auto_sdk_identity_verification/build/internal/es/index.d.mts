import { HttpClient, NonNullablePaths, MaybeContext, BuildRESTFunction } from '@wix/sdk-types';
import { StartOptions, StartResponse, VerifyDuringAuthenticationOptions, StateMachineResponse, VerifyDuringAuthenticationApplicationErrors } from './index.typings.mjs';
export { Address, AddressTag, AddressTagWithLiterals, AddressWrapper, AuthenticatorConnection, Connection, ConnectionTypeOneOf, CustomField, CustomValue, CustomValueValueOneOf, Email, EmailTag, EmailTagWithLiterals, Factor, FactorStatus, FactorStatusWithLiterals, FactorType, FactorTypeWithLiterals, Identity, IdentityProfile, IdpConnection, ListValue, MapValue, Metadata, MfaChallengeData, MfaReason, MfaReasonWithLiterals, Phone, PhoneTag, PhoneTagWithLiterals, PrivacyStatus, PrivacyStatusWithLiterals, PushChallengeData, Reason, ReasonWithLiterals, RequireMfaData, SecondaryEmail, StartRequest, StateMachineResponseStateDataOneOf, StateType, StateTypeWithLiterals, Status, StatusName, StatusNameWithLiterals, StatusV2, StatusWithLiterals, Target, TargetWithLiterals, V1CustomValue, V1CustomValueValueOneOf, V1Factor, V1ListValue, V1MapValue, VerificationChallenge, VerificationChallengeFactorChallengeDataOneOf, VerifyDuringAuthenticationRequest, VerifyRequest, VerifyResponse, WebAuthnChallengeData } from './index.typings.mjs';

declare function start$1(httpClient: HttpClient): StartSignature;
interface StartSignature {
    /**
     * Starts an email verification process by sending a verification code to the identity's email address.
     * The code is sent to the email associated with the provided `identityId`, and the returned `verificationId`
     * identifies the verification process.
     *
     * Email verification is required when the registering member is already listed as a contact, or when it
     * is required by the site's member settings.
     *
     * During registration or authentication, the member then completes verification by calling
     * `VerifyDuringAuthentication` with the `state_token` of the `REQUIRE_EMAIL_VERIFICATION` state — not the
     * `verificationId` returned here, which `VerifyDuringAuthentication` does not accept.
     */
    (options?: StartOptions): Promise<NonNullablePaths<StartResponse, `verificationId`, 2>>;
}
declare function verifyDuringAuthentication$1(httpClient: HttpClient): VerifyDuringAuthenticationSignature;
interface VerifyDuringAuthenticationSignature {
    /**
     * Continues the registration process when a member is required to verify an email address
     * using a verification code received by email.
     *
     * Email verification is required when the registering member is already listed as a contact.
     *
     * Typically, after a successful verification, you generate and use member tokens for the
     * registered member so that subsequent API calls are called as part of a member session.
     * @param - The code to verify.
     */
    (code: string, options: NonNullablePaths<VerifyDuringAuthenticationOptions, `stateToken`, 2>): Promise<NonNullablePaths<StateMachineResponse, `state` | `identity.connections` | `identity.connections.${number}.idpConnection.idpConnectionId` | `identity.connections.${number}.idpConnection.idpUserId` | `identity.connections.${number}.authenticatorConnection.authenticatorConnectionId` | `identity.connections.${number}.authenticatorConnection.reEnrollmentRequired` | `identity.identityProfile.emails` | `identity.identityProfile.phones` | `identity.identityProfile.labels` | `identity.identityProfile.privacyStatus` | `identity.identityProfile.customFields` | `identity.identityProfile.customFields.${number}.name` | `identity.identityProfile.customFields.${number}.value.strValue` | `identity.identityProfile.customFields.${number}.value.numValue` | `identity.identityProfile.customFields.${number}.value.boolValue` | `identity.identityProfile.secondaryEmails` | `identity.identityProfile.secondaryEmails.${number}.email` | `identity.identityProfile.secondaryEmails.${number}.tag` | `identity.identityProfile.phonesV2` | `identity.identityProfile.phonesV2.${number}.phone` | `identity.identityProfile.phonesV2.${number}.tag` | `identity.identityProfile.addresses` | `identity.identityProfile.addresses.${number}.tag` | `identity.email.address` | `identity.email.isVerified` | `identity.status.name` | `identity.status.reasons` | `identity.factors` | `identity.factors.${number}.factorId` | `identity.factors.${number}.type` | `identity.factors.${number}.status`, 7> & {
        __applicationErrorsType?: VerifyDuringAuthenticationApplicationErrors;
    }>;
}

declare const start: MaybeContext<BuildRESTFunction<typeof start$1> & typeof start$1>;
declare const verifyDuringAuthentication: MaybeContext<BuildRESTFunction<typeof verifyDuringAuthentication$1> & typeof verifyDuringAuthentication$1>;

export { StartOptions, StartResponse, StateMachineResponse, VerifyDuringAuthenticationApplicationErrors, VerifyDuringAuthenticationOptions, start, verifyDuringAuthentication };
