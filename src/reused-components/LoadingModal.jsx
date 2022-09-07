import React from "react";

import { Portal, Modal } from "react-native-paper";
import { ActivityIndicator } from "react-native";

export default function LoadingModal({ visible }) {
  const containerStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {}}
        contentContainerStyle={containerStyle}
      >
        <ActivityIndicator />
      </Modal>
    </Portal>
  );
}
