import { createContext } from "react";

const LocalContext = createContext();

export const LocalProvider = LocalContext.Provider;
export const LocalConsumer = LocalContext.Consumer;

export default LocalContext;