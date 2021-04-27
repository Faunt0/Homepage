// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// https://colorhunt.co/palette/265073
// https://colorhunt.co/palette/152965
// https://colorhunt.co/palette/147532



console.log('EHllo general kenobi');

function clock () {
	document.getElementById('clock').innerHTML = Date().split(' ')[4];
}
setInterval(clock, 500);

window.addEventListener("keydown", function(event) {
	if (event.key.match(/[0-9]/) && document.getElementById('newtodo').value == '') {
		window.open(bookmarkList.bookmarks[event.key].link, '_blank')
	}
}, true);

var lighttoggle = new Vue({
	el: "#lightdark",
	data: {
		toggle: 1,
		name: 'dark'
	},
	created: function () {
		this.lighttoggle()
	},
	methods: {
		lighttoggle: function () {
			if (this.toggle % 2 != 0) {
				this.name = 'dark';
				this.toggle++;
				console.log("Darkness")

				// document.getElementsByTagName('html')[0].style.backgroundColor = '#252525';
				// document.getElementsByTagName('html')[0].style.backgroundColor = '#2d132c';

				// document.getElementById('clock').style.color = 'gold';
				// document.getElementById('clock').style.backgroundColor = '#af0404';
				// document.getElementById('clock').style.borderRadius = '10px';

				for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
					document.getElementsByTagName('input')[i].style.backgroundColor = '#414141';
					document.getElementsByTagName('input')[i].style.color = 'white';
					document.getElementsByTagName('input')[i].style.borderRadius = '5px';

					document.getElementsByTagName('input')[i].style.border = '1px solid black';
					document.getElementsByTagName('input')[i].style.padding = '10px';
				}
				for (let i = 0; i < document.getElementsByTagName('button').length; i++) {
					// document.getElementsByTagName('button')[i].style.backgroundColor = '#414141';
					// document.getElementsByTagName('button')[i].style.color = 'white';
				}

			} else {
				this.name = 'light';
				this.toggle++;
				console.log("Lightning")
				for (let i = 0; i < document.getElementsByTagName('button').length; i++) {
					document.getElementsByTagName('button')[i].style.backgroundColor = 'white';
				}
			}
		},
	},
});

var searchbar = new Vue({
	el: '#searchfield',
	data: {
		query: ''
	},
	methods: {
		search: function () {
			var str = document.getElementById('searchbar').value;
			switch (str) {
				case '/edit':
					console.log('this should make the page editable')
					document.getElementById('searchbar').value = ''
					document.getElementsByTagName('html')[0].style.backgroundImage = `linear-gradient(180deg, #2d132c, #e48257);`
					document.getElementsByTagName('html')[0].style.backgroundColor = `#e48257`
					// for (let i = 0; i < 360; i++) {
					// 	setTimeout(function() {document.getElementsByTagName('html')[0].style.backgroundImage = `linear-gradient(${i}deg, #2d132c, #e48257);`}, 1000)
					// 	clearTimeout()
					// 	console.log(`i ${i}`)
					// }
					break;
				case '/porn':
					console.log('this should show the porn pages for a brief moment')
					document.getElementById('searchbar').value = ''
					bookmarkList.bookmarks.push(
						{id: bookmarkList.bookmarks.length, name: 'Pornhub', link: 'https://www.pornhub.com/'},
						{id: bookmarkList.bookmarks.length+1, name: 'Chaturbate', link: 'https://chaturbate.com/'}
						)
					// document.getElementsByClassName('grouplinks')[bookmarkList.bookmarks.length-2].getElementsByTagName('a').setAttribute('target', '_incognito')
					// document.getElementsByClassName('grouplinks')[bookmarkList.bookmarks.length-1].getElementsByTagName('a').setAttribute('target', '_incognito')
					document.querySelectorAll('.grouplinks a')[bookmarkList.bookmarks.length-2].setAttribute('target', '_incognito')
					document.querySelectorAll('.grouplinks a')[bookmarkList.bookmarks.length-1].setAttribute('target', '_incognito')
					setTimeout(function(){ bookmarkList.bookmarks.splice(bookmarkList.bookmarks.length-2, 2)}, 3000);
					break;
				case (str.match(/\/\w+/) || {}).input:
					console.log('Sorry, this command don\'t work')
					document.getElementById('searchbar').value = ''
					break;
				default:
					window.open('https://duckduckgo.com/?q=' + encodeURI(document.getElementById('searchbar').value), '_blank')
					document.getElementById('searchbar').value = ''
					break;
			}		
		}
	}
})


Vue.component('todo-item', {
	data: function () {
		return {
			newtodo: '',
			strike: 0,
		}
	},
	props: ['item'	],
	template: `
	<div class="todoitem">
		<button draggable="true"
			v-bind:id="item.id"
			v-bind:value="item.text"
			v-on:click="$emit('strike-toggle')">
			
			<div v-if="item.striked == true">
				<s><label v-bind:for="item.id">{{ item.text }}</label></s>
			</div>
			<div v-else>
				<label v-bind:for="item.id">{{ item.text }}</label>
			</div>
		</button>

		<button class="deleteButton" v-on:click="$emit('remove-todo')">X</button>
	</div>
	`,
});
var todolist = new Vue({
	el: '#todolist',
	data: {
		newtodo: '',
		borderBottom: 'border-bottom: none;',
		// removeTodo: false,
		todos: [
			{ id: 0, text: 'Learn Vue', striked: false },
			{ id: 1, text: 'Eat food', striked: false },
			{ id: 2, text: 'Sing', striked: false },
			{ id: 3, text: 'Program', striked: false },
		]
	},
	created: function () {
		var storedTodos = [];
		// if (sessionStorage.getItem('todos') != null) {
		if (localStorage.getItem('todos') != null) {
			// storageString = sessionStorage.getItem('todos').split(';')
			// for (let i = 0; i < storageString.length-1; i++) {
			// 	if (storageString[i] != "") {
			// 		storedTodos.push({id: i, text: storageString[i]});
			// 	}
			// }
			// this.todos = storedTodos;

			// this.todos = JSON.parse(sessionStorage.getItem('todos'))
			this.todos = JSON.parse(localStorage.getItem('todos'))
		}
		if (this.todos.length != 0) {
			this.borderBottom = 'border-bottom: 1px solid black;';
		}
	}, 

	computed: {
	},
	watch: {
	},

	methods: {
		addtodo: function () {
			if (this.newtodo != ''){
				// Push the new item to the end of the todo list
				this.todos.push({ id: this.todos.length, text: this.newtodo, striked: false});

				// resetting the newtodo value to nothing
				this.newtodo = '';

				// sessionStorageStuffs without JSON
				// var valuestr = '';
				// for (let i = 0; i < this.todos.length; i++) {
				// 	valuestr += this.todos[i].text + ';';
				// }
				// sessionStorage.setItem('todos', valuestr);

				// I Should use JSON for this type of thing
				// sessionStorage.setItem('todos', JSON.stringify(this.todos))
				// hell, might even save it on the localstorage train
				localStorage.setItem('todos', JSON.stringify(this.todos))
			}
		},
		removeTodo: function (itemid) {
			// Get the stored values of todos.
			// var storedTodos = [];
			// if (sessionStorage.getItem('todos') != null) {
			// 	// without JSON
			// 	storageString = sessionStorage.getItem('todos').split(';')
			// 	for (let i = 0; i < storageString.length-1; i++) {
			// 		if (storageString[i] != "") {
			// 			storedTodos.push({id: i, text: storageString[i]});
			// 		}
			// 	}
			// 	this.todos = storedTodos;

			// }
			

			// remove 1 item from todos at the itemid index
			this.todos.splice(itemid, 1);

			// Updating the id of the items in this.todos
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].id = i;
			}


			// change the storage to match the updated todos; Without JSON
			// first we make a list of the this.todos.text items
			var todostext = [];
			for (let i = 0; i < this.todos.length; i++) {
				todostext.push(this.todos[i].text);
			}

			// without JSON
			// Then we make the old stored list equal to the new updated list
			// storedTodos = todostext;

			// Lastly we overwrite the old todos storage with the new value string
			// var valuestr = '';
			// for (let i = 0; i < this.todos.length; i++) {
			// 	valuestr += this.todos[i].text + ';';
			// }
			// sessionStorage.setItem('todos', valuestr)

			// with JSON
			// sessionStorage.setItem('todos', JSON.stringify(this.todos))
			localStorage.setItem('todos', JSON.stringify(this.todos))


			// Some style changes
			// Change the border if todos is empty
			if (this.todos.length === 0) {
				this.borderBottom = 'border-bottom: none;';
			}
		},
		strikeToggle: function (itemid) {
			if (this.todos[itemid].striked == true) {
				this.todos[itemid].striked = false
			} else {
				this.todos[itemid].striked = true
			}
			// sessionStorage.setItem('todos', JSON.stringify(this.todos))
			localStorage.setItem('todos', JSON.stringify(this.todos))
		},

		removeAll: function () {
			// empty the todo list.
			this.todos = [];

			// sessionStorage.setItem('todos', '')
			localStorage.setItem('todos', '')
			this.borderBottom = 'border-bottom: none;';
		},
		removeStriked: function () {
			for (let i = this.todos.length-1; i >=0; i--) {
				if (this.todos[i].striked == true) {
					this.todos.splice(i, 1)
				}
			}
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].id = i;
			}

			// sessionStorage.setItem('todos', JSON.stringify(this.todos))
			localStorage.setItem('todos', JSON.stringify(this.todos))
		}
	},
});



Vue.component('group-links', {
	data: function () {
		return {
			newlistgroup: '',
		}
	},
	props: ['bookmark'],
	template: `
	<!-- <div class="grouplinks" id="fadeable" @mouseover="$emit('fade-in')" @mouseleave="$emit('fade-out')"> -->
	<div class="grouplinks">
		<a v-bind:href="bookmark.link" target="blank" rel="noreferrer noopener">{{bookmark.id}} {{ bookmark.name }}</a>
		<!-- <div class="edits">
			<button v-on:click="$emit('remove-bookmark')">-</button>
			<button @click="$emit('edit')">edit</button>
		</div> -->
	</div>
	`
})
var bookmarkList = new Vue({
	el: '#bookmarks',
	data: {
		newBookmarkName: '',
		newBookmarkLink: '',
		editing: false,
		editingIndex: 0,
		adding: false,
		bookmarks: [
			{id: 0, name: 'Bol.com', link: 'https://bol.com'},
			// {id: 2, name: 'Blackboard UU', link: 'https://uu.blackboard.com/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_29_1'},
			// {id: 3, name: 'Remindo UU', link: 'https://remindo.uu.nl/dashboard/'},
			{id: 4, name: 'Netflix', link: 'https://www.netflix.com/SwitchProfile?tkn=AG35KXUW4VG6TLOD7WX6MWNZXU'},
			// {id: 5, name: 'Loginpage', link: 'login.html'},
			{id: 5, name: 'Discogs', link: 'https://www.discogs.com/'},
			{id: 5, name: 'Reddit', link: 'https://www.reddit.com/'},
			{id: 5, name: 'YouTube', link: 'https://www.youtube.com/'},
			{id: 5, name: 'Magister', link: 'https://hermannwesselink.magister.net/magister/#/vandaag'},
			{id: 5, name: 'Lichess', link: 'https://lichess.org/'},
			{id: 5, name: 'Zalando', link: 'https://www.zalando.nl/'},
		],
		randomlinks: [
			'https://eev.ee/blog/2016/05/29/perlin-noise/',
			'https://kynd.github.io/p5sketches/index.html',
			'https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject',
			'https://math-linux.com/latex-26/faq/latex-faq/article/latex-derivatives-limits-sums-products-and-integrals',
			'https://github.com/terkelg/awesome-creative-coding#math',
			'https://latex.wikia.org/wiki/List_of_LaTeX_symbols',
			'https://regex101.com/',
		]
	},
	created: function () {
		for (let i = 0; i < this.bookmarks.length; i++) {
			this.bookmarks[i].id = i;
		}
	},
	methods: {
		showInputs: function () {
			this.adding = true;
			document.getElementById('bmName').style.display = 'grid';
			document.getElementById('bmLink').style.display = 'grid';
		},
		addBookmark: function () {
			if (this.newBookmarkName != '' && this.newBookmarkLink != '' && this.newBookmarkLink.split()) {
				this.bookmarks.push({ id: this.bookmarks.length, name: this.newBookmarkName, link: this.newBookmarkLink });
				document.getElementById('#todolist').style.alignSelf = 'center';
				document.getElementById('#maths').style.alignSelf = 'center';
				
				this.newBookmarkName = '';
				this.newBookmarkLink = '';
			} else {
				this.adding = false;
				document.getElementById('bmName').style.display = 'none';
				document.getElementById('bmLink').style.display = 'none';
			}
		},
		removeBookmark: function (itemid) {
			this.bookmarks.splice(itemid, 1);
			document.getElementById('todolist').style.alignSelf = 'center';
			document.getElementById('maths').style.alignSelf = 'center';

			for (let i = 0; i < this.bookmarks.length; i++) {
				this.bookmarks[i].id = i;
			}
		},
		removeAllBookmarks: function () {
			this.bookmarks = []
		},
		editBookmark: function (bookmarkid) {
			document.getElementsByClassName('edits')[bookmarkid].style.display = 'visible';
			// console.log('currently edditing: ' + bookmarkid)
			this.newBookmarkName = this.bookmarks[bookmarkid].name;
			this.newBookmarkLink = this.bookmarks[bookmarkid].link;
			this.editing = true;
			this.editingIndex = bookmarkid
		},
		pushEdit: function () {
			console.log('hello')
			this.editing = false;
			this.bookmarks[this.editingIndex].name = this.newBookmarkName
			this.bookmarks[this.editingIndex].link = this.newBookmarkLink
			this.newBookmarkName = '';
			this.newBookmarkLink = '';
		},
		cancelEdit: function () {
			// should empty the modeling; the inputs should be empty after this
			this.newBookmarkName = '';
			this.newBookmarkLink = '';
			this.editing = false;
		},
		fadeIn: function (bookmarkid) {
			// document.getElementsByClassName('edits')[bookmarkid].style.display = 'visible';
			// document.getElementsByClassName('edits')[bookmarkid].style.opacity = 0;
			// for (let x = 0; x < 100; x++) {
			// 	y = 100/((1+Math.pow(Math.E, -0.07*(x-100)))*100)
			// 	document.getElementsByClassName('edits')[bookmarkid].style.opacity = y
			// }
			// document.getElementsByClassName('edits')[bookmarkid].style.opacity = 1;
		},
		fadeOut: function (bookmarkid) {
			// for (let x = 0; x < 100; x++) {
			// 	y = -100/(1+Math.E^(-0.07*(x-100))*100) + 100
			// 	document.getElementsByClassName('edits')[bookmarkid].style.opacity = y
			// }
			// document.getElementsByClassName('edits')[bookmarkid].style.opacity = 0;
			// document.getElementsByClassName('edits')[bookmarkid].style.display = 'none';
		},
		random: function () {
			var i = Math.floor(Math.random() * this.randomlinks.length)
			window.open(this.randomlinks[i], '_blank')
			this.randomlinks.splice(i, 1)
		}
	}
})


var mathformula = new Vue({
	el: '#maths',
	data: {
		activeGroup: 0,
		activeFormulas: ``,
		activeDescription: '',
		formulaItems: [
			{ id: 0, description: 'Math D; modeling project', formulas: `
					$$ I_p = \\frac{4}{3} \\cdot \\pi \\cdot r^3 $$
					$$ \\Delta I_a = \\frac{4}{3} \\cdot \\pi \\cdot (r + h_a)^3 - I_p $$
					$$ b = \\left \\lceil \\frac{I_a \\cdot \\frac{|C_a - C|}{100} \\cdot \\rho_{C}}{\\displaystyle\\sum_{x=0}^{jaren} G_{bomen}^x \\cdot cgO} \\right \\rceil $$
					$$ I = \\pi \\cdot \\int_{a}^b (f(x)-g(x))^2dx $$
				`
			},
			{ id: 0, description: 'Goniometric derivatives', formulas: `
					$$ f(x) = sin(x) $$
					$$ f\'(x) = cos(x) $$
					$$ f\'\'(x) = -sin(x) $$
					$$ f\'\'\'(x) = -cos(x) $$
				`
			},
			{ id: 0, description: 'Goniometric Functions', formulas: `
					$$ {\\text{k} \\in \\mathbb{N}} $$
					$$ sin(A)=sin(B)\\Rightarrow $$
					$$ A=B+\\text{k}\\cdot2\\pi \\text{ of } A=\\pi-B+\\text{k}\\cdot2\\pi $$
					$$ cos(A)=cos(B)\\Rightarrow $$
					$$ A=B+\\text{k}\\cdot2\\pi \\text{ of } A=-B+\\text{k}\\cdot2\\pi $$
					$$ tan(A)=tan(B)\\Rightarrow $$
					$$ A=B+\\text{k}\\cdot\\pi$$

				`
			},
			{ id: 0, description: 'Exact Goniometric Values', formulas: `
					$$

						\\begin{array}{|c|c|c|}
						\\hline
						  x & 0 & \\frac{1}{6}\\pi & \\frac{1}{4}\\pi & \\frac{1}{3}\\pi & \\frac{1}{2}\\pi \\\\ 
						\\hline
						   sin(x) & 0 & \\frac{1}{2} & \\frac{1}{2}\\sqrt{2} & \\frac{1}{2}\\sqrt{3} & 1 \\\\
						\\hline
						   cos(x) & 1 & \\frac{1}{2}\\sqrt{3} & \\frac{1}{2}\\sqrt{2} & \\frac{1}{2} & 0 \\\\
						\\hline
						   tan(x) & 0 & \\frac{1}{3}\\sqrt{3} & 1 & \\sqrt{3} & - \\\\
						\\hline
						\\end{array}
					
					$$
					`
			},
			{ id: 0, description: 'Primitives of basic functions', formulas: `
					$$f(x) \\rightarrow F(x)$$
					$$ x^n \\rightarrow \\frac{1}{n+1}x^{n+1} (n\\neq-1)$$
					$$ \\frac{1}{x} \\rightarrow \\ln\\lvert x \\rvert $$
					$$ e^x \\rightarrow e^x + c $$
					$$ g^x \\rightarrow \\frac{1}{\\ln(g)} \\cdot g^x +c $$
					$$ sin(x) \\rightarrow -cos(x)+c $$
				`
			},
			{ id: 0, description: 'Derivatives of basic functions', formulas: `
					$$ f(x) \\rightarrow f'(x) $$
					$$ x^n \\rightarrow \\frac{1}{n+1}x^{n+1} (n\\neq-1) $$
					$$ \\frac{1}{x} \\rightarrow -\\frac{1}{x^2} $$
					$$ e^x \\rightarrow e^x $$
					$$ g^x \\rightarrow \\ln(g) \\cdot g^x $$
					$$ \\log_{g}x \\rightarrow \\frac{1}{\\ln{g}}\\cdot \\frac{1}{x} $$
					$$ sin(x) \\rightarrow cos(x) $$
				`
			},
			{ id: 0, description: 'Rules for Integrals', formulas: `
					$$ \\int_{a}^bf(x)dx+\\int_{b}^cf(x)dx=\\int_{a}^cf(x) $$
					$$ \\int_{a}^bf(x)dx+\\int_{a}^bg(x)dx=\\int_{a}^b(f(x)+g(x)) $$
					$$ \\int_{a}^bc \\cdot f(x)dx=c\\cdot\\int_{a}^bf(x)dx $$
				`
			},
			{ id: 0, description: 'Limits', formulas: `
					$$  $$
				`
			},
			{ id: 0, description: 'Complex Numbers', formulas: `
					$$\\phi=\\arg(x+yi)$$
					$$ z=r(cos(\\phi)+isin(\\phi)) $$
					$$ z=re^{i\\phi} $$
					$$ e^1\\approx2.71 $$
				`
			},
		]
	},
	created: function () {
		for (let i = 0; i < this.formulaItems.length; i++) {
			this.formulaItems[i].id = i;
		}

		this.activeDescription = this.formulaItems[this.activeGroup].description
		this.activeFormulas = this.formulaItems[this.activeGroup].formulas
		// console.log(this.formulaItems[this.activeGroup].formulas)
	},
	methods: {
		changeEquations: function () {
			this.activeDescription = ''
			this.activeFormulas = ''
			
			// remove old content elements
			for (let i = document.getElementsByTagName('mjx-container').length-1; i >=0; i--) {
				document.getElementsByTagName('mjx-container')[i].remove()
			}
			
			// change the active group in a carousel motion
			this.activeGroup++
			if (this.activeGroup == this.formulaItems.length) {
				this.activeGroup = 0
			}

			// change to the new group
			this.activeDescription = this.formulaItems[this.activeGroup].description
			this.activeFormulas = this.formulaItems[this.activeGroup].formulas
			setTimeout(function(){ MathJax.typeset() }, 50);
		},
	}
})

// var revmes = new Vue({
// 	el: '#revmesapp',
// 	data: {
// 		message: 'Food is great huh',
// 	},
// 	methods: {
// 		reverseMessage: function () {
// 			this.message = this.message.split('').reverse().join('')
// 		}
// 	}
// });

// var app6 = new Vue({
// 	el: '#app6',
// 	data: {
// 		linkname: 'bol.com'
// 	}
// });



// console.log(showtime())

// function addtodo () {
// 	console.log(grocerylist.id.length)
// 	app7.grocerylist.push({ id: grocerylist.length, text: toString(document.getElementById('newtodo').innerHTML) })
// }