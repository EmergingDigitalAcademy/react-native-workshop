import React from "react";
import { Image } from "react-native";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

export default function EdaLogoHeader() {
  return (
    <Image
      resizeMode="cover"
      source={edaLogoPurple}
      style={{
        height: 40,
        width: 40,
        overflow: "visible",
      }}
    />
  );
}
