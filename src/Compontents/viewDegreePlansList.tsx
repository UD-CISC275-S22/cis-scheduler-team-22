import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { Course } from "../interfaces/Course";
import { Degree } from "../interfaces/Degree";
import { DegreePlan, getUnfilledRequirements } from "../interfaces/DegreePlan";
import { countCreditsArray, Semester } from "../interfaces/Semester";
import { Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { createCSVTable } from "../interfaces/CourseCSVTable";
import { AddToDegreePlansList } from "./addDegreePlansList";

export interface AddDegreePlanToList {
    // Consumes a function that consumes data and returns nothing, passes to a React State Setter).
    appendDegreePlanToList: (
        id: number,
        degree: Degree,
        name: string,
        semesters: Semester[]
    ) => void;
}

export function ViewDegreePlansList({
    degreePlansList,
    setDegreePlans,
    selectedPlanId,
    setSelectedPlanId,
    nextId,
    setNextId
}: {
    degreePlansList: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    selectedPlanId: number;
    setSelectedPlanId: (id: number) => void;
    nextId: number;
    setNextId: (id: number) => void;
}): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [addingDegreePlan, setAddingDegreePlan] = useState<boolean>(false);

    function removeQuizByTitle(degreePlanId: number) {
        const modifiedDegreePlansList = degreePlansList.filter(
            (degreeplan: DegreePlan): boolean => degreeplan.id !== degreePlanId
        );
        // Update the movies array to be the new version
        setDegreePlans(modifiedDegreePlansList);
    }
    return (
        <div>
            <div>
                <Form.Check
                    style={{ marginLeft: "3%", marginRight: "75%" }}
                    type="switch"
                    id="can-edit-degreePlansList"
                    role="can-edit-degreePlansList"
                    label={<h5>Click to edit Degree Plans</h5>}
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                    data-testid="edit-switch-degreePlansList"
                />
            </div>
            <div
                style={{
                    border: "3px solid black",
                    marginLeft: "50px",
                    marginRight: "50px",
                    backgroundColor: "#DCDCDC"
                }}
            >
                {degreePlansList.length > 0 ? (
                    <div>
                        {degreePlansList.map(
                            (degreePlanOption: DegreePlan): JSX.Element => (
                                <div key={degreePlanOption.id.toString()}>
                                    <div
                                        style={{
                                            border: "1px solid black",
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                            marginTop: "20px",
                                            backgroundColor: "white"
                                        }}
                                    >
                                        {
                                            <span
                                                style={{
                                                    fontWeight: "550",
                                                    fontSize: "160%"
                                                }}
                                            >
                                                {degreePlanOption.name +
                                                    " - " +
                                                    degreePlanOption.semesters
                                                        .length +
                                                    " semesters, " +
                                                    degreePlanOption.semesters.reduce(
                                                        (
                                                            currentTotal: number,
                                                            semester: Semester
                                                        ): number =>
                                                            currentTotal +
                                                            semester.courses
                                                                .length,
                                                        0
                                                    ) +
                                                    " courses, " +
                                                    countCreditsArray(
                                                        degreePlanOption.semesters
                                                    ) +
                                                    " credits "}
                                                <span
                                                    style={{
                                                        fontSize: "50%",
                                                        fontWeight: "20%",
                                                        marginLeft: "1%"
                                                    }}
                                                >
                                                    {"Degree type: " +
                                                        degreePlanOption.degree
                                                            .name}
                                                </span>
                                                <br />
                                                {selectedPlanId ===
                                                    degreePlanOption.id &&
                                                    "(currently viewing below)"}
                                            </span>
                                        }
                                        <div>
                                            <Button
                                                onClick={() =>
                                                    setSelectedPlanId(
                                                        degreePlanOption.id
                                                    )
                                                }
                                                style={{
                                                    fontSize: "18px",
                                                    fontStyle: "900px",
                                                    marginBottom: "10px",
                                                    fontFamily: "Arial",
                                                    marginRight: "20px"
                                                }}
                                                data-testid={
                                                    degreePlanOption.id +
                                                    "-degree-plan"
                                                }
                                            >
                                                View Plan
                                            </Button>
                                            <CSVLink
                                                data={createCSVTable(
                                                    degreePlanOption
                                                )}
                                                filename={
                                                    degreePlanOption.name +
                                                    ".csv"
                                                }
                                                style={{ marginRight: "20px" }}
                                                data-testid={
                                                    degreePlanOption.id +
                                                    "-csv-link"
                                                }
                                            >
                                                Download Plan as CSV
                                            </CSVLink>
                                            {editMode && (
                                                <Button
                                                    style={{
                                                        marginBottom: "10px",
                                                        backgroundColor: "red",
                                                        fontSize: "18px",
                                                        fontStyle: "900px",
                                                        fontFamily: "Arial",
                                                        display: "inline-block"
                                                    }}
                                                    onClick={() =>
                                                        removeQuizByTitle(
                                                            degreePlanOption.id
                                                        )
                                                    }
                                                    data-testid={
                                                        degreePlanOption.id +
                                                        "-delete-plan"
                                                    }
                                                >
                                                    Delete this Degree Plan
                                                </Button>
                                            )}
                                            {getUnfilledRequirements(
                                                degreePlanOption
                                            ).length === 0 && (
                                                <div
                                                    style={{
                                                        color: "green",
                                                        maxWidth: 900,
                                                        margin: "0 auto"
                                                    }}
                                                >
                                                    {degreePlanOption.degree
                                                        .name !==
                                                        "No Degree" && (
                                                        <div>
                                                            This degree plan
                                                            fulfills all degree
                                                            requirements.
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {getUnfilledRequirements(
                                                degreePlanOption
                                            ).length > 0 && (
                                                <div
                                                    style={{
                                                        color: "red",
                                                        maxWidth: 900,
                                                        margin: "0 auto"
                                                    }}
                                                >
                                                    <ul>
                                                        {getUnfilledRequirements(
                                                            degreePlanOption
                                                        ).map(
                                                            (
                                                                string: string
                                                            ): JSX.Element => (
                                                                <li
                                                                    key={
                                                                        string +
                                                                        " requirement failed"
                                                                    }
                                                                >
                                                                    {string}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div>No Degree Plans</div>
                )}
                {editMode && addingDegreePlan && (
                    <AddToDegreePlansList
                        degreePlansList={degreePlansList}
                        setDegreePlans={setDegreePlans}
                        nextId={nextId}
                        setNextId={setNextId}
                    />
                )}
                {editMode && (
                    <Button
                        style={{
                            backgroundColor: "grey",
                            marginBottom: "10px"
                        }}
                        onClick={() => setAddingDegreePlan(!addingDegreePlan)}
                        data-testid="add-close-degree-plan"
                    >
                        {addingDegreePlan
                            ? "Close adding option"
                            : "Click To Add Degree Plan"}
                    </Button>
                )}
                <div style={{ textAlign: "left", fontSize: "small" }}>
                    *Degrees with <b>No Type</b> show no requirements
                </div>
                <div style={{ textAlign: "left", fontSize: "small" }}>
                    *To save plans, scroll to page bottom and click{" "}
                    <b>Save Data</b>
                </div>
            </div>
        </div>
    );
}
