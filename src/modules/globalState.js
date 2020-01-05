import React from "react";
import useGlobalHook from "use-global-hook";

const actions = {
    setUserInfo: (_, userInfo) => {
        _.setState({userInfo});
    }
};

const initialState = {
    userInfo: null
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;