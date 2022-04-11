import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditCourse({
    degreePlans,
    degreePlan,
    semester,
    course,
    setDegreePlans
}: {
    degreePlans: DegreePlan[];
    degreePlan: DegreePlan;
    semester: Semester;
    course: Course;
    setDegreePlans: (plans: DegreePlan[]) => void;
}) {
    function updateCourse(courseId: string, name: string, credits: number) {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const foundSemester = foundDegreePlan.semesters.find(
            (semester1: Semester): boolean => semester1.id === semester.id
        );
        if (foundSemester === undefined) {
            return;
        }
        const foundCourse = foundSemester.courses.find(
            (course1: Course): boolean => course1.id === course.id
        );
        if (foundCourse === undefined) {
            return;
        }
        const newCourse: Course = {
            ...foundCourse,
            courseNumber: courseId,
            name: name,
            credits: credits
        };
        const newSemester: Semester = {
            ...foundSemester,
            courses: foundSemester.courses.map(
                (course: Course): Course =>
                    course.id === newCourse.id ? newCourse : course
            )
        };
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: foundDegreePlan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === newSemester.id ? newSemester : semester
            )
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function updateCourseNumber(event: ChangeEvent) {
        updateCourse(event.target.value, course.name, course.credits);
    }
    function updateCourseName(event: ChangeEvent) {
        updateCourse(course.courseNumber, event.target.value, course.credits);
    }
    function updateCourseCredits(event: ChangeEvent) {
        updateCourse(
            course.courseNumber,
            course.name,
            parseInt(event.target.value) || 0
        );
    }

    return (
        <div>
            <h3>Editing {course.courseNumber}</h3>
            <Form.Group controlId="formCourseNumber">
                <Form.Label>Course Number:</Form.Label>
                <Form.Control value={course.id} onChange={updateCourseNumber} />
            </Form.Group>
            <Form.Group controlId="formCourseName">
                <Form.Label>Course Number:</Form.Label>
                <Form.Control value={course.name} onChange={updateCourseName} />
            </Form.Group>
            <Form.Group controlId="formCourseCredits">
                <Form.Label>Course Number:</Form.Label>
                <Form.Control
                    value={course.credits}
                    onChange={updateCourseCredits}
                    type={"number"}
                />
            </Form.Group>
        </div>
    );
}
