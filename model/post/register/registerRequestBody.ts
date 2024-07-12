import {RegisterRequestBodyInterface} from "./registerRequestBodyInterface";

export class RegisterRequestBody implements RegisterRequestBodyInterface {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}