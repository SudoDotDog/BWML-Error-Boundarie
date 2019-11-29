/**
 * @author WMXPY
 * @namespace Story
 * @description Triggerable
 */

import * as React from "react";
import { FunctionErrorBoundaryChildrenProps } from "../../src/function";

export type TriggerableMockBugComponentProps = {
} & FunctionErrorBoundaryChildrenProps;

export type TriggerableMockBugComponentStates = {

    readonly counter: number;
};

export class TriggerableMockBugComponent extends React.Component<TriggerableMockBugComponentProps, TriggerableMockBugComponentStates> {

    public readonly state: TriggerableMockBugComponentStates = {

        counter: 0,
    };

    public constructor(props: TriggerableMockBugComponentProps) {

        super(props);

        this._triggerError = this._triggerError.bind(this);
        this._handleClick = this._handleClick.bind(this);
    }

    public render() {

        // tslint:disable-next-line: no-magic-numbers
        if (this.state.counter === 5) {

            throw new Error('Something went Wrong!');
        }

        const text: string = `Click Here ${this.state.counter}/5 Times to Trigger Error`;
        return React.createElement('div', {}, [
            React.createElement('h1', {
                onClick: this._handleClick,
            }, text),
            React.createElement('button', {
                onClick: this._triggerError,
            }, 'Trigger'),
        ]);
    }

    private _triggerError() {

        try {

            throw new Error('Something wrong Triggered!');
        } catch (error) {

            this.props.emitError(error);
        }
    }

    private _handleClick() {

        this.setState({
            counter: this.state.counter + 1,
        });
    }
}
