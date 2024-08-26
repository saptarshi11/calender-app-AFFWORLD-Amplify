import React, { useState } from "react";
const CalendarContext = React.createContext({});

export const CalendarProvider = (props) => {
  const [state, setState] = useState({
    selectedDate: new Date(),
    currentDate: new Date(),
    monthIndex: 3,
    date: new Date().getDate(),
    events: [],
    users: [],
    programs: [],
    sessions: [],
    smallCalendarMonth: 0,
    newEventData: {
      isOpen: false,
      isEventCreateInitialize: false,
      isAllDay: false,
      type: "event", // or  task
      title: "",
      meetingLink: "",
      agenda: "",
      followUp: "",
      actionItems: "",
      program: "",
      session: "",
      eventColor: "gray",
      startDateTime: new Date(),
      endDateTime: new Date(),
      date: 0,
      invitations: [],
      notifications: [
        // {type: "notification", label: "10 minutes before", value: 30},
        // {type: "email", label: "20 minutes before", value: 30},
        // {type: "notification", label: "30 minutes before", value: 30},
      ],
      timeRange: {
        disabledEditTimeRange: false,
        turnOn: false,
        repeatIteration: 1,
        repeatPeriod: "week",
        repeatDays: [],
      },
    },
    calendarView: "month", // or day
    filterEvents: [
      "accepted",
      "pending",
      "rejected",
      "proposedTime",
      "denied",
      "finished",
    ],
  });

  const value = {
    selectedDate: state.selectedDate,
    currentDate: state.currentDate,
    monthIndex: state.monthIndex,
    events: state.events,
    programs: state.programs,
    sessions: state.sessions,
    date: state.date,
    smallCalendarMonth: state.smallCalendarMonth,
    calendarView: state.calendarView,
    auth: {
      username: "Saptarshi Mukherjee",
      firstName: "Saptarshi",
      image: "",
      email: "saptarshimukherjee5300@gmail.com",
      _id: "6422af5d9153de6adce3b085",
    },
    filterEvents: state.filterEvents,
    users: state.users,
    setState: function (newState) {
      setState((prev) => ({
        ...prev,
        ...newState,
      }));
    },
    setEvents: function (cb) {
      setState((prev) => ({
        ...prev,
        events: typeof cb === "function" ? cb(prev.events) : cb,
      }));
    },
    setFilterEvent: function (eventStatusName) {
      setState((prev) => {
        let updatedFilterEvents = [...prev.filterEvents];
        if (updatedFilterEvents.includes(eventStatusName)) {
          updatedFilterEvents = updatedFilterEvents.filter(
            (s) => s !== eventStatusName
          );
        } else {
          updatedFilterEvents.push(eventStatusName);
        }
        return {
          ...prev,
          filterEvents: updatedFilterEvents,
        };
      });
    },
    setSelectedDate: function (val) {
      setState((prev) => ({
        ...prev,
        selectedDate: val,
      }));
    },
    addEvent: function (newEvent) {
      setState((prev) => ({ ...prev, events: [...prev.events, newEvent] }));
    },
    setSmallCalendarMonth: function (val) {
      setState((prev) => ({ ...prev, smallCalendarMonth: val }));
    },
    setCalendar: function (val) {
      setState((prev) => ({ ...prev, ...val }));
    },
    setMonthIndex: function (val) {
      setState((prev) => ({ ...prev, monthIndex: val }));
    },
    newEventData: state.newEventData,
    setNewEventData: (cb) => {
      setState((prev) => ({
        ...prev,
        newEventData: cb(prev.newEventData),
      }));
    },
    setTimeRange: (cb) => {
      setState((prev) => ({
        ...prev,
        newEventData: {
          ...prev.newEventData,
          timeRange: cb(prev.newEventData.timeRange),
        },
      }));
    },
    setCloseNewEventModal: () => {
      let now = new Date();
      setState((prev) => ({
        ...prev,
        events: prev.events.filter((evt) => !evt.isEventCreateInitialize),
        newEventData: {
          isOpen: false,
          type: "event", // or  task
          title: "",
          meetingLink: "",
          isAllDay: false,
          eventColor: "gray",
          agenda: "",
          isEventCreateInitialize: false,
          followUp: "",
          actionItems: "",
          program: "",
          session: "",
          notifications: [],
          startDateTime: new Date(),
          endDateTime: new Date(),
          date: now.getDate(),
          invitations: [],
          timeRange: {
            disabledEditTimeRange: false,
            turnOn: false,
            repeatIteration: 1,
            repeatPeriod: "week",
            repeatDays: [],
          },
        },
      }));
    },
    setCalendarView(componentName, query) {
      setState((prev) => ({
        ...prev,
        calendarView: componentName,
      }));
    },
  };

  return (
    <CalendarContext.Provider value={value}>
      {props.children}
    </CalendarContext.Provider>
  );
};

export default CalendarContext;
