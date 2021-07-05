import {
  createDetailsWidget,
  createMessageBoxWidget,
} from "@livechat/agent-app-sdk";
import { staticMapUrl } from "static-google-map";
import create from "zustand";

const getMapUrl = (location) =>
  staticMapUrl({
    key: import.meta.env.VITE_APP_GOOGLE_MAPS_KEY,
    scale: 1,
    zoom: 16,
    size: "256x356",
    format: "png",
    maptype: "roadmap",
    language: "en",
    style: "feature:poi.business|visibility:off",
    markers: [
      {
        location: location,
        color: "red",
      },
    ],
  });

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
          image: {
            url: getMapUrl(address),
          },
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
