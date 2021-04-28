// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// https://colorhunt.co/palette/265073
// https://colorhunt.co/palette/152965
// https://colorhunt.co/palette/147532
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords


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

const searchBar = Vue.createApp({
	data() {
		return {
			query: ''
		}
	},
	methods: {
		search() {
			var str = document.getElementById('searchbar').value;
			switch (str) {
				case '/edit':
					console.log('this should make the page editable')
					document.getElementById('searchbar').value = ''
					document.getElementsByTagName('html')[0].style.backgroundImage = `none;`
					document.getElementsByTagName('html')[0].style.backgroundImage = `linear-gradient(180deg, antiquewhite, #e48257);`
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
					// document.querySelectorAll('.grouplinks a')[bookmarkList.bookmarks.length-2].setAttribute('target', '_incognito')
					// document.querySelectorAll('.grouplinks a')[bookmarkList.bookmarks.length-1].setAttribute('target', '_incognito')
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
}).mount('#searchfield')

const todoList = Vue.createApp({
	data() {
		return {
			newtodo: '',
			borderBottom: 'border-bottom: none;',
			todos: [
				{ id: 0, text: 'Learn Vue', striked: false },
				{ id: 1, text: 'Eat food', striked: false },
				{ id: 2, text: 'Sing', striked: false },
				{ id: 3, text: 'Program', striked: false },
			]
		}
	},
	created() {
		if (localStorage.getItem('todos') != null) {
			this.todos = JSON.parse(localStorage.getItem('todos'))
		}
		if (this.todos.length != 0) {
			this.borderBottom = 'border-bottom: 1px solid black;';
		}
	},
	methods: {
		addTodo() {
			if (this.newtodo != ''){
				this.todos.push({ id: this.todos.length, text: this.newtodo, striked: false});
				this.newtodo = '';
				localStorage.setItem('todos', JSON.stringify(this.todos))
			}
		},
		removeTodo(itemid) {
			// remove 1 item from todos at the itemid index
			this.todos.splice(itemid, 1);

			// Updating the id of the items in this.todos
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].id = i;
			}

			localStorage.setItem('todos', JSON.stringify(this.todos))

			// Some style changes
			// Change the border if todos is empty
			if (this.todos.length === 0) {
				this.borderBottom = 'border-bottom: none;';
			}
		},
		strikeToggle(itemid) {
			if (this.todos[itemid].striked == true) {
				this.todos[itemid].striked = false
			} else {
				this.todos[itemid].striked = true
			}
			localStorage.setItem('todos', JSON.stringify(this.todos))
		},
		removeAll() {
			// empty the todo list.
			this.todos = [];

			// localStorage.setItem('todos', '')
			localStorage.removeItem('todos')
			this.borderBottom = 'border-bottom: none;';
		},
		removeStriked() {
			for (let i = this.todos.length-1; i >=0; i--) {
				if (this.todos[i].striked == true) {
					this.todos.splice(i, 1)
				}
			}
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].id = i;
			}
			localStorage.setItem('todos', JSON.stringify(this.todos))
		}
	}
})
todoList.component('todo-item', {
	props: ['item'],
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
})
todoList.mount('#todolist')


const bookmarkList = Vue.createApp({
	data() {
		return {
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
		}
	},
	created() {
		for (let i = 0; i < this.bookmarks.length; i++) {
			this.bookmarks[i].id = i;
		}
	},
	methods: {
		showInputs() {
			this.adding = true;
			document.getElementById('bmName').style.display = 'grid';
			document.getElementById('bmLink').style.display = 'grid';
		},
		addBookmark() {
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
		removeBookmark(itemid) {
			this.bookmarks.splice(itemid, 1);
			document.getElementById('todolist').style.alignSelf = 'center';
			document.getElementById('maths').style.alignSelf = 'center';

			for (let i = 0; i < this.bookmarks.length; i++) {
				this.bookmarks[i].id = i;
			}
		},
		removeAllBookmarks() {
			this.bookmarks = []
		},
		editBookmark(bookmarkid) {
			document.getElementsByClassName('edits')[bookmarkid].style.display = 'visible';
			// console.log('currently edditing: ' + bookmarkid)
			this.newBookmarkName = this.bookmarks[bookmarkid].name;
			this.newBookmarkLink = this.bookmarks[bookmarkid].link;
			this.editing = true;
			this.editingIndex = bookmarkid
		},
		pushEdit() {
			console.log('hello')
			this.editing = false;
			this.bookmarks[this.editingIndex].name = this.newBookmarkName
			this.bookmarks[this.editingIndex].link = this.newBookmarkLink
			this.newBookmarkName = '';
			this.newBookmarkLink = '';
		},
		cancelEdit() {
			// should empty the modeling; the inputs should be empty after this
			this.newBookmarkName = '';
			this.newBookmarkLink = '';
			this.editing = false;
		},
		fadeIn(bookmarkid) {
			// document.getElementsByClassName('edits')[bookmarkid].style.display = 'visible';
			// document.getElementsByClassName('edits')[bookmarkid].style.opacity = 0;
			// for (let x = 0; x < 100; x++) {
			// 	y = 100/((1+Math.pow(Math.E, -0.07*(x-100)))*100)
			// 	document.getElementsByClassName('edits')[bookmarkid].style.opacity = y
			// }
			// document.getElementsByClassName('edits')[bookmarkid].style.opacity = 1;
		},
		fadeOut(bookmarkid) {
			// for (let x = 0; x < 100; x++) {
			// 	y = -100/(1+Math.E^(-0.07*(x-100))*100) + 100
			// 	document.getElementsByClassName('edits')[bookmarkid].style.opacity = y
			// }
			// document.getElementsByClassName('edits')[bookmarkid].style.opacity = 0;
			// document.getElementsByClassName('edits')[bookmarkid].style.display = 'none';
		},
		random() {
			var i = Math.floor(Math.random() * this.randomlinks.length)
			window.open(this.randomlinks[i], '_blank')
			this.randomlinks.splice(i, 1)
		}
	}
}).component('group-links', {
	props: ['bookmark'],
	template: `
	<div class="grouplinks">
		<a v-bind:href="bookmark.link" target="blank" rel="noreferrer noopener">{{bookmark.id}} {{ bookmark.name }}</a>
	</div>
	`
}).mount('#bookmarks')


const mathformula = Vue.createApp({

	data() {
		return {
			activeGroup: 10,
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
				{ id: 0, description: 'Complex Numbers', formulas: `
						$$\\phi=\\arg(x+yi)$$
						$$ z=r(cos(\\phi)+isin(\\phi)) $$
						$$ z=re^{i\\phi} $$
						$$ e^1\\approx2.71 $$
					`
				},
				{ id: 0, description: 'Limits', formulas: `
						$$ \\lim_{x\\uparrow a} (\\frac{3x^4+4x^3+16}{x^4+3x^3}) $$
						$$ f(x)=ax+b $$
						$$ \\lim_{x\\to \\pm \\infty}(f'(x)) \\Rightarrow a $$
						$$ \\lim_{x\\to \\pm \\infty}(f(x)-ax) \\Rightarrow b $$
					`
				},
				{ id: 0, description: 'Set Theory', formulas: `
						$$ \\langle \\sum, S, s, A, T \\rangle $$
						$$ \\langle \\{0, 1\\}, \\{A, B\\}, A, \\{B\\}, 
						\\begin{array}{c|c|c|} 
							T & 0 & 1 \\\\
						\\hline
							A & A & B\\\\
							B & A & B\\\\
						\\end{array}
						\\rangle $$
					`
				},
				{ id: 0, description: 'Eindige automaten', formulas: `
						de eindige automaat van de vorige groep.
					`
				},
			]
		}
	},
	created() {
		for (let i = 0; i < this.formulaItems.length; i++) {
			this.formulaItems[i].id = i;
		}

		this.activeDescription = this.formulaItems[this.activeGroup].description
		this.activeFormulas = this.formulaItems[this.activeGroup].formulas
		// console.log(this.formulaItems[this.activeGroup].formulas)
	},
	methods: {
		changeEquations() {
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
}).mount('#maths')