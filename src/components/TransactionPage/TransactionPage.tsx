import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { transactionAsync } from "../../redux/async/transaction";
import moment from "moment-timezone";

const TransactionPage = () => {
  const transactionHistoryState = useAppSelector((state) => state.transaction.data);
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(3); // set limit to 5
  const [visibleTransactions, setVisibleTransactions] = useState(limit); // set visibleTransactions to limit

  const showMoreTransactions = () => {
    setOffset(offset + limit);
    setLimit(limit + 5);
    setVisibleTransactions(offset + limit + 5);
  };

  useEffect(() => {
 

    dispatch(transactionAsync());
  }, [limit, offset]);

  return (
    <div className="mt-12">
      <h1 className="font-bold text-xl">Semua Transaksi</h1>
      {transactionHistoryState.records.slice(offset, offset + limit).map((item, index) => (
        <div key={index} className="flex border-2 mt-5 rounded-xl">
          <div className="w-full">
            <div className="flex justify-between px-5 py-2">
              <div className="flex flex-col gap-2">
                <div className={`flex font-semibold ${item.transaction_type === "TOPUP" ? "text-green-500" : "text-red-500"}`}>
                  <h1>{item.transaction_type === "TOPUP" ? "+" : "-"}</h1>
                  <h1>Rp. {item.total_amount}</h1>
                </div>
                <h1 className="text-gray-400">{moment(item.created_on).tz("Asia/Jakarta").format("DD MMM YYYY HH:mm")}</h1>
              </div>
              <div>{item.description}</div>
            </div>
          </div>
        </div>
      ))}
      {offset + limit < transactionHistoryState.records.length && (
        <button className="mt-4 text-red-500 font-bold" onClick={showMoreTransactions}>
          Show more
        </button>
      )}
    </div>
  );
};

export default TransactionPage;
