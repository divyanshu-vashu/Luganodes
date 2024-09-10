import {
  Container,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BarcodeImg from "../../src/assets/images/barcode.svg";
import { gasToEth, weiToEth } from "../../src/utils/helpers";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomRow = ({ title, value = "Not Found" }) => (
  <StyledTableRow>
    <TableCell sx={{ fontSize: 18, fontWeight: 500 }}>{title}</TableCell>
    <TableCell>{value}</TableCell>
  </StyledTableRow>
);

const TransactionDetails = () => {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({});
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;

  // Fetch the transaction
  useEffect(() => {
    if (id) {
      fetch(`/api/transaction?hash=${id}`).then(async (res) => {
        if (res.ok) {
          const _json = await res?.json?.();
          setTransaction(_json);
          setLoading(false);
        } else {
          setTransaction({});
          setLoading(false);
        }
      });
    }
  }, [id]);

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Left */}
        <Grid item xs={12} md={7} lg={8.5}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: `1px solid ${theme.palette.primary.border1}` }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <CustomRow title="Hash" value={!loading && transaction.hash} />
                <CustomRow
                  title="Block"
                  value={!loading && transaction.block_number}
                />
                <CustomRow
                  title="From"
                  value={!loading && transaction.from_address}
                />
                <CustomRow
                  title="To"
                  value={!loading && transaction.to_address}
                />
                <CustomRow
                  title="Value"
                  value={!loading && weiToEth(transaction.value)}
                />
                <CustomRow
                  title="Gas"
                  value={
                    !loading && gasToEth(transaction.gas, transaction.gas_price)
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right */}
        <Grid item xs={12} md={5} lg={3.5}>
          <Paper
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.primary.border1}`,
              height: "100%",
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={BarcodeImg} alt="Barcode Image" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransactionDetails;
