import { IoIosArrowDown } from "react-icons/io";
export default function Select({ title, options }) {
  return (
    <div className="relative">
      <select
        defaultValue={""}
        className="w-24 appearance-none rounded-lg border border-gray-300 bg-white p-4 outline-none focus:border-gray-300 focus:ring-0"
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex-center focus:ring-transparent pointer-events-none ring-transparent">
        <IoIosArrowDown />
      </div>
    </div>
  );
}
