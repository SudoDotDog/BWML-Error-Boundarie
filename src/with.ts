/**
 * @author WMXPY
 * @namespace Boundary
 * @description With Error Boundary HOC
 */

import * as React from "react";
import { CommonErrorBoundaryComponentProps } from "./common";
import { SingletonErrorBoundary } from "./singleton";

export const withErrorBoundary = <P = any>(component: React.ComponentType<P>, errorBoundaryProps: CommonErrorBoundaryComponentProps): React.ComponentType<P> => {

    return (props: P) => React.createElement(SingletonErrorBoundary, {

        ...errorBoundaryProps,
    }, React.createElement(component, props));
};
