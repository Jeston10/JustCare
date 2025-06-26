import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "schedule",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "canceled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="status"
        width={24}
        height={24}
        style={{ width: '24px', height: '24px' }}
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "schedule",
          "text-blue-500": status === "pending",
          "text-red-500": status === "canceled",
        })}
      >
        {status}
      </p>
    </div>
  );
};
