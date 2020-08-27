import React from "react";
import { useDispatch } from "react-redux";
import { Stack, Button } from "@chakra-ui/core";

const payload = {};

const Debug = () => {
  const dispatch = useDispatch();
  return (
    <Stack>
      <Button
        onClick={() =>
          dispatch({ type: "changeState", target: "searchResults", payload })
        }
      >
        Dump results
      </Button>
    </Stack>
  );
};

export default Debug;
