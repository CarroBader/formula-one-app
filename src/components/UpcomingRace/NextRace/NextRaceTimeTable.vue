<template>
	<div>
		<b-card>
			<h5 class="next-race-time-table-title">Time Table</h5>
			<h5 class="next-race-time-table-date">{{ timeTableData.date }}</h5>
			<b-row>
				<b-col
					class="
          next-race-time-table-col
          next-race-time-table-col-left"
				>
					<!-- Table One -->
					<table>
						<tbody
							v-for="(session, index) in timeTableData.sessions.slice(0, 3)"
							:key="index"
						>
							<td class="next-race-time-table-td">
								<span class="next-race-time-table-event">{{
									session.sessionName
								}}</span>
							</td>
							<td class="next-race-time-table-td">
								<span class="next-race-time-table-day">{{
									session.dayName
								}}</span>
							</td>
							<td class="next-race-time-table-td">
								<span class="next-race-time-table-time"
									>{{ session.startTime }} {{ session.endTime }}</span
								>
							</td>
						</tbody>
					</table>
				</b-col>

				<b-col class="next-race-time-table-col">
					<!-- Table Two -->
					<table>
						<tbody
							v-for="(session, index) in timeTableData.sessions.slice(3)"
							:key="index"
							class="next-race-time-table-border"
						>
							<td class="next-race-time-table-td">
								<span class="next-race-time-table-event">{{
									session.sessionName
								}}</span>
							</td>
							<td class="next-race-time-table-td">
								<span class="next-race-time-table-day">{{
									session.dayName
								}}</span>
							</td>
							<td class="next-race-time-table-td">
								<span class="next-race-time-table-time"
									>{{ session.startTime }} {{ session.endTime }}</span
								>
							</td>
						</tbody>
					</table>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "NextRaceTimeTable",
	props: {
		timeTableData: Object,
	},
}
</script>

<style lang="scss" scoped>
table {
	text-align: start;
}

tbody {
	border-bottom: none;
}
</style>
