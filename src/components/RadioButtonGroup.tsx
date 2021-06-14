import { gameDifficultyToString, stringToGameDifficulty } from "../helpers";
import React from "react";

interface RadioButtonGroupProps {
    groupName: string;
    groupItems: { value: string; label: string }[];
    onValueChange: (selectedValue: string) => void;
    currentValue: string;
}

export function RadioButtonGroup(props: RadioButtonGroupProps) {
    return (
        <React.Fragment>
            {props.groupItems.map((item) => {
                return (
                    <p key={item.value}>
                        <input
                            type="radio"
                            id={item.value}
                            name={props.groupName}
                            value={item.value}
                            checked={props.currentValue === item.value}
                            onChange={(event) => {
                                props.onValueChange(event.target.value);
                            }}
                        />
                        <label htmlFor={item.value}>{item.label}</label>
                    </p>
                );
            })}
        </React.Fragment>
    );
}
