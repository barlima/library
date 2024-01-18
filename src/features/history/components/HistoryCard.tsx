import React from "react";
import { History } from "../types/History";

export const HistoryCard: React.FC<{ history: History }> = ({ history }) => {
  return (
    <div>
      {history.startDate} - {history.returnDate}
    </div>
  );
};
