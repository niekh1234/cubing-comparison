const form = new Vue({
	el: '#vue-main',
	data: {
		message: "",
		selection: "3x3",
		wrTimes: {
			"2x2": "00:01.02",
			"3x3": "00:04.86",
			"4x4": "00:19.88",
			"5x5": "00:38.42",
			"6x6": "01:09.23",
			"7x7": "01:46.57",
			"OH": "00:08.65"
		},
		wrTimesSideEvents: {
			"Clock": "00:03.86",
			"Megaminx": "00:29.27",
			"Pyraminx": "00:01.66",
			"Skewb": "00:01.73",
			"Square-1": "00:05.02",
		},
		userPrediction: {},
		toggled: false
	},

	beforeMount: function () {
		for(let time in this.wrTimes){
			this.userPrediction[time] = "0";
		}
	},

	mounted: function () {
		console.log("nosy aren't you")

		if(window.localStorage.getItem('enableSideEvents') != null){
			this.toggled = !JSON.parse(window.localStorage.getItem('enableSideEvents'));
			
			this.toggleExperimental();
		}

		if(window.localStorage.getItem('savedTimes') != null) {
			this.userPrediction = JSON.parse(window.localStorage.getItem('savedTimes'));
		}
	},

	methods: {
		nxn: function (e) {
			this.selection = e.target.innerHTML.replace(/\s+/g, '');
			this.submit();
		},

		submit: function (e) {
			let target = this.$refs.vueForm;

			if (isNaN(this.convertToSeconds(this.message)) || this.message == "") {
				target.style.border = "2px solid #fa6670";

				return;
			}
			target.style.border = "";
			target.style.border = "2px solid green";

			this.calculateTimes(this.convertToSeconds(this.message));
		},

		convertToSeconds: function (n) {
			const num = n.split(":");
			let sum = 0;

			if (num.length == 2) {
				sum += parseInt(num[0]) * 60;
				sum += parseFloat(num[1]);
			} else {
				sum += parseFloat(num[0]);
			}

			return sum;
		},

		convertToMinutes: function (n) {
			const minutes = n / 60;
			const remainder = minutes - parseInt(minutes);

			return (('0' + parseInt(minutes)).slice(-2) + ":" + ('0' + (remainder * 60).toFixed(2)).slice(-5));
		},

		calculateTimes: function (inputNumber) {
			this.userPrediction[this.selection] = inputNumber;

			const eventList = Object.keys(this.wrTimes)

			for (let i = 0; i < eventList.length; i++) {
				if (eventList[i] == this.selection) {
					continue;
				}

				try {
					this.userPrediction[eventList[i]] = this.userPrediction[eventList[i - 1]] * (this.convertToSeconds(this.wrTimes[eventList[i]]) / this.convertToSeconds(this.wrTimes[eventList[i - 1]]));

				} catch (TypeError) {
					null;
				}
			}

			//bad looking code but need two for loops to loop over the dictionary forwards and backwards to get all times e.g. when selection 2x2 or 7x7 it should work and as the dictionary / array goes from 2x2-7x7.
			for (let i = eventList.length - 1; i >= 0; i--) {
				if (eventList[i] == this.selection) {
					continue;
				}

				try {
					this.userPrediction[eventList[i]] = this.userPrediction[eventList[i + 1]] * (this.convertToSeconds(this.wrTimes[eventList[i]]) / this.convertToSeconds(this.wrTimes[eventList[i + 1]]));

				} catch (TypeError) {
					null;
				}
			}
			//hey let's throw in another for loop ;(
			for (let time in this.userPrediction) {
				this.userPrediction[time] = this.convertToMinutes(this.userPrediction[time]);
			}

			window.localStorage.setItem('savedTimes', JSON.stringify(this.userPrediction));
			window.localStorage.setItem('enableSideEvents', JSON.stringify(this.toggled));
		},
		clearLS: function () {
			window.localStorage.clear;

			this.$refs.vueForm.value = "";

			for(let time in this.userPrediction){
				this.userPrediction[time] = "0";
			}
		},
		toggleExperimental: function () {
			this.toggled = !this.toggled;

			if (this.toggled) {
				this.$refs.toggleButton.innerHTML = "Disable side events";

				for (let time in this.wrTimesSideEvents) {
					this.$set(this.wrTimes, time, this.wrTimesSideEvents[time]);
				}

				if(this.message == ""){
					if(this.userPrediction[this.selection] != null){
						this.message = this.userPrediction[this.selection];
					}
				}

				this.submit();
			} else {
				this.$refs.toggleButton.innerHTML = "Enable side events (experimental)";

				for (let time in this.wrTimesSideEvents){
					this.$delete(this.wrTimes, time)
					this.$delete(this.userPrediction, time)
				}

				this.selection = "3x3";
				this.submit();
			}
		}
	}
})