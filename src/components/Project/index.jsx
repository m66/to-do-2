import { useCallback, useEffect, useState } from "react";
import { getTasksRequest } from "../../api";
import { FilterSection } from "./FilterSection";
import { MainSection } from "./MainSection";
import "./styles.css";

export const Project = () => {
  /* Local State */
  const [tasks, setTasks] = useState([]);

  /* useEffects */
  useEffect(() => {
    getTasksRequest().then((data) => {
      setTasks(data);
    });
  }, []);

  const queryGenerate = (oldQuery, queryType, newQueryStr) => {
    const startingIndex = oldQuery.indexOf(queryType);
    const splitBorderIndex = oldQuery.indexOf("&", startingIndex);
    const changingQuery = oldQuery.slice(startingIndex, splitBorderIndex);
    const newQuery = oldQuery.replace(changingQuery, newQueryStr);
    return newQuery;
  };

  const handleFilterRequest = useCallback(
    (() => {
      let query = "";

      return (filterType, filterContext) => {
        const newQueryStr = filterContext
          ? `${filterType}=${filterContext}`
          : "";

        if (query.includes(filterType)) {
          query = queryGenerate(query, filterType, newQueryStr);
        } else {
          /* if filterContext is empty didn't return anythink ( exacly '&' ) */
          query += filterContext && `${newQueryStr}&`;
        }

        console.log(query)

        getTasksRequest(query).then((data) => {
          setTasks(data);
        });
      };
    })(),
    []
  );

  return (
    <div className="project-layout">
      <FilterSection
        setTasks={setTasks}
        handleFilterRequest={handleFilterRequest}
      />
      <MainSection
        tasks={tasks}
        setTasks={setTasks}
        handleFilterRequest={handleFilterRequest}
      />
    </div>
  );
};
