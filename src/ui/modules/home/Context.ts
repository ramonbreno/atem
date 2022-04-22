import { createContext, useContext } from "react";
import { AdditionalInfo } from "../coin_details/Interface";

export interface CoinContext {
    additionInfo?: AdditionalInfo[]
}

export type ContextType = {
    coinContext?: CoinContext;
    setCoinContext: (coinContext: CoinContext) => void,
}

export const CoinContext = createContext<ContextType>({ setCoinContext: (_) => { } });
export const useCoinContext = () => useContext(CoinContext);