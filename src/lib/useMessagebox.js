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
      template_id: "cards",
      elements: [
        {
          title: title,
          subtitle: address,
          buttons: [
            {
              type: "url",
              text: "Open map",
              postback_id: "open_map",
              user_ids: [],
              value: `https://maps.google.com?q=${address}`,
            },
          ],
        },
      ],
    });
  },
}));

export default useWidget;
