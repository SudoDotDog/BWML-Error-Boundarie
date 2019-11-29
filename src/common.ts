/**
 * @author WMXPY
 * @namespace Boundary
 * @description Common
 */

import * as React from "react";

export type FallbackComponentProps = {

    readonly error?: Error;
    readonly recover?: () => void;
};

export type CommonErrorBoundaryComponentProps = {

    readonly fallbackComponent?: FallbackComponent;
    readonly fallback?: React.ReactNode;
    readonly print?: boolean;
};

export type FallbackComponent = React.ComponentType<FallbackComponentProps>;
