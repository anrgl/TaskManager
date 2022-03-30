import React from "react";

import store from "store";
import { Provider } from "react-redux";
import TaskBoard from "components/TaskBoard";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TaskBoard />
      </div>
    </Provider>
  );
};

export default App;
