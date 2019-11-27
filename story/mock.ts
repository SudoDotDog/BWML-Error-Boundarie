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

        return React.createElement('h1', {
            onClick: this._handleClick,
        }, this.state.counter);
    }

    private _handleClick() {

        this.setState({
            counter: this.state.counter + 1,
        });
    }
}
