<template>
  <div class="header">
    <div class="title">Calendar</div>
    <div class="controls">
      <my-select
        :list="getParticipants"
        :multy="true"
        :all="true"
        v-model="participants"
      ></my-select>
      <my-button class="controls__btn" @click="$router.push('/create')">
        New event +
      </my-button>
    </div>
  </div>
  <table class="table">
    <tr class="table__tr">
      <th class="table__th">Name</th>
      <th class="table__th" v-for="day in getDays" :key="day">
        {{ day.substring(0, 3) }}
      </th>
    </tr>
    <tr class="table__tr" v-for="time in getTime" :key="time">
      <td class="table__td table__td--0" v-html="time"></td>
      <td
        class="table__td"
        :class="{ 'table__td--active': isCell(`${day}_${time}`) }"
        v-for="day in getDays"
        :key="`cell-${day}_${time}`"
      >
        <tableCell
          v-if="isCell(`${day}_${time}`)"
          :event="isCell(`${day}_${time}`)"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import tableCell from "@/components/tableCell";

export default {
  name: "Calendar",
  components: { tableCell },
  data() {
    return {
      participants: [],
    };
  },
  computed: {
    ...mapGetters(["getParticipants", "getDays", "getTime", "getEvents"]),
    filterByParticipants() {
      return this.getEvents.filter((event) => {
        return event.participants.find((participant) =>
          this.participants.includes(participant)
        );
      });
    },
  },
  methods: {
    isCell(cell) {
      return this.filterByParticipants.find((event) => event.id === cell);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #2b2b2b;
}
.controls {
  display: flex;
  align-items: stretch;

  &__btn {
    margin-left: 40px;
    width: 150px;
  }
}
.table {
  margin-top: 40px;
  width: 100%;
  border-collapse: collapse;

  &__tr {
    height: 50px;
  }
  &__th {
    background: #e6e6e6;
    width: calc(100% / 6);
    border: 1px solid #ccc;
  }
  &__td {
    background: #fff;
    border: 1px solid #ccc;

    &--0 {
      font-weight: bold;
      text-align: center;
    }
    &--active {
      background: rgba(128, 255, 0, 0.4);
    }
  }
}
</style>