import { createStore } from "vuex";
import errors from "./modules/errorModule";

export default createStore({
  state: {
    participants: [
      "Philip J. Fry",
      "Turanga Leela",
      "Bender Rodríguez",
      "Professor Farnsworth",
      "Amy Wong",
      "Hermes Conrad",
      "Dr. Zoidberg",
    ],
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      // "Saturday",
      // "Sunday",
    ],
    time: [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ],
    events: [
      {
        id: "Monday_10:00",
        title: "test-1",
        participants: ["Philip J. Fry", "Turanga Leela"],
        day: "Monday",
        time: "10:00",
      },
    ],
  },
  mutations: {
    SET_EVENTS(state, initEvents) {
      state.events = [...initEvents];
    },
    SET_NEW_EVENT(state, newEvent) {
      state.events.push(newEvent);
    },
    REMOVE_EVENT(state, eventId) {
      const idx = state.events.findIndex((event) => event.idx === eventId);
      state.events.splice(idx, 1);
    },
  },
  actions: {
    initEvents({ commit }) {
      try {
        const events = JSON.parse(localStorage.getItem("vue-schadule"));
        if (events.length) commit("SET_EVENTS", events);
      } catch (error) {
        commit("SET_NEW_ERROR", "Error! The event didn't init.");
      }
    },
    createEvent({ commit, state }, newEvent) {
      try {
        commit("SET_NEW_EVENT", newEvent);
        localStorage.removeItem("vue-schadule");
        localStorage.setItem("vue-schadule", JSON.stringify(state.events));
      } catch (error) {
        commit("SET_NEW_ERROR", "Error! The event didn't set.");
      }
    },
    removeEvent({ commit, state }, eventId) {
      try {
        commit("REMOVE_EVENT", eventId);
        localStorage.removeItem("vue-schadule");
        localStorage.setItem("vue-schadule", JSON.stringify(state.events));
      } catch (error) {
        commit("SET_NEW_ERROR", "Error! The event didn't remove.");
      }
    },
  },
  getters: {
    getParticipants: (state) => state.participants,
    getDays: (state) => state.days,
    getTime: (state) => state.time,
    getEvents: (state) => state.events,
  },
  modules: {
    errors,
  },
});
