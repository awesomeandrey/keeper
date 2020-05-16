import React from "react";
import useGlobalHook from "use-global-hook";
import UserProxy from "./dao/proxies/user/UserProxy";

const actions = {
    setUserInfo: (_, userInfo) => {
        /**
         * Guarantee that global `userInfo` object always has 'ENCRYPTION_KEY' prop fulfilled!
         * (required for interacting with DB source);
         */
        if (userInfo && typeof userInfo === "object") {
            let userProxy = UserProxy.init(userInfo);
            if (!userProxy.encryptionKey) {
                throw new Error("GLOBAL STATE ERROR: `userInfo` object must have 'ENCRYPTION_KEY' prop fulfilled!");
            }
        }
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