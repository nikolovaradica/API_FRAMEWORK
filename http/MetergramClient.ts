import BaseClient from "./BaseClient"
import { ResponseEntity } from "express"; // Assuming ResponseEntity is similar to express's Response

import { HOSTNAME } from "../util/HostnameConfig";
import {GetUserResponseBody} from "../model/get/GetUserResponseBody";
import {RegisterRequestBody} from "../model/post/register/registerRequestBody";
import {RegisterResponseBody} from "../model/post/register/registerResponseBody";
import {ListUsersResponseBody} from "../model/get/ListUsersResponseBody";
import {CreateResponseBody} from "../model/post/create/createResponseBody";
import {CreateRequestBody} from "../model/post/create/createRequestBody";

export class MetergramClient extends BaseClient {
    private static readonly authenticate = "register";
    private Token: string;

    // private postAuthRequestBody: PostAuthRequestBody = {
    //     email: "nikola_nikolik@hotmail.com",
    //     password: ""
    // };
    private registerBody: RegisterRequestBody = new RegisterRequestBody('eve.holt@reqres.in', 'pistol');

    constructor() {
        super();
        this.baseUrl = HOSTNAME;
        let responseEntity: ResponseEntity<RegisterResponseBody>;
        this.authenticateOnTheSite(this.registerBody).then(data => {
            responseEntity = data;
            this.Token = responseEntity.data.token;
            console.log(`Authorization: Bearer ${this.Token}`);
        }).catch(error => {
            console.error(error.message)
        });
        this.addHeader("Content-Type", "application/json");
        // this.addHeader("Authorization", `Bearer ${this.Token}`);
    }

    public authenticateOnTheSite(body: RegisterRequestBody) {
        return this.post(MetergramClient.authenticate, body);
    }

    public getUserById(id: number): ResponseEntity<GetUserResponseBody> {
        return this.get( "users/" + id);
    }

    public listUsers(page: number, per_page: number): ResponseEntity<ListUsersResponseBody> {
        return this.get('users?page=' + page + '&per_page=' + per_page);
    }

    public createUser(body: CreateRequestBody): ResponseEntity<CreateResponseBody> {
        return this.post('users', body);
    }

    public deleteUser(id: number): ResponseEntity {
        return this.delete('users/' + id);
    }
}
