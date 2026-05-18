import React, {createContext, useContext, useMemo, useState} from "react";

const initialState = {
    userInfo: null,
    recentCredentials: []
};

const GlobalContext = createContext(null);

const GlobalProvider = ({children}) => {
    const [state, setState] = useState(initialState);

    const actions = useMemo(() => ({
        setUserInfo: (userInfo) => setState(s => ({...s, userInfo})),
        setAppVersion: (appVersion) => setState(s => ({...s, appVersion})),
        setRecentCredentials: (recentCredentials) => setState(s => ({...s, recentCredentials})),
        dropState: () => setState({...initialState})
    }), []);

    return (
        <GlobalContext.Provider value={[state, actions]}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobal = () => useContext(GlobalContext);

export {GlobalProvider};
export default useGlobal;