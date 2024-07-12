import { GetUserResponseBody } from '../model/get/GetUserResponseBody';
import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import {ListUsersResponseBody} from "../model/get/ListUsersResponseBody";
import {CreateRequestBody} from "../model/post/create/createRequestBody";
import {CreateResponseBody} from "../model/post/create/createResponseBody";


describe('TestCasesTests', () => {
    let metergramClient: MetergramClient;

    beforeEach(() => {
        metergramClient = new MetergramClient();
    });

    test('GetUserByID', async () => {
        const responseEntity = await metergramClient.getUserById(3);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.data.id).toEqual(3)
        expect(user.data.email).toEqual("emma.wong@reqres.in")
    });

    test ('GetUserByIDFail', async () => {
        const responseEntity = await metergramClient.getUserById(1);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.data.id).toEqual(1)
        expect(user.data.email).toEqual("george.bluth@reqres.in")
    });

    test('NotFoundError', async () => {
        const responseEntity = await metergramClient.getUserById(23);
        const status: GetUserResponseBody = responseEntity.status;
        const statusText: GetUserResponseBody = responseEntity.statusText
        expect(statusText).toEqual('Not Found');
        expect(status).toEqual(404)
    });

    test('ListUsers', async () => {
        const page: number = 1;
        const per_page: number = 10;
        const responseEntity = await metergramClient.listUsers(page, per_page);
        expect(responseEntity.status).toEqual(200);
        const responseData: ListUsersResponseBody = responseEntity.data;
        expect(responseData.page).toEqual(page);
        expect(responseData.per_page).toEqual(per_page);
        expect(responseData.total_pages).toEqual(Math.ceil(responseData.total/responseData.per_page));
        expect(responseData.data[4].id).toEqual(5);
        expect(responseData.data[4].email).toEqual('charles.morris@reqres.in');
        expect(responseData.data[4].first_name).toEqual('Charles');
        expect(responseData.data[4].last_name).toEqual('Morris');
        expect(responseData.data[4].avatar).toEqual('https://reqres.in/img/faces/5-image.jpg');
    });

    test('CreateUser', async() => {
        const body: CreateRequestBody = new CreateRequestBody('morpheus', 'leader');
        const responseEntity = await metergramClient.createUser(body);
        expect(responseEntity.status).toEqual(201);
        const responseData: CreateResponseBody = responseEntity.data;
        expect(responseData.name).toEqual(body.getName());
        expect(responseData.job).toEqual(body.getJob());
    });

    test('DeleteUser', async () => {
        const responseEntity = await metergramClient.deleteUser(10);
        expect(responseEntity.status).toEqual(204);
    });
});
