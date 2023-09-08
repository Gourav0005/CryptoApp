import { Box, height } from "@mui/system";
import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
  return (
    <Box
    sx={{
      marginTop: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center ",
    }}
  >
    <ClipLoader size={"90"} />
  </Box>
  )
}

export default Loader