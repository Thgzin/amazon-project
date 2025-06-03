import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOptions(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOption[0];
}

export function calculateDeliveryDate(deliveryOptionId) {
  const deliveryOption = getDeliveryOptions(deliveryOptionId);

  let deliveryDate = dayjs();
  let addedDays = 0;

  while (addedDays < deliveryOption.deliveryDays) {
    deliveryDate = deliveryDate.add(1, "day");
    const dayOfWeek = deliveryDate.format("dddd");
    if (dayOfWeek !== "Saturday" && dayOfWeek !== "Sunday") {
      addedDays++;
    }
  }

  return deliveryDate.format("dddd, MMMM D");
}
