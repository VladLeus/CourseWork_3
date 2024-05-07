import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {backendActions} from "../store/backendAPI/backend.slice.ts";


const actions = {
    ...backendActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}
