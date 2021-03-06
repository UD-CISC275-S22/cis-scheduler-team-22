import React from "react";
import { Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester, SemesterSession } from "../interfaces/Semester";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditSemester({
    degreePlans,
    degreePlan,
    semester,
    setDegreePlans
}: {
    degreePlans: DegreePlan[];
    degreePlan: DegreePlan;
    semester: Semester;
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    function updateSemesterSession(event: ChangeEvent) {
        const indexOfDegreePlan = degreePlans.findIndex(
            (idxDegPlan: DegreePlan): boolean => idxDegPlan.id === degreePlan.id
        );
        const newSemesterArray = [...degreePlan.semesters];
        const indexOfSemester = newSemesterArray.findIndex(
            (idxSemester: Semester): boolean => idxSemester.id === semester.id
        );
        const newSemester = {
            ...newSemesterArray[indexOfSemester],
            session: event.target.value as SemesterSession
        };
        newSemesterArray.splice(indexOfSemester, 1, newSemester);
        const newDegreePlan = { ...degreePlan, semesters: newSemesterArray };
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(indexOfDegreePlan, 1, newDegreePlan);
        setDegreePlans(newDegreePlans);
    }
    function updateSemesterYear(event: React.ChangeEvent<HTMLInputElement>) {
        const indexOfDegreePlan = degreePlans.findIndex(
            (idxDegPlan: DegreePlan): boolean => idxDegPlan.id === degreePlan.id
        );
        const newSemesterArray = [...degreePlan.semesters];
        const indexOfSemester = newSemesterArray.findIndex(
            (idxSemester: Semester): boolean => idxSemester.id === semester.id
        );
        const newSemester = {
            ...newSemesterArray[indexOfSemester],
            year: parseInt(event.target.value) || 0
        };
        newSemesterArray.splice(indexOfSemester, 1, newSemester);
        const newDegreePlan = { ...degreePlan, semesters: newSemesterArray };
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(indexOfDegreePlan, 1, newDegreePlan);
        setDegreePlans(newDegreePlans);
    }
    return (
        <div>
            <Form.Label>Change Semester Session</Form.Label>
            <Form.Select
                value={semester.session}
                onChange={updateSemesterSession}
                data-testid={semester.id.toString() + "-session"}
            >
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
            </Form.Select>
            <Form.Label>Change Semester Year</Form.Label>
            <Form.Control
                key={semester.id.toString() + "-semester"}
                onChange={updateSemesterYear}
                value={semester.year}
                id={semester.id.toString() + "-semester"}
                data-testid={semester.id.toString() + "-semester"}
            ></Form.Control>
        </div>
    );
}
