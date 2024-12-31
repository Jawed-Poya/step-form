import { RefObject, useEffect } from "react";

interface StepFormNavigationProps {
    stepsContainerRef: RefObject<HTMLElement>;
    borderRef: RefObject<HTMLElement>;

    // for progress bar
    setActiveStepIndex: (value: number) => void;
    setSteps: (steps: Element[]) => void;
}

const useStepFormNavigation = ({
    stepsContainerRef,
    borderRef,
    setActiveStepIndex,
    setSteps,
}: StepFormNavigationProps) => {
    useEffect(() => {
        const container = stepsContainerRef.current;
        const border = borderRef.current;

        if (!container || !border) return;

        const getActiveStep = (): HTMLElement | null =>
            container.querySelector(".step-form-header__step.active");

        const ensureActiveStep = () => {
            if (!getActiveStep()) {
                const firstStep = container.querySelector(
                    ".step-form-header__step"
                );
                firstStep?.classList.add("active");
            }
        };

        const updateBorderPosition = (step: HTMLElement | null) => {
            if (!step) return;

            const stepRect = step.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const parent = step.parentElement;

            const height = stepRect.height;
            const width = stepRect.width - 8;
            const left = stepRect.left - containerRect.left;
            const top = stepRect.top - containerRect.top - height;

            if (parent?.classList.contains("vertical")) {
                border.style.cssText = `
                    height: ${height - 8}px;
                    top: ${top - (height + 7)}px;
                    left: 0px;
                    width: auto;
                `;
            } else {
                border.style.cssText = `
                    width: ${width}px;
                    left: ${left - 18}px;
                    top: ${top - 5}px;
                    height: 2px;
                `;
            }
        };

        const handleResize = () => {
            updateBorderPosition(getActiveStep());
        };

        const handleStepClick = (e: Event) => {
            const clickedStep = e.currentTarget as HTMLElement;
            container
                .querySelectorAll(".step-form-header__step.active")
                .forEach((step) => step.classList.remove("active"));
            clickedStep.classList.add("active");
            updateBorderPosition(clickedStep);

            const stepIndex = Array.from(
                container.querySelectorAll(".step-form-header__step")
            ).indexOf(clickedStep);
            setActiveStepIndex(stepIndex);
        };

        const attachEventListeners = () => {
            const steps = container.querySelectorAll(".step-form-header__step");

            setSteps(Array.from(steps));

            steps.forEach((step) =>
                step.addEventListener("click", handleStepClick)
            );
            window.addEventListener("resize", handleResize);
            return () => {
                steps.forEach((step) =>
                    step.removeEventListener("click", handleStepClick)
                );
                window.removeEventListener("resize", handleResize);
            };
        };

        // Initialize
        ensureActiveStep();
        updateBorderPosition(getActiveStep());

        // Attach listeners
        return attachEventListeners();
    }, [stepsContainerRef, borderRef, setSteps, setActiveStepIndex]);
};

export default useStepFormNavigation;
