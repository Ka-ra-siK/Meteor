import { Meteor } from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import React from "react";
import {Navigate, Outlet} from "react-router-dom";

export const InitialRoute: React.FC = () => {
    const user = useTracker(() => Meteor.user())

    if (user === null) {
        return <Navigate replace to="/login" />
    }

    return (
        <Outlet />
    )
}
