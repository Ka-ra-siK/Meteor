import {Mongo} from 'meteor/mongo'

export interface OrderService {
    _id?: Mongo.ObjectID
    name: string
    price: number
    master:{_id: Mongo.ObjectID }[]
}

export const OrderServiceCollection = new Mongo.Collection<OrderService>('orderService', {idGeneration: 'MONGO'})