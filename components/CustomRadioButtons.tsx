import { Icon } from "@iconify/react";
import { FC } from "react";
const CustomRadioButton: FC<{
  buttons: { label: string; icon: string; value: string }[];
  onChange: (value: string) => any;
}> = ({ buttons, onChange }) => {
  return (
    <div>
      {" "}
      <div className="flex gap-4">
        {buttons.map((button, index) => {
          return (
            <div className="flex items-center relative flex-1" key={index}>
              <input
                type="radio"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                id={button.value}
                className="mr-2  appearance-none  outline outline-slate-200 checked:outline-3 checked:outline-green-700 cursor-pointer w-full rounded-md p-2 py-10 px-20"
                name="customRadioButton"
                value={button.value}
              />
              <label
                className=" absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center cursor-pointer font-medium"
                htmlFor={button.value}
              >
                <Icon
                  fontSize={"50"}
                  className={
                    button.value === "buyer"
                      ? "text-green-600"
                      : "text-purple-600"
                  }
                  icon={button.icon}
                ></Icon>
                {button.label}
              </label>
            </div>
          );
        })}
        {}
      </div>
    </div>
  );
};

export default CustomRadioButton;
