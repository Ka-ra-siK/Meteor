import React, { useState } from 'react'
import { Property } from '../Propertyy'

import {Specialization} from "../../api/masters/MastersCollection";

interface Props {
    specialization?: Specialization
    onSubmit: (specialization: Specialization) => void
}

export const SpecializationForm: React.FC<Props> = ({ specialization, onSubmit }) => {

    const [name, setName] = useState(specialization?.name ?? '')

    const onClick = () => {
        if (name === '') return
        onSubmit({
            name,
        })
        setName('')
    }

    return (
        <div className="specialization-form">
            <Property title="Название специализации:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}