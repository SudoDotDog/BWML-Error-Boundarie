/**
 * @author WMXPY
 * @namespace Boundary
 * @description Fallback Error Boundary
 */

import * as React from "react";
import { FallbackComponent, FallbackComponentProps } from "./common";

export type FallbackErrorBoundaryProps = {

    readonly fallbackComponent?: FallbackComponent;
    readonly fallback?: React.ReactNode;
    readonly print?: boolean;
};

export type FallbackErrorBoundaryStates = {

    readonly error: Error | null;
};

export class FallbackErrorBoundary extends React.Component<FallbackErrorBoundaryProps, FallbackErrorBoundaryStates> {

    public static getDerivedStateFromError(error: Error): FallbackErrorBoundaryStates {

        return {
            error,
        };
    }

    public readonly state: FallbackErrorBoundaryStates = {

        error: null,
    };

    public constructor(props: FallbackErrorBoundaryProps) {

        super(props);

        this._recoverError = this._recoverError.bind(this);
    }

    public componentDidCatch(error: Error) {

        if (this.props.print) {
            console.log(error);
        }
    }

    public render() {

        if (!this.state.error) {

            return this.props.children;
        }

        return this._getFallback();
    }

    private _getFallback() {

        if (this.props.fallback) {

            return this.props.fallback;
        }

        if (this.props.fallbackComponent) {

            const props: FallbackComponentProps = {
                error: this.state.error as Error,
                recover: this._recoverError,
            };
            return React.createElement(this.props.fallbackComponent, props);
        }

        return null;
    }

    private _recoverError() {

        this.setState({
            error: null,
        });
    }
}
