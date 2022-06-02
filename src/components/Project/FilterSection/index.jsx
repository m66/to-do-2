import "./styles.css";
import { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActiveDoneFilter from "./activeDoneFilter/ActiveDoneFilter";
import { FILTER_FIELDS } from "../../../consts";

const { FILTER_DATE } = FILTER_FIELDS;
export const FilterSection = ({ setTasks, handleFilterRequest }) => {
  const [selectedDate, setSelectedDate] = useState({
    create_lte: new Date(),
    create_gte: new Date(),
    complete_lte: new Date(),
    complete_gte: new Date(),
  });

  const checkSelectedDate = useCallback((name, date) => {
    setSelectedDate((prev) => {
      const newObj = {
        ...prev,
      };
      newObj[name] = date;
      return newObj;
    });
  });

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
                      selected={selectedDate[name]}
                      onChange={(date) => {
                        handleFilterRequest(name, date?.toLocaleDateString());
                        checkSelectedDate(name, date);
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
