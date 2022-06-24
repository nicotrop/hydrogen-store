import { useProductOptions } from "@shopify/hydrogen";

const OptionRadio = ({ values, name }) => {
  const { selectedOptions, setSelectedOptions } = useProductOptions();
  return <div>OptionRadio</div>;
};

export default OptionRadio;
