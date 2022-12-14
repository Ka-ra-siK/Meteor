import {Mongo} from "meteor/mongo";

export interface Client{
    _id?: Mongo.ObjectID
    surname: string
    name: string
    patronymic: string
    phoneNumber: string
    orderService:{_id: Mongo.ObjectID}[]
}

export const ClientsCollection = new Mongo.Collection<Client>('client', {idGeneration: 'MONGO'})
