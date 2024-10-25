"use client";

import { Flip, toast } from "react-toastify";

interface notify {
  type: "success" | "error" | "info" | "warning";
  message: string;
}


  const notify = (props: notify) => {
    if (props.type === "success") {
      toast.success(`${props.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } else if (props.type === "error") {
      toast.error(`${props.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };

export default notify;

