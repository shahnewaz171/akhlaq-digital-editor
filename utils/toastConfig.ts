/* eslint-disable max-params */

"use client";

import { toast, ToastPosition } from "react-toastify";

const toastTypes = ["info", "success", "warning", "error"] as const;
type ToastType = (typeof toastTypes)[number];

const toastAlert = (
  type: ToastType,
  toastBody: any,
  position: ToastPosition,
  toastId?: any
): void => {
  if (toastId) toast.dismiss(toastId.current);

  if (toastTypes.includes(type)) {
    (toast[type] as (body: any, options: any) => void)(toastBody, {
      position,
      autoClose: type === "error" ? 10000 : 5000,
      toastId,
    });
  } else {
    toast(toastBody || "Default Toast", {
      position,
      toastId,
    });
  }
};

export default toastAlert;
