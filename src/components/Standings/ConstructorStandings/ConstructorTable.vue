<template>
  <div>
    <!-- Constructor Modal -->
    <ConstructorModal
      v-if="showConstructorModal"
      :constructorObject="constructorObject"
      :id="constructorId"
      @clicked="setShowToFalseModal"
    />
    <div class="constructor-table-headline-div">
      <h1 class="constructor-table-headline">
        {{ thisSeason }} Constructor Championship
      </h1>
    </div>
    <b-card class="card-margin">
      <!-- Constructors placed 1-3 -->
      <div class="leader-constructor-div">
        <div
          v-for="(topConstructor, index) in constructorStandings.slice(0, 3)"
          :key="index"
          :class="divsTopThree[index]"
          class="leader-div"
        >
          <img
            :src="getImageMixin(constructersFolder, topConstructor.team_id)"
            class="leader-constructor-img"
          />
          <div class="leaders-constructor-info">
            <h3 class="leader-constructor-points">
              {{ topConstructor.points }} pts
            </h3>
            <div>
              <img
                :src="getFlag(topConstructor.nationality)"
                :alt="`${topConstructor.nationality}`"
                class="leader-constructor-flag-img"
              />
            </div>
            <h5 class="leader-constructor-name-team pointer">
              <a
                v-on:click="getConstructorObject(topConstructor.team_id)"
                :class="getConstructorColorAndLink(topConstructor.team_id)"
              >
                {{ topConstructor.team }}
              </a>
            </h5>
          </div>
        </div>
      </div>
      <!-- Constructors placed 4-10 -->
      <table>
        <tr class="constructor-table-tr">
          <th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
          <th>Name</th>
          <th>Nationality</th>
          <th>{{ returnAltBySize(small, pointsLong, pointsShort) }}</th>
        </tr>
        <tbody
          v-for="(constructor, index) in constructorStandings.slice(3)"
          :key="index"
          class="constructor-table-tbody"
        >
          <td class="constructor-table-td constructor-table-position">
            {{ constructor.position }}
          </td>
          <td class="constructor-table-td pointer">
            <a
              v-on:click="getConstructorObject(constructor.team_id)"
              :class="getConstructorColorAndLink(constructor.team_id)"
            >
              {{ constructor.team }}
            </a>
          </td>
          <td>
            <img
              :src="getFlag(constructor.nationality)"
              :alt="`${constructor.nationality}`"
              class="constructor-table-flag-img"
            />
          </td>
          <td class="constructor-table-td">{{ constructor.points }}</td>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script>
import ConstructorModal from '../../General/ConstructorModal.vue'

import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getImageMixin from '../../../mixins/getImageMixin'
import getWindowSizeMixin from '../../../mixins/getWindowSizeMixin'
import generalVarsMixin from '../../../mixins/generalVarsMixin'
import modalMixin from '../../../mixins/modalMixin'
import apiCallsMixin from '../../../mixins/apiCallsMixin'

export default {
  name: 'ConstructorTable',
  props: {
    constructorStandings: Array,
  },
  components: {
    ConstructorModal,
  },
  data() {
    return {
      showConstructorModal: false,
      constructorObject: {},
      constructorId: '',
    }
  },
  created() {},
  methods: {
    async getConstructorObject(teamId) {
      const team = await this.getOneConstructor(teamId)

      this.constructorObject = team.data
      this.constructorId = team.data.team_id

      if (team.dataLoaded) {
        this.showConstructorModal = true
      }
    },
  },
  mixins: [
    getCountryFlagMixin,
    getConstructorColorMixin,
    getImageMixin,
    getWindowSizeMixin,
    generalVarsMixin,
    modalMixin,
    apiCallsMixin,
  ],
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}

tbody {
  border-bottom: 1px solid #fff;
}

tbody:last-child {
  border-bottom: none;
}
</style>
