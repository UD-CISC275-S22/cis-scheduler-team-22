import React from "react";
// import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
// import { ViewCourse } from "./viewCourse";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Button } from "react-bootstrap";
// import { EditSemester } from "./editSemester";
// import { EMPTY_REQUIREMENTS } from "../interfaces/Requirements";

// type ChangeEvent = React.ChangeEvent<
//     HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
// >;

export function CoursePool({
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId,
    coursePool,
    setCoursePool
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
    coursePool: Course[];
    setCoursePool: (newCList: Course[]) => void;
}): JSX.Element {
    function addCoursePool() {
        const d = { ...degreePlan };
        const de = [...degreePlans, d];
        const c = [...coursePool];
        setDegreePlans(de);
        setCoursePool(c);
        setNextId(nextId);
    }
    return (
        <div>
            <Button onClick={() => addCoursePool()}></Button>
        </div>
    );
}