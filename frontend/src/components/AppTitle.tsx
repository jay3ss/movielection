import React from "react";
import { Typography } from "@mui/material";

type Variant =
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "overline"
  | "subtitle1"
  | "subtitle2";

interface AppTitleProps {
  variant?: Variant;
}

const AppTitle: React.FC<AppTitleProps> = ({ variant = "h1" }) => {
  return <Typography variant={variant}>MoviElection</Typography>;
};

export default AppTitle;
