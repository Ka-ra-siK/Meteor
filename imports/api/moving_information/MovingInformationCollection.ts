import {Mongo} from "meteor/mongo";

export interface MovingInformation {
    _id?: Mongo.ObjectID
    orderDate: string
    orderNumber: string
    position: string
    transferReason: string
}

export const MovingInformationCollection = new Mongo.Collection<MovingInformation>('movingInformation', { idGeneration: 'MONGO' })

