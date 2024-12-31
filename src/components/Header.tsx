import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

import "./Header.css";
import useStepFormNavigation from "@hooks/useStepFormNavigation";
import ProgressBar from "./ProgressBar";

const Header = () => {
    const stepsContainerRef = useRef<HTMLDivElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);

    const [steps, setSteps] = useState<Element[]>([]);
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

    useStepFormNavigation({
        stepsContainerRef,
        borderRef,
        setSteps,
        setActiveStepIndex,
    });

    const stepCount = 5; // Total number of steps

    return (
        <>
            <ProgressBar activeStepIndex={activeStepIndex} steps={steps} />

            <div className="step-form-header" ref={stepsContainerRef}>
                <h1 className="step-form-header__title">Step Form</h1>

                <div className="step-form-header__steps">
                    <div
                        className="step-form-header__border-bottom"
                        ref={borderRef}
                    ></div>

                    {Array.from({ length: stepCount }, (_, index) => (
                        <Step
                            key={index}
                            step={index + 1}
                            isActive={activeStepIndex === index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

const Step = ({ step, isActive }: { step: number; isActive: boolean }) => {
    return (
        <div
            className={`step-form-header__step ${
                isActive ? "active" : ""
            }`.trim()}
        >
            <span className="step-form-header-step__icon">
                <FontAwesomeIcon icon={faEdit} />
            </span>
            <span className="step-form-header-step__title">Step ({step})</span>
        </div>
    );
};

export default Header;
