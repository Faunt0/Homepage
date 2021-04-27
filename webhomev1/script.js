// console.log('EHllo general kenobi');
function clock () {
	document.getElementById('clock').innerHTML = Date().split(' ')[4]
}
setInterval(clock, 500)


Vue.component('list-item', {
	data: function () {
		return {
			newtodo: '',
			strike: 0,
			removeTodo: Function,
		}
	},
	props: ['item'],

	// template: `
	// <div class="todoitem">
	// 	<button
	// 		v-bind:id="item.id"
	// 		v-bind:value="item.text"
	// 		@click="strike++">
			

	// 		<div v-if="strike%2 === 1">
	// 			<s><label v-bind:for="item.id">{{ item.text }}</label></s>

	// 		</div>
	// 		<div v-else>
	// 			<label v-bind:for="item.id">{{ item.text }}</label>
	// 		</div>

	// 	</button>
	// 	<button class="deleteButton" @:click="removeTodo">X</button>
	// </div>
	// `,


	template: `
		<button class="todoitem"
			v-bind:id="item.id"
			v-bind:value="item.text"
			@click="strike++">

			<div v-if="strike%2 === 1">
				<s><label v-bind:for="item.id">{{ item.text }}</label></s>
			</div>
			<div v-else>
				<label v-bind:for="item.id">{{ item.text }}</label>
			</div>
		</button>
		<button class="deleteButton" v-on:click="">X</button>
	`,




	// template: `
	// 	<div class="todolist">
	// 		<button style="padding: 10px; background-color: white; border: none;">
	// 		<input type="checkbox" 
	// 			v-bind:id="item.id" 
	// 			v-bind:value="item.text"
	// 			v-model="strike">

	// 		<div v-if="strike">
	// 			<s><label v-bind:for="item.id">{{ item.text }}</label></s>
	// 		</div>
	// 		<div v-else>
	// 			<label v-bind:for="item.id">{{ item.text }}</label>
	// 		</div>

	// 		</button>
			
	// 		<button class="deleteButton" style="float: right; margin: 0.7em;">
	// 			X
	// 		</button>
	// 	</div>
	// `,
})

var todolist = new Vue({
	el: '#todolist',
	data: {
		newtodo: '',
		// removeTodo: false,
		todos: [
			{ id: 0, text: 'Learn Vue'},
			{ id: 1, text: 'Eat food'},
			{ id: 2, text: 'Sing'},
			{ id: 3, text: 'Program'},
		]
	},
	watch: {
	},
	methods: {
		addtodo: function () {
			if (this.newtodo != ''){
				this.todos.push({ id: this.todos.length + 1, text: this.newtodo});
				this.newtodo = '';
			}
		},
		removeTodo: function () {
			console.log('dosnt matr');
			// this.removeTodo = true
		},
		
	}
})




// var todolist = new Vue({
// 	el: '#todoapp',
// 	data: {
// 		todos: [
// 			{ id: 0, text: 'Learn Vue'},
// 			{ id: 1, text: 'Eat food'},
// 			{ id: 2, text: 'Sing'},
// 			{ id: 3, text: 'Program'},
// 		]
// 	},
// })

var revmes = new Vue({
	el: '#revmesapp',
	data: {
		message: 'Food is great huh',
	},
	methods: {
		reverseMessage: function () {
			this.message = this.message.split('').reverse().join('')
		}
	}
})

var app6 = new Vue({
	el: '#app6',
	data: {
		linkname: 'bol.com'
	}
})


// console.log(showtime())

// function addtodo () {
// 	console.log(grocerylist.id.length)
// 	app7.grocerylist.push({ id: grocerylist.length, text: toString(document.getElementById('newtodo').innerHTML) })
// }