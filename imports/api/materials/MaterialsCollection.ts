import { Mongo } from 'meteor/mongo'

export interface Materials {
    _id?: Mongo.ObjectID
    name: string
    unitMeasurement: string
    cost: number
}

export const MaterialsCollection = new Mongo.Collection<Materials>('materials', { idGeneration: 'MONGO' })