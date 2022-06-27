import { useProductOptions } from "@shopify/hydrogen";
import { useState } from "react";

const OptionRadio = ({ values, name }) => {
  const { selectedOptions, setSelectedOption } = useProductOptions();
  const [selectedValue, setSelectedValue] = useState();

  return (
    <>
      <>
        {values.map((value) => {
          const checked = selectedOptions[name] === value;
          const id = `option-${name}-${value}`;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option[${name}]`}
                value={value}
                checked={checked}
                onChange={() => setSelectedOption(name, value)}
              />
              <div
                className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                  checked ? "border-gray-500" : "border-neutral-50"
                }`}
              >
                {value}
              </div>
            </label>
          );
        })}
      </>
    </>
  );
};

export default OptionRadio;
