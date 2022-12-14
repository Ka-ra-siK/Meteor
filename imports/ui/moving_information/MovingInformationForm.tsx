import React, {useState} from 'react'
import {Property} from '../Propertyy'
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {MovingInformation} from "/imports/api/moving_information";
// import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
// import {DatePicker} from "@mui/x-date-pickers";
// import {TextField} from "@mui/material";

interface Props {
    movingInformation?: MovingInformation
    onSubmit: (movingInformation: MovingInformation) => void
}

export const MovingInformationForm: React.FC<Props> = ({movingInformation, onSubmit}) => {

    const [position, setPosition] = useState(movingInformation?.position ?? '')
    const [transferReason, setTransferReason] = useState(movingInformation?.transferReason ?? '')
    const [orderNumber, setOrderNumber] = useState(movingInformation?.orderNumber ?? '')
    const [orderDate, setOrderDate] = useState(movingInformation?.orderDate ?? '')

    const onClick = () => {
        if (transferReason === '') return
        onSubmit({
            position,
            transferReason,
            orderNumber,
            orderDate
        })
        setPosition('')
        setTransferReason('')
        setOrderNumber('')
        setOrderDate('')
    }

    return (
        <div className="moving_information-form">
            <Property title="Предыдущая позиция:"
                      value={<input type="text" value={position} onChange={e => setPosition(e.target.value)}/>}/>
            <Property title="Причина ухода:" value={<input type="text" value={transferReason}
                                                           onChange={e => setTransferReason(e.target.value)}/>}/>
            <Property title="Номер приказа:"
                      value={<input type="text" value={orderNumber} onChange={e => setOrderNumber(e.target.value)}/>}/>
            <Property title="Дата приказа:" value={<input type="text" value={orderDate} onChange={e => setOrderDate(e.target.value)}/>}/>
        {/*    <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
        {/*        <DatePicker*/}
        {/*            value={orderDate}*/}
        {/*            onChange={e => {*/}
        {/*                console.log(e)*/}
        {/*                setOrderDate(e)*/}
        {/*            }*/}
        {/*            }}*/}
        {/*            inputFormat="dd/MM/yyyy"*/}

        {/*            renderInput={(params) => (*/}
        {/*                <TextField {...params}}/>*/}
        {/*        )}*/}
        {/*    />*/}
        {/*</LocalizationProvider>*/}
    <button className="button button_green" onClick={onClick}>Ок</button>
</div>
)
}