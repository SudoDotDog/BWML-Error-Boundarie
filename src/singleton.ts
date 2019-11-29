/**
 * @author WMXPY
 * @namespace Boundary
 * @description Singleton Error Boundary
 */

import * as React from "react";
import { FallbackComponent, FallbackComponentProps } from "./common";

export type SingletonErrorBoundaryProps<T = any> = {

    readonly fallbackComponent?: FallbackComponent;
    readonly fallback?: React.ReactNode;
    readonly print?: boolean;

    readonly children: React.ComponentType<T>;
    readonly childrenProps: T;
};

export type SingletonErrorBoundaryStates = {

    readonly error: Error | null;
};

export class SingletonErrorBoundary extends React.Component<SingletonErrorBoundaryProps, SingletonErrorBoundaryStates> {

    public static getDerivedStateFromError(error: Error): SingletonErrorBoundaryStates {

        return {
            error,
        };
    }

    public readonly state: SingletonErrorBoundaryStates = {

        error: null,
    };

    public constructor(props: SingletonErrorBoundaryProps) {

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

            const children: React.ReactElement = React.Children.only(this.props.children) as React.ReactElement;
            return React.cloneElement(children, {
                ...this.props.childrenProps,
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
