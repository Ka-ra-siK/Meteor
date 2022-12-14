import { Mongo } from 'meteor/mongo'

export interface Stafff {
    _id?: Mongo.ObjectID
    surname: string
    name: string
    patronymic: string
    address: string
    birthDate: string
    position: string
    salary: number
    movingInformation: { _id: Mongo.ObjectID }[]
}

export const StafffCollection = new Mongo.Collection<Stafff>('stafff', {idGeneration: 'MONGO'})