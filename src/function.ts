/**
 * @author WMXPY
 * @namespace Boundary
 * @description Function Error Boundary
 */

import * as React from "react";
import { FallbackComponent, FallbackComponentProps } from "./common";

export type FunctionErrorBoundaryChildrenProps = {

    readonly emitError: (error: Error) => void;
};

export type FunctionErrorBoundaryProps = {

    readonly fallbackComponent?: FallbackComponent;
    readonly fallback?: React.ReactNode;
    readonly print?: boolean;

    readonly children: (props: FunctionErrorBoundaryChildrenProps) => React.ReactNode;
};

export type FunctionErrorBoundaryStates = {

    readonly error: Error | null;
};

export class FunctionErrorBoundary extends React.Component<FunctionErrorBoundaryProps, FunctionErrorBoundaryStates> {

    public static getDerivedStateFromError(error: Error): FunctionErrorBoundaryStates {

        return {
            error,
        };
    }

    public readonly state: FunctionErrorBoundaryStates = {

        error: null,
    };

    public constructor(props: FunctionErrorBoundaryProps) {

        super(props);

        this._emitError = this._emitError.bind(this);
        this._recoverError = this._recoverError.bind(this);
    }

    public componentDidCatch(error: Error) {

        if (this.props.print) {
            console.log(error);
        }
    }

    public render() {

        if (!this.state.error) {

            return this.props.children({
                emitError: this._emitError,
            });
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

    private _emitError(error: Error) {

        this.setState({
            error,
        });
    }

    private _recoverError() {

        this.setState({
            error: null,
        });
    }
}
