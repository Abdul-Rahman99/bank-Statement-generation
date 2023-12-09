const fs = require("fs");
const csv = require("csv-parser");

const ApiError = require("../utils/apiError")

const getTransactions = (userEmail, fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    fs.createReadStream("./database/transactions.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Filter transactions by user email and date range
        const transactionDate = new Date(row.date_of_transaction);
        if (
          row.user_email === userEmail &&
          transactionDate >= new Date(fromDate) &&
          transactionDate <= new Date(toDate)
        ) {
          transactions.push(row);
        }
      })
      .on("end", () => {
        resolve(transactions);
      })
      .on("error", (err) => {
        reject(new ApiError("Error reading transactions",500));
      });
  });
};

module.exports = { getTransactions };
