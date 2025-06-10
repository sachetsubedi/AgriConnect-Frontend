import { FC } from "react";

const StatusComponent: FC<{
  status: "PENDING" | "COMPLETED" | "REJECTED" | "ACCEPTED";
}> = ({ status }) => {
  return (
    <span
      className={`capitalize w-fit px-2 py-1 text-[10px] font-bold rounded-full text-white ${
        status === "PENDING"
          ? "bg-yellow-600"
          : status === "COMPLETED"
          ? "bg-green-600"
          : status === "ACCEPTED"
          ? "bg-green-600"
          : "bg-destructive"
      }`}
    >
      {status}{" "}
    </span>
  );
};

export default StatusComponent;
