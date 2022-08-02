<template>
  <b-modal
    :id="id"
    size="lg"
    title="Constructor Information"
    ok-only
    ok-title="Back"
    ok-variant="dark"
    @ok="setShowToFalse('constructor')"
    visible="visible"
    class="modal-title"
    content-class="custom-modal-content"
    no-close-on-backdrop
  >
    <b-container>
      <b-row class="modal-row-one">
        <b-col class="modal-constructor-img-col">
          <img
            :src="
              getImageMixin(`${constructersFolder}`, constructorObject.team_id)
            "
            :alt="`${constructorObject.team}`"
            class="modal-constructor-img"
            :class="getBorderColor(constructorObject.team_id)"
          />
          <h5 class="modal-headline">Drivers:</h5>
          <span class="modal-body-text"
            >{{ constructorObject.drivers[0].name }},
            {{ constructorObject.drivers.slice(-1)[0].name }}</span
          >
        </b-col>

        <b-col
          ><b-card class="card-margin-modal">
            <div>
              <!-- class="scroll-table" -->
              <table class="modal-table">
                <tr>
                  <th class="modal-th">
                    Name:
                  </th>
                  <td
                    class="modal-td"
                    :class="getConstructorColor(constructorObject.team_id)"
                  >
                    {{ constructorObject.team_name }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Base:</th>
                  <td class="modal-td">
                    {{ constructorObject.base.locality }},
                    {{ constructorObject.base.country }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Nationality:</th>
                  <td class="modal-td">
                    {{ constructorObject.nationality }}
                    <img
                      :src="getFlag(constructorObject.nationality)"
                      :alt="`${constructorObject.nationality}`"
                      class="modal-country-flag-img"
                    />
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Founder:</th>
                  <td class="modal-td">
                    <span
                      v-for="(founder, index) in constructorObject.founder"
                      :key="index"
                      >{{ founder
                      }}<span
                        v-if="
                          index === 0 && constructorObject.founder.length > 1
                        "
                        >, &nbsp;</span
                      >
                    </span>
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Team Principal:</th>
                  <td class="modal-td">
                    {{ constructorObject.team_principal }}
                  </td>
                </tr>
              </table>
            </div>
          </b-card></b-col
        >
      </b-row>
      <b-row class="modal-row-two">
        <b-col
          ><b-card class="card-margin-modal">
            <div>
              <!-- class="scroll-table" -->
              <table class="modal-table">
                <tr>
                  <th class="modal-th">
                    Starts
                    <span class="modal-span-text">(Entries)</span>:
                  </th>
                  <td class="modal-td">
                    {{ constructorObject.starts }}
                    <span class="modal-span-text"
                      >({{ constructorObject.entries }})</span
                    >
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Podiums:</th>
                  <td class="modal-td">
                    {{ constructorObject.podiums }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Wins:</th>
                  <td class="modal-td">
                    {{ constructorObject.wins }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Pole Positions:</th>
                  <td class="modal-td">
                    {{ constructorObject.poles }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Fastest Lap:</th>
                  <td class="modal-td">
                    {{ constructorObject.fastest_laps }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Position Last Season:</th>

                  <!-- <td
                    class="modal-td"
                    :class="
                      getPositionColor(
                        constructorObject.position_last_seasons[season]
                      )
                    "
                  >
                    {{ constructorObject.position_last_seasons[season] }}
                  </td> -->
                </tr>
              </table>
            </div>
          </b-card></b-col
        >
        <b-col
          ><b-card class="card-margin-modal">
            <div>
              <!-- class="scroll-table" -->
              <table class="modal-table">
                <tr>
                  <th class="modal-th">First Entry:</th>
                  <td class="modal-td">
                    {{ constructorObject.first_entry }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Engine:</th>
                  <td
                    class="modal-td"
                    :class="convertConstructorName(constructorObject.engine)"
                  >
                    {{ constructorObject.engine }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Contructor Titles:</th>
                  <td class="modal-td">
                    {{ constructorObject.contructor_titles.titles }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Latest Contructor Title:</th>
                  <td
                    class="modal-td"
                    v-if="constructorObject.contructor_titles.years.length > 0"
                  >
                    {{ constructorObject.contructor_titles.years.slice(-1)[0] }}
                  </td>
                  <td class="modal-td" v-else>-</td>
                </tr>
                <tr>
                  <th class="modal-th">Driver Titles:</th>
                  <td class="modal-td">
                    {{ constructorObject.driver_titles.titles }}
                  </td>
                </tr>
                <tr>
                  <th class="modal-th">Latest Driver Title:</th>
                  <td
                    class="modal-td"
                    v-if="constructorObject.driver_titles.years.length > 0"
                  >
                    {{ constructorObject.driver_titles.years.slice(-1)[0] }}
                  </td>
                  <td class="modal-td" v-else>-</td>
                </tr>
              </table>
            </div>
          </b-card></b-col
        >
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import generalVarsMixin from '../../mixins/generalVarsMixin'
import getCountryFlagMixin from '../../mixins/getCountryFlagMixin'
import getConstructorColorMixin from '../../mixins/getConstructorColorMixin'
import getImageMixin from '../../mixins/getImageMixin'
import modalMixin from '../../mixins/modalMixin'

// import { getNationality } from "../../variables/replaceVars"

export default {
  name: 'ConstructorModal',
  props: {
    constructorObject: Object,
    id: String,
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
  mixins: [
    generalVarsMixin,
    getCountryFlagMixin,
    getConstructorColorMixin,
    getImageMixin,
    modalMixin,
  ],
}
</script>

<style scoped>
tr:last-child {
  border-bottom: none;
}
</style>
