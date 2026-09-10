import { HttpClient, NonNullablePaths, EventDefinition, MaybeContext, BuildRESTFunction, BuildEventDefinition } from '@wix/sdk-types';
import { CreateRedirectSessionOptions, CreateRedirectSessionResponse, RedirectSessionCreatedEnvelope } from './index.typings.mjs';
export { AccountInfo, AccountInfoMetadata, ActionEvent, AttachAllTemplatesRequest, AttachAllTemplatesResponse, AttachPagesRequest, AttachPagesResponse, AttachPagesResponseStatus, AttachPagesResponseStatusWithLiterals, AuthorizeRequest, BaseEventMetadata, BookingPolicyViolations, CallbackParams, CallbackType, CallbackTypeWithLiterals, CreateAnonymousRedirectSessionRequest, CreateAnonymousRedirectSessionRequestIntentOneOf, CreateAnonymousRedirectSessionResponse, CreateRedirectSessionOptionsIntentOneOf, CreateRedirectSessionRequest, CreateRedirectSessionRequestIntentOneOf, CustomMemberPaths, DomainEvent, DomainEventBodyOneOf, EntityCreatedEvent, EntityDeletedEvent, EntityUpdatedEvent, EventMetadata, IdentificationData, IdentificationDataIdOneOf, Location, LocationType, LocationTypeWithLiterals, MembersAccountSection, MembersAccountSectionWithLiterals, MessageEnvelope, NestedTimeSlot, PhoneCall, Prompt, PromptWithLiterals, RedirectSession, RedirectSessionAuthParams, RedirectSessionBookingsBookParams, RedirectSessionBookingsCheckoutParams, RedirectSessionEcomCheckoutParams, RedirectSessionEcomOrderPaymentRequestParams, RedirectSessionEventsCheckoutParams, RedirectSessionLoginParams, RedirectSessionLogoutParams, RedirectSessionMembersAccountParams, RedirectSessionPaidPlansCheckoutParams, RedirectSessionPreferences, RedirectSessionStoresProductParams, RestoreInfo, SignInURLRequest, SignInURLResponse, Slot, SlotAvailability, SlotResource, Status, StatusWithLiterals, URLDetails, ValidateCallbackURLRequest, ValidateCallbackURLResponse, WaitingList, WebhookIdentityType, WebhookIdentityTypeWithLiterals } from './index.typings.mjs';

declare function createRedirectSession$1(httpClient: HttpClient): CreateRedirectSessionSignature;
interface CreateRedirectSessionSignature {
    /**
     * Creates a URL for redirecting a visitor from an external client site to a Wix page for Wix-managed functionality.
     *
     * The Create Redirect Session method enables your external Wix Headless client site, built on any platform, to integrate Wix-managed frontend functionality for specific processes.
     * For example, your site can temporarily redirect a visitor to Wix for authentication, or for a checkout process for bookings, eCommerce, events, or paid plans transactions.
     *
     * To initiate a redirect session:
     *
     * 1. Call Create Redirect Session with the details required for Wix to take care of one specific process (for example, authentication or a bookings checkout). Provide one or more callback URLs, so Wix can redirect the visitor back to your site as appropriate when the process is over.
     * 1. Redirect your visitor to the URL provided in the response. This URL includes query parameters informing Wix where to redirect the visitor back to on your external site.
     * 1. Make sure the pages at the callback URLs you provided take care of the next stages in your visitor flow.
     *
     * > **Note**: When creating a redirect session for a multilingual site:
     * >
     * > * If you don't specify the `lang` parameter in `additional_query_parameters` and the request contains an `x-wix-linguist` header, the language from the header will be added to the redirect URL as `lang`.
     * > * If you specify the `lang` parameter, it takes priority over the header.
     * @param - Options for creating a redirect session.
     */
    (options?: CreateRedirectSessionOptions): Promise<NonNullablePaths<CreateRedirectSessionResponse, `redirectSession._id` | `redirectSession.fullUrl` | `redirectSession.urlDetails.endpoint` | `redirectSession.shortUrl`, 4>>;
}
declare const onRedirectSessionCreated$1: EventDefinition<RedirectSessionCreatedEnvelope, "wix.headless.v1.redirect_session_created">;

declare const createRedirectSession: MaybeContext<BuildRESTFunction<typeof createRedirectSession$1> & typeof createRedirectSession$1>;
/**
 * Triggered when a redirect session is created.
 */
declare const onRedirectSessionCreated: BuildEventDefinition<typeof onRedirectSessionCreated$1> & typeof onRedirectSessionCreated$1;

export { CreateRedirectSessionOptions, CreateRedirectSessionResponse, RedirectSessionCreatedEnvelope, createRedirectSession, onRedirectSessionCreated };
