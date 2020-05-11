const form = new Vue({
	el: '#vue-main',
	data: {
		message: "", 
		selection: "3x3",
		wrTimes: {
			"2x2": "00:01.21",
			"3x3": "00:05.53",
			"4x4": "00:21.11",
			"5x5": "00:39.65",
			"6x6": "01:15.90",
			"7x7": "02:00.65"
		},
		userPrediction: {
			"2x2": "0",
			"3x3": "0",
			"4x4": "0",
			"5x5": "0",
			"6x6": "0",
			"7x7": "0"
		}
	},

	mounted: function(){
		console.log("nosy aren't you")
	},

	methods: {
		nxn: function(e){
			this.selection = e.target.innerHTML;
			this.submit();
		},

		submit: function(e){
			let target = this.$refs.vueForm;

			if(isNaN(this.convertToSeconds(this.message)) || this.message == ""){
				target.style.border = "2px solid #fa6670";
				return;
			}
			target.style.border = "";
			target.style.border = "2px solid green";

			this.calculateTimes(this.convertToSeconds(this.message));
		},

		convertToSeconds: function(n){
			const num = n.split(":");
			let sum = 0;

			if(num.length == 2){
				sum += parseInt(num[0]) * 60;
				sum += parseFloat(num[1]);
			} else {
				sum += parseFloat(num[0]);
			}
			return sum;
		},

		convertToMinutes: function(n){
			const minutes = n / 60;
			const remainder = minutes - parseInt(minutes);

			return (('0' + parseInt(minutes)).slice(-2) + ":" + ('0' + (remainder * 60).toFixed(2)).slice(-5));			
		},

		calculateTimes: function(inputNumber){
			this.userPrediction[this.selection] = inputNumber;

			const eventList = Object.keys(this.wrTimes)

			for(let i = 0; i < eventList.length; i++){
				if(eventList[i] == this.selection){
					continue;
				}

				try{
					this.userPrediction[eventList[i]] = this.userPrediction[eventList[i-1]] * (this.convertToSeconds(this.wrTimes[eventList[i]]) / this.convertToSeconds(this.wrTimes[eventList[i-1]]));
				} catch(TypeError){
					null
				}
			}

			//bad looking code but need two for loops to loop over the dictionary forwards and backwards to get all times e.g. when selection 2x2 or 7x7 it should work and as the dictionary / array goes from 2x2-7x7.
			for(let i = eventList.length-1; i >= 0; i--){
				if(eventList[i] == this.selection){
					continue;
				}

				try{
					this.userPrediction[eventList[i]] = this.userPrediction[eventList[i+1]] * (this.convertToSeconds(this.wrTimes[eventList[i]]) / this.convertToSeconds(this.wrTimes[eventList[i+1]]));
				} catch(TypeError){
					null
				}
			}
			//hey let's throw in another for loop ;(
			for(let time in this.userPrediction){
				this.userPrediction[time] = this.convertToMinutes(this.userPrediction[time]);
			}
		}
	}
})