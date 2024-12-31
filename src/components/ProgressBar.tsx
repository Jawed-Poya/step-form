import useProgressBar from "@hooks/useProgressBar";

interface ProgressBarProps {
    activeStepIndex: number;
    steps: Element[];
}

const ProgressBar = ({ activeStepIndex, steps }: ProgressBarProps) => {
    useProgressBar(activeStepIndex, steps);

    return (
        <div className="progress-bar">
            <div className="progress-bar__fill"></div>
        </div>
    );
};

export default ProgressBar;
