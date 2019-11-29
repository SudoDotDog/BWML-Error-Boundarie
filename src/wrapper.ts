/**
 * @author WMXPY
 * @namespace Boundary
 * @description Wrapper Error Boundary
 */

import * as React from "react";
import { CommonErrorBoundaryComponentProps, FallbackComponentProps } from "./common";

export type WrapperErrorBoundaryProps = CommonErrorBoundaryComponentProps;

export type WrapperErrorBoundaryStates = {

    readonly error: Error | null;
};

export class WrapperErrorBoundary extends React.Component<WrapperErrorBoundaryProps, WrapperErrorBoundaryStates> {

    public static getDerivedStateFromError(error: Error): WrapperErrorBoundaryStates {

        return {
            error,
        };
    }

    public readonly state: WrapperErrorBoundaryStates = {

        error: null,
    };

    public constructor(props: WrapperErrorBoundaryProps) {

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

            if (this.props.children) {

                return this.props.children;
            }

            return null;
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
