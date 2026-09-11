import type { ReactNode } from "react";
import AnimationProvider from "@/context/AnimationContext";

type Props = {
  children: ReactNode;
};

const AppProviders = ({ children }: Props) => (
  <AnimationProvider>{children}</AnimationProvider>
);

export default AppProviders;
