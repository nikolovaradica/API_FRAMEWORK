import {CreateRequestBodyInterface} from "./createRequestBodyInterface";

export class CreateRequestBody implements CreateRequestBodyInterface {
    name: string;
    job: string;

    constructor(name: string, job: string) {
        this.name = name;
        this.job = job;
    }

    getName() {
        return this.name;
    }

    getJob() {
        return this.job;
    }
}