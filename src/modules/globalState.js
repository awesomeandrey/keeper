import React from "react";
import useGlobalHook from "use-global-hook";

const actions = {
    setUserInfo: (_, userInfo) => {
        _.setState({userInfo});
    },
    setAppVersion: (_, appVersion) => {
        _.setState({appVersion});
    },
    setRecentCredentials: (_, recentCredentials) => {
        _.setState({recentCredentials});
    },
    dropState: (_) => {
        let {appVersion} = _.state; // Keeper App version value non-changed;
        _.setState({...initialState, appVersion});
    }
};

const initialState = {
    userInfo: null,
    recentCredentials: [],
    appVersion: null
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;