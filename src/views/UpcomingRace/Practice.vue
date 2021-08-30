<template>
  <b-container class="default-background-center">
    <div class="row practice-row">
      <b-tabs content-class="mt-3">
        <b-tab title="Practice 1" active>
          <PracticeSessionOne
          :practiceOne="practiceOne" />
        </b-tab>
        <b-tab title="Practice 2">
          <PracticeSessionTwo
          :practiceTwo="practiceTwo" />
        </b-tab>
        <b-tab title="Practice 3">
          <PracticeSessionThree
          :practiceThree="practiceThree" />
        </b-tab>
      </b-tabs>
      
      
      <!-- <div class="col">
        <PracticeSessionOne
          :practiceOne="practiceOne" />
        <PracticeSessionTwo
          :practiceTwo="practiceTwo" />
      </div> -->
      <!-- <div class="col">
        <AllRaces />
      </div> -->
    </div>
  </b-container>
</template>     

<script>
import PracticeSessionOne from '../../components/UpcomingRace/Practice/PracticeSessionOne.vue'
import PracticeSessionTwo from '../../components/UpcomingRace/Practice/PracticeSessionTwo.vue'
import PracticeSessionThree from '../../components/UpcomingRace/Practice/PracticeSessionThree.vue'
import AllRaces from '../../components/AllRaces.vue'

const practiceOne = [
  {
    position: 1,
    number: 77,
    name: "Valteri Bottas",
    time: "1:45.199",
    gap: "",
    laps: 18,
    car: "mercedes"
  },
  {
    position: 2,
    number: 33,
    name: "Max Verstappen",
    time: "1:45.363",
    gap: "+0.164",
    laps: 14,
    car: "red_bull"
  },
  {
    position: 3,
    number: 10,
    name: "Pierre Gasly",
    time: "1:45.699",
    gap: "+0.500",
    laps: 20,
    car: "alphatauri"
  },
  {
    position: 4,
    number: 16,
    name: "Charles LeClerc",
    time: "1:45.818",
    gap: "+0.619",
    laps: 19,
    car: "ferrari"
  },
    {
    position: 5,
    number: 55,
    name: "Carlos Sainz",
    time: "1:45.935",
    gap: "+0.736",
    laps: 20,
    car: "ferrari"
  },
    {
    position: 6,
    number: 11,
    name: "Sergio Perez",
    time: "1:46.127",
    gap: "+0.928",
    laps: 17,
    car: "red_bull"
  },
    {
    position: 7,
    number: 5,
    name: "Sebastian Vettel",
    time: "1:46.177",
    gap: "+0.978",
    laps: 19,
    car: "aston_martin"
  },
    {
    position: 8,
    number: 4,
    name: "Lando Norris",
    time: "1:46.336",
    gap: "+1.137",
    laps: 17,
    car: "mclaren"
  },
    {
    position: 9,
    number: 31,
    name: "Esteban Ocon",
    time: "1:46.497",
    gap: "+1.298",
    laps: 16,
    car: "alpine"
  },
    {
    position: 10,
    number: 14,
    name: "Fernando Alonso",
    time: "1:46.612",
    gap: "+1.413",
    laps: 16,
    car: "alpine"
  },
    {
    position: 11,
    number: 18,
    name: "Lance Stroll",
    time: "1:46.646",
    gap: "+1.450",
    laps: 19,
    car: "aston_martin"
  },
    {
    position: 12,
    number: 3,
    name: "Daniel Ricciardo",
    time: "1:46.683",
    gap: "+1.484",
    laps: 20,
    car: "mclaren"
  },
    {
    position: 13,
    number: 99,
    name: "Antonio Giovinazzi",
    time: "1:46.755",
    gap: "+1.556",
    laps: 17,
    car: "alfa"
  },
    {
    position: 14,
    number: 63,
    name: "Gerorge Russell",
    time: "1:46.772",
    gap: "+1.573",
    laps: 19,
    car: "williams"
  },
    {
    position: 15,
    number: 22,
    name: "Yuki Tsunoda",
    time: "1:46.928",
    gap: "+1.729",
    laps: 19,
    car: "alphatauri"
  },
    {
    position: 16,
    number: 6,
    name: "Nicholas Latifi",
    time: "1:47.101",
    gap: "+1.902",
    laps: 20,
    car: "williams"
  },
    {
    position: 17,
    number: 7,
    name: "Kimi Räikkönen",
    time: "1:48.125",
    gap: "+2.926",
    laps: 15,
    car: "alfa"
  },
    {
    position: 18,
    number: 44,
    name: "Lewis Hamilton",
    time: "1:48.224",
    gap: "+3.025",
    laps: 17,
    car: "mercedes"
  },
    {
    position: 19,
    number: 9,
    name: "Nikita Mazepin",
    time: "1:48.705",
    gap: "+3.506",
    laps: 16,
    car: "haas"
  },
    {
    position: 20,
    number: 47,
    name: "Mick Schumacher",
    time: "1:49.059",
    gap: "+3.860",
    laps: 15,
    car: "haas"
  }
]
const practiceTwo = [
  {
    position: 1,
    number: 33,
    name: "Max Verstappen",
    time: "1:45.199",
    gap: "",
    laps: 14,
    car: "red_bull"
  },
  {
    position: 2,
    number: 77,
    name: "Valteri Bottas",
    time: "1:45.363",
    gap: "+0.164",
    laps: 18,
    car: "mercedes"
  },
  {
    position: 3,
    number: 10,
    name: "Pierre Gasly",
    time: "1:45.699",
    gap: "+0.500",
    laps: 20,
    car: "alphatauri"
  },
  {
    position: 4,
    number: 16,
    name: "Charles LeClerc",
    time: "1:45.818",
    gap: "+0.619",
    laps: 19,
    car: "ferrari"
  },
    {
    position: 5,
    number: 55,
    name: "Carlos Sainz",
    time: "1:45.935",
    gap: "+0.736",
    laps: 20,
    car: "ferrari"
  },
    {
    position: 6,
    number: 11,
    name: "Sergio Perez",
    time: "1:46.127",
    gap: "+0.928",
    laps: 17,
    car: "red_bull"
  },
    {
    position: 7,
    number: 5,
    name: "Sebastian Vettel",
    time: "1:46.177",
    gap: "+0.978",
    laps: 19,
    car: "aston_martin"
  },
    {
    position: 8,
    number: 4,
    name: "Lando Norris",
    time: "1:46.336",
    gap: "+1.137",
    laps: 17,
    car: "mclaren"
  },
    {
    position: 9,
    number: 31,
    name: "Esteban Ocon",
    time: "1:46.497",
    gap: "+1.298",
    laps: 16,
    car: "alpine"
  },
    {
    position: 10,
    number: 14,
    name: "Fernando Alonso",
    time: "1:46.612",
    gap: "+1.413",
    laps: 16,
    car: "alpine"
  },
    {
    position: 11,
    number: 18,
    name: "Lance Stroll",
    time: "1:46.646",
    gap: "+1.450",
    laps: 19,
    car: "aston_martin"
  },
    {
    position: 12,
    number: 3,
    name: "Daniel Ricciardo",
    time: "1:46.683",
    gap: "+1.484",
    laps: 20,
    car: "mclaren"
  },
    {
    position: 13,
    number: 99,
    name: "Antonio Giovinazzi",
    time: "1:46.755",
    gap: "+1.556",
    laps: 17,
    car: "alfa"
  },
    {
    position: 14,
    number: 63,
    name: "Gerorge Russell",
    time: "1:46.772",
    gap: "+1.573",
    laps: 19,
    car: "williams"
  },
    {
    position: 15,
    number: 22,
    name: "Yuki Tsunoda",
    time: "1:46.928",
    gap: "+1.729",
    laps: 19,
    car: "alphatauri"
  },
    {
    position: 16,
    number: 6,
    name: "Nicholas Latifi",
    time: "1:47.101",
    gap: "+1.902",
    laps: 20,
    car: "williams"
  },
    {
    position: 17,
    number: 7,
    name: "Kimi Räikkönen",
    time: "1:48.125",
    gap: "+2.926",
    laps: 15,
    car: "alfa"
  },
    {
    position: 18,
    number: 44,
    name: "Lewis Hamilton",
    time: "1:48.224",
    gap: "+3.025",
    laps: 17,
    car: "mercedes"
  },
    {
    position: 19,
    number: 9,
    name: "Nikita Mazepin",
    time: "1:48.705",
    gap: "+3.506",
    laps: 16,
    car: "haas"
  },
    {
    position: 20,
    number: 47,
    name: "Mick Schumacher",
    time: "1:49.059",
    gap: "+3.860",
    laps: 15,
    car: "haas"
  }
]
const practiceThree = [
  {
    position: 1,
    number: 63,
    name: "George Russell",
    time: "1:45.199",
    gap: "",
    laps: 14,
    car: "williams"
  },
  {
    position: 2,
    number: 77,
    name: "Valteri Bottas",
    time: "1:45.363",
    gap: "+0.164",
    laps: 18,
    car: "mercedes"
  },
  {
    position: 3,
    number: 10,
    name: "Pierre Gasly",
    time: "1:45.699",
    gap: "+0.500",
    laps: 20,
    car: "alphatauri"
  },
  {
    position: 4,
    number: 16,
    name: "Charles LeClerc",
    time: "1:45.818",
    gap: "+0.619",
    laps: 19,
    car: "ferrari"
  },
    {
    position: 5,
    number: 55,
    name: "Carlos Sainz",
    time: "1:45.935",
    gap: "+0.736",
    laps: 20,
    car: "ferrari"
  },
    {
    position: 6,
    number: 11,
    name: "Sergio Perez",
    time: "1:46.127",
    gap: "+0.928",
    laps: 17,
    car: "red_bull"
  },
    {
    position: 7,
    number: 5,
    name: "Sebastian Vettel",
    time: "1:46.177",
    gap: "+0.978",
    laps: 19,
    car: "aston_martin"
  },
    {
    position: 8,
    number: 4,
    name: "Lando Norris",
    time: "1:46.336",
    gap: "+1.137",
    laps: 17,
    car: "mclaren"
  },
    {
    position: 9,
    number: 31,
    name: "Esteban Ocon",
    time: "1:46.497",
    gap: "+1.298",
    laps: 16,
    car: "alpine"
  },
    {
    position: 10,
    number: 14,
    name: "Fernando Alonso",
    time: "1:46.612",
    gap: "+1.413",
    laps: 16,
    car: "alpine"
  },
    {
    position: 11,
    number: 18,
    name: "Lance Stroll",
    time: "1:46.646",
    gap: "+1.450",
    laps: 19,
    car: "aston_martin"
  },
    {
    position: 12,
    number: 3,
    name: "Daniel Ricciardo",
    time: "1:46.683",
    gap: "+1.484",
    laps: 20,
    car: "mclaren"
  },
    {
    position: 13,
    number: 99,
    name: "Antonio Giovinazzi",
    time: "1:46.755",
    gap: "+1.556",
    laps: 17,
    car: "alfa"
  },
    {
    position: 14,
    number: 33,
    name: "Max Verstappen",
    time: "1:46.772",
    gap: "+1.573",
    laps: 19,
    car: "red_bull"
  },
    {
    position: 15,
    number: 22,
    name: "Yuki Tsunoda",
    time: "1:46.928",
    gap: "+1.729",
    laps: 19,
    car: "alphatauri"
  },
    {
    position: 16,
    number: 6,
    name: "Nicholas Latifi",
    time: "1:47.101",
    gap: "+1.902",
    laps: 20,
    car: "williams"
  },
    {
    position: 17,
    number: 7,
    name: "Kimi Räikkönen",
    time: "1:48.125",
    gap: "+2.926",
    laps: 15,
    car: "alfa"
  },
    {
    position: 18,
    number: 44,
    name: "Lewis Hamilton",
    time: "1:48.224",
    gap: "+3.025",
    laps: 17,
    car: "mercedes"
  },
    {
    position: 19,
    number: 9,
    name: "Nikita Mazepin",
    time: "1:48.705",
    gap: "+3.506",
    laps: 16,
    car: "haas"
  },
    {
    position: 20,
    number: 47,
    name: "Mick Schumacher",
    time: "1:49.059",
    gap: "+3.860",
    laps: 15,
    car: "haas"
  }
]

export default {
  name: 'Practice',
  components: {
    PracticeSessionOne,
    PracticeSessionTwo,
    PracticeSessionThree,
    AllRaces
  },
  data() {
    return {
      practiceOne: practiceOne,
      practiceTwo: practiceTwo,
      practiceThree: practiceThree
    }
  }
}
</script>

<style scoped>
  .practice-row {
    display: inline-block;
  }
</style>
