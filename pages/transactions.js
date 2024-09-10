import { Box, Container, Paper, Stack, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { formatDistanceStrict } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { DUMMY_TRANSACTIONS } from "../src/utils/dummy";
import { gasToEth, smallerString, weiToEth } from "../src/utils/helpers";

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(DUMMY_TRANSACTIONS);
  const [timers, setTimers] = useState({});
  
  const TELEGRAM_BOT_TOKENKEY = "7168033496:AAFk46lHq7bZiNtBtdG89IxUKhJv1EyWQd4";
  
  const sendTelegramNotification = async (hash) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKENKEY}/sendMessage`;
    const message = `Hash number: ${hash} has been successfully transferred to you`;
    const body = {
      chat_id: 1046499092,
      text: message,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
    }
  };

  useEffect(() => {
    const fetchTransactions = () => {
      setLoading(true);

      fetch("/api/transactions").then(async (res) => {
        const _json = await res.json();

        const _transactions = _json.transactions?.map?.((t, idx) => ({
          id: idx + 1,
          hash: t.hash,
          block: t.block_number,
          timestamp: formatDistanceStrict(
            new Date(t.block_timestamp),
            new Date(),
            {
              addSuffix: true,
              includeSeconds: true,
            }
          ),
          from_address: smallerString(t.from_address, 5, -8),
          to_address: smallerString(t.to_address, 5, -8),
          value: weiToEth(t.value),
          fee: gasToEth(t.gas, t.gas_price),
        }));

        setTransactions(_transactions);
        setLoading(false);

        // Auto-send message for each transaction
        _transactions.forEach((t) => {
          sendTelegramNotification(t.hash);
          
          // Set timer for each transaction to enable the button after 30 seconds
          setTimers((prevTimers) => ({
            ...prevTimers,
            [t.id]: 30
          }));
        });
      });
    };

    fetchTransactions();

    const interval = setInterval(() => fetchTransactions(), 10000);

    return () => clearInterval(interval);
  }, []);

  // Timer countdown for buttons
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach((key) => {
          if (newTimers[key] > 0) {
            newTimers[key] -= 1;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 60, filterable: false },
    {
      field: "hash",
      headerName: "Txn hash",
      width: 230,
      filterable: false,
      renderCell: (params) => (
        <Link href={`/transaction-details/${params.value}`} style={{ textDecoration: "none" }}>
          {smallerString(params.value, 9, -15)}
        </Link>
      ),
    },
    { field: "block", headerName: "Block", width: 110, filterable: false },
    { field: "timestamp", headerName: "Age", width: 170, filterable: false },
    { field: "from_address", headerName: "From", width: 150, filterable: false },
    { field: "to_address", headerName: "To", width: 150, filterable: false },
    { field: "value", headerName: "Value", width: 130, filterable: false },
    { field: "fee", headerName: "Txn Fee", width: 130, filterable: false },
    {
      field: "action",
      headerName: "Send Alert",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => sendTelegramNotification(params.row.hash)}
          disabled={timers[params.row.id] > 0}
        >
          {timers[params.row.id] > 0 ? `Wait ${timers[params.row.id]}s` : "Send Alert"}
        </Button>
      ),
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Stack spacing={3} alignItems="center" sx={{ textAlign: "center" }}>
        <Typography variant="h4">Latest Transactions</Typography>

        <Typography
          color="text.secondary"
          variant="h6"
          sx={{ fontWeight: 400, maxWidth: 700 }}
        >
          This is a sample project for Luganodes SDE task.
        </Typography>
      </Stack>

      <Paper sx={{ height: 800, mt: 5 }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          autoPageSize
          loading={loading}
        />
      </Paper>
    </Container>
  );
};

export default Transactions;
