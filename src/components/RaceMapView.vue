<template>
	<div>
		<div id="top_div" style="height: 100%">
			<v-map :zoom="zoom" :center="center" class="map">
				<v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
				<v-marker
					v-for="(marker, i) in markers"
					:key="marker[i]"
					:lat-lng="marker.coordinates"
				>
					<v-tooltip
						:content="
							`
          ${marker.raceName} <br/>
          ${marker.weather.location.country} <hr/>
          ${marker.weather.current.temp_c}°<br/>
          <img src='${marker.weather.current.condition.icon}'
          alt='Weather icon'/> <br/>
          ${marker.weather.current.condition.text}`
						"
					>
					</v-tooltip>
				</v-marker>
			</v-map>
		</div>
	</div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet"
import axios from "axios"
import L from "leaflet"
import { baseUrlErgast, baseUrlWeather, host, apiKey } from "../vars"
import "leaflet/dist/leaflet.css"

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl

/* eslint-disable global-require */
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require(`../assets/img/mapMarkers/position.png`),
	iconUrl: require(`../assets/img/mapMarkers/position.png`),
	shadowUrl: require(`leaflet/dist/images/marker-shadow.png`),
})
const trackLocation = []
const weather = []
const locationAndweather = []

export default {
	name: `RaceMapView`,
	components: {
		"v-map": LMap,
		"v-tilelayer": LTileLayer,
		"v-marker": LMarker,
		"v-tooltip": LTooltip,
	},
	created() {
		this.getMapData()
	},
	data() {
		return {
			zoom: 3,
			center: [47.15561817215472, 21.992011024609532],
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			attribution: `&copy;
      <a href="https://www.openstreetmap.org/copyright">
      OpenStreetMap</a> contributors`,
			markers: locationAndweather,
		}
	},
	methods: {
		getMapData() {
			axios
				.get(`${baseUrlErgast}/current.json`)
				.then((response) => {
					this.allRaces = response.data.MRData.RaceTable.Races

					this.getCoordinates(this.allRaces)
				})
				.catch((error) => {
					console.log(error)
					this.errored = true
				})
				.finally(() => {
					this.loading = false
					return this.loading
				})
		},
		getCoordinates(allRaces) {
			allRaces.forEach((race) => {
				trackLocation.push({
					coordinates: [race.Circuit.Location.lat, race.Circuit.Location.long],
					circuit: race.raceName,
				})
			})
			this.getWeatherData(trackLocation)
		},
		getWeatherData(locations) {
			for (let i = 0; i < locations.length; i++) {
				axios
					.get(`${baseUrlWeather}/current.json?q=${locations[i].coordinates}`, {
						headers: {
							"x-rapidapi-key": apiKey,
							"x-rapidapi-host": host,
							"Access-Control-Allow-Origin": `*`,
						},
					})
					.then((response) => {
						weather.push(response.data)
					})
					.catch((error) => {
						console.log(error)
						this.errored = true
					})
					.finally(() => {
						if (weather.length === trackLocation.length) {
							this.matchTrackAndLocation(weather)
						}
					})
			}
		},
		matchTrackAndLocation(weathers) {
			for (let i = 0; i < trackLocation.length; i++) {
				for (let j = 0; j < weathers.length; j++) {
					const lat = Number(trackLocation[i].coordinates[0]).toFixed(2)
					const lon = Number(trackLocation[i].coordinates[1]).toFixed(2)

					if (
						lat === weathers[j].location.lat.toFixed(2) &&
						lon === weathers[j].location.lon.toFixed(2)
					) {
						locationAndweather.push({
							coordinates: [lat, lon],
							raceName: trackLocation[i].circuit,
							weather: weathers[j],
						})
						break
					}
				}
			}
		},
	},
}
</script>

<style>
.leaflet-tooltip {
	border-radius: 10% !important;
	font-family: "Orbitron", "sans-serif";
	font-weight: 500;
}

.leaflet-marker-icon {
	width: auto !important;
	height: 35px !important;
}
</style>
