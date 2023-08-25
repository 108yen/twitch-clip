import { Clip } from "./clip";

export class ClipDoc {
    [key: string]: Array<Clip>;

    constructor(partial?: Partial<ClipDoc>) {
        Object.assign(this, partial)
    }
}