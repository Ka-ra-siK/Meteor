import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';


export const IsAuthorization: React.FC = () => {
    const user = useTracker(() => Meteor.user())

    if (user !== null) {
        return <Navigate replace to="/masters" />
    }

    return <Outlet />
}