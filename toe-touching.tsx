import {
  currentYear,
  completedDays,
  months,
  currentDaysNoScroll,
  maxDaysNoScroll
} from './const';
import './toe-touching.css';

const getDayOfYear = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0); // January 1st of the current year
  const diff = currentDate.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in a day

  const dayOfYear = Math.floor(diff / oneDay);

  return dayOfYear;
};

const generateStreaks = () => {
  const streaks = Object.values(completedDays)
    .flat(1)
    .reduce(
      (acc, curr) => {
        if (curr === null) {
          // If a null is found, start a new subarray
          acc.push([]);
        } else {
          // Add the current value to the last subarray
          if (acc.length === 0 || acc[acc.length - 1].length === 0) {
            acc[acc.length - 1].push(curr);
          } else {
            acc[acc.length - 1].push(curr);
          }
        }
        return acc;
      },
      [[]] as (number | null)[][]
    );

  // Remove the first empty array
  if (streaks[0].length === 0) {
    streaks.shift();
  }

  return streaks;
};

const Day = ({ day, month }: { day: number; month: number }) => {
  const today = new Date();
  const classes = ['day'];
  if (
    today.getFullYear() === currentYear &&
    today.getMonth() === month &&
    today.getDate() === day
  ) {
    classes.push('today');
  }
  if (
    completedDays[month + 1].length > 0 &&
    completedDays[month + 1].includes(day)
  ) {
    classes.push('completed');
  }
  return <div className={classes.join(' ')}>{day}</div>;
};

const Month = ({
  monthName,
  monthIdx
}: {
  monthName: string;
  monthIdx: number;
}) => {
  const firstDayOfMonth = new Date(currentYear, monthIdx, 1);
  const lastDayOfMonth = new Date(currentYear, monthIdx + 1, 0);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();

  return (
    <div className="month">
      <h3>{monthName}</h3>
      <div className="days">
        {Array.from({ length: firstDayOfWeek }).map((_) => (
          <div className="day" />
        ))}
        {Array.from({ length: numDaysInMonth }).map((_, day) => (
          <Day day={day + 1} month={monthIdx} />
        ))}
      </div>
    </div>
  );
};

const Calendar = () => {
  return (
    <div id="calendar">
      {months.map((monthName, idx) => (
        <Month monthName={monthName} monthIdx={idx} />
      ))}
    </div>
  );
};

const ToeTouching = () => {
  const streaks = generateStreaks();
  return (
    <div>
      <div>
        <h1>Did McKay Try Touching His Toes Every Day For a Full Year?</h1>
        <h3 className="subtitle">
          A red slash through the date means McKay tried touching his toes that
          day
        </h3>
        <h3>Day {getDayOfYear()}</h3>
        <h3 id="streak">
          Current stretch streak length: {streaks[streaks.length - 1].length}
        </h3>
        <h3 id="streak">
          Longest streak:{' '}
          {streaks.sort((a, b) => b.length - a.length)[0].length}
        </h3>
        <h3>Consecutive days without doomscrolling: {currentDaysNoScroll}</h3>
        <h3>Max no-scroll streak: {maxDaysNoScroll}</h3>
      </div>
      <Calendar />
    </div>
  );
};

export default ToeTouching;
