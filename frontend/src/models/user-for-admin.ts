import {Model} from "./car-model.ts";

export interface User {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: '';
    carModel: Model;
    userRole: string;
}
