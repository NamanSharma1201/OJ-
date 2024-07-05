import React from "react";
import Split from "react-split";
import { useParams } from "react-router-dom";
import ProblemDescription from "../components/ProblemDescription";
import CodeEdititor from "../components/CodeEdititor"; // Make sure the filename is correct

const SolveProblem = () => {
    const { id } = useParams();

    return (
        <Split className="split">
            <div>
                <ProblemDescription id={id} />
            </div>
            <div>
                <CodeEdititor />
            </div>
        </Split>
    );
};

export default SolveProblem;
