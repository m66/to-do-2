import "./styles.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "reactstrap";
import { BACKEND_URL } from "../../../consts";

export const FilterSection = () => {
  const [task, setTask] = useState();

  const [startDate1, setStartDate1] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [startDate3, setStartDate3] = useState(new Date());
  const [startDate4, setStartDate4] = useState(new Date());

  const dateRange = (date1, date2) => {
    let time;
    let rangeMilisecond = date2 - date1;

    const day = rangeMilisecond / (1000 * 24 * 60 * 60);

    if (rangeMilisecond < 0) return (time = "Choose correct time range!");

    time = day;
    return `  ${time} day`;
  };

  return (
    <div className="filter-section">
      <table>
        <tbody>
          <tr>
            <td>Create LTE</td>
            <td>
              <DatePicker
                selected={startDate1}
                onChange={(date) => setStartDate1(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </td>
          </tr>
          <tr>
            <td>Create GTE</td>
            <td>
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </td>
          </tr>
          <tr>
            <td>Range is: </td>
            <td>{dateRange(startDate1, startDate2)}</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td>Complite LTE</td>
            <td>
              <DatePicker
                selected={startDate3}
                onChange={(date) => setStartDate3(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </td>
          </tr>
          <tr>
            <td>Complite GTE</td>
            <td>
              <DatePicker
                selected={startDate4}
                onChange={(date) => setStartDate4(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </td>
          </tr>
          <tr>
            <td>Range is: </td>
            <td>{dateRange(startDate3, startDate4)}</td>
          </tr>
        </tbody>

        <tbody>
          <Input
            type="search"
            placeholder="Search"
            name="search"
            onChange={(e) => {
              fetch(`${BACKEND_URL}/task`)
                .then((res) => res.json())
                .then((data) => console.log(data));
            }}
          ></Input>
        </tbody>
      </table>
    </div>
  );
};
