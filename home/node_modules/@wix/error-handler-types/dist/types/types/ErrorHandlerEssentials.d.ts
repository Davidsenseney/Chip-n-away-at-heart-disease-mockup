import { CreateI18n } from './i18n';
import { BiLogger, BiLoggerFactory } from './bi';
export interface ErrorMonitor {
    captureException(error: Error): void;
}
export interface Experiments {
    enabled(key: string): boolean;
}
export interface ErrorHandlerEssentials {
    readonly biLoggerOrFactory: BiLogger | (() => BiLoggerFactory);
    readonly environment: {
        artifactId: string;
        fullArtifactId?: string;
        version?: string | null;
    };
    createErrorMonitor: (options: {
        dsn: string;
    }) => ErrorMonitor;
    createExperiments?: (options: {
        scopes: string[];
    }) => Experiments;
    createI18n: CreateI18n;
    biDefaultsOverrides?: {
        hostingEnvironment?: string;
        app_id?: string;
    };
}
//# sourceMappingURL=ErrorHandlerEssentials.d.ts.map