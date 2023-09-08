import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
// import { ClipLoader, FadeLoader } from "react-spinners";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { Scale } from "chart.js";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
// import { Box, height } from "@mui/system";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(2);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);
        // console.log(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const btns = new Array(132).fill(1);

  if (error) return <ErrorComponent />;
  return (
    <Container maxWidth={"container.xl"}>
      {isLoading ? (
      <Loader/>
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                symbol={i.symbol}
                img={i.image}
                price={i.current_price}
                rank={i.trust_score_rank}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Coins;
