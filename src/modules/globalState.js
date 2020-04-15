import React from "react";
import useGlobalHook from "use-global-hook";

const actions = {
    setUserInfo: (_, userInfo) => {
        _.setState({userInfo});
    },
    setRecentCredentials: (_, recentCredentials) => {
        _.setState({recentCredentials});
    },
    dropState: (_) => {
        _.setState(initialState);
    }
};

const initialState = {
    userInfo: null,
    recentCredentials: []
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;