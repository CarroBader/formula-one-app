<template>
	<div>
		<div class="noDataMessage" v-if="!practiceDataExists">
			<p>No practice have been completed yet.</p>
		</div>
		<b-card class="card-margin" v-if="practiceDataExists">
			<div class="scroll-table">
				<table>
					<tr class="practice-session-tr">
						<th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
						<th :style="returnAltBySize(small, revert, none)">Number</th>
						<th>Name</th>
						<th>Laps</th>
						<th>Time</th>
						<th>Gap</th>
					</tr>
					<tbody
						v-for="(result, index) in this.practiceResult"
						:key="index"
						class="practice-session-tbody"
					>
						<td class="practice-session-td extra-dark-grey">
							{{ result.position }}
						</td>
						<td
							class="practice-session-td"
							:class="getConstructorColor(result.color_code)"
							:style="returnAltBySize(small, revert, none)"
						>
							{{ result.permanent_number }}
						</td>

						<td
							class="practice-session-td"
							:class="
								returnAltBySize(
									small,
									'',
									getConstructorColor(result.color_code)
								)
							"
						>
							{{ result.name }}
						</td>

						<td class="practice-session-td extra-dark-grey">
							{{ result.current_lap }}
						</td>
						<td class="practice-session-td practice-session-border-left">
							{{ result.time }}
						</td>
						<td
							class="practice-session-td practice-session-border-left"
							:class="returnAltBySize(small, 'medium-red', 'dark-grey')"
						>
							<span v-if="result.gap !== ''" class="practice-session-seconds"
								>+</span
							>{{ result.gap
							}}<span v-if="result.gap !== ''" class="practice-session-seconds"
								>s</span
							>
						</td>
					</tbody>
				</table>
			</div>
		</b-card>
	</div>
</template>

<script>
import getConstructorColorMixin from "../../../mixins/getConstructorColorMixin"
import getWindowSizeMixin from "../../../mixins/getWindowSizeMixin"
import generalVarsMixin from "../../../mixins/generalVarsMixin"

export default {
	name: "PracticeSession",
	props: {
		practiceResult: Array,
		practiceDataExists: Boolean,
	},
	mixins: [getConstructorColorMixin, getWindowSizeMixin, generalVarsMixin],
}
</script>

<style scoped>
tbody {
	border-bottom: 1px solid #fff;
}

tbody:last-child {
	border-bottom: none;
}

.practice-session-border-left {
	border-left: 1px solid #fff;
}

.noDataMessage {
	color: #fff;
}
</style>
