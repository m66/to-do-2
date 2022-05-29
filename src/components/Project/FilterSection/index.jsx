import "./styles.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActiveDoneFilter from "./activeDoneFilter/ActiveDoneFilter";
import { FILTER_FIELDS } from "../../../consts";

const { FILTER_DATE } = FILTER_FIELDS;
export const FilterSection = ({ setTasks, handleFilterRequest }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="filter-section">
      <h1>Filter Section</h1>
      <div>
        <table>
          <tbody>
            {FILTER_DATE.map(({ label, name }) => {
              return (
                <tr key={name}>
                  <td>{label}</td>
                  <td>
                    <DatePicker
                      // name={name}
                      selected={new Date()}
                      onChange={(date) => {
                        handleFilterRequest(name, date?.toLocaleDateString());
                        // setSelectedDate(date);
                      }}
                      dateFormat="dd/MM/yyyy"
                      // minDate={new Date()}
                      filterDate={(date) =>
                        date.getDay() !== 6 && date.getDay() !== 0
                      }
                      isClearable
                      showYearDropdown
                      scrollableMonthYearDropdown
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <ActiveDoneFilter handleFilterRequest={handleFilterRequest} />
      </div>
    </div>
  );
};
