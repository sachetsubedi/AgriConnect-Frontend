import { FC } from "react";

const StatusComponent: FC<{
  status: "PENDING" | "COMPLETED" | "REJECTED" | "ACCEPTED";
}> = ({ status }) => {
  const loweredStatus = status.toLowerCase();
  return (
    <span
      className={`capitalize w-fit px-2 py-1 text-[10px] font-bold rounded-full text-white ${
        loweredStatus === "pending"
          ? "bg-yellow-600"
          : loweredStatus === "completed"
          ? "bg-green-600"
          : loweredStatus === "accepted"
          ? "bg-green-600"
          : "bg-destructive"
      }`}
    >
      {status}{" "}
    </span>
  );
};

export default StatusComponent;
