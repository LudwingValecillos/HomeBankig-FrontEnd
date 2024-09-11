import React from "react";

const Table = (props) => {

  // console.log(props);

  
  
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="bg-[#C4DFFE] p-5 rounded-3xl space-y-2 shadow-lg">
        <h2 className="text-2xl text-center">{props.title} </h2>

        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full text-xl bg-white divide-y-2 divide-gray-300">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                {props.ths.map((th) => (
                  <th
                    key={th}
                    className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200"> 
              {props.tds.map((loan) => (
                <tr key={loan.id} className="odd:bg-gray-100">
                  {Object.values(loan).map((value, index) => (
                    <td key={index} className= {`px-4 py-2 text-gray-700 whitespace-nowrap ${value == "DEBIT" ? "text-red-500" : ""} ${value == "CREDIT" ? "text-green-500" : ""} ${typeof value == "number" ? "text-right" : ""}`}>                      
                      { (index == 1 ? "$" : "") + (typeof value === "number" ? value.toLocaleString() : value) + (index == 1 ? ",00": "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
  
};

export default Table;
