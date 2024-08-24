import PropTypes from "prop-types";

export default function AttributeTable({ data }) {
  return (
    <div className="overflow-x-auto mt-6 border">
      <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-paragraph-color uppercase tracking-wider">
              Attribute
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-paragraph-color uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Air Delivery</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.airDelivery}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Bearings</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.bearings}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Body Type</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.body}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Frequency</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.frequency}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Number of Blades</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.noOfBlades}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Phase</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.phase}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Remote Control</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {data?.remoteControl}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">RPM</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.rpm}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Sweep</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.sweep}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Type</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.type}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Wattage</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.wattage}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Winding</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.winding}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

AttributeTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};
