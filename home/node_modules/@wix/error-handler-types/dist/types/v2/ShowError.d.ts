export interface ShowErrorActionProps {
    text: string;
    onClick?: () => void;
}
export type ShowErrorProps = {
    message?: string;
    action?: ShowErrorActionProps;
    [key: string]: unknown;
};
export interface ShowErrorOverrideProps {
    message?: string;
    action?: ShowErrorActionProps;
    /**
     * For supported platforms, this will be used as the name for that show-error BI event.
     */
    name?: string;
}
export interface PlatformShowErrorProps {
    message?: string;
    action?: {
        text: string;
        onClick: () => void;
    };
    requestId?: string | null;
}
export type ShowError = (error: unknown, props?: Partial<ShowErrorOverrideProps> | null) => void;
export type PlatformShowError = (props: PlatformShowErrorProps) => void;
//# sourceMappingURL=ShowError.d.ts.map