import React from "react";

export function ProgressBar(props: ProgressBarProps) {
    return (
        <div className="progress">
            <div
                className="left"
                style={{ width: props.progress.toString() + "%" }}
            ></div>
        </div>
    );
}

interface ProgressBarProps {
    progress: number;
}
