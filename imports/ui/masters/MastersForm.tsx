import {Masters} from "/imports/api/masters";
import {useTracker} from "meteor/react-meteor-data";
import {MaterialsCollection} from "/imports/api/materials/MaterialsCollection";
import {SpecializationCollection} from "/imports/api/masters/MastersCollection";
import {useState} from "react";
import {Mongo} from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import React from "react";
import {StafffCollection} from "/imports/api/staff/StaffCollection";

interface Props {
    master?: Masters
    onSubmit: (master: Masters) => void
}

export const MasterForm: React.FC<Props> = ({master, onSubmit}) => {

    const materialsFromDb = useTracker(() => MaterialsCollection.find({}).fetch())
    const specializationFromDb = useTracker(() => SpecializationCollection.find({}).fetch())
    const staffFromBD = useTracker(() => StafffCollection.find({}).fetch())

    const [name, setName] = useState(master?.name ?? '')
    const [materials, setMaterials] = useState<string[]>(materialsFromDb.filter(m => (master?.materials.findIndex(mm => mm._id.equals(m._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(m => m._id?.toHexString() ?? '') ?? [])
    const [specializations, setSpecialization] = useState<string[]>(specializationFromDb.filter(s => (master?.specialization.findIndex(ms => ms._id.equals(s._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(s => s._id?.toHexString() ?? '') ?? [])
    const [staff, setStaff] = useState<string[]>(staffFromBD.filter(s => (master?.staff.findIndex(ms => ms._id.equals(s._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(s => s._id?.toHexString() ?? '') ?? [])


    const onClick = () => {
        if (staff === null) return
        onSubmit({
            name,
            materials: materials.map(m => ({_id: new Mongo.ObjectID(m)})),
            specialization: specializations.map(s => ({_id: new Mongo.ObjectID(s)})),
            staff: staff.map(s => ({_id: new Mongo.ObjectID(s)}))
        })
        setName('')
        setMaterials([])
        setSpecialization([])
        setStaff([])
    }

    return (
        <div className="master-form">
            <Property title="Имя:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <Property title="Мастер:" value={
                <select multiple value={materials}
                        onChange={e => setStaff(Array.from(e.target.selectedOptions, option => option.value))}>
                    {staffFromBD.map(m => <option key={m._id?.toHexString()}
                                                  value={m._id?.toHexString()}>{m.surname}</option>)}
                </select>
            }/>
            <Property title="Материалы на руках:">
                <select multiple value={materials}
                        onChange={e => setMaterials(Array.from(e.target.selectedOptions, option => option.value))}>
                    {materialsFromDb.map(m => <option key={m._id?.toHexString()}
                                                   value={m._id?.toHexString()}>{m.name}</option>)}
                </select>
            </Property>
            <Property title="Специальности:">
                <select multiple value={specializations}
                        onChange={e => setSpecialization(Array.from(e.target.selectedOptions, option => option.value))}>
                    {specializationFromDb.map(s => <option key={s._id?.toHexString()}
                                                      value={s._id?.toHexString()}>{s.name}</option>)}
                </select>
            </Property>
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}