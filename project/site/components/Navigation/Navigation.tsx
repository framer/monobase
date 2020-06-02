import * as React from "react";
import { FC } from "react";
import { Dynamic } from "monobase";
import {
  Navigation as FractionNavigation,
  NavigationProps,
  HTMLPropsWithMotion,
} from "fraction";
import { useSessionState } from "hooks";

const StaticNavigation: FC<HTMLPropsWithMotion<"nav"> & NavigationProps> = ({
  ...props
}) => {
  const [account] = useSessionState("framerAccount");

  return <FractionNavigation {...props} account={account} />;
};

export const Navigation = Dynamic(StaticNavigation);
