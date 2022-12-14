//TODO DBref
//mongo_url
//ex
//karasik@karasik-PC:~$ MONGO_URL="mongodb://mongos_addr:8899"
// karasik@karasik-PC:~$ export MONGO_URL
// karasik@karasik-PC:~$ set|grep MONGO
// MONGO_URL=mongodb://mongos_addr:8899
// _=MONGO_URL

import {Mongo} from "meteor/mongo"

// karasik@karasik-PC:~$
export interface Masters {
    _id?: Mongo.ObjectID

    name: string

    staff: {
        _id: Mongo.ObjectID
    }[]
    materials: {
        _id: Mongo.ObjectID
    }[]
    specialization: { _id: Mongo.ObjectID }[]
}

export const MasterCollection = new Mongo.Collection<Masters>('master', {idGeneration: 'MONGO'})

export interface Specialization {
    _id?: Mongo.ObjectID
    name: string
}

export const SpecializationCollection = new Mongo.Collection<Specialization>('specialization', {idGeneration: 'MONGO'})