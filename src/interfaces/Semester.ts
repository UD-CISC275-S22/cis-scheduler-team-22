import { Course } from "./Course";

export interface Semester {
    id: number;
    courses: Course[];
    session: string;
    length: number;
    year: number;
}