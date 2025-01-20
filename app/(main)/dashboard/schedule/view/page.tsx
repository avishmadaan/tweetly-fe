"use client";
import React, { useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import {format} from "date-fns/format";
import {parse} from "date-fns/parse";
import {startOfWeek} from "date-fns/startOfWeek";
import {getDay} from "date-fns/getDay";
import {enUS} from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events] = useState([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
      allDay: true,
    },
  ]);

  return (
    <div className="h-[500px] w-full border rounded-md p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        defaultView={Views.MONTH}
      />
    </div>
  );
};

export default CalendarView;
