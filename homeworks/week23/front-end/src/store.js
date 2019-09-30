import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import reducers from "./reducers";
import { rootEpic } from "./epics";

const logger = createLogger({
  collapsed: true
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(logger, epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
