import React, { useEffect, useContext, createContext, useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Landing"
// import NewServiceReqest from "./NSR/NewServiceRequest"
import ToDo from "./toDo/toDo";

const activeString = localStorage.getItem("activeToDos") || "[]"
const completedString = localStorage.getItem("completedToDos") || "[]"
const actives = JSON.parse(activeString)
const completeds = JSON.parse(completedString)
export const initialState = {
  currentHistory: "",
  previousHistory: "",
  activeToDo:  actives || new Array(),
  completedToDo: completeds || new Array()
};

export type State = typeof initialState;

export type Action =
  | { type: 'setCurrentHistory', currentHistory: string }
  | { type: 'setPreviousHistory', previousHistory: string }
  | { type: 'setActiveToDo', activeToDo: string }
  | { type: 'setCompletedToDo', completedToDo: string }
  | { type: 'removeActiveToDo', activeToDo: string, index: number }
  | { type: 'removeCompletedToDo', completedToDo: string, index: number }
  | { type: 'moveToActive', moveToActive: string, index: number }
  | { type: 'moveToCompleted', moveToCompleted: string, index: number }
  | { type: 'resetToDos' };

export const reducer = (state: State, action: Action) => {
  console.log("Hitting the reducer!!!! state ->", state, "action ->", action )
  switch (action.type) {
      case 'setCurrentHistory':
      return {
          ...state,
          currentHistory: action.currentHistory,
      };
      case 'setPreviousHistory':
      return {
          ...state,
          previousHistory: action.previousHistory,
      };
      case 'setActiveToDo':
      localStorage.setItem("activeToDos", JSON.stringify([ ...state.activeToDo , action.activeToDo]))
      return {
          ...state,
          activeToDo: [ ...state.activeToDo , action.activeToDo],
      };
      case 'setCompletedToDo':
      localStorage.setItem("completedToDos", JSON.stringify([ ...state.completedToDo , action.completedToDo]))
      return {
          ...state,
          completedToDo: [ ...state.completedToDo , action.completedToDo],
      };

      case 'removeActiveToDo':
      const filteredActive = state.activeToDo.filter(function(value: string, i: any){
        return i !== action.index;
      });
      localStorage.setItem("activeToDos", JSON.stringify([ ...filteredActive ]))

      return {
          ...state,
          activeToDo: [ ...filteredActive ],
      };

      case 'removeCompletedToDo':
      const filteredCompleted = state.completedToDo.filter(function(value: string, i: any){
        return i !== action.index;
      });
      localStorage.setItem("completedToDos", JSON.stringify([ ...filteredCompleted ]))

      return {
          ...state,
          completedToDo: [ ...filteredCompleted ],
      };

      case 'moveToActive':
      const activeItemToMove = state.completedToDo.filter(function(value: string, i: any){
        return i === action.index;
      });
      const reloadCompletedItems = state.completedToDo.filter(function(value: string, i: any){
        return i !== action.index;
      });
      localStorage.setItem("activeToDos", JSON.stringify([ ...state.activeToDo, ...activeItemToMove ]))
      localStorage.setItem("completedToDos", JSON.stringify([ ...reloadCompletedItems ]))
      return {
        ...state,
        activeToDo: [ ...state.activeToDo, ...activeItemToMove ],
        completedToDo: [ ...reloadCompletedItems ]
      };

      case 'moveToCompleted':
      const completedItemToMove = state.activeToDo.filter(function(value: string, i: any){
        return i === action.index;
      });
      const reloadActiveItems = state.activeToDo.filter(function(value: string, i: any){
        return i !== action.index;
      });
      localStorage.setItem("activeToDos", JSON.stringify([ ...reloadActiveItems ]))
      localStorage.setItem("completedToDos", JSON.stringify([ ...state.completedToDo, ...completedItemToMove ]))
      return {
        ...state,
        activeToDo: [ ...reloadActiveItems ],
        completedToDo: [ ...state.completedToDo, ...completedItemToMove ],
      };
      case 'resetToDos':
      localStorage.setItem("activeToDos", JSON.stringify([]))
      localStorage.setItem("completedToDos", JSON.stringify([]))
      return {
        ...state,
        activeToDo: [ ],
        completedToDo: [ ],
      };

      default: return state;
    }
  };

const ServiceRequestHistoryProvider = createContext(initialState);
const ServiceRequestHistoryDispatchContext = createContext((() => 0) as React.Dispatch<Action>);

const App = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCurrentHistory = useCallback((data) => dispatch({ type: 'setCurrentHistory', currentHistory: data }), [dispatch]);
  const setPreviousHistory = useCallback((data) => dispatch({ type: 'setPreviousHistory', previousHistory: data }), [dispatch]);

  const UserConfirmation = (message: any, callback: any) => {
    const container = document.createElement("div");
    container.setAttribute("custom-confirmation-navigation", "");
    document.body.appendChild(container);

    ReactDOM.unmountComponentAtNode(container);
    const closeModal = (callbackState: any) => {
       callback(callbackState);
    };
    // ReactDOM.render(
    //   <StaticModal
    //   open={true}
    //   className={`open`}
    //   heading={"Before you go"}
    //   buttonText={"Leave"}
    //   text={message}
    //   onCancel={() => closeModal(false)}
    //   onConfirm={() => closeModal(true)}
    // />,
    // container
    // );
  }

  useEffect(() => {
      setCurrentHistory(window.location.pathname)
  }, [state.previousHistory])


  return (
    <ServiceRequestHistoryDispatchContext.Provider value={dispatch} >
    <ServiceRequestHistoryProvider.Provider value={state} >
    <div className="App"
      // onLoad={() => {
      //   if(window.location.pathname !== state.currentHistory) {
      //     setPreviousHistory(state.currentHistory)
      //   }
      // }}
      // onbeforeu nload={() => {}}
    >
    <BrowserRouter>
          {/* <NavBar /> */}
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/todo" component={ToDo} />
            </Switch>
    </BrowserRouter>
    </div>
    </ServiceRequestHistoryProvider.Provider>
    </ServiceRequestHistoryDispatchContext.Provider>
  );
};
export const useDispatch = () => {
  return useContext(ServiceRequestHistoryDispatchContext);
};

export const useGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(ServiceRequestHistoryProvider);
  return state[property]; // only one depth selector for comparison
};


export default App;
