import styles from "./activeDoneFilter.module.css";
import { Button } from "reactstrap";
import { FILTER_FIELDS } from "../../../../consts";

const {FILTER_ACTIVE_DONE} = FILTER_FIELDS

function ActiveDoneFilter({ handleFilterRequest }) {

  return (
    <div className={styles.content}>
      {FILTER_ACTIVE_DONE.map(({ label, status }) => (
        <Button key={status} className={styles[status]} onClick={(e) => handleFilterRequest('status', status)}>
          {label}
        </Button>
      ))}
    </div>
  );
}

export default ActiveDoneFilter;