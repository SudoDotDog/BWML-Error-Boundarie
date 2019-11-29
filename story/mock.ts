/**
 * @author WMXPY
 * @namespace Story
 * @description Mock
 */

import * as React from "react";

export type MockBugComponentStates = {

    readonly counter: number;
};

export class MockBugComponent extends React.Component<{}, MockBugComponentStates> {

    public readonly state: MockBugComponentStates = {

        counter: 0,
    };

    public constructor(props) {

        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    public render() {

        // tslint:disable-next-line: no-magic-numbers
        if (this.state.counter === 5) {

            throw new Error('Something went Wrong!');
        }

        const text: string = `Click Here ${this.state.counter}/5 Times to Trigger Error`;
        return React.createElement('h1', {
            onClick: this._handleClick,
        }, text);
    }

    private _handleClick() {

        this.setState({
            counter: this.state.counter + 1,
        });
    }
}
