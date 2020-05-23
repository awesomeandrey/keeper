import React from "react";
import useGlobalHook from "use-global-hook";

const actions = {
    setUserInfo: (_, userInfo) => {
        _.setState({userInfo});
    },
    setAppVersion: (_, appVersion) => {
        _.setState({appVersion});
    },
    setAppLink: (_, appLink) => {
        _.setState({appLink});
    },
    setRecentCredentials: (_, recentCredentials) => {
        _.setState({recentCredentials});
    },
    dropState: (_) => {
        let {appVersion, appLink} = _.state; // Keeper App version value non-changed;
        _.setState({...initialState, appVersion, appLink});
    }
};

const initialState = {
    userInfo: null,
    recentCredentials: [],
    appVersion: null
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;