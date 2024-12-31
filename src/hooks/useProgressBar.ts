import { useEffect } from "react";
const useProgressBar = (activeStepIndex: number, steps: Element[]) => {
    useEffect(() => {
        const fill = document.querySelector(
            ".progress-bar__fill"
        ) as HTMLElement;

        if (!fill || steps.length === 0) return;

        const updateProgressBar = () => {
            // const activeStep = Array.from(steps).find((step) =>
            //     step.classList.contains("active")
            // ) as HTMLElement;

            // if (!activeStep) return;

            // const activeStepIndex = Array.from(steps).indexOf(activeStep);
            const stepWidth = ((activeStepIndex + 1) / steps.length) * 100;

            fill.style.width = `${stepWidth}%`;
        };

        const handleStepClick = () => {
            updateProgressBar();
        };

        // Attach event listeners
        steps.forEach((step) =>
            step.addEventListener("click", handleStepClick)
        );

        // Initialize progress bar
        updateProgressBar();

        // Cleanup event listeners
        return () => {
            steps.forEach((step) =>
                step.removeEventListener("click", handleStepClick)
            );
        };
    }, [activeStepIndex, steps]);
};

export default useProgressBar;
