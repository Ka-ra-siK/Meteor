import React from 'react'
import {Navigate, useRoutes} from "react-router-dom";
import {SpecializationPage} from "./specialization/SpecializationPage"
import {LoginForm} from "/imports/ui/LoginForm";
import {MovingInformationPage} from "/imports/ui/moving_information/MovingInformationPage";
import {Header} from "/imports/ui/Header";
import {MaterialsPage} from "/imports/ui/materials/MaterialsPage";
import {MasterPage} from "/imports/ui/masters/MastersPage";
import {StafffPage} from "/imports/ui/staff/StaffPage";
import {OrderServicePage} from "/imports/ui/order_service/OrderServicePage";
import {ClientPage} from "/imports/ui/clients/ClientsPage";
import {InitialRoute} from "/imports/ui/authorization/InitialRoute";
import {IsAuthorization} from "/imports/ui/authorization/IsAuthorization";
import {Registration} from "/imports/ui/registration/Registration";

export const App: React.FC = () => {
    const element = useRoutes([
        {
            element: <InitialRoute />,
            children: [

                {
                    path: "/masters",
                    element: <MasterPage />,
                },
                {
                    path: '/materials',
                    element: <MaterialsPage />,
                },
                { path: "/specialization", element: <SpecializationPage /> },
                {
                    path: "/movingInformation",
                    element: <MovingInformationPage />,
                },
                {
                    path: "/staff",
                    element: <StafffPage />,
                },
                {
                    path: "/service",
                    element: <OrderServicePage />,
                },
                {
                    path: "/client",
                    element: <ClientPage />,
                },

            ],
        },
        {
            element: <IsAuthorization />,
            children: [
                { path: '/login', element: <LoginForm /> },
                {
                    path: "/register",
                    element: <Registration />,
                },

            ],
        },
        {
            element: <Navigate to={'/login'} />,
            path: '/',
        },

    ])
    return (
        <div>
            <Header/>
            {element}
        </div>
    )
}