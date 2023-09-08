import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
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
import { Box } from "@mui/system";
import { ClipLoader } from "react-spinners";
const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchExchanges = async () => {
     try{
      const { data } = await axios.get(`${server}/exchanges`);

      setExchanges(data);
      setIsLoading(false);
     }catch(error){
      setIsLoading(false)
      setExchanges([]);
      setError(true)
     }
    };
    fetchExchanges();
  }, []);

  if(error) return <ErrorComponent/>
  return (
    <Container maxWidth={"container.xl"}>
      {isLoading ? (
        <Loader/>
            ) : (
        <>
     
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges?.map((i) => (

              <ExchangeCard
                key={i.id}
                name={i.name}
                url={i.url}
                img={i.image}
                rank={i.trust_score_rank}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, url, img, rank }) => (
  <a href={url} target={"_blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchnge"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchange;
