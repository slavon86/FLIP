import * as React from "react";

export class ProgressBar extends React.Component<ProgressBarProps> {
    constructor(props: ProgressBarProps) {
        super(props);
    }

    render() {
        const divStyle = {
            width: this.props.progress.toString() + "%",
        };
        return (
            <div className={"progress"}>
                <div className={"left"} style={divStyle}></div>
            </div>
        );
    }
}

interface ProgressBarProps {
    progress: number;
}
