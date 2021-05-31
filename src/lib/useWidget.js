import { createMessageBoxWidget } from "@livechat/agent-app-sdk";
import create from "zustand";

const useWidget = create((set, get) => ({
  widget: {},
  initialize: async () => {
    const widget = await createMessageBoxWidget();
    set({ widget });
  },
  sendPoint: ({ title, address }) => {
    const { widget } = get();
    widget.putMessage({
      elements: [
        {
          title,
          buttons: [
            {
              text: "Open map",
              type: "url",
              url: "https://maps.google.com",
            },
          ],
        },
      ],
    });
  },
}));

export default useWidget;
