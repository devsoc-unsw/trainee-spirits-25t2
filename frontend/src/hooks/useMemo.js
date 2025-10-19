import { useContext } from "react";
import MemoContext from "../context/MemosProvider";

export const useMemos = () => useContext(MemoContext);
