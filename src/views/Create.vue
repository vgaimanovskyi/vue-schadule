<template>
  <form class="form" @submit.prevent="createEvent">
    <div class="form__content">
      <div class="form__block">
        <div class="label">Name of the event:</div>
        <input
          class="input"
          :class="{ invalid: title.error }"
          type="text"
          v-model="title.value"
          maxlength="40"
        />
      </div>

      <div class="form__block">
        <div class="label">Participants:</div>
        <my-select
          :list="getParticipants"
          :multy="true"
          v-model="participants.value"
          :class="{ invalid: participants.error }"
        ></my-select>
      </div>

      <div class="form__block">
        <div class="label">Day:</div>
        <my-select
          :list="getDays"
          v-model="day.value"
          :class="{ invalid: day.error }"
        ></my-select>
      </div>

      <div class="form__block">
        <div class="label">Time:</div>
        <my-select
          :list="getTime"
          v-model="time.value"
          :class="{ invalid: time.error }"
        ></my-select>
      </div>
    </div>
    <div class="form__controls">
      <my-button class="btn" type="button" @click="clearForm">Cancel</my-button>
      <my-button class="btn" type="submit">Create</my-button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Create",
  data() {
    return {
      title: {
        value: "",
        error: false,
      },
      participants: {
        value: [],
        error: false,
      },
      day: {
        value: [],
        error: false,
      },
      time: {
        value: [],
        error: false,
      },
    };
  },
  computed: {
    ...mapGetters(["getParticipants", "getDays", "getTime", "getEvents"]),
  },
  methods: {
    validationForm() {
      let valid = true;

      if (this.title.value.length < 3 || this.title.value.length > 40) {
        this.title.error = true;
        valid = false;
      } else {
        this.title.error = false;
      }

      if (!this.participants.value.length) {
        this.participants.error = true;
        valid = false;
      } else {
        this.participants.error = false;
      }

      if (!this.day.value.length) {
        this.day.error = true;
        valid = false;
      } else {
        this.day.error = false;
      }

      if (!this.time.value.length) {
        this.time.error = true;
        valid = false;
      } else {
        this.time.error = false;
      }
      return valid;
    },
    validationSlots() {
      const event = this.getEvents.find(
        (event) => event.day === this.day.value[0]
      );
      if (event?.time === this.time.value[0]) return false;
      return true;
    },
    createEvent() {
      if (this.validationForm()) {
        if (this.validationSlots()) {
          this.$store.dispatch("createEvent", {
            id: `${this.day.value.join("")}_${this.time.value.join("")}`,
            title: this.title.value,
            participants: [...this.participants.value],
            day: this.day.value.join(""),
            time: this.day.value.join(""),
          });
          this.$router.push("/");
        } else {
          this.$store.commit(
            "SET_NEW_ERROR",
            "Failed to create an event. Time slot is already booked."
          );
        }
      }
    },
    clearForm() {
      this.title.value = "";
      this.title.error = false;

      this.participants.value = [];
      this.participants.error = false;

      this.day.value = [];
      this.day.error = false;

      this.time.value = [];
      this.time.error = false;

      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 600px;

  &__content {
    width: 65%;
  }
  &__controls {
    text-align: right;
  }
  &__block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}

.input {
  width: 200px;
  height: 30px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 4px 10px;

  font-size: 16px;
  line-height: 20px;
}
.btn {
  width: 100px;
  margin-left: 10px;
}
.invalid {
  border-color: red;
}
</style>