import React from "react";
import { Semester, SemesterSession } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";
import { ViewSemester } from "./viewSemester";
import { Button, Col, Row } from "react-bootstrap";

export function ViewDegreePlan({
    degreePlan,
    degreePlans,
    setDegreePlans
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    function clearPlan() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: foundDegreePlan.semesters.map(
                (semester: Semester): Semester => ({ ...semester, courses: [] })
            )
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function removePlan() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: []
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function addNewSemester() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        let highestID = 0;
        if (foundDegreePlan.semesters.length !== 0) {
            highestID = foundDegreePlan.semesters.reduce((prev, current) =>
                prev.id > current.id ? prev : current
            ).id;
        }
        const emptySemester = {
            id: highestID + 1,
            courses: [],
            session: "winter" as SemesterSession,
            year: 0
        };
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: [...foundDegreePlan.semesters, emptySemester]
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    return (
        <div>
            <h3>{degreePlan.name}</h3>
            <Row>
                {degreePlan.semesters.map(
                    (semester: Semester): JSX.Element => (
                        <Col
                            key={
                                degreePlan.id.toString() +
                                "-" +
                                semester.id.toString() +
                                "-" +
                                "course"
                            }
                        >
                            <p>
                                <ViewSemester
                                    semester={semester}
                                    degreePlan={degreePlan}
                                    degreePlans={degreePlans}
                                    setDegreePlans={setDegreePlans}
                                />
                            </p>
                        </Col>
                    )
                )}
            </Row>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => addNewSemester()}
            >
                Add New Semester
            </Button>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => clearPlan()}
            >
                Clear All Semesters
            </Button>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => removePlan()}
            >
                Remove All Semesters
            </Button>
        </div>
    );
}
