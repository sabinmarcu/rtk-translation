/* eslint-disable react/prefer-stateless-function */

import React, { Component, PropTypes } from "react";
import Service from "./service";

import hookStateBroker from "rtk-state/lib/decorator";

export const installLanguages = (ComposedComponent: Component): Component =>
    @hookStateBroker("language.set", "language.code")
    class extends Component {
        static propTypes = {
            state: PropTypes.object,
        }
        render(): Component {
            return (<ComposedComponent
                {...this.props}
                language={{
                    code: this.props.state["language.code"],
                    sets: this.props.state["language.set"],
                    instance: Service.instance,
                }}
            />);
        }
    };

export const installLanguageSet = (set: string): Function =>
    (ComposedComponent: Component): Component =>

        @hookStateBroker("language.set", "language.code")
        class extends Component {
            static propTypes = {
                state: PropTypes.object,
            }
            render(): Component {
                return (<ComposedComponent
                    {...this.props}
                    translate={(str: string): string => this.props.state["language.set"] && this.props.state["language.set"].sets[set][str] || str}
                    language={{
                        code: this.props.state["language.code"],
                        set: this.props.state["language.set"] && this.props.state["language.set"].sets[set],
                        instance: Service.instance,
                    }}
                />);
            }
        };

export const installLanguageSets = (...sets: string[]): Function =>
    (ComposedComponent: Component): Component =>

        @hookStateBroker("language.set", "language.code")
        class extends Component {
            static propTypes = {
                state: PropTypes.object,
            }
            render(): Component {
                let _sets = this.props.state["language.set"] && Object.keys(this.props.state["language.set"].sets).filter((set: string): boolean => sets.includes(set)) || null;
                if (_sets) {
                    _sets = _sets.map((it: string): Object => this.props.state["language.set"].sets[it]);
                }
                return (<ComposedComponent
                    {...this.props}
                    translate={(str: string): string => _sets && _sets.reduce((prev: string, set: Object): string => set[str] || prev, str) || str}
                    language={{
                        code: this.props.state["language.code"],
                        sets: _sets,
                        instance: Service.instance,
                    }}
                />);
            }
        };
